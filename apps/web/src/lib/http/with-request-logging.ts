import "server-only";
import type { NextRequest } from "next/server";
import { REQUEST_ID_HEADER } from "@recall/shared";
import type { Logger } from "@recall/shared/logger";
import { logger } from "@/lib/logger";

/** Child logger tagged with this request's ID — use it inside handlers. */
export function getRequestLogger(request: NextRequest): Logger {
  return logger.child({ requestId: request.headers.get(REQUEST_ID_HEADER) ?? "unknown" });
}

type RouteHandler<Ctx> = (request: NextRequest, context: Ctx) => Response | Promise<Response>;

/**
 * Wraps a route handler to log method, path, status and duration for every
 * request (the job morgan did in Express). Errors are logged and re-thrown so
 * Next.js / Sentry still see them.
 */
export function withRequestLogging<Ctx>(handler: RouteHandler<Ctx>): RouteHandler<Ctx> {
  return async (request, context) => {
    const start = performance.now();
    const log = getRequestLogger(request);
    const meta = { method: request.method, path: request.nextUrl.pathname };

    try {
      const response = await handler(request, context);
      const durationMs = Math.round(performance.now() - start);
      log.info({ ...meta, status: response.status, durationMs }, "request completed");
      return response;
    } catch (error) {
      const durationMs = Math.round(performance.now() - start);
      log.error({ ...meta, durationMs, err: error }, "request failed");
      throw error;
    }
  };
}

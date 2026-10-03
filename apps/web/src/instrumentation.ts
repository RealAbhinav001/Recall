import * as Sentry from "@sentry/nextjs";

// Runs once when the Next.js server boots.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Validate env first: a misconfigured server should refuse to start.
    await import("./env");
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// Reports errors thrown in server components, route handlers and actions.
export const onRequestError = Sentry.captureRequestError;

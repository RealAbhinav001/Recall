import { NextResponse, type NextRequest } from "next/server";
import { REQUEST_ID_HEADER } from "@recall/shared";

// Accept an upstream ID only if it looks sane; otherwise mint our own.
const VALID_REQUEST_ID = /^[\w-]{8,64}$/;

/**
 * Gives every request a unique ID. It is forwarded to route handlers (for
 * logging) and echoed in the response so a user-reported error can be matched
 * to its logs.
 */
export function proxy(request: NextRequest) {
  const incoming = request.headers.get(REQUEST_ID_HEADER);
  const requestId = incoming && VALID_REQUEST_ID.test(incoming) ? incoming : crypto.randomUUID();

  const headers = new Headers(request.headers);
  headers.set(REQUEST_ID_HEADER, requestId);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set(REQUEST_ID_HEADER, requestId);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

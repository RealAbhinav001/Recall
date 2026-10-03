export const APP_NAME = "Recall";

// Header carrying the per-request ID, set by the web proxy and propagated
// to queue jobs and the worker so one request can be traced end to end.
export const REQUEST_ID_HEADER = "x-request-id";

// Upload size cap from the product spec (MVP: 20 MB). Single source of truth
// for the upload UI, the API, and the worker.
export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

const UNITS = ["B", "KB", "MB", "GB"] as const;

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";

  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${UNITS[unit]}`;
}

import { APP_NAME, MAX_FILE_SIZE_BYTES, formatBytes } from "@recall/shared";

// Placeholder entry point. The BullMQ ingestion worker lands here in M2;
// console.log will be replaced by pino in the logging task.
console.log(`[${APP_NAME} worker] started — max upload size ${formatBytes(MAX_FILE_SIZE_BYTES)}`);

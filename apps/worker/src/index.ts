import * as Sentry from "@sentry/node";
import { prisma } from "@recall/db";
import { APP_NAME, MAX_FILE_SIZE_BYTES, formatBytes } from "@recall/shared";
import { createLogger } from "@recall/shared/logger";

// No DSN = Sentry stays fully off. Set SENTRY_DSN to enable.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: Boolean(process.env.SENTRY_DSN),
  environment: process.env.NODE_ENV ?? "development",
});

const logger = createLogger("worker");

logger.info(
  { maxUploadSize: formatBytes(MAX_FILE_SIZE_BYTES) },
  `${APP_NAME} worker started — BullMQ ingestion jobs land here in M2`,
);

// Graceful shutdown: on Ctrl+C or a platform stop signal, close DB
// connections cleanly instead of dying mid-work. In M2 this also waits for
// the in-flight job to finish.
async function shutdown(signal: string) {
  logger.info({ signal }, "shutting down");
  await prisma.$disconnect();
  await Sentry.close(2000);
  process.exit(0);
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

process.on("unhandledRejection", (reason) => {
  logger.error({ err: reason }, "unhandled promise rejection");
  Sentry.captureException(reason);
});

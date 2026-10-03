import * as Sentry from "@sentry/nextjs";

// No DSN = Sentry stays fully off (local dev, CI). Set SENTRY_DSN to enable.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: Boolean(process.env.SENTRY_DSN),
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
});

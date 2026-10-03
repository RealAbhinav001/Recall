import { pino, type Logger, type LoggerOptions } from "pino";

const isDev = process.env.NODE_ENV !== "production";

// Defense in depth: even if a secret ends up in a log call, it is masked.
// Rule of thumb still applies — never log passwords, tokens, API keys or
// document contents in the first place.
const REDACT_PATHS = [
  "password",
  "*.password",
  "token",
  "*.token",
  "secret",
  "*.secret",
  "authorization",
  "*.authorization",
  "headers.cookie",
  "headers.authorization",
];

/**
 * Structured JSON logger. In development it pretty-prints to the terminal;
 * in production it emits one JSON object per line (what log drains expect).
 */
export function createLogger(service: string, options: LoggerOptions = {}): Logger {
  return pino({
    // `||` not `??`: a blank LOG_LEVEL= in .env is "", which must also fall back.
    level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
    base: { service },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: { paths: REDACT_PATHS, censor: "[redacted]" },
    ...(isDev && {
      transport: {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "SYS:HH:MM:ss", ignore: "pid,hostname" },
      },
    }),
    ...options,
  });
}

export type { Logger };

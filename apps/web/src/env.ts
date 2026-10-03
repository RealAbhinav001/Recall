import { z } from "zod";

// Blank values in .env (e.g. `GOOGLE_CLIENT_ID=`) count as "not set".
const optional = z.preprocess((v) => (v === "" ? undefined : v), z.string().min(1).optional());

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32, "must be at least 32 characters"),
  BETTER_AUTH_URL: z.url(),
  GOOGLE_CLIENT_ID: optional,
  GOOGLE_CLIENT_SECRET: optional,
  SENTRY_DSN: optional,
  LOG_LEVEL: optional,
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  // Fail fast at boot with every problem listed, instead of a cryptic
  // error deep inside a request later.
  const problems = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`);
  throw new Error(`Invalid environment variables:\n${problems.join("\n")}`);
}

export const env = parsed.data;

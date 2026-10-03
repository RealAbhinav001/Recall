import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@recall/db";
import { env } from "@/env";

// Wiring only: connects Better Auth to the database and enables the sign-in
// methods from the spec (email + password, and Google when keys are set).
// Auth behaviour — session contents, protected routes, what happens after
// signup — is application logic and lives elsewhere.
export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders:
    env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET } }
      : {},
  // nextCookies must be the last plugin: it lets server actions set cookies.
  plugins: [nextCookies()],
});

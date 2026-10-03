import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Better Auth serves every /api/auth/* endpoint (sign-in, sign-up, session…).
export const { GET, POST } = toNextJsHandler(auth);

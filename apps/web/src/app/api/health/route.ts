import { NextResponse } from "next/server";
import { prisma } from "@recall/db";
import { withRequestLogging } from "@/lib/http/with-request-logging";

export const dynamic = "force-dynamic";

// Liveness + database reachability, for uptime monitors and deploy checks.
// Redis joins this check once the queue client lands in M2.
export const GET = withRequestLogging(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", database: "up" });
  } catch {
    return NextResponse.json({ status: "degraded", database: "down" }, { status: 503 });
  }
});

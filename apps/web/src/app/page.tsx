import { APP_NAME, MAX_FILE_SIZE_BYTES, formatBytes } from "@recall/shared";

// Temporary placeholder — proves the cross-package import works.
// Replaced by the real landing page in the design phase.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 font-sans">
      <h1 className="text-4xl font-semibold tracking-tight">{APP_NAME}</h1>
      <p className="text-zinc-500">
        Monorepo wired up — max upload size from @recall/shared:{" "}
        <span className="font-mono">{formatBytes(MAX_FILE_SIZE_BYTES)}</span>
      </p>
    </main>
  );
}

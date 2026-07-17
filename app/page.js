import { Suspense } from "react";
import HomepageClient from "./HomepageClient";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 text-zinc-600 grid place-items-center">Loading broadcasts…</div>}>
      <HomepageClient />
    </Suspense>
  );
}

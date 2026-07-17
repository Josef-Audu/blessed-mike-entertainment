export default function Loading() {
  return (
    <div role="status" aria-label="Loading page" className="fixed inset-0 z-[90] grid place-items-center bg-zinc-950">
      <div className="flex flex-col items-center gap-5">
        <div className="preloader-ring grid h-16 w-16 place-items-center rounded-full border-2 border-zinc-800 border-t-amber-400"><span className="font-sports text-sm font-bold text-amber-400">BM</span></div>
        <p className="text-[10px] font-black uppercase tracking-[0.32em] text-amber-500">Loading broadcast</p>
      </div>
    </div>
  );
}

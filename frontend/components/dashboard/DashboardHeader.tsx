"use client";

import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between border-b border-slate-200/60 bg-[#F8F7FC]/80 px-6 py-5 backdrop-blur-xl lg:px-8">
      {/* Mobile logo */}
      <button
        type="button"
        onClick={() => router.push("/")}
        className="flex items-center gap-3 lg:hidden"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECE9FF] font-mono text-xs font-bold text-[#6C5CE7]">
          {"</>"}
        </div>

        <p className="font-bold">
          Viz<span className="text-[#6C5CE7]">Struct</span>
        </p>
      </button>

      <div className="hidden lg:block">
        <p className="text-xs font-semibold text-slate-400">
          PERSONALIZED LEARNING SPACE
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-500 transition hover:border-[#CFC9FF] sm:block"
        >
          Python ▾
        </button>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm text-slate-500"
        >
          ♢

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#6C5CE7]" />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6C5CE7] text-sm font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}
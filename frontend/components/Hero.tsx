import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto grid min-h-[86vh] max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-10"
    >
      {/* LEFT CONTENT */}
      <div className="relative z-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-medium text-[#6C5CE7] shadow-sm">
          <span className="text-violet-500">✦</span>
          AI-Powered Learning Platform
        </div>

        <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-[#17172B] sm:text-6xl lg:text-7xl">
          Understand code
          <span className="block">
            by{" "}
            <span className="text-[#6C5CE7]">
              visualizing
            </span>
          </span>
          how it works.
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
          VizStruct transforms program execution into visual experiences.
          Follow every step, understand mistakes, and learn what to practice
          next.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="/register"
            className="rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#7C4DFF] px-6 py-3.5 font-semibold text-white shadow-[0_10px_30px_rgba(108,92,231,0.22)] transition hover:-translate-y-0.5"
          >
            Start Learning Free →
          </a>

          <a
            href="#how-it-works"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-violet-300 hover:text-[#6C5CE7]"
          >
            See It In Action
          </a>
        </div>

        {/* Feature highlights */}
        <div className="mt-10 grid max-w-xl grid-cols-2 gap-5 sm:grid-cols-4">
          <div>
            <p className="text-xl text-[#6C5CE7]">◉</p>
            <p className="mt-2 text-sm font-semibold text-[#17172B]">
              Visual
            </p>
            <p className="text-xs text-slate-500">
              Execution
            </p>
          </div>

          <div>
            <p className="text-xl text-[#6C5CE7]">◈</p>
            <p className="mt-2 text-sm font-semibold text-[#17172B]">
              Smart
            </p>
            <p className="text-xs text-slate-500">
              Feedback
            </p>
          </div>

          <div>
            <p className="text-xl text-[#6C5CE7]">↗</p>
            <p className="mt-2 text-sm font-semibold text-[#17172B]">
              Adaptive
            </p>
            <p className="text-xs text-slate-500">
              Path
            </p>
          </div>

          <div>
            <p className="text-xl text-[#6C5CE7]">▥</p>
            <p className="mt-2 text-sm font-semibold text-[#17172B]">
              Progress
            </p>
            <p className="text-xs text-slate-500">
              Tracking
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative min-h-[580px]">
        {/* Soft background */}
        <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-[#EEEAFE] blur-[90px]" />

        <div className="absolute bottom-10 left-10 h-[240px] w-[240px] rounded-full bg-[#E7F8F7] blur-[80px]" />

        {/* Hero artwork */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/images/vizstruct-hero.png"
            alt="VizStruct coding companion showing code execution visualization"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-contain object-center"
          />
        </div>

        {/* Decorative dots */}
        <div className="absolute right-4 top-10 z-0 grid grid-cols-4 gap-2 opacity-25">
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-[#6C5CE7]"
            />
          ))}
        </div>

        {/* Small badge */}
        <div className="absolute bottom-10 right-3 z-20 hidden rounded-xl border border-violet-100 bg-white/90 px-4 py-3 shadow-lg backdrop-blur sm:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Current Concept
          </p>

          <p className="mt-1 text-sm font-semibold text-[#6C5CE7]">
            Array Traversal
          </p>
        </div>
      </div>
    </section>
  );
}
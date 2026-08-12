export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#F8F7FC] py-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#ECE9FF] blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#E7F8F7] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="overflow-hidden rounded-[32px] bg-[#292865] px-8 py-16 text-center text-white shadow-[0_25px_80px_rgba(41,40,101,0.18)] sm:px-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#BDBBFF]">
            Ready To Start?
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-[-0.035em] sm:text-5xl">
            Stop guessing what your code is doing.
            <span className="block text-[#8EDBD5]">
              Start understanding it.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#D4D3EF]">
            Build stronger programming fundamentals with visual execution,
            personalized learning paths, and feedback designed around your
            mistakes.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="/register"
              className="rounded-xl bg-white px-7 py-3.5 font-semibold text-[#292865] transition hover:-translate-y-0.5"
            >
              Create Your Profile →
            </a>

            <a
              href="#diagnostic"
              className="rounded-xl border border-white/20 bg-white/[0.06] px-7 py-3.5 font-semibold text-white transition hover:bg-white/[0.12]"
            >
              Take Diagnostic Test
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#C4C2EA]">
            <span>Assess</span>
            <span className="text-[#8EDBD5]">→</span>
            <span>Recommend</span>
            <span className="text-[#8EDBD5]">→</span>
            <span>Execute</span>
            <span className="text-[#8EDBD5]">→</span>
            <span>Visualize</span>
            <span className="text-[#8EDBD5]">→</span>
            <span>Diagnose</span>
            <span className="text-[#8EDBD5]">→</span>
            <span>Recover</span>
          </div>
        </div>
      </div>
    </section>
  );
}
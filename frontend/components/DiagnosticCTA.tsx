export default function DiagnosticCTA() {
  return (
    <section
      id="diagnostic"
      className="relative overflow-hidden bg-[#F8F7FC] py-24"
    >
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#ECE9FF] blur-[100px]" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#E5F7F5] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[32px] border border-violet-100 bg-white shadow-[0_25px_80px_rgba(60,50,130,0.08)]">
          <div className="grid items-center lg:grid-cols-[1fr_.9fr]">
            {/* LEFT CONTENT */}
            <div className="p-8 sm:p-12 lg:p-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F1EFFF] px-4 py-2">
                <span className="text-[#6C5CE7]">✦</span>

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C5CE7]">
                  Start From The Right Place
                </span>
              </div>

              <h2 className="mt-6 max-w-xl text-4xl font-bold tracking-[-0.035em] text-[#17172B] sm:text-5xl">
                Not sure where
                <span className="block">
                  you should{" "}
                  <span className="text-[#6C5CE7]">start?</span>
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Take a short diagnostic assessment and let VizStruct understand
                your current programming level before recommending what you
                should learn next.
              </p>

              <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E9F7F5] text-xs font-bold text-[#3A9994]">
                    ✓
                  </span>
                  Skill assessment
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E9F7F5] text-xs font-bold text-[#3A9994]">
                    ✓
                  </span>
                  Personalized level
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E9F7F5] text-xs font-bold text-[#3A9994]">
                    ✓
                  </span>
                  Learning path
                </div>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="/register"
                  className="rounded-xl bg-[#6C5CE7] px-6 py-3.5 font-semibold text-white shadow-[0_10px_30px_rgba(108,92,231,0.2)] transition hover:-translate-y-0.5 hover:bg-[#5B4BCF]"
                >
                  Take Diagnostic Test →
                </a>

                <p className="text-sm text-slate-400">
                  About 5 minutes
                </p>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative min-h-[460px] overflow-hidden bg-[#F1EFFF] p-8 sm:p-10">
              {/* decorative circles */}
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[35px] border-white/30" />

              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full border-[40px] border-[#DCD7FF]/50" />

              {/* Assessment card */}
              <div className="relative z-10 mx-auto max-w-md rounded-[24px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(73,61,160,0.12)] backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Diagnostic Assessment
                    </p>

                    <p className="mt-1 font-bold text-[#17172B]">
                      Question 4 of 8
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECE9FF] font-mono text-sm font-bold text-[#6C5CE7]">
                    50%
                  </div>
                </div>

                {/* progress */}
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#ECEAF4]">
                  <div className="h-full w-1/2 rounded-full bg-[#6C5CE7]" />
                </div>

                <div className="mt-7">
                  <p className="text-sm font-semibold leading-6 text-[#17172B]">
                    What will be the value of{" "}
                    <span className="font-mono text-[#6C5CE7]">x</span> after
                    this loop executes?
                  </p>

                  <div className="mt-4 rounded-xl bg-[#17172B] p-4 font-mono text-sm text-slate-200">
                    <p>x = 0</p>
                    <p className="mt-1">
                      <span className="text-[#C8BFFF]">for</span> i{" "}
                      <span className="text-[#C8BFFF]">in</span> range(3):
                    </p>
                    <p className="pl-5 text-[#8EDBD5]">
                      x = x + 2
                    </p>
                  </div>
                </div>

                {/* Answers */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {["2", "4", "6", "8"].map((answer, index) => (
                    <button
                      key={answer}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        index === 2
                          ? "border-[#6C5CE7] bg-[#F1EFFF] text-[#6C5CE7]"
                          : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"
                      }`}
                    >
                      {answer}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Programming Basics
                  </span>

                  <button className="rounded-lg bg-[#17172B] px-4 py-2 text-xs font-semibold text-white">
                    Next →
                  </button>
                </div>
              </div>

              {/* Floating result card */}
              <div className="absolute bottom-7 right-5 z-20 hidden rounded-2xl border border-white bg-white px-5 py-4 shadow-xl sm:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  VizStruct is learning
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#8EDBD5]" />

                  <p className="text-sm font-semibold text-[#17172B]">
                    Building your profile...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small flow underneath */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-500">
          <span>Questionnaire</span>
          <span className="text-[#6C5CE7]">→</span>
          <span>Diagnostic Test</span>
          <span className="text-[#6C5CE7]">→</span>
          <span>Learner Profile</span>
          <span className="text-[#6C5CE7]">→</span>
          <span className="text-[#3A9994]">
            Personalized Path
          </span>
        </div>
      </div>
    </section>
  );
}
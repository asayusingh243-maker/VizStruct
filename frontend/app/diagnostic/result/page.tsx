"use client";

import { useRouter } from "next/navigation";

const conceptResults = [
  {
    name: "Variables",
    score: 92,
    status: "Strong",
    description: "You trace variable updates confidently.",
  },
  {
    name: "Conditions",
    score: 84,
    status: "Strong",
    description: "Your conditional-flow understanding is solid.",
  },
  {
    name: "Loops",
    score: 68,
    status: "Improving",
    description: "Basic iteration is clear, but loop boundaries need attention.",
  },
  {
    name: "Arrays",
    score: 54,
    status: "Needs Practice",
    description: "Indexing and traversal should be strengthened.",
  },
];

const learningPath = [
  {
    number: "01",
    title: "Array Fundamentals",
    description: "Strengthen indexing, access, and array structure.",
    state: "Start Here",
  },
  {
    number: "02",
    title: "Array Traversal",
    description: "Trace how loops move through array elements.",
    state: "Next",
  },
  {
    number: "03",
    title: "Loop Boundaries",
    description: "Practice range limits and off-by-one reasoning.",
    state: "Recommended",
  },
  {
    number: "04",
    title: "Combined Practice",
    description: "Apply arrays and loops together in coding problems.",
    state: "Locked",
  },
];

function getStatusStyles(status: string) {
  if (status === "Strong") {
    return "bg-[#E4F7F5] text-[#317C77]";
  }

  if (status === "Improving") {
    return "bg-[#FFF4DD] text-[#A66A12]";
  }

  return "bg-[#FCEAEC] text-[#B34D5A]";
}

export default function DiagnosticResultPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7FC] text-[#17172B]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[100px]" />
        <div className="absolute -right-24 top-[350px] h-80 w-80 rounded-full bg-[#E4F7F5] blur-[100px]" />
        <div className="absolute bottom-[-100px] left-1/3 h-72 w-72 rounded-full bg-[#F1ECFF] blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,43,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,43,0.18) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-[#17172B]/5 bg-[#F8F7FC]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECE9FF] font-mono text-sm font-bold text-[#6C5CE7]">
                {"</>"}
              </div>

              <div className="text-left">
                <p className="text-xl font-bold tracking-tight">
                  Viz<span className="text-[#6C5CE7]">Struct</span>
                </p>

                <p className="text-[8px] font-semibold tracking-[0.2em] text-slate-400">
                  VISUALIZE · UNDERSTAND · MASTER
                </p>
              </div>
            </button>

            <div className="flex items-center gap-2 rounded-full border border-[#CFEDE9] bg-[#EAF9F7] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#56BDB4]" />
              <span className="text-xs font-bold text-[#317C77]">
                Diagnostic Complete
              </span>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          {/* Intro */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
              YOUR DIAGNOSTIC RESULT
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              We found your{" "}
              <span className="text-[#6C5CE7]">starting point.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
              VizStruct analyzed your diagnostic performance to identify your
              current strengths, concepts that need reinforcement, and the best
              place to begin your learning path.
            </p>
          </div>

          {/* Score overview */}
          <div className="mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Score */}
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(23,23,43,0.06)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                OVERALL PERFORMANCE
              </p>

              <div className="mt-7 flex items-center gap-6">
                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-[#ECE9FF]">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#6C5CE7]">74%</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Score
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-xs font-bold text-[#6C5CE7]">
                    Developing
                  </span>

                  <h2 className="mt-4 text-2xl font-bold">
                    Strong foundation.
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    You understand the fundamentals. Your biggest opportunity
                    is strengthening arrays and loop-boundary reasoning.
                  </p>
                </div>
              </div>
            </div>

            {/* Detected */}
            <div className="rounded-[28px] bg-[#292865] p-7 text-white shadow-[0_20px_60px_rgba(41,40,101,0.15)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8EDBD5]">
                    VIZSTRUCT ANALYSIS
                  </p>

                  <h2 className="mt-3 text-2xl font-bold">
                    What we detected
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 font-mono text-sm text-[#CFC9FF]">
                  AI
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs font-bold text-[#8EDBD5]">
                    STRENGTH
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Variable updates and conditional execution are understood
                    consistently.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs font-bold text-[#CFC9FF]">
                    PATTERN DETECTED
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Your reasoning becomes less consistent when indexing and
                    loop boundaries appear together.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs font-bold text-[#8EDBD5]">
                    RECOMMENDATION
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Begin with array traversal before moving into combined
                    array-and-loop problems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Concept breakdown */}
          <div className="mt-6 rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(23,23,43,0.05)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                CONCEPT ANALYSIS
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Your learning profile
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your result is more than a total score. Each concept contributes
                to your personalized path.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {conceptResults.map((concept) => (
                <div
                  key={concept.name}
                  className="rounded-2xl border border-slate-200/80 bg-[#FCFBFE] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold">{concept.name}</h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {concept.description}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold ${getStatusStyles(
                        concept.status
                      )}`}
                    >
                      {concept.status}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#6C5CE7]"
                        style={{ width: `${concept.score}%` }}
                      />
                    </div>

                    <p className="w-9 text-right text-xs font-bold text-slate-500">
                      {concept.score}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Starting point */}
          <div className="mt-6 rounded-[28px] border border-[#DCD8FF] bg-[#F0EDFF] p-7">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                  RECOMMENDED STARTING POINT
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Start with Array Fundamentals.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  You already have enough understanding of variables and
                  conditions to move forward. Strengthening arrays first will
                  make upcoming loop and data-structure problems easier to
                  understand.
                </p>
              </div>

              <div className="rounded-2xl bg-white px-6 py-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-400">
                  Priority Concept
                </p>
                <p className="mt-1 font-bold text-[#6C5CE7]">
                  Arrays
                </p>
              </div>
            </div>
          </div>

          {/* Learning path */}
          <div className="mt-12">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                YOUR INITIAL ROADMAP
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                A path built around what you need next.
              </h2>
            </div>

            <div className="mx-auto mt-8 max-w-4xl space-y-3">
              {learningPath.map((item, index) => (
                <div
                  key={item.number}
                  className={`flex items-center gap-5 rounded-2xl border p-5 ${
                    index === 0
                      ? "border-[#6C5CE7] bg-white shadow-[0_12px_35px_rgba(108,92,231,0.09)]"
                      : "border-slate-200/80 bg-white/80"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${
                      index === 0
                        ? "bg-[#6C5CE7] text-white"
                        : "bg-[#ECE9FF] text-[#6C5CE7]"
                    }`}
                  >
                    {item.number}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <span
                    className={`hidden rounded-full px-3 py-1.5 text-[10px] font-bold sm:block ${
                      index === 0
                        ? "bg-[#E4F7F5] text-[#317C77]"
                        : "bg-[#F3F1FA] text-slate-500"
                    }`}
                  >
                    {item.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-12 max-w-4xl rounded-[30px] bg-[#17172B] px-7 py-9 text-center text-white sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8EDBD5]">
              YOUR PROFILE IS READY
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Ready to start learning?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/60">
              Your learner profile and initial roadmap are ready. Your path will
              continue adapting as VizStruct learns from your performance.
            </p>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="mt-7 rounded-xl bg-[#6C5CE7] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(108,92,231,0.25)] transition hover:-translate-y-0.5 hover:bg-[#5B4BCF]"
            >
              Build My Learning Path →
            </button>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
              <span>Assess</span>
              <span>→</span>
              <span>Diagnose</span>
              <span>→</span>
              <span className="text-[#8EDBD5]">Personalize</span>
              <span>→</span>
              <span>Practice</span>
              <span>→</span>
              <span>Adapt</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
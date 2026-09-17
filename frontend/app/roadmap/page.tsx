"use client";

import { useRouter } from "next/navigation";
import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

type RoadmapState = "completed" | "current" | "next" | "locked";

type RoadmapItem = {
  number: string;
  title: string;
  description: string;
  state: RoadmapState;
  progress?: number;
  tag?: string;
  lessons: string;
};

const roadmap: RoadmapItem[] = [
  {
    number: "00",
    title: "Diagnostic Assessment",
    description:
      "Your initial assessment identified your current strengths and focus areas.",
    state: "completed",
    tag: "Completed",
    lessons: "8 questions",
  },
  {
    number: "01",
    title: "Array Fundamentals",
    description:
      "Strengthen array structure, indexing, element access, and basic operations.",
    state: "current",
    progress: 35,
    tag: "Current",
    lessons: "4 lessons",
  },
  {
    number: "02",
    title: "Array Traversal",
    description:
      "Learn how loops move through arrays and how each element is processed.",
    state: "next",
    tag: "Next",
    lessons: "5 lessons",
  },
  {
    number: "03",
    title: "Loop Boundaries",
    description:
      "Practice range limits, stopping conditions, and off-by-one reasoning.",
    state: "next",
    tag: "Recommended from diagnostic",
    lessons: "4 lessons",
  },
  {
    number: "04",
    title: "Arrays + Loops",
    description:
      "Combine traversal and indexing to solve structured programming problems.",
    state: "locked",
    tag: "Locked",
    lessons: "6 lessons",
  },
  {
    number: "05",
    title: "Practice Challenge",
    description:
      "Apply the concepts together in an adaptive coding challenge.",
    state: "locked",
    tag: "Locked",
    lessons: "3 problems",
  },
];

const strengths = ["Variables", "Conditions"];
const focusAreas = ["Array Indexing", "Loop Boundaries"];

export default function RoadmapPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <DashboardHeader />

          <div className="relative overflow-hidden">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[110px]" />
              <div className="absolute -left-24 top-[600px] h-72 w-72 rounded-full bg-[#E4F7F5] blur-[110px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
              {/* Header */}
              <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                    PERSONALIZED ROADMAP
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    Your learning path
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    This roadmap is generated from your diagnostic performance
                    and will adapt as your understanding improves.
                  </p>
                </div>

                <div className="rounded-full border border-[#CFEDE9] bg-[#EAF9F7] px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#56BDB4]" />

                    <span className="text-xs font-bold text-[#317C77]">
                      Adaptive roadmap active
                    </span>
                  </div>
                </div>
              </section>

              {/* Progress overview */}
              <section className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
                  <p className="text-xs font-semibold text-slate-400">
                    Overall Progress
                  </p>

                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-3xl font-bold">18%</p>
                    <span className="text-xs font-semibold text-[#6C5CE7]">
                      Initial path
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F0EEF5]">
                    <div className="h-full w-[18%] rounded-full bg-[#6C5CE7]" />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
                  <p className="text-xs font-semibold text-slate-400">
                    Current Focus
                  </p>

                  <p className="mt-3 text-xl font-bold">Array Fundamentals</p>

                  <p className="mt-2 text-xs text-slate-400">
                    Strengthening your primary focus area
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
                  <p className="text-xs font-semibold text-slate-400">
                    Current Level
                  </p>

                  <p className="mt-3 text-xl font-bold">Developing</p>

                  <p className="mt-2 text-xs text-slate-400">
                    Based on your diagnostic assessment
                  </p>
                </div>
              </section>

              {/* Main content */}
              <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_0.75fr]">
                {/* Roadmap timeline */}
                <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_45px_rgba(23,23,43,0.04)] sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        LEARNING JOURNEY
                      </p>

                      <h2 className="mt-2 text-xl font-bold">
                        Recommended sequence
                      </h2>
                    </div>

                    <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-[10px] font-bold text-[#6C5CE7]">
                      Python
                    </span>
                  </div>

                  <div className="mt-8">
                    {roadmap.map((item, index) => {
                      const completed = item.state === "completed";
                      const current = item.state === "current";
                      const locked = item.state === "locked";

                      return (
                        <div key={item.number} className="relative flex gap-4">
                          {/* Timeline */}
                          <div className="flex w-12 shrink-0 flex-col items-center">
                            <div
                              className={`z-10 flex h-11 w-11 items-center justify-center rounded-xl text-xs font-bold ${
                                completed
                                  ? "bg-[#E4F7F5] text-[#317C77]"
                                  : current
                                  ? "bg-[#6C5CE7] text-white shadow-lg shadow-[#6C5CE7]/20"
                                  : locked
                                  ? "bg-[#F2F1F5] text-slate-300"
                                  : "bg-[#ECE9FF] text-[#6C5CE7]"
                              }`}
                            >
                              {completed ? "✓" : item.number}
                            </div>

                            {index !== roadmap.length - 1 && (
                              <div
                                className={`min-h-[118px] w-[2px] flex-1 ${
                                  completed
                                    ? "bg-[#8EDBD5]"
                                    : "bg-[#E8E6EE]"
                                }`}
                              />
                            )}
                          </div>

                          {/* Card */}
                          <div
                            className={`mb-4 min-w-0 flex-1 rounded-2xl border p-5 transition ${
                              current
                                ? "border-[#CFC9FF] bg-[#F8F7FF]"
                                : locked
                                ? "border-slate-100 bg-[#FBFAFC] opacity-70"
                                : "border-slate-200/80 bg-white"
                            }`}
                          >
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-base font-bold">
                                    {item.title}
                                  </h3>

                                  <span
                                    className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${
                                      completed
                                        ? "bg-[#E4F7F5] text-[#317C77]"
                                        : current
                                        ? "bg-[#ECE9FF] text-[#6C5CE7]"
                                        : item.tag ===
                                          "Recommended from diagnostic"
                                        ? "bg-[#FFF4D9] text-[#946A16]"
                                        : locked
                                        ? "bg-[#F0EFF3] text-slate-400"
                                        : "bg-[#F4F2FF] text-[#6C5CE7]"
                                    }`}
                                  >
                                    {item.tag}
                                  </span>
                                </div>

                                <p className="mt-2 max-w-xl text-xs leading-5 text-slate-500">
                                  {item.description}
                                </p>

                                <p className="mt-3 text-[10px] font-semibold text-slate-400">
                                  {item.lessons}
                                </p>
                              </div>

                              {current && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    router.push("/learn/arrays")
                                  }
                                  className="shrink-0 rounded-xl bg-[#6C5CE7] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#5B4BCF]"
                                >
                                  Continue →
                                </button>
                              )}

                              {item.state === "next" && (
                                <div className="text-lg text-slate-300">→</div>
                              )}

                              {locked && (
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EFF3] text-xs text-slate-400">
                                  🔒
                                </div>
                              )}
                            </div>

                            {current && (
                              <div className="mt-5">
                                <div className="flex justify-between text-[10px]">
                                  <span className="font-semibold text-slate-400">
                                    Concept progress
                                  </span>

                                  <span className="font-bold text-[#6C5CE7]">
                                    {item.progress}%
                                  </span>
                                </div>

                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E8E5F5]">
                                  <div
                                    className="h-full rounded-full bg-[#6C5CE7]"
                                    style={{
                                      width: `${item.progress}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-5">
                  {/* Why this path */}
                  <div className="rounded-[28px] bg-[#292865] p-6 text-white">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#8EDBD5]" />

                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8EDBD5]">
                        WHY THIS PATH?
                      </p>
                    </div>

                    <h2 className="mt-4 text-xl font-bold">
                      Built from your diagnostic
                    </h2>

                    <p className="mt-3 text-xs leading-6 text-white/60">
                      Your sequence prioritizes concepts where your answers
                      showed less consistency while preserving the areas you
                      already understand well.
                    </p>

                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                        YOUR STRENGTHS
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {strengths.map((strength) => (
                          <span
                            key={strength}
                            className="rounded-full bg-[#8EDBD5]/15 px-3 py-1.5 text-[10px] font-bold text-[#8EDBD5]"
                          >
                            ✓ {strength}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                        FOCUS AREAS
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {focusAreas.map((area) => (
                          <span
                            key={area}
                            className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/75"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Adaptive explanation */}
                  <div className="rounded-[28px] border border-[#DCD8FF] bg-[#F0EDFF] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      ADAPTIVE LEARNING
                    </p>

                    <h3 className="mt-3 text-lg font-bold">
                      This path isn&apos;t fixed.
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      VizStruct will update your recommendations when your
                      performance changes.
                    </p>

                    <div className="mt-5 space-y-3">
                      {[
                        ["01", "Complete lessons"],
                        ["02", "Solve coding problems"],
                        ["03", "Analyze mistakes"],
                        ["04", "Update recommendations"],
                      ].map(([number, label]) => (
                        <div
                          key={number}
                          className="flex items-center gap-3 rounded-xl bg-white/75 p-3"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-[#6C5CE7]">
                            {number}
                          </div>

                          <p className="text-xs font-semibold text-slate-600">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Companion recommendation */}
                  <div className="rounded-[28px] border border-slate-200/80 bg-white p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECE9FF] text-xs font-bold text-[#6C5CE7]">
                        VS
                      </div>

                      <div>
                        <p className="text-sm font-bold">
                          Learning Companion
                        </p>

                        <p className="text-[10px] text-slate-400">
                          Roadmap guidance
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-xs leading-6 text-slate-500">
                      “Start with array indexing. Once that becomes consistent,
                      traversal problems will become much easier to reason
                      through.”
                    </p>

                    <button
                      type="button"
                      onClick={() => router.push("/practice")}
                      className="mt-5 w-full rounded-xl bg-[#17172B] px-4 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5"
                    >
                      Practice Focus Area →
                    </button>
                  </div>
                </div>
              </section>

              {/* Adaptation cycle */}
              <section className="mt-5 rounded-[28px] border border-slate-200/80 bg-white p-6 sm:p-7">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      HOW YOUR PATH EVOLVES
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      Every result improves the next recommendation.
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      "Learn",
                      "Practice",
                      "Visualize",
                      "Diagnose",
                      "Adapt",
                    ].map((step, index, array) => (
                      <div key={step} className="flex items-center gap-2">
                        <span
                          className={`rounded-xl px-4 py-2 text-xs font-bold ${
                            step === "Adapt"
                              ? "bg-[#6C5CE7] text-white"
                              : "bg-[#F3F1FA] text-slate-600"
                          }`}
                        >
                          {step}
                        </span>

                        {index < array.length - 1 && (
                          <span className="text-slate-300">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
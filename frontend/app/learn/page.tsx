"use client";

import { useRouter } from "next/navigation";

import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

const learningTopics = [
  {
    number: "01",
    title: "Array Fundamentals",
    description:
      "Learn arrays, indexing, traversal and the basics needed to solve array problems.",
    progress: "35%",
    status: "Continue",
    active: true,
  },
  {
    number: "02",
    title: "Array Traversal",
    description:
      "Understand how loops move through arrays and how each iteration changes program state.",
    progress: "Locked",
    status: "Upcoming",
    active: false,
  },
  {
    number: "03",
    title: "Loop Boundaries",
    description:
      "Understand range limits, off-by-one errors and common loop boundary mistakes.",
    progress: "Recommended",
    status: "Next",
    active: false,
  },
  {
    number: "04",
    title: "Arrays + Loops",
    description:
      "Combine arrays and loops to solve progressively harder coding problems.",
    progress: "Locked",
    status: "Locked",
    active: false,
  },
];

export default function LearnPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <AppSidebar />

      <div className="lg:pl-64">
        <DashboardHeader />

        <div className="px-5 py-5 sm:px-7 lg:px-9">
          {/* PAGE HEADER */}

          <section className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
              PERSONALIZED LEARNING
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-[-0.04em]">
                  Your Learning Path
                </h1>

                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                  Learn concepts in the order that matches your current skill
                  level and practice needs.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-[13px] border border-slate-200 bg-white px-4 py-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    OVERALL PROGRESS
                  </p>

                  <p className="mt-0.5 text-lg font-bold">18%</p>
                </div>
              </div>
            </div>
          </section>

          {/* ADAPTIVE SUMMARY */}

          <section className="mb-6 rounded-[22px] bg-[#17172B] p-5 text-white sm:p-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8EDBD5]">
                  ADAPTIVE LEARNING PATH
                </p>

                <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] sm:text-2xl">
                  Start with the concepts you need most.
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/50">
                  Your diagnostic identified Arrays and Loop Boundaries as
                  areas that need more practice. VizStruct has placed these
                  concepts into your current learning path.
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/learn/arrays")}
                className="w-fit shrink-0 rounded-[12px] bg-white px-5 py-3 text-xs font-bold text-[#17172B] transition hover:-translate-y-0.5"
              >
                Continue Learning →
              </button>
            </div>
          </section>

          {/* CURRENT FOCUS */}

          <section className="mb-6">
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                CURRENT FOCUS
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Array Fundamentals
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_270px]">
              {/* CURRENT COURSE */}

              <div className="rounded-[20px] border border-slate-200 bg-white p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6C5CE7]">
                        IN PROGRESS
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[9px] font-bold text-slate-500">
                        4 LESSONS
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold tracking-[-0.03em]">
                      Array Fundamentals
                    </h3>

                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
                      Understand arrays, indexing, traversal and comparisons
                      before moving into more complex coding problems.
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xl font-bold">35%</p>

                    <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      COMPLETE
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#6C5CE7]"
                    style={{ width: "35%" }}
                  />
                </div>

                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => router.push("/learn/arrays")}
                    className="rounded-[11px] bg-[#6C5CE7] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#5D4FD3]"
                  >
                    Continue Lesson
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/practice")}
                    className="rounded-[11px] border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Practice Arrays
                  </button>
                </div>
              </div>

              {/* LEARNING FOCUS */}

              <div className="rounded-[20px] bg-[#ECE9FF] p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#6C5CE7]">
                  LEARNING FOCUS
                </p>

                <h3 className="mt-2 text-base font-bold">
                  What you&apos;re working on
                </h3>

                <div className="mt-3 space-y-2">
                  <div className="rounded-[12px] bg-white px-3.5 py-2.5">
                    <p className="text-xs font-bold">Array Indexing</p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Accessing values using indexes
                    </p>
                  </div>

                  <div className="rounded-[12px] bg-white px-3.5 py-2.5">
                    <p className="text-xs font-bold">Array Traversal</p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Visiting elements using loops
                    </p>
                  </div>

                  <div className="rounded-[12px] bg-white px-3.5 py-2.5">
                    <p className="text-xs font-bold">Loop Boundaries</p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Avoiding off-by-one mistakes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LEARNING PATH */}

          <section>
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                YOUR PATH
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Personalized Learning Sequence
              </h2>
            </div>

            <div className="space-y-3">
              {learningTopics.map((topic) => (
                <div
                  key={topic.number}
                  className={`rounded-[20px] border p-4 sm:p-5 ${
                    topic.active
                      ? "border-[#DCD8FF] bg-white"
                      : "border-slate-200 bg-white/70"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* NUMBER */}

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-xs font-bold ${
                        topic.active
                          ? "bg-[#6C5CE7] text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {topic.number}
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold sm:text-base">
                          {topic.title}
                        </h3>

                        {topic.number === "03" && (
                          <span className="rounded-full bg-[#ECE9FF] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#6C5CE7]">
                            Recommended
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {topic.description}
                      </p>
                    </div>

                    {/* STATUS */}

                    <div className="flex items-center justify-between gap-3 sm:shrink-0">
                      <span
                        className={`text-[10px] font-bold ${
                          topic.active
                            ? "text-[#6C5CE7]"
                            : "text-slate-400"
                        }`}
                      >
                        {topic.progress}
                      </span>

                      {topic.active ? (
                        <button
                          type="button"
                          onClick={() => router.push("/learn/arrays")}
                          className="rounded-[10px] border border-[#DCD8FF] px-4 py-2 text-[10px] font-bold text-[#6C5CE7] transition hover:bg-[#ECE9FF]"
                        >
                          Open
                        </button>
                      ) : (
                        <span className="rounded-[10px] bg-slate-100 px-4 py-2 text-[10px] font-bold text-slate-400">
                          {topic.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BOTTOM LEARNING CYCLE */}

          <section className="mt-5 rounded-[20px] border border-slate-200 bg-white p-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
              VIZSTRUCT LEARNING CYCLE
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {[
                "Learn",
                "Practice",
                "Visualize",
                "Diagnose",
                "Recover",
                "Adapt",
              ].map((item, index, items) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`rounded-full px-3.5 py-1.5 text-[10px] font-bold ${
                      index === 0
                        ? "bg-[#ECE9FF] text-[#6C5CE7]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item}
                  </span>

                  {index < items.length - 1 && (
                    <span className="text-slate-300">→</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
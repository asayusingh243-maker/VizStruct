"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AppSidebar from "../../../components/dashboard/AppSidebar";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";

const arrayValues = [4, 7, 2, 9, 5];

const lessons = [
  {
    id: 1,
    title: "What is an Array?",
    description: "Understand how arrays store multiple values together.",
  },
  {
    id: 2,
    title: "Array Indexing",
    description: "Learn how positions are used to access array elements.",
  },
  {
    id: 3,
    title: "Array Traversal",
    description: "Learn how loops visit each element of an array.",
  },
  {
    id: 4,
    title: "Finding Values",
    description: "Use comparisons to search for values inside an array.",
  },
];

export default function ArrayFundamentalsPage() {
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState(1);

  const currentLesson =
    lessons.find((lesson) => lesson.id === activeLesson) ?? lessons[0];

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <AppSidebar />

      <div className="lg:pl-64">
        <DashboardHeader />

        <div className="px-5 py-6 sm:px-8 lg:px-10">
          {/* TOP HEADER */}

          <section className="mb-7">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                  CURRENT LEARNING PATH
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
                  Array Fundamentals
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Build a strong understanding of arrays before moving into
                  traversal, loop boundaries and problem solving.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-[14px] border border-slate-200 bg-white px-4 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    PROGRESS
                  </p>

                  <p className="mt-1 text-lg font-bold">35%</p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/practice")}
                  className="rounded-[14px] bg-[#6C5CE7] px-5 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#5D4FD3]"
                >
                  Start Practice
                </button>
              </div>
            </div>
          </section>

          {/* PROGRESS */}

          <section className="mb-7">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                LEARNING PROGRESS
              </p>

              <p className="text-xs font-bold text-[#6C5CE7]">
                35% complete
              </p>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#6C5CE7]"
                style={{ width: "35%" }}
              />
            </div>
          </section>

          {/* MAIN GRID */}

          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            {/* LEFT */}

            <section className="space-y-6">
              {/* LESSON CARD */}

              <div className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#6C5CE7]">
                    LESSON {activeLesson}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[9px] font-bold text-slate-500">
                    ARRAY FUNDAMENTALS
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-bold tracking-[-0.03em]">
                  {currentLesson.title}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                  {currentLesson.description}
                </p>

                {activeLesson === 1 && (
                  <div className="mt-7">
                    <h3 className="text-sm font-bold">
                      Think of an array as a collection of values.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Each value has a position called an index. In most
                      programming languages, indexing starts from <b>0</b>.
                    </p>

                    {/* ARRAY VISUALIZATION */}

                    <div className="mt-6 overflow-x-auto">
                      <div className="flex min-w-[420px] gap-2">
                        {arrayValues.map((value, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-[16px] border border-slate-200 bg-[#F8F7FC] p-4 text-center"
                          >
                            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                              INDEX {index}
                            </p>

                            <p className="mt-2 text-2xl font-bold text-[#17172B]">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* INDEX EXAMPLE */}

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-[18px] bg-[#17172B] p-5 text-white">
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8EDBD5]">
                          EXAMPLE
                        </p>

                        <pre className="mt-3 overflow-x-auto text-sm leading-7 text-white/80">
{`numbers = [4, 7, 2, 9, 5]

print(numbers[2])`}
                        </pre>
                      </div>

                      <div className="rounded-[18px] border border-[#DCD8FF] bg-[#ECE9FF] p-5">
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#6C5CE7]">
                          WHAT HAPPENS?
                        </p>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          Index <b>2</b> points to the third element.
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                          <span className="rounded-lg bg-white px-3 py-2 text-sm font-bold">
                            index 2
                          </span>

                          <span className="text-[#6C5CE7]">→</span>

                          <span className="rounded-lg bg-white px-3 py-2 text-sm font-bold">
                            value 2
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeLesson === 2 && (
                  <div className="mt-7">
                    <h3 className="text-sm font-bold">
                      Indexing lets your program access a specific element.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Remember: the first element is at index 0, the second at
                      index 1, and so on.
                    </p>

                    <div className="mt-6 grid grid-cols-5 gap-2">
                      {arrayValues.map((value, index) => (
                        <div
                          key={index}
                          className={`rounded-[16px] border p-4 text-center ${
                            index === 2
                              ? "border-[#6C5CE7] bg-[#ECE9FF]"
                              : "border-slate-200 bg-[#F8F7FC]"
                          }`}
                        >
                          <p className="text-[9px] font-bold text-slate-400">
                            {index}
                          </p>

                          <p className="mt-2 text-xl font-bold">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-[18px] bg-[#17172B] p-5 text-white">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8EDBD5]">
                        TRY TO READ THIS
                      </p>

                      <pre className="mt-3 text-sm leading-7 text-white/80">
{`numbers[0]  →  4
numbers[1]  →  7
numbers[2]  →  2
numbers[3]  →  9
numbers[4]  →  5`}
                      </pre>
                    </div>
                  </div>
                )}

                {activeLesson === 3 && (
                  <div className="mt-7">
                    <h3 className="text-sm font-bold">
                      Traversal means visiting the elements one by one.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      A loop can move through every element so your program
                      can inspect or process the values.
                    </p>

                    <div className="mt-6 rounded-[18px] bg-[#17172B] p-5 text-white">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8EDBD5]">
                        PYTHON EXAMPLE
                      </p>

                      <pre className="mt-3 overflow-x-auto text-sm leading-7 text-white/80">
{`numbers = [4, 7, 2, 9, 5]

for value in numbers:
    print(value)`}
                      </pre>
                    </div>

                    <div className="mt-5 grid gap-2 sm:grid-cols-5">
                      {arrayValues.map((value, index) => (
                        <div
                          key={index}
                          className="rounded-[14px] border border-slate-200 bg-[#F8F7FC] px-3 py-4 text-center"
                        >
                          <p className="text-[9px] text-slate-400">
                            STEP {index + 1}
                          </p>

                          <p className="mt-1 text-lg font-bold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeLesson === 4 && (
                  <div className="mt-7">
                    <h3 className="text-sm font-bold">
                      Comparisons help us solve array problems.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      For example, finding the largest value requires
                      comparing each element with the current largest value.
                    </p>

                    <div className="mt-6 rounded-[18px] bg-[#17172B] p-5 text-white">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8EDBD5]">
                        CORE IDEA
                      </p>

                      <pre className="mt-3 overflow-x-auto text-sm leading-7 text-white/80">
{`largest = numbers[0]

for value in numbers:
    if value > largest:
        largest = value`}
                      </pre>
                    </div>

                    <div className="mt-5 rounded-[18px] border border-[#DCD8FF] bg-[#ECE9FF] p-5">
                      <p className="text-sm font-bold">
                        VizStruct focus
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Instead of only showing the final answer, VizStruct
                        will visualize how each comparison changes the
                        program state.
                      </p>
                    </div>
                  </div>
                )}

                {/* LESSON NAVIGATION */}

                <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    disabled={activeLesson === 1}
                    onClick={() =>
                      setActiveLesson((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    className="rounded-[12px] border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ← Previous
                  </button>

                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    {activeLesson} / {lessons.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (activeLesson < lessons.length) {
                        setActiveLesson((current) => current + 1);
                      } else {
                        router.push("/practice");
                      }
                    }}
                    className="rounded-[12px] bg-[#17172B] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#252541]"
                  >
                    {activeLesson === lessons.length
                      ? "Start Practice →"
                      : "Next Lesson →"}
                  </button>
                </div>
              </div>

              {/* VISUALIZE CTA */}

              <div className="rounded-[24px] bg-[#17172B] p-6 text-white sm:p-7">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8EDBD5]">
                      VIZSTRUCT VISUAL LEARNING
                    </p>

                    <h3 className="mt-2 text-xl font-bold tracking-[-0.03em]">
                      See how code executes, not just the answer.
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                      Run a coding problem and watch variables, comparisons
                      and updates change step by step.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/practice/visualize")}
                    className="shrink-0 rounded-[12px] bg-white px-5 py-3 text-xs font-bold text-[#17172B] transition hover:-translate-y-0.5"
                  >
                    Visualize Execution
                  </button>
                </div>
              </div>
            </section>

            {/* RIGHT */}

            <aside className="space-y-5">
              {/* LESSON LIST */}

              <div className="rounded-[22px] border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      COURSE
                    </p>

                    <h3 className="mt-1 text-base font-bold">
                      Array Fundamentals
                    </h3>
                  </div>

                  <span className="rounded-full bg-[#ECE9FF] px-2.5 py-1 text-[9px] font-bold text-[#6C5CE7]">
                    4 LESSONS
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  {lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => setActiveLesson(lesson.id)}
                      className={`w-full rounded-[14px] p-3 text-left transition ${
                        activeLesson === lesson.id
                          ? "bg-[#ECE9FF]"
                          : "bg-[#F8F7FC] hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                            activeLesson === lesson.id
                              ? "bg-[#6C5CE7] text-white"
                              : "bg-white text-slate-400"
                          }`}
                        >
                          {lesson.id}
                        </span>

                        <div>
                          <p className="text-xs font-bold">
                            {lesson.title}
                          </p>

                          <p className="mt-1 text-[10px] leading-4 text-slate-400">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* LEARNING FOCUS */}

              <div className="rounded-[22px] bg-[#ECE9FF] p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#6C5CE7]">
                  LEARNING FOCUS
                </p>

                <h3 className="mt-2 text-base font-bold">
                  Build the foundation first.
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Your diagnostic showed that arrays are currently an area
                  where more practice can help.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-slate-500">
                    Indexing
                  </span>

                  <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-slate-500">
                    Traversal
                  </span>

                  <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-slate-500">
                    Comparisons
                  </span>
                </div>
              </div>

              {/* NEXT STEP */}

              <div className="rounded-[22px] border border-slate-200 bg-white p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  NEXT IN YOUR PATH
                </p>

                <h3 className="mt-2 text-base font-bold">
                  Array Traversal
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Learn how loops move through arrays and prepare for loop
                  boundary problems.
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/roadmap")}
                  className="mt-4 text-xs font-bold text-[#6C5CE7]"
                >
                  View full roadmap →
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
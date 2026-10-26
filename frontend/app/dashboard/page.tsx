"use client";

import { useRouter } from "next/navigation";
import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

const skills = [
  { name: "Variables", score: 92, label: "Strong" },
  { name: "Conditions", score: 84, label: "Strong" },
  { name: "Loops", score: 68, label: "Improving" },
  { name: "Arrays", score: 54, label: "Focus Area" },
];

const roadmap = [
  { name: "Array Fundamentals", status: "Current", complete: 35 },
  { name: "Array Traversal", status: "Next", complete: 0 },
  { name: "Loop Boundaries", status: "Upcoming", complete: 0 },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <DashboardHeader />

          <div className="relative overflow-hidden">
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[110px]" />
              <div className="absolute -left-20 top-[500px] h-72 w-72 rounded-full bg-[#E4F7F5] blur-[100px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
              {/* Welcome */}
              <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                    YOUR LEARNING SPACE
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    Ready to keep improving?
                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                    Your next lesson is based on your diagnostic result and
                    current learning progress.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#CFEDE9] bg-[#EAF9F7] px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#56BDB4]" />
                  <span className="text-xs font-bold text-[#317C77]">
                    Learning path active
                  </span>
                </div>
              </section>

              {/* Main grid */}
              <section className="mt-8 grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
                {/* Continue learning */}
                <div className="relative overflow-hidden rounded-[28px] bg-[#292865] p-7 text-white shadow-[0_20px_60px_rgba(41,40,101,0.15)] sm:p-8">
                  <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#6C5CE7]/30 blur-3xl" />

                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#8EDBD5]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8EDBD5]">
                        Continue Learning
                      </span>

                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/60">
                        Recommended for you
                      </span>
                    </div>

                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                      Current Concept
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                      Array Fundamentals
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                      Build confidence with array indexing, element access, and
                      understanding how values are stored before moving into
                      traversal.
                    </p>

                    <div className="mt-7 max-w-lg">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/45">Concept progress</span>
                        <span className="font-bold text-[#8EDBD5]">35%</span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-[35%] rounded-full bg-[#8EDBD5]" />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => router.push("/learn/arrays")}
                        className="rounded-xl bg-[#6C5CE7] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#5B4BCF]"
                      >
                        Continue Learning →
                      </button>

                      <button
                        type="button"
                        onClick={() => router.push("/roadmap")}
                        className="rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/10"
                      >
                        View Roadmap
                      </button>
                    </div>
                  </div>
                </div>

                {/* Companion */}
                <div className="rounded-[28px] border border-[#DCD8FF] bg-[#F0EDFF] p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white font-mono text-sm font-bold text-[#6C5CE7] shadow-sm">
                      VS
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6C5CE7]">
                        Learning Companion
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Personalized guidance
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
                    <p className="text-sm leading-6 text-slate-600">
                      “Your variable skills are strong. Let&apos;s use that
                      foundation to understand exactly how array indices change
                      during execution.”
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#6C5CE7]">
                    <span className="h-2 w-2 rounded-full bg-[#8EDBD5]" />
                    Guidance ready when you need it
                  </div>
                </div>
              </section>

              {/* Stats */}
              <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Current Level", "Developing", "Based on diagnostic"],
                  ["Problems Solved", "12", "4 this week"],
                  ["Learning Streak", "3 days", "Keep it going"],
                  ["Path Progress", "18%", "Initial roadmap"],
                ].map(([label, value, note]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(23,23,43,0.035)]"
                  >
                    <p className="text-xs font-semibold text-slate-400">
                      {label}
                    </p>

                    <p className="mt-3 text-2xl font-bold">{value}</p>

                    <p className="mt-1 text-xs text-slate-400">{note}</p>
                  </div>
                ))}
              </section>

              {/* Lower grid */}
              <section className="mt-5 grid gap-5 xl:grid-cols-2">
                {/* Skill snapshot */}
                <div className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_45px_rgba(23,23,43,0.04)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        SKILL SNAPSHOT
                      </p>

                      <h2 className="mt-2 text-xl font-bold">
                        Your concept profile
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push("/progress")}
                      className="text-xs font-bold text-[#6C5CE7]"
                    >
                      Full analysis →
                    </button>
                  </div>

                  <div className="mt-6 space-y-5">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold">{skill.name}</p>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                              {skill.label}
                            </p>
                          </div>

                          <p className="text-xs font-bold text-slate-500">
                            {skill.score}%
                          </p>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#F0EEF5]">
                          <div
                            className="h-full rounded-full bg-[#6C5CE7]"
                            style={{ width: `${skill.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roadmap */}
                <div className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_45px_rgba(23,23,43,0.04)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        YOUR ROADMAP
                      </p>

                      <h2 className="mt-2 text-xl font-bold">
                        What&apos;s coming next
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push("/roadmap")}
                      className="text-xs font-bold text-[#6C5CE7]"
                    >
                      View all →
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {roadmap.map((item, index) => (
                      <div
                        key={item.name}
                        className={`flex items-center gap-4 rounded-2xl border p-4 ${
                          index === 0
                            ? "border-[#DCD8FF] bg-[#F8F7FF]"
                            : "border-slate-100 bg-[#FCFBFE]"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                            index === 0
                              ? "bg-[#6C5CE7] text-white"
                              : "bg-[#ECE9FF] text-[#6C5CE7]"
                          }`}
                        >
                          0{index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold">
                            {item.name}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            {item.status}
                          </p>
                        </div>

                        {index === 0 ? (
                          <span className="rounded-full bg-[#E4F7F5] px-3 py-1 text-[10px] font-bold text-[#317C77]">
                            {item.complete}%
                          </span>
                        ) : (
                          <span className="text-xs text-slate-300">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Recommendation */}
              <section className="mt-5 rounded-[26px] border border-[#DCD8FF] bg-white p-6 sm:p-7">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#8EDBD5]" />

                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        NEXT RECOMMENDED PRACTICE
                      </p>
                    </div>

                    <h2 className="mt-3 text-xl font-bold">
                      Practice array indexing before moving forward.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                      Your diagnostic suggests that a short targeted exercise
                      will strengthen the concept needed for Array Traversal.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/practice")}
                    className="rounded-xl bg-[#17172B] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                  >
                    Start Practice →
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
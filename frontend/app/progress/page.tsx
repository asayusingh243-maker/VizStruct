"use client";

import { useRouter } from "next/navigation";
import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

const mastery = [
  {
    concept: "Variables",
    score: 92,
    status: "Strong",
    detail: "Consistent understanding",
  },
  {
    concept: "Conditions",
    score: 84,
    status: "Strong",
    detail: "Good decision-making logic",
  },
  {
    concept: "Loops",
    score: 68,
    status: "Improving",
    detail: "Boundary handling needs attention",
  },
  {
    concept: "Arrays",
    score: 54,
    status: "Needs Practice",
    detail: "Current learning focus",
  },
];

const progressPoints = [
  { label: "Diagnostic", score: 54 },
  { label: "Week 1", score: 59 },
  { label: "Week 2", score: 66 },
  { label: "Current", score: 74 },
];

const behaviour = [
  { label: "Hints Used", value: "7", icon: "💡" },
  { label: "Visualizations Viewed", value: "12", icon: "▶" },
  { label: "Recovery Exercises", value: "4", icon: "↻" },
  { label: "Successful Retries", value: "3", icon: "✓" },
];

const misconceptions = [
  {
    name: "Loop Boundary / Off-by-One",
    detected: 3,
    recovered: 2,
    status: "Improving",
  },
  {
    name: "Array Index Confusion",
    detected: 2,
    recovered: 2,
    status: "Recovered",
  },
  {
    name: "Variable Update Order",
    detected: 1,
    recovered: 1,
    status: "Recovered",
  },
];

export default function ProgressPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <DashboardHeader />

          <div className="relative overflow-hidden">
            {/* BACKGROUND */}

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#ECE9FF] blur-[120px]" />
              <div className="absolute -left-28 top-[700px] h-80 w-80 rounded-full bg-[#E4F7F5] blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
              {/* HEADER */}

              <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
                    LEARNING ANALYTICS
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    Your progress is more than a score.
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    See how your concept mastery, mistakes, recovery
                    attempts and learning behaviour are changing your
                    personalized learning path.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/roadmap")}
                  className="rounded-xl bg-[#17172B] px-5 py-3 text-xs font-bold text-white"
                >
                  View Learning Roadmap →
                </button>
              </section>

              {/* TOP STATS */}

              <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  label="OVERALL MASTERY"
                  value="74%"
                  detail="+20% from diagnostic"
                  accent="violet"
                />

                <StatCard
                  label="PROBLEMS SOLVED"
                  value="12"
                  detail="3 successful retries"
                  accent="cyan"
                />

                <StatCard
                  label="CURRENT STREAK"
                  value="3 days"
                  detail="Keep your momentum"
                  accent="violet"
                />

                <StatCard
                  label="LEARNING TIME"
                  value="4.8h"
                  detail="This learning cycle"
                  accent="cyan"
                />
              </section>

              {/* MASTERY + CHART */}

              <section className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
                {/* CONCEPT MASTERY */}

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        CONCEPT MASTERY
                      </p>

                      <h2 className="mt-2 text-xl font-bold">
                        Skill snapshot
                      </h2>
                    </div>

                    <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-[9px] font-bold text-[#6C5CE7]">
                      Developing
                    </span>
                  </div>

                  <div className="mt-7 space-y-6">
                    {mastery.map((item) => (
                      <MasteryRow
                        key={item.concept}
                        {...item}
                      />
                    ))}
                  </div>
                </div>

                {/* LEARNING PROGRESS */}

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      LEARNING PROGRESS
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      Improvement over time
                    </h2>

                    <p className="mt-2 text-xs text-slate-400">
                      Illustrative frontend data until learner
                      history is connected.
                    </p>
                  </div>

                  <div className="mt-8">
                    <ProgressChart />
                  </div>

                  <div className="mt-6 rounded-[18px] border border-[#CFEDE9] bg-[#EAF9F7] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#317C77]">
                        ↗
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#317C77]">
                          Positive learning trend
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Your illustrative mastery score has moved
                          from 54% at diagnostic assessment to 74%
                          in the current learning cycle.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* MISTAKE INTELLIGENCE */}

              <section className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        MISTAKE INTELLIGENCE
                      </p>

                      <h2 className="mt-2 text-xl font-bold">
                        Patterns behind your errors
                      </h2>
                    </div>

                    <span className="w-fit rounded-full bg-[#FFF4E4] px-3 py-1.5 text-[9px] font-bold text-[#A56A22]">
                      1 Active Focus Area
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    {misconceptions.map((item, index) => (
                      <div
                        key={item.name}
                        className={`rounded-[20px] border p-5 ${
                          index === 0
                            ? "border-[#DCD8FF] bg-[#F8F7FF]"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-bold">
                                {item.name}
                              </p>

                              {index === 0 && (
                                <span className="rounded-full bg-[#ECE9FF] px-2.5 py-1 text-[8px] font-bold text-[#6C5CE7]">
                                  MOST FREQUENT
                                </span>
                              )}
                            </div>

                            <div className="mt-3 flex flex-wrap gap-4 text-[10px] text-slate-400">
                              <span>
                                Detected{" "}
                                <strong className="text-[#17172B]">
                                  {item.detected}×
                                </strong>
                              </span>

                              <span>
                                Recovered{" "}
                                <strong className="text-[#17172B]">
                                  {item.recovered}×
                                </strong>
                              </span>
                            </div>
                          </div>

                          <StatusBadge status={item.status} />
                        </div>

                        {index === 0 && (
                          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#E8E6F0]">
                            <div className="h-full w-[67%] rounded-full bg-[#6C5CE7]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ADAPTIVE INSIGHT */}

                <div className="relative overflow-hidden rounded-[28px] bg-[#17172B] p-6 text-white">
                  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#6C5CE7]/20 blur-[70px]" />

                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6C5CE7] text-lg">
                      ✦
                    </div>

                    <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8EDBD5]">
                      ADAPTIVE INSIGHT
                    </p>

                    <h2 className="mt-3 text-2xl font-bold leading-8">
                      Your next focus is becoming clearer.
                    </h2>

                    <p className="mt-4 text-xs leading-6 text-white/50">
                      Variables and conditions are currently your
                      strongest concepts. The recurring difficulty
                      appears when array traversal is combined with
                      loop boundaries.
                    </p>

                    <div className="mt-6 rounded-[20px] border border-white/10 bg-white/[0.05] p-5">
                      <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/30">
                        RECOMMENDED NEXT
                      </p>

                      <p className="mt-2 text-sm font-bold">
                        Array Traversal + Boundary Practice
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-[#6C5CE7]/20 px-3 py-1.5 text-[9px] font-bold text-[#CFC9FF]">
                          Arrays
                        </span>

                        <span className="rounded-lg bg-[#8EDBD5]/10 px-3 py-1.5 text-[9px] font-bold text-[#8EDBD5]">
                          Loop Boundaries
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push("/practice")}
                      className="mt-5 w-full rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#17172B]"
                    >
                      Start Recommended Practice →
                    </button>
                  </div>
                </div>
              </section>

              {/* LEARNING BEHAVIOUR */}

              <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      LEARNING BEHAVIOUR
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      How you&apos;re learning
                    </h2>
                  </div>

                  <p className="max-w-md text-xs leading-5 text-slate-400">
                    These interactions can later become learner-model
                    features for adaptive recommendations.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {behaviour.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[20px] bg-[#F8F7FC] p-5"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm">
                        {item.icon}
                      </div>

                      <p className="mt-5 text-2xl font-bold">
                        {item.value}
                      </p>

                      <p className="mt-1 text-[10px] font-semibold text-slate-400">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* PERSONALIZED PERFORMANCE */}

              <section className="mt-5 grid gap-5 lg:grid-cols-3">
                <PerformanceCard
                  number="01"
                  title="Strong Foundations"
                  description="Variables and conditions are consistently performing above the current learner average."
                  tag="Maintain"
                />

                <PerformanceCard
                  number="02"
                  title="Active Improvement"
                  description="Loop understanding is improving, but boundary mistakes still appear during array traversal."
                  tag="Practice"
                  active
                />

                <PerformanceCard
                  number="03"
                  title="Current Focus"
                  description="Arrays remain the lowest mastery area and should receive more targeted practice."
                  tag="Priority"
                />
              </section>

              {/* ADAPTIVE CYCLE */}

              <section className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-white">
                <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                  <div className="bg-[#ECE9FF] p-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#6C5CE7]">
                      PERSONALIZATION LOOP
                    </p>

                    <h2 className="mt-3 text-xl font-bold">
                      Progress changes what comes next.
                    </h2>

                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      VizStruct is designed so that diagnostic
                      performance, coding attempts, mistakes,
                      recovery and later assessments continuously
                      update the learner&apos;s path.
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <CycleStep
                        number="01"
                        text="Diagnostic"
                      />

                      <CycleArrow />

                      <CycleStep
                        number="02"
                        text="Practice"
                      />

                      <CycleArrow />

                      <CycleStep
                        number="03"
                        text="Detect"
                      />

                      <CycleArrow />

                      <CycleStep
                        number="04"
                        text="Recover"
                        active
                      />

                      <CycleArrow />

                      <CycleStep
                        number="05"
                        text="Update"
                      />

                      <CycleArrow />

                      <CycleStep
                        number="06"
                        text="Recommend"
                        active
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* DATA NOTE */}

              <section className="mt-5 rounded-[20px] border border-dashed border-slate-300 px-5 py-4">
                <p className="text-center text-[10px] leading-5 text-slate-400">
                  Current analytics are illustrative frontend data.
                  After backend integration, these values will be
                  calculated from diagnostic results, coding attempts,
                  execution traces, hint usage, recovery exercises and
                  learner performance.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  accent: "violet" | "cyan";
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5">
      <div
        className={`mb-5 h-1 w-10 rounded-full ${
          accent === "violet"
            ? "bg-[#6C5CE7]"
            : "bg-[#8EDBD5]"
        }`}
      />

      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold tracking-[-0.04em]">
        {value}
      </p>

      <p className="mt-2 text-[10px] text-slate-400">
        {detail}
      </p>
    </div>
  );
}

function MasteryRow({
  concept,
  score,
  status,
  detail,
}: {
  concept: string;
  score: number;
  status: string;
  detail: string;
}) {
  const strong = score >= 80;
  const improving = score >= 60 && score < 80;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold">
            {concept}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            {detail}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-bold">
            {score}%
          </p>

          <p
            className={`mt-1 text-[9px] font-bold ${
              strong
                ? "text-[#317C77]"
                : improving
                ? "text-[#6C5CE7]"
                : "text-[#A56429]"
            }`}
          >
            {status}
          </p>
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#ECEAF1]">
        <div
          className={`h-full rounded-full ${
            strong
              ? "bg-[#8EDBD5]"
              : improving
              ? "bg-[#6C5CE7]"
              : "bg-[#D9A16D]"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function ProgressChart() {
  const width = 620;
  const height = 220;

  const points = progressPoints.map((point, index) => {
    const x =
      45 +
      index *
        ((width - 90) /
          (progressPoints.length - 1));

    const y =
      height -
      35 -
      ((point.score - 40) / 50) *
        (height - 70);

    return {
      ...point,
      x,
      y,
    };
  });

  const path = points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[520px] w-full"
      >
        {[50, 60, 70, 80, 90].map((score) => {
          const y =
            height -
            35 -
            ((score - 40) / 50) *
              (height - 70);

          return (
            <g key={score}>
              <line
                x1="45"
                x2={width - 30}
                y1={y}
                y2={y}
                stroke="#EAE8F0"
                strokeWidth="1"
              />

              <text
                x="8"
                y={y + 4}
                fontSize="10"
                fill="#A4A0AE"
              >
                {score}%
              </text>
            </g>
          );
        })}

        <path
          d={path}
          fill="none"
          stroke="#6C5CE7"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="7"
              fill="#FFFFFF"
              stroke="#6C5CE7"
              strokeWidth="4"
            />

            <text
              x={point.x}
              y={height - 8}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#8A8695"
            >
              {point.label}
            </text>

            <text
              x={point.x}
              y={point.y - 15}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#17172B"
            >
              {point.score}%
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const recovered = status === "Recovered";

  return (
    <span
      className={`w-fit rounded-full px-3 py-1.5 text-[9px] font-bold ${
        recovered
          ? "bg-[#EAF9F7] text-[#317C77]"
          : "bg-[#ECE9FF] text-[#6C5CE7]"
      }`}
    >
      {status}
    </span>
  );
}

function PerformanceCard({
  number,
  title,
  description,
  tag,
  active = false,
}: {
  number: string;
  title: string;
  description: string;
  tag: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-[24px] border p-5 ${
        active
          ? "border-[#DCD8FF] bg-[#F5F3FF]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-300">
          {number}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-[8px] font-bold ${
            active
              ? "bg-[#6C5CE7] text-white"
              : "bg-[#F1EFF5] text-slate-500"
          }`}
        >
          {tag}
        </span>
      </div>

      <h3 className="mt-5 text-base font-bold">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function CycleStep({
  number,
  text,
  active = false,
}: {
  number: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-[16px] border px-4 py-3 text-center ${
        active
          ? "border-[#6C5CE7] bg-[#ECE9FF]"
          : "border-slate-200 bg-[#F8F7FC]"
      }`}
    >
      <p
        className={`text-[8px] font-bold ${
          active
            ? "text-[#6C5CE7]"
            : "text-slate-300"
        }`}
      >
        {number}
      </p>

      <p
        className={`mt-1 text-[9px] font-bold ${
          active
            ? "text-[#6C5CE7]"
            : "text-slate-500"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function CycleArrow() {
  return (
    <span className="text-xs text-slate-300">
      →
    </span>
  );
}
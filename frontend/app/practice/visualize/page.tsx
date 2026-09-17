"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "../../../components/dashboard/AppSidebar";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";

type VisualStyle = "classic" | "cat" | "dog" | "objects" | "surprise";

type Phase =
  | "start"
  | "initialize"
  | "read"
  | "compare"
  | "update"
  | "return";

type ExecutionStep = {
  line: number;
  phase: Phase;
  index: number | null;
  value: number | null;
  largest: number | null;
  oldLargest?: number | null;
  comparison?: string;
  comparisonResult?: boolean;
  title: string;
  explanation: string;
};

const numbers = [4, 7, 2, 9, 5];

const codeLines = [
  "def find_largest(arr):",
  "    largest = arr[0]",
  "",
  "    for value in arr:",
  "        if value > largest:",
  "            largest = value",
  "",
  "    return largest",
];

const steps: ExecutionStep[] = [
  {
    line: 1,
    phase: "start",
    index: null,
    value: null,
    largest: null,
    title: "Function called",
    explanation: "The array enters the find_largest function.",
  },
  {
    line: 2,
    phase: "initialize",
    index: 0,
    value: null,
    largest: 4,
    title: "Initialize largest",
    explanation: "The first element becomes the current largest value.",
  },

  {
    line: 4,
    phase: "read",
    index: 0,
    value: 4,
    largest: 4,
    title: "Read arr[0]",
    explanation: "The loop reads 4 and stores it in value.",
  },
  {
    line: 5,
    phase: "compare",
    index: 0,
    value: 4,
    largest: 4,
    comparison: "4 > 4",
    comparisonResult: false,
    title: "Evaluate condition",
    explanation: "4 is not greater than 4, so largest remains unchanged.",
  },

  {
    line: 4,
    phase: "read",
    index: 1,
    value: 7,
    largest: 4,
    title: "Read arr[1]",
    explanation: "The pointer advances and the loop reads 7.",
  },
  {
    line: 5,
    phase: "compare",
    index: 1,
    value: 7,
    largest: 4,
    comparison: "7 > 4",
    comparisonResult: true,
    title: "Evaluate condition",
    explanation: "7 is greater than 4, so line 6 will execute.",
  },
  {
    line: 6,
    phase: "update",
    index: 1,
    value: 7,
    largest: 7,
    oldLargest: 4,
    comparison: "7 > 4",
    comparisonResult: true,
    title: "Update largest",
    explanation: "The value 7 replaces 4 as the current largest.",
  },

  {
    line: 4,
    phase: "read",
    index: 2,
    value: 2,
    largest: 7,
    title: "Read arr[2]",
    explanation: "The pointer advances to index 2 and reads 2.",
  },
  {
    line: 5,
    phase: "compare",
    index: 2,
    value: 2,
    largest: 7,
    comparison: "2 > 7",
    comparisonResult: false,
    title: "Evaluate condition",
    explanation: "2 is smaller than 7. No update is needed.",
  },

  {
    line: 4,
    phase: "read",
    index: 3,
    value: 9,
    largest: 7,
    title: "Read arr[3]",
    explanation: "The pointer advances to index 3 and reads 9.",
  },
  {
    line: 5,
    phase: "compare",
    index: 3,
    value: 9,
    largest: 7,
    comparison: "9 > 7",
    comparisonResult: true,
    title: "Evaluate condition",
    explanation: "9 is greater than 7, so largest needs to change.",
  },
  {
    line: 6,
    phase: "update",
    index: 3,
    value: 9,
    largest: 9,
    oldLargest: 7,
    comparison: "9 > 7",
    comparisonResult: true,
    title: "Update largest",
    explanation: "The old largest value 7 is replaced by 9.",
  },

  {
    line: 4,
    phase: "read",
    index: 4,
    value: 5,
    largest: 9,
    title: "Read arr[4]",
    explanation: "The pointer reaches the final element and reads 5.",
  },
  {
    line: 5,
    phase: "compare",
    index: 4,
    value: 5,
    largest: 9,
    comparison: "5 > 9",
    comparisonResult: false,
    title: "Evaluate condition",
    explanation: "5 is not greater than 9. largest stays 9.",
  },

  {
    line: 8,
    phase: "return",
    index: null,
    value: null,
    largest: 9,
    title: "Return result",
    explanation: "Every element has been checked. The function returns 9.",
  },
];

const speedOptions = [
  { label: "0.5×", delay: 2600 },
  { label: "1×", delay: 1800 },
  { label: "1.5×", delay: 1200 },
  { label: "2×", delay: 850 },
];

const visualStyles: {
  id: VisualStyle;
  label: string;
  preview: string;
}[] = [
  { id: "classic", label: "Classic", preview: "123" },
  { id: "cat", label: "Cat", preview: "🐱" },
  { id: "dog", label: "Dog", preview: "🐶" },
  { id: "objects", label: "Objects", preview: "🍎" },
  { id: "surprise", label: "Surprise", preview: "✨" },
];

const objectTokens = ["🍎", "🍊", "🍋", "🥝", "🍇"];
const surpriseTokens = ["🚀", "⭐", "💎", "🌙", "⚡"];

export default function VisualizePage() {
  const router = useRouter();

  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [visualStyle, setVisualStyle] =
    useState<VisualStyle>("classic");

  const [evaluationVisible, setEvaluationVisible] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  const step = steps[stepIndex];

  const first = stepIndex === 0;
  const last = stepIndex === steps.length - 1;

  const progress =
    steps.length <= 1
      ? 100
      : (stepIndex / (steps.length - 1)) * 100;

  const tokenForIndex = useMemo(() => {
    return (index: number) => {
      switch (visualStyle) {
        case "cat":
          return "🐱";

        case "dog":
          return "🐶";

        case "objects":
          return objectTokens[index % objectTokens.length];

        case "surprise":
          return surpriseTokens[index % surpriseTokens.length];

        default:
          return "";
      }
    };
  }, [visualStyle]);

  useEffect(() => {
    const resetTimer = window.setTimeout(() => {
      setEvaluationVisible(false);
    }, 0);

    if (step.phase !== "compare") {
      return () => window.clearTimeout(resetTimer);
    }

    const evaluationTimer = window.setTimeout(() => {
      setEvaluationVisible(true);
    }, Math.min(700, speedOptions[speedIndex].delay * 0.45));

    return () => {
      window.clearTimeout(resetTimer);
      window.clearTimeout(evaluationTimer);
    };
  }, [stepIndex, speedIndex, step.phase]);

  useEffect(() => {
    if (!playing || last) return;

    const timer = window.setTimeout(() => {
      const nextStepIndex = Math.min(
        stepIndex + 1,
        steps.length - 1
      );

      setStepIndex(nextStepIndex);

      setTransitionKey((current) => current + 1);

      if (nextStepIndex === steps.length - 1) {
        setPlaying(false);
      }
    }, speedOptions[speedIndex].delay);

    return () => window.clearTimeout(timer);
  }, [playing, stepIndex, speedIndex, last]);

  function runVisualization() {
    if (last) {
      setStepIndex(0);
      setTransitionKey((current) => current + 1);
      setPlaying(true);
      return;
    }

    setPlaying((current) => !current);
  }

  function restartExecution() {
    setPlaying(false);
    setStepIndex(0);
    setTransitionKey((current) => current + 1);

    window.setTimeout(() => {
      setPlaying(true);
    }, 250);
  }

  function previousStep() {
    setPlaying(false);

    setStepIndex((current) => Math.max(current - 1, 0));
    setTransitionKey((current) => current + 1);
  }

  function nextStep() {
    setPlaying(false);

    setStepIndex((current) =>
      Math.min(current + 1, steps.length - 1)
    );

    setTransitionKey((current) => current + 1);
  }

  function selectStyle(style: VisualStyle) {
    setVisualStyle(style);
    setTransitionKey((current) => current + 1);
  }

  function renderToken(
    value: number,
    index: number,
    large = false
  ) {
    const emoji = tokenForIndex(index);

    if (visualStyle === "classic") {
      return (
        <span
          className={
            large
              ? "text-3xl font-bold"
              : "text-xl font-bold"
          }
        >
          {value}
        </span>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center leading-none">
        <span className={large ? "text-3xl" : "text-2xl"}>
          {emoji}
        </span>

        <span
          className={`mt-1 font-bold ${
            large ? "text-sm" : "text-xs"
          }`}
        >
          {value}
        </span>
      </div>
    );
  }

  function getValueIndex(value: number | null) {
    if (value === null) return 0;

    const index = numbers.indexOf(value);

    return index >= 0 ? index : 0;
  }

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <style jsx global>{`
        @keyframes vizEnter {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tokenLift {
          0% {
            opacity: 0;
            transform: translateY(-34px) scale(0.7);
          }

          45% {
            opacity: 1;
            transform: translateY(5px) scale(1.1);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes tokenTravel {
          0% {
            opacity: 0;
            transform: translateY(-24px) scale(0.7);
          }

          50% {
            opacity: 1;
            transform: translateY(5px) scale(1.12);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes comparePop {
          0% {
            opacity: 0;
            transform: scale(0.75);
          }

          65% {
            opacity: 1;
            transform: scale(1.07);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes resultReveal {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes largestChange {
          0% {
            opacity: 0;
            transform: translateX(-18px) scale(0.7);
          }

          60% {
            opacity: 1;
            transform: translateX(4px) scale(1.15);
          }

          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes pointerBounce {
          0% {
            opacity: 0;
            transform: translate(-50%, -16px);
          }

          60% {
            opacity: 1;
            transform: translate(-50%, 4px);
          }

          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes activeCell {
          0% {
            transform: translateY(0) scale(1);
          }

          55% {
            transform: translateY(-7px) scale(1.1);
          }

          100% {
            transform: translateY(-5px) scale(1.06);
          }
        }

        @keyframes codeLine {
          0% {
            background-color: rgba(108, 92, 231, 0.05);
          }

          50% {
            background-color: rgba(108, 92, 231, 0.32);
          }

          100% {
            background-color: rgba(108, 92, 231, 0.2);
          }
        }

        @keyframes flowGrow {
          from {
            transform: scaleY(0);
            opacity: 0;
          }

          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes returnPop {
          0% {
            opacity: 0;
            transform: translateY(25px) scale(0.7);
          }

          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.12);
          }

          100% {
            transform: translateY(0) scale(1);
          }
        }

        .viz-enter {
          animation: vizEnter 0.45s ease both;
        }

        .token-lift {
          animation: tokenLift 0.65s ease both;
        }

        .token-travel {
          animation: tokenTravel 0.7s ease both;
        }

        .compare-pop {
          animation: comparePop 0.55s ease both;
        }

        .result-reveal {
          animation: resultReveal 0.45s ease both;
        }

        .largest-change {
          animation: largestChange 0.7s ease both;
        }

        .pointer-bounce {
          animation: pointerBounce 0.5s ease both;
        }

        .active-cell {
          animation: activeCell 0.6s ease both;
        }

        .code-line-active {
          animation: codeLine 0.65s ease both;
        }

        .flow-grow {
          transform-origin: top;
          animation: flowGrow 0.45s ease both;
        }

        .return-pop {
          animation: returnPop 0.8s ease both;
        }

        @media (prefers-reduced-motion: reduce) {
          .viz-enter,
          .token-lift,
          .token-travel,
          .compare-pop,
          .result-reveal,
          .largest-change,
          .pointer-bounce,
          .active-cell,
          .code-line-active,
          .flow-grow,
          .return-pop {
            animation: none !important;
          }
        }
      `}</style>

      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <DashboardHeader />

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-28 top-0 h-96 w-96 rounded-full bg-[#ECE9FF] blur-[120px]" />
              <div className="absolute -left-28 top-[700px] h-80 w-80 rounded-full bg-[#E4F7F5] blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-[1550px] px-5 py-7 lg:px-8">
              {/* HEADER */}

              <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                <div>
                  <button
                    type="button"
                    onClick={() => router.push("/practice")}
                    className="mb-4 text-xs font-bold text-[#6C5CE7]"
                  >
                    ← Back to Problem
                  </button>

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
                    INTERACTIVE CODE EXECUTION
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    Watch your code execute, step by step.
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    Follow values as they travel through memory,
                    comparisons and variable updates.
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 ${
                    playing
                      ? "border-[#BFE9E4] bg-[#EAF9F7]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      playing
                        ? "animate-pulse bg-[#56BDB4]"
                        : "bg-slate-300"
                    }`}
                  />

                  <span
                    className={`text-xs font-bold ${
                      playing
                        ? "text-[#317C77]"
                        : "text-slate-500"
                    }`}
                  >
                    {playing
                      ? "Execution Running"
                      : "Execution Paused"}
                  </span>
                </div>
              </section>

              {/* VISUAL STYLE */}

              <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      VISUALIZATION STYLE
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Choose how values appear during execution.
                      Their real numeric values always remain visible.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {visualStyles.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => selectStyle(style.id)}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                          visualStyle === style.id
                            ? "border-[#6C5CE7] bg-[#ECE9FF] text-[#6C5CE7]"
                            : "border-slate-200 bg-white text-slate-500 hover:border-[#CFC9FF]"
                        }`}
                      >
                        <span>{style.preview}</span>
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* CONTROLS */}

              <section className="mt-4 rounded-[24px] border border-slate-200 bg-white p-4">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={runVisualization}
                      className="min-w-[165px] rounded-xl bg-[#6C5CE7] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#5B4BCF]"
                    >
                      {playing
                        ? "⏸ Pause Execution"
                        : last
                        ? "▶ Run Again"
                        : "▶ Run Visualization"}
                    </button>

                    <button
                      type="button"
                      onClick={restartExecution}
                      className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600 transition hover:border-[#CFC9FF]"
                    >
                      ↻ Restart Execution
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Execution Speed
                    </span>

                    {speedOptions.map((speed, index) => (
                      <button
                        key={speed.label}
                        type="button"
                        onClick={() => setSpeedIndex(index)}
                        className={`rounded-lg px-3 py-2 text-[10px] font-bold ${
                          speedIndex === index
                            ? "bg-[#17172B] text-white"
                            : "bg-[#F3F1F8] text-slate-500"
                        }`}
                      >
                        {speed.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#ECEAF1]">
                    <div
                      className="h-full rounded-full bg-[#6C5CE7] transition-[width] duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-bold text-slate-400">
                    {stepIndex + 1}/{steps.length}
                  </span>
                </div>
              </section>

              {/* MAIN EXECUTION STAGE */}

              <section className="mt-5 overflow-hidden rounded-[32px] border border-[#34336D] bg-[#17172B] shadow-[0_24px_70px_rgba(23,23,43,0.18)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8EDBD5]">
                      EXECUTION STAGE
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      Find Largest Element
                    </p>
                  </div>

                  <span className="rounded-lg bg-white/[0.06] px-3 py-2 font-mono text-[10px] text-white/50">
                    arr = [4, 7, 2, 9, 5]
                  </span>
                </div>

                <div
                  key={`stage-${transitionKey}`}
                  className="viz-enter relative min-h-[610px] overflow-hidden px-5 py-8"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  <div className="relative mx-auto flex max-w-5xl flex-col items-center">
                    {/* NARRATION */}

                    <div className="min-h-[78px] text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8EDBD5]">
                        {step.title}
                      </p>

                      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/55">
                        {step.explanation}
                      </p>
                    </div>

                    {/* ARRAY */}

                    <div className="mt-8">
                      <p className="mb-10 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                        ARRAY MEMORY
                      </p>

                      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        {numbers.map((number, index) => {
                          const active = step.index === index;

                          return (
                            <div
                              key={index}
                              className="relative pb-4"
                            >
                              {active && (
                                <div className="pointer-bounce absolute -top-10 left-1/2 z-10">
                                  <p className="whitespace-nowrap text-[8px] font-bold uppercase tracking-wider text-[#8EDBD5]">
                                    current
                                  </p>

                                  <div className="mx-auto mt-1 h-4 w-px bg-[#8EDBD5]" />

                                  <div className="mx-auto h-0 w-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#8EDBD5]" />
                                </div>
                              )}

                              <div
                                className={`flex h-[78px] w-[78px] items-center justify-center rounded-[22px] border-2 transition-all duration-500 ${
                                  active
                                    ? "active-cell border-[#8EDBD5] bg-[#8EDBD5]/15 text-white"
                                    : "border-white/10 bg-white/[0.04] text-white/60"
                                }`}
                              >
                                {renderToken(
                                  number,
                                  index,
                                  false
                                )}
                              </div>

                              <p
                                className={`mt-2 text-center text-[9px] font-semibold ${
                                  active
                                    ? "text-[#8EDBD5]"
                                    : "text-white/20"
                                }`}
                              >
                                [{index}]
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* PIPELINE */}

                    <div className="mt-3 flex min-h-[275px] w-full max-w-4xl flex-col items-center">
                      {step.value !== null && (
                        <>
                          <div className="flow-grow h-8 w-px bg-gradient-to-b from-[#8EDBD5] to-[#6C5CE7]" />

                          <div className="token-lift rounded-[20px] border border-[#6C5CE7]/60 bg-[#292865] px-7 py-3 text-center">
                            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/30">
                              VALUE
                            </p>

                            <div className="mt-2 text-white">
                              {renderToken(
                                step.value,
                                getValueIndex(step.value),
                                true
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {step.comparison && (
                        <>
                          <div className="flow-grow h-8 w-px bg-gradient-to-b from-[#6C5CE7] to-[#8EDBD5]" />

                          <div className="token-travel rounded-[20px] border border-white/10 bg-white/[0.05] px-8 py-4 text-center">
                            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/30">
                              CONDITION
                            </p>

                            <p className="compare-pop mt-2 font-mono text-2xl font-bold text-white">
                              {step.comparison}
                            </p>

                            {step.phase === "compare" && (
                              <div className="mt-3">
                                {!evaluationVisible ? (
                                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-white/35">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8EDBD5]" />
                                    Evaluating...
                                  </div>
                                ) : (
                                  <div
                                    className={`result-reveal mx-auto inline-flex rounded-xl px-4 py-2 text-xs font-bold ${
                                      step.comparisonResult
                                        ? "bg-[#8EDBD5]/15 text-[#8EDBD5]"
                                        : "bg-white/10 text-white/55"
                                    }`}
                                  >
                                    {step.comparisonResult
                                      ? "TRUE ✓"
                                      : "FALSE ✕"}
                                  </div>
                                )}
                              </div>
                            )}

                            {step.phase === "update" && (
                              <div className="result-reveal mt-3 inline-flex rounded-xl bg-[#8EDBD5]/15 px-4 py-2 text-xs font-bold text-[#8EDBD5]">
                                TRUE ✓
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      {/* UPDATE */}

                      {step.phase === "update" && (
                        <>
                          <div className="flow-grow h-8 w-px bg-[#8EDBD5]" />

                          <div className="largest-change rounded-[20px] border border-[#8EDBD5]/50 bg-[#8EDBD5]/10 px-7 py-3 text-center">
                            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#8EDBD5]/60">
                              UPDATE LARGEST
                            </p>

                            <div className="mt-2 flex items-center justify-center gap-4">
                              <span className="text-xl font-bold text-white/25 line-through">
                                {step.oldLargest}
                              </span>

                              <span className="text-[#8EDBD5]">
                                →
                              </span>

                              <div className="text-white">
                                {renderToken(
                                  step.largest ?? 0,
                                  getValueIndex(
                                    step.largest
                                  ),
                                  true
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* RETURN */}

                      {step.phase === "return" && (
                        <div className="return-pop mt-12 text-center">
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8EDBD5]">
                            RETURN VALUE
                          </p>

                          <div className="mx-auto mt-4 flex h-28 w-28 items-center justify-center rounded-[30px] border-2 border-[#8EDBD5] bg-[#8EDBD5]/10 text-white shadow-[0_0_50px_rgba(142,219,213,0.15)]">
                            {renderToken(
                              9,
                              3,
                              true
                            )}
                          </div>

                          <p className="mt-3 font-mono text-sm font-bold text-[#8EDBD5]">
                            return 9
                          </p>
                        </div>
                      )}
                    </div>

                    {/* MEMORY */}

                    {step.phase !== "return" && (
                      <div className="grid w-full max-w-xl grid-cols-2 gap-4">
                        <div className="rounded-[20px] border border-[#6C5CE7]/30 bg-[#6C5CE7]/10 p-4 text-center">
                          <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/30">
                            value
                          </p>

                          <div
                            key={`memory-value-${transitionKey}`}
                            className="token-travel mt-2 min-h-[42px] text-white"
                          >
                            {step.value !== null
                              ? renderToken(
                                  step.value,
                                  getValueIndex(
                                    step.value
                                  )
                                )
                              : "—"}
                          </div>
                        </div>

                        <div
                          className={`rounded-[20px] border p-4 text-center transition-all duration-500 ${
                            step.phase === "update"
                              ? "border-[#8EDBD5] bg-[#8EDBD5]/15"
                              : "border-[#8EDBD5]/25 bg-[#8EDBD5]/[0.05]"
                          }`}
                        >
                          <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#8EDBD5]/60">
                            largest
                          </p>

                          <div
                            key={`memory-largest-${transitionKey}`}
                            className={`mt-2 min-h-[42px] text-white ${
                              step.phase === "update"
                                ? "largest-change"
                                : ""
                            }`}
                          >
                            {step.largest !== null
                              ? renderToken(
                                  step.largest,
                                  getValueIndex(
                                    step.largest
                                  )
                                )
                              : "—"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* CODE + EXPLANATION */}

              <section className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        SOURCE CODE
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Synchronized with execution
                      </p>
                    </div>

                    <span className="rounded-lg bg-[#ECE9FF] px-3 py-1.5 text-[10px] font-bold text-[#6C5CE7]">
                      Line {step.line}
                    </span>
                  </div>

                  <div className="bg-[#1E1E46] p-4 font-mono text-xs leading-7">
                    {codeLines.map((line, index) => {
                      const number = index + 1;
                      const active = number === step.line;

                      return (
                        <div
                          key={`${number}-${active ? transitionKey : ""}`}
                          className={`flex rounded-lg px-3 ${
                            active
                              ? "code-line-active bg-[#6C5CE7]/20"
                              : ""
                          }`}
                        >
                          <span
                            className={`w-6 shrink-0 ${
                              active
                                ? "font-bold text-[#8EDBD5]"
                                : "text-white/20"
                            }`}
                          >
                            {number}
                          </span>

                          <span
                            className={`ml-4 whitespace-pre ${
                              active
                                ? "font-semibold text-white"
                                : "text-white/55"
                            }`}
                          >
                            {line || " "}
                          </span>

                          {active && (
                            <span className="ml-auto text-[8px] font-bold uppercase tracking-wider text-[#8EDBD5]">
                              executing
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  key={`explanation-${transitionKey}`}
                  className="viz-enter rounded-[26px] border border-[#DCD8FF] bg-white p-6"
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                    EXECUTION EXPLAINED
                  </p>

                  <h3 className="mt-3 text-lg font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {step.explanation}
                  </p>

                  <div className="mt-5 rounded-2xl bg-[#F8F7FC] p-4">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      CURRENT STATE
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-white px-3 py-2 font-mono text-[10px] text-slate-500">
                        index = {step.index ?? "—"}
                      </span>

                      <span className="rounded-lg bg-white px-3 py-2 font-mono text-[10px] text-[#6C5CE7]">
                        value = {step.value ?? "—"}
                      </span>

                      <span className="rounded-lg bg-white px-3 py-2 font-mono text-[10px] text-[#317C77]">
                        largest = {step.largest ?? "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* MANUAL NAVIGATION */}

              <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <button
                    type="button"
                    disabled={first}
                    onClick={previousStep}
                    className={`rounded-xl border px-5 py-3 text-xs font-bold ${
                      first
                        ? "cursor-not-allowed border-slate-100 text-slate-300"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    ← Previous Step
                  </button>

                  <div className="text-center">
                    <p className="text-xs font-bold">
                      {step.title}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {playing
                        ? "Visualization is advancing automatically."
                        : "Pause and inspect the current program state."}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={last}
                    onClick={nextStep}
                    className={`rounded-xl px-5 py-3 text-xs font-bold ${
                      last
                        ? "cursor-not-allowed bg-slate-100 text-slate-300"
                        : "bg-[#17172B] text-white"
                    }`}
                  >
                    Next Step →
                  </button>
                </div>
              </section>

              {/* COMPLETE */}

              {last && (
                <section className="viz-enter mt-5 rounded-[28px] border border-[#CFEDE9] bg-[#EAF9F7] p-6">
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#317C77]">
                        EXECUTION COMPLETE
                      </p>

                      <h2 className="mt-2 text-xl font-bold">
                        Result: 9
                      </h2>

                      <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500">
                        Every element was visited and compared with
                        the current largest value. The final value of
                        largest is 9.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={restartExecution}
                        className="rounded-xl border border-[#BDE4DF] bg-white px-5 py-3 text-xs font-bold text-[#317C77]"
                      >
                        ↻ Run Again
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          router.push("/practice")
                        }
                        className="rounded-xl bg-[#17172B] px-5 py-3 text-xs font-bold text-white"
                      >
                        Back to Practice →
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "../../../components/dashboard/AppSidebar";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";

type RecoveryOption = {
  id: string;
  text: string;
};

const array = [4, 7, 2, 9, 12];

const visitedIndexes = [0, 1, 2, 3];

const options: RecoveryOption[] = [
  {
    id: "a",
    text: "Index 0",
  },
  {
    id: "b",
    text: "Index 3",
  },
  {
    id: "c",
    text: "Index 4",
  },
  {
    id: "d",
    text: "No index was skipped",
  },
];

const submittedCode = `def find_largest(arr):
    largest = arr[0]

    for i in range(len(arr) - 1):
        if arr[i] > largest:
            largest = arr[i]

    return largest`;

export default function DiagnosisPage() {
  const router = useRouter();

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [recoveryComplete, setRecoveryComplete] =
    useState(false);

  const correctAnswer = selectedAnswer === "c";

  function checkAnswer() {
    if (!selectedAnswer) return;

    setChecked(true);

    if (selectedAnswer === "c") {
      setRecoveryComplete(true);
    }
  }

  function showHint() {
    setChecked(false);

    setHintLevel((current) => Math.min(current + 1, 3));
  }

  function resetExercise() {
    setSelectedAnswer("");
    setChecked(false);
    setHintLevel(0);
    setRecoveryComplete(false);
  }

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

              <div className="absolute -left-24 top-[700px] h-80 w-80 rounded-full bg-[#E4F7F5] blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
              {/* HEADER */}

              <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                <div>
                  <button
                    type="button"
                    onClick={() => router.push("/practice")}
                    className="mb-4 text-xs font-bold text-[#6C5CE7]"
                  >
                    ← Back to Practice
                  </button>

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
                    EXECUTION DIAGNOSIS
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    Let&apos;s understand what went wrong.
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    VizStruct examines the execution behaviour
                    behind the incorrect result and turns the
                    mistake into a focused learning exercise.
                  </p>
                </div>

                <div className="rounded-full border border-[#F1D8A9] bg-[#FFF8EA] px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#E5A63B]" />

                    <span className="text-xs font-bold text-[#9B6A19]">
                      Learning Opportunity Detected
                    </span>
                  </div>
                </div>
              </section>

              {/* TOP SUMMARY */}

              <section className="mt-7 grid gap-4 md:grid-cols-3">
                <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    EXPECTED OUTPUT
                  </p>

                  <p className="mt-3 text-3xl font-bold text-[#317C77]">
                    12
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Largest value in the array
                  </p>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    YOUR OUTPUT
                  </p>

                  <p className="mt-3 text-3xl font-bold text-[#B16A35]">
                    9
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Final element was not considered
                  </p>
                </div>

                <div className="rounded-[24px] border border-[#DCD8FF] bg-[#F1EFFF] p-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                    CONCEPT TO REVIEW
                  </p>

                  <p className="mt-3 text-lg font-bold">
                    Loop Boundaries
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Understanding which indexes a loop actually
                    visits.
                  </p>
                </div>
              </section>

              {/* MAIN ANALYSIS */}

              <section className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                {/* CODE */}

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        YOUR SUBMISSION
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Execution evidence from the submitted
                        solution
                      </p>
                    </div>

                    <span className="rounded-lg bg-[#FFF4E4] px-3 py-2 text-[10px] font-bold text-[#A56A22]">
                      Incorrect Result
                    </span>
                  </div>

                  <div className="bg-[#1E1E46] p-5">
                    <pre className="overflow-x-auto font-mono text-xs leading-7 text-white/70">
                      <code>{submittedCode}</code>
                    </pre>
                  </div>

                  <div className="p-6">
                    <div className="rounded-[20px] border border-[#F0D9B4] bg-[#FFF9EF] p-5">
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFEBC8] text-sm">
                          ⚠
                        </div>

                        <div>
                          <p className="text-sm font-bold">
                            Execution stopped before the final
                            index.
                          </p>

                          <p className="mt-2 text-xs leading-6 text-slate-500">
                            The loop processed indexes 0 through 3,
                            but this array also contains index 4.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DIAGNOSIS */}

                <div className="rounded-[28px] border border-[#DCD8FF] bg-white p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        MISCONCEPTION DETECTED
                      </p>

                      <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em]">
                        Off-by-One Error
                      </h2>
                    </div>

                    <div className="rounded-xl bg-[#ECE9FF] px-3 py-2 text-[10px] font-bold text-[#6C5CE7]">
                      Loop Boundary
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    Your loop boundary excludes one valid array
                    position. This means the algorithm finishes
                    before checking every element.
                  </p>

                  <div className="mt-6 rounded-[20px] bg-[#F8F7FC] p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      EXECUTION EVIDENCE
                    </p>

                    <div className="mt-4 space-y-3">
                      <EvidenceRow
                        label="Array length"
                        value="5"
                      />

                      <EvidenceRow
                        label="Valid indexes"
                        value="0 → 1 → 2 → 3 → 4"
                      />

                      <EvidenceRow
                        label="Indexes visited"
                        value="0 → 1 → 2 → 3"
                      />

                      <EvidenceRow
                        label="Skipped"
                        value="Index 4"
                        highlight
                      />
                    </div>
                  </div>

                  <div className="mt-5 rounded-[20px] border border-[#CFEDE9] bg-[#EAF9F7] p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#317C77]">
                      WHY THIS MATTERS
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      The skipped value is{" "}
                      <strong className="text-[#17172B]">
                        12
                      </strong>
                      , which is actually the largest value in the
                      array. Because it was never visited, your
                      program returned 9.
                    </p>
                  </div>
                </div>
              </section>

              {/* EXECUTION TRACE */}

              <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      EXECUTION TRACE
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      See exactly where the loop stopped.
                    </h2>
                  </div>

                  <p className="text-xs text-slate-400">
                    Array: [4, 7, 2, 9, 12]
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  {array.map((value, index) => {
                    const visited =
                      visitedIndexes.includes(index);

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center"
                      >
                        <div
                          className={`flex h-20 w-20 items-center justify-center rounded-[22px] border-2 text-xl font-bold ${
                            visited
                              ? "border-[#BFE8E3] bg-[#EAF9F7] text-[#317C77]"
                              : "border-[#E7C4A1] bg-[#FFF5EA] text-[#A56429]"
                          }`}
                        >
                          {value}
                        </div>

                        <p className="mt-2 text-[9px] font-bold text-slate-400">
                          INDEX {index}
                        </p>

                        <span
                          className={`mt-2 rounded-full px-3 py-1 text-[9px] font-bold ${
                            visited
                              ? "bg-[#EAF9F7] text-[#317C77]"
                              : "bg-[#FFF1E1] text-[#A56429]"
                          }`}
                        >
                          {visited
                            ? "✓ Visited"
                            : "✕ Skipped"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mx-auto mt-7 max-w-2xl rounded-[18px] bg-[#17172B] p-4 text-center">
                  <p className="font-mono text-xs text-white/65">
                    range(len(arr) - 1)
                    <span className="mx-3 text-white/20">
                      →
                    </span>
                    range(4)
                    <span className="mx-3 text-white/20">
                      →
                    </span>
                    0, 1, 2, 3
                  </p>
                </div>
              </section>

              {/* RECOVERY */}

              <section className="mt-5 grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
                {/* RECOVERY INFO */}

                <div className="rounded-[28px] bg-[#17172B] p-6 text-white">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8EDBD5]">
                    TARGETED RECOVERY
                  </p>

                  <h2 className="mt-3 text-2xl font-bold">
                    Fix the concept,
                    <br />
                    not just the answer.
                  </h2>

                  <p className="mt-4 text-xs leading-6 text-white/50">
                    Before returning to the original problem,
                    VizStruct gives you a short exercise focused
                    only on the concept that caused the mistake.
                  </p>

                  <div className="mt-6 space-y-3">
                    <RecoveryStep
                      number="01"
                      title="Observe"
                      active
                    />

                    <RecoveryStep
                      number="02"
                      title="Reason"
                      active
                    />

                    <RecoveryStep
                      number="03"
                      title="Retry"
                      active={recoveryComplete}
                    />

                    <RecoveryStep
                      number="04"
                      title="Re-evaluate"
                      active={false}
                    />
                  </div>
                </div>

                {/* QUESTION */}

                <div className="rounded-[28px] border border-[#DCD8FF] bg-white p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        RECOVERY EXERCISE
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Loop Boundaries · Quick Check
                      </p>
                    </div>

                    <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-[9px] font-bold text-[#6C5CE7]">
                      Personalized Practice
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold leading-7">
                    The array has 5 elements with indexes 0, 1,
                    2, 3 and 4.
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    If the loop only produces 0, 1, 2 and 3,
                    which array index was skipped?
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {options.map((option) => {
                      const selected =
                        selectedAnswer === option.id;

                      let optionStyle =
                        "border-slate-200 bg-white text-slate-600 hover:border-[#CFC9FF]";

                      if (selected) {
                        optionStyle =
                          "border-[#6C5CE7] bg-[#F1EFFF] text-[#6C5CE7]";
                      }

                      if (checked && selected) {
                        optionStyle = correctAnswer
                          ? "border-[#8EDBD5] bg-[#EAF9F7] text-[#317C77]"
                          : "border-[#E7C4A1] bg-[#FFF5EA] text-[#A56429]";
                      }

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setSelectedAnswer(option.id);
                            setChecked(false);
                          }}
                          className={`rounded-[18px] border p-4 text-left text-sm font-semibold transition ${optionStyle}`}
                        >
                          <span className="mr-3 text-[10px] font-bold uppercase opacity-50">
                            {option.id}.
                          </span>

                          {option.text}
                        </button>
                      );
                    })}
                  </div>

                  {/* FEEDBACK */}

                  {checked && (
                    <div
                      className={`mt-5 rounded-[18px] border p-4 ${
                        correctAnswer
                          ? "border-[#CFEDE9] bg-[#EAF9F7]"
                          : "border-[#F0D9B4] bg-[#FFF9EF]"
                      }`}
                    >
                      <p
                        className={`text-sm font-bold ${
                          correctAnswer
                            ? "text-[#317C77]"
                            : "text-[#A56429]"
                        }`}
                      >
                        {correctAnswer
                          ? "✓ Exactly."
                          : "Not quite yet."}
                      </p>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        {correctAnswer
                          ? "Index 4 is the final valid index, but the loop stopped at index 3. You have identified the boundary problem."
                          : "Compare the valid indexes with the indexes generated by the loop. Look for the value that appears in only one list."}
                      </p>
                    </div>
                  )}

                  {/* HINTS */}

                  {hintLevel > 0 && (
                    <div className="mt-5 space-y-3">
                      <HintCard
                        number="Hint 1"
                        text="Count the array indexes from zero rather than from one."
                      />

                      {hintLevel >= 2 && (
                        <HintCard
                          number="Hint 2"
                          text="Five elements have valid indexes 0 through 4."
                        />
                      )}

                      {hintLevel >= 3 && (
                        <HintCard
                          number="Hint 3"
                          text="Compare 0, 1, 2, 3, 4 with the loop output 0, 1, 2, 3."
                        />
                      )}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={showHint}
                      disabled={hintLevel >= 3}
                      className={`rounded-xl border px-5 py-3 text-xs font-bold ${
                        hintLevel >= 3
                          ? "cursor-not-allowed border-slate-100 text-slate-300"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      💡{" "}
                      {hintLevel === 0
                        ? "Give Me a Hint"
                        : hintLevel >= 3
                        ? "All Hints Shown"
                        : "Another Hint"}
                    </button>

                    <button
                      type="button"
                      onClick={checkAnswer}
                      disabled={!selectedAnswer}
                      className={`rounded-xl px-5 py-3 text-xs font-bold ${
                        selectedAnswer
                          ? "bg-[#6C5CE7] text-white"
                          : "cursor-not-allowed bg-slate-100 text-slate-300"
                      }`}
                    >
                      Check Answer
                    </button>
                  </div>
                </div>
              </section>

              {/* RECOVERY COMPLETE */}

              {recoveryComplete && (
                <section className="mt-5 rounded-[28px] border border-[#CFEDE9] bg-[#EAF9F7] p-6">
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-xl">
                        ✓
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#317C77]">
                          RECOVERY CHECK COMPLETE
                        </p>

                        <h2 className="mt-2 text-xl font-bold">
                          Now retry the original problem.
                        </h2>

                        <p className="mt-2 max-w-xl text-xs leading-6 text-slate-500">
                          You identified that the loop failed to
                          visit the final valid index. Apply that
                          understanding to your own code rather than
                          copying a provided solution.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={resetExercise}
                        className="rounded-xl border border-[#BDE4DF] bg-white px-5 py-3 text-xs font-bold text-[#317C77]"
                      >
                        Repeat Exercise
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          router.push("/practice")
                        }
                        className="rounded-xl bg-[#17172B] px-5 py-3 text-xs font-bold text-white"
                      >
                        Retry Problem →
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* ADAPTIVE LOOP */}

              <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6">
                <p className="text-center text-[9px] font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                  HOW VIZSTRUCT RESPONDS TO MISTAKES
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold">
                  <FlowBadge text="Execute" />

                  <Arrow />

                  <FlowBadge text="Observe" />

                  <Arrow />

                  <FlowBadge text="Diagnose" active />

                  <Arrow />

                  <FlowBadge text="Recover" active />

                  <Arrow />

                  <FlowBadge text="Retry" />

                  <Arrow />

                  <FlowBadge text="Adapt" />
                </div>

                <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-6 text-slate-400">
                  This frontend currently demonstrates the diagnosis
                  using predefined execution evidence. Real
                  submission traces and learner-model predictions
                  will be connected when the execution and analysis
                  backend is implemented.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function EvidenceRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-1 border-b border-slate-200 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center">
      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span
        className={`font-mono text-xs font-bold ${
          highlight
            ? "text-[#A56429]"
            : "text-[#17172B]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function RecoveryStep({
  number,
  title,
  active,
}: {
  number: string;
  title: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-[16px] border px-4 py-3 ${
        active
          ? "border-[#6C5CE7]/40 bg-[#6C5CE7]/15"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg text-[9px] font-bold ${
          active
            ? "bg-[#6C5CE7] text-white"
            : "bg-white/[0.06] text-white/25"
        }`}
      >
        {number}
      </div>

      <span
        className={`text-xs font-bold ${
          active ? "text-white" : "text-white/35"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function HintCard({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCD8FF] bg-[#F7F5FF] p-4">
      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#6C5CE7]">
        {number}
      </p>

      <p className="mt-2 text-xs leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function FlowBadge({
  text,
  active = false,
}: {
  text: string;
  active?: boolean;
}) {
  return (
    <span
      className={`rounded-xl border px-4 py-2 ${
        active
          ? "border-[#6C5CE7] bg-[#ECE9FF] text-[#6C5CE7]"
          : "border-slate-200 bg-[#F8F7FC] text-slate-500"
      }`}
    >
      {text}
    </span>
  );
}

function Arrow() {
  return (
    <span className="text-slate-300">
      →
    </span>
  );
}
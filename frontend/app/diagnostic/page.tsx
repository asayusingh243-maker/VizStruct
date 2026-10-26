"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: number;
  concept: string;
  difficulty: string;
  title: string;
  description: string;
  code?: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 1,
    concept: "Variables",
    difficulty: "Foundation",
    title: "What value will be printed?",
    description: "Trace the variable updates before choosing your answer.",
    code: `x = 5
x = x + 3
x = x * 2

print(x)`,
    options: ["8", "10", "13", "16"],
  },
  {
    id: 2,
    concept: "Conditions",
    difficulty: "Foundation",
    title: "Which output will this code produce?",
    description: "Follow the condition carefully.",
    code: `score = 72

if score >= 80:
    print("A")
elif score >= 60:
    print("B")
else:
    print("C")`,
    options: ["A", "B", "C", "No output"],
  },
  {
    id: 3,
    concept: "Loops",
    difficulty: "Foundation",
    title: "How many times will the loop execute?",
    description: "Think about the values produced by range().",
    code: `for i in range(1, 5):
    print(i)`,
    options: ["3 times", "4 times", "5 times", "Infinite times"],
  },
  {
    id: 4,
    concept: "Arrays",
    difficulty: "Core",
    title: "Which value is accessed?",
    description: "Remember that Python lists use zero-based indexing.",
    code: `numbers = [4, 7, 2, 9]

print(numbers[2])`,
    options: ["4", "7", "2", "9"],
  },
  {
    id: 5,
    concept: "Execution Flow",
    difficulty: "Core",
    title: "What is the final value of total?",
    description: "Trace each iteration and update the variable.",
    code: `total = 0

for i in range(3):
    total = total + i`,
    options: ["2", "3", "5", "6"],
  },
  {
    id: 6,
    concept: "Functions",
    difficulty: "Core",
    title: "What will the function return?",
    description: "Follow the argument through the function.",
    code: `def calculate(x):
    return x * x

result = calculate(4)`,
    options: ["4", "8", "16", "20"],
  },
  {
    id: 7,
    concept: "Loop Boundaries",
    difficulty: "Reasoning",
    title: "Which value will NOT be printed?",
    description:
      "Pay attention to the upper boundary used by range().",
    code: `for i in range(2, 6):
    print(i)`,
    options: ["2", "4", "5", "6"],
  },
  {
    id: 8,
    concept: "Problem Solving",
    difficulty: "Reasoning",
    title: "Which approach correctly finds the largest value?",
    description:
      "Choose the most appropriate basic strategy for an unsorted list.",
    options: [
      "Always return the first element",
      "Compare each element while keeping the current maximum",
      "Return the last element",
      "Add all elements together",
    ],
  },
];

export default function DiagnosticPage() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];

  const answeredCount = Object.keys(answers).length;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function selectAnswer(answer: string) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: answer,
    }));
  }

  function handleNext() {
    if (!selectedAnswer) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1);
    }
  }

  function handleSubmit() {
    if (!selectedAnswer) return;

    console.log("Diagnostic answers:", answers);

    router.push("/diagnostic/result");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7FC] text-[#17172B]">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[100px]" />
        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-[#E4F7F5] blur-[100px]" />
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

            <div className="rounded-full border border-[#DCD8FF] bg-white px-4 py-2 text-xs font-semibold text-slate-500">
              Diagnostic Assessment
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          {/* Top progress */}
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
                  INITIAL ASSESSMENT
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Find your starting point.
                </h1>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold">
                  {currentIndex + 1} / {questions.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {answeredCount} answered
                </p>
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#ECE9FF]">
              <div
                className="h-full rounded-full bg-[#6C5CE7] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Assessment */}
          <div className="mx-auto mt-9 grid max-w-5xl gap-6 lg:grid-cols-[1fr_280px]">
            {/* Main question card */}
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(23,23,43,0.06)] sm:p-8">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-xs font-bold text-[#6C5CE7]">
                  {currentQuestion.concept}
                </span>

                <span className="rounded-full bg-[#E4F7F5] px-3 py-1.5 text-xs font-semibold text-[#317C77]">
                  {currentQuestion.difficulty}
                </span>
              </div>

              {/* Question */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Question {currentQuestion.id}
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  {currentQuestion.title}
                </h2>

                <p className="mt-3 leading-7 text-slate-500">
                  {currentQuestion.description}
                </p>
              </div>

              {/* Code */}
              {currentQuestion.code && (
                <div className="mt-7 overflow-hidden rounded-2xl bg-[#17172B]">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    </div>

                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                      Python
                    </p>
                  </div>

                  <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#EDEBFF]">
                    <code>{currentQuestion.code}</code>
                  </pre>
                </div>
              )}

              {/* Options */}
              <div className="mt-7 grid gap-3">
                {currentQuestion.options.map((option, index) => {
                  const selected = selectedAnswer === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(option)}
                      className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                        selected
                          ? "border-[#6C5CE7] bg-[#F0EDFF] shadow-[0_8px_24px_rgba(108,92,231,0.08)]"
                          : "border-slate-200 bg-white hover:border-[#CFC9FF] hover:bg-[#FBFAFF]"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                          selected
                            ? "bg-[#6C5CE7] text-white"
                            : "bg-[#F3F1FA] text-slate-500"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span
                        className={`text-sm ${
                          selected
                            ? "font-semibold text-[#17172B]"
                            : "font-medium text-slate-600"
                        }`}
                      >
                        {option}
                      </span>

                      {selected && (
                        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#6C5CE7] text-xs text-white">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    currentIndex === 0
                      ? "cursor-not-allowed text-slate-300"
                      : "text-slate-500 hover:bg-[#F8F7FC] hover:text-[#17172B]"
                  }`}
                >
                  ← Previous
                </button>

                {currentIndex === questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
                      selectedAnswer
                        ? "bg-[#6C5CE7] text-white shadow-[0_10px_30px_rgba(108,92,231,0.18)] hover:bg-[#5B4BCF]"
                        : "cursor-not-allowed bg-slate-200 text-slate-400"
                    }`}
                  >
                    Submit Diagnostic →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
                      selectedAnswer
                        ? "bg-[#6C5CE7] text-white shadow-[0_10px_30px_rgba(108,92,231,0.18)] hover:bg-[#5B4BCF]"
                        : "cursor-not-allowed bg-slate-200 text-slate-400"
                    }`}
                  >
                    Next Question →
                  </button>
                )}
              </div>
            </div>

            {/* Right panel */}
            <aside className="space-y-4">
              <div className="rounded-2xl border border-[#DCD8FF] bg-[#F0EDFF] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                  Why this test?
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Your answers help VizStruct estimate your current understanding
                  before creating your learning path.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-[#17172B]">
                  Assessment Map
                </p>

                <div className="mt-5 grid grid-cols-4 gap-2">
                  {questions.map((question, index) => {
                    const answered = Boolean(answers[question.id]);
                    const active = index === currentIndex;

                    return (
                      <button
                        key={question.id}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        className={`flex h-10 items-center justify-center rounded-xl text-xs font-bold transition ${
                          active
                            ? "bg-[#6C5CE7] text-white"
                            : answered
                              ? "bg-[#E4F7F5] text-[#317C77]"
                              : "bg-[#F5F4F8] text-slate-400"
                        }`}
                      >
                        {question.id}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#6C5CE7]" />
                    Current question
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#8EDBD5]" />
                    Answered
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    Not answered
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#292865] p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8EDBD5]">
                  VizStruct Tip
                </p>

                <p className="mt-3 text-sm leading-6 text-white/70">
                  Don&apos;t guess based on syntax alone. Trace how each value
                  changes during execution.
                </p>

                <div className="mt-4 flex items-center gap-2 font-mono text-xs text-[#CFC9FF]">
                  <span>TRACE</span>
                  <span>→</span>
                  <span>THINK</span>
                  <span>→</span>
                  <span>ANSWER</span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
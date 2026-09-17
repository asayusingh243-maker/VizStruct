"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Option = {
  title: string;
  description: string;
  icon: string;
};

type Step = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  options: Option[];
};

const steps: Step[] = [
  {
    id: "experience",
    eyebrow: "YOUR EXPERIENCE",
    title: "Where are you starting from?",
    description:
      "This helps VizStruct choose the right difficulty for your diagnostic assessment.",
    options: [
      {
        title: "Complete Beginner",
        description: "I'm new to programming or have only tried a little.",
        icon: "01",
      },
      {
        title: "Beginner",
        description: "I understand variables, conditions, and basic loops.",
        icon: "02",
      },
      {
        title: "Intermediate",
        description:
          "I can solve basic coding problems and know common data structures.",
        icon: "03",
      },
      {
        title: "Advanced",
        description:
          "I'm comfortable solving problems and want deeper practice.",
        icon: "04",
      },
    ],
  },

  {
    id: "language",
    eyebrow: "PREFERRED LANGUAGE",
    title: "Which language do you want to practice?",
    description:
      "Your examples, coding problems, and visualizations will start with this language.",
    options: [
      {
        title: "Python",
        description: "Simple syntax and beginner-friendly problem solving.",
        icon: "PY",
      },
      {
        title: "C++",
        description: "Popular for DSA and competitive programming.",
        icon: "C+",
      },
      {
        title: "Java",
        description: "Strong object-oriented programming foundation.",
        icon: "JV",
      },
      {
        title: "JavaScript",
        description: "Useful for programming concepts and web development.",
        icon: "JS",
      },
    ],
  },

  {
    id: "goal",
    eyebrow: "YOUR GOAL",
    title: "What do you want to improve?",
    description:
      "VizStruct will prioritize concepts and problems around your learning goal.",
    options: [
      {
        title: "Build Programming Fundamentals",
        description: "Strengthen variables, loops, conditions, functions, and logic.",
        icon: "01",
      },
      {
        title: "Learn Data Structures",
        description: "Understand arrays, stacks, queues, linked lists, and more.",
        icon: "02",
      },
      {
        title: "Improve Problem Solving",
        description: "Practice reasoning and develop stronger coding strategies.",
        icon: "03",
      },
      {
        title: "Prepare for Coding Interviews",
        description: "Work toward structured DSA and interview-style problems.",
        icon: "04",
      },
    ],
  },

  {
    id: "commitment",
    eyebrow: "LEARNING ROUTINE",
    title: "How much time would you like to practice?",
    description:
      "We'll use this later to shape a realistic learning path and practice plan.",
    options: [
      {
        title: "15 minutes a day",
        description: "Short, consistent practice sessions.",
        icon: "15",
      },
      {
        title: "30 minutes a day",
        description: "A balanced daily learning routine.",
        icon: "30",
      },
      {
        title: "1 hour a day",
        description: "Focused practice with deeper problem solving.",
        icon: "60",
      },
      {
        title: "A few sessions per week",
        description: "Flexible learning around your schedule.",
        icon: "WK",
      },
    ],
  },

  {
    id: "companion",
    eyebrow: "LEARNING COMPANION",
    title: "How would you like VizStruct to guide you?",
    description:
      "Your companion can explain execution steps and guide recovery exercises. This preference is optional and can be changed later.",
    options: [
      {
        title: "Male Companion",
        description: "Use the male VizStruct learning companion.",
        icon: "M",
      },
      {
        title: "Female Companion",
        description: "Use the female VizStruct learning companion.",
        icon: "F",
      },
      {
        title: "No Character",
        description: "Keep guidance focused entirely on the interface.",
        icon: "—",
      },
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();

  const [stepIndex, setStepIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentStep = steps[stepIndex];

  const selectedAnswer = answers[currentStep.id];

  const progress = ((stepIndex + 1) / steps.length) * 100;

  function selectOption(value: string) {
    setAnswers((previous) => ({
      ...previous,
      [currentStep.id]: value,
    }));
  }

  function handleNext() {
    if (!selectedAnswer) return;

    if (stepIndex < steps.length - 1) {
      setStepIndex((previous) => previous + 1);
      return;
    }

    // Temporary frontend-only flow.
    // Later this will save the learner profile through the backend.
    console.log("VizStruct learner profile:", answers);

    router.push("/diagnostic");
  }

  function handleBack() {
    if (stepIndex > 0) {
      setStepIndex((previous) => previous - 1);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7FC] text-[#17172B]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[100px]" />

        <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-[#E4F7F5] blur-[100px]" />

        <div className="absolute bottom-[-120px] left-1/3 h-72 w-72 rounded-full bg-[#F1ECFF] blur-[100px]" />
      </div>

      {/* Grid */}
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
        <header className="border-b border-[#17172B]/5 bg-[#F8F7FC]/80 backdrop-blur-xl">
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

            <div className="hidden items-center gap-3 sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#8EDBD5]" />

              <p className="text-xs font-semibold text-slate-500">
                Building your learner profile
              </p>
            </div>
          </div>
        </header>

        {/* Main */}
        <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          {/* Progress */}
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                Learner Profile
              </p>

              <p className="text-xs font-semibold text-slate-400">
                Step {stepIndex + 1} of {steps.length}
              </p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#ECE9FF]">
              <div
                className="h-full rounded-full bg-[#6C5CE7] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
              {currentStep.eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              {currentStep.title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
              {currentStep.description}
            </p>
          </div>

          {/* Options */}
          <div
            className={`mx-auto mt-10 grid max-w-4xl gap-4 ${
              currentStep.options.length === 3
                ? "md:grid-cols-3"
                : "md:grid-cols-2"
            }`}
          >
            {currentStep.options.map((option) => {
              const selected = selectedAnswer === option.title;

              return (
                <button
                  key={option.title}
                  type="button"
                  onClick={() => selectOption(option.title)}
                  className={`group relative rounded-2xl border p-6 text-left transition-all duration-200 ${
                    selected
                      ? "border-[#6C5CE7] bg-[#F0EDFF] shadow-[0_16px_40px_rgba(108,92,231,0.12)]"
                      : "border-slate-200/80 bg-white hover:-translate-y-1 hover:border-[#CFC9FF] hover:shadow-[0_14px_35px_rgba(23,23,43,0.06)]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition ${
                        selected
                          ? "bg-[#6C5CE7] text-white"
                          : "bg-[#ECE9FF] text-[#6C5CE7]"
                      }`}
                    >
                      {option.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-[#17172B]">
                          {option.title}
                        </h2>

                        {selected && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6C5CE7] text-[10px] text-white">
                            ✓
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mx-auto mt-10 flex max-w-4xl items-center justify-between border-t border-slate-200/70 pt-7">
            <button
              type="button"
              onClick={handleBack}
              disabled={stepIndex === 0}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                stepIndex === 0
                  ? "cursor-not-allowed text-slate-300"
                  : "text-slate-500 hover:bg-white hover:text-[#17172B]"
              }`}
            >
              ← Back
            </button>

            <div className="hidden items-center gap-2 sm:flex">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === stepIndex
                      ? "w-7 bg-[#6C5CE7]"
                      : index < stepIndex
                        ? "w-2 bg-[#8EDBD5]"
                        : "w-2 bg-slate-200"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
                selectedAnswer
                  ? "bg-[#6C5CE7] text-white shadow-[0_10px_30px_rgba(108,92,231,0.18)] hover:-translate-y-0.5 hover:bg-[#5B4BCF]"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >
              {stepIndex === steps.length - 1
                ? "Continue to Diagnostic →"
                : "Continue →"}
            </button>
          </div>

          {/* Bottom message */}
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-[#DCD8FF] bg-white/70 px-5 py-4 text-center backdrop-blur">
            <p className="text-xs leading-5 text-slate-500">
              <span className="font-semibold text-[#6C5CE7]">
                Why are we asking this?
              </span>{" "}
              VizStruct uses your answers together with your diagnostic
              performance to build your initial learning path.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { apiRequest } from "../../lib/api";

const starterCode = `def find_largest(arr):
    # Write your solution here
    pass


numbers = list(map(int, input().split()))
print(find_largest(numbers))`;

const testCases = [
  {
    input: "4 7 2 9 5",
    expected: "9",
  },
  {
    input: "12 3 8 6",
    expected: "12",
  },
  {
    input: "-5 -2 -9 -1",
    expected: "-1",
  },
];

const hints = [
  "Think about keeping track of the largest value you have seen so far.",

  "Start by assuming the first element is the largest. Then compare the remaining elements with it.",

  `Pseudocode:
1. Store the first array element as current_largest
2. Visit every element
3. If an element is greater than current_largest, update it
4. Return current_largest`,
];

type TestResult = {
  input: string;
  expected: string;
  output: string;
  status: "passed" | "failed";
};

type PracticeProblem = {
  _id: string;
  title: string;
};

type ExecutionResponse = {
  message: string;
  status?: string;
  allPassed: boolean;
  passed: number;
  total: number;
  results: {
    testCase: number;
    passed: boolean;
    status: string;
    input?: string;
    expected?: string;
    output?: string;
    error?: string;
  }[];
};

export default function PracticePage() {
  const router = useRouter();

  const [code, setCode] = useState(starterCode);
  const [problemId, setProblemId] = useState("");
  const [problemError, setProblemError] = useState("");
  const [executionError, setExecutionError] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const [output, setOutput] = useState(
    "Run your code to see the output here."
  );

  const [hasRun, setHasRun] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [results, setResults] = useState<TestResult[]>([]);

  const [activeTab, setActiveTab] = useState<
    "testcases" | "output"
  >("testcases");

  const [hintLevel, setHintLevel] = useState(0);

  useEffect(() => {
    let active = true;

    apiRequest<PracticeProblem[]>("/practice/problems")
      .then((problems) => {
        const problem = problems.find(
          (item) => item.title === "Find the Largest Element"
        );
        if (!problem) {
          throw new Error(
            "Practice problem not found. Run the backend seed command first."
          );
        }
        if (active) setProblemId(problem._id);
      })
      .catch((error: unknown) => {
        if (active) {
          setProblemError(
            error instanceof Error
              ? error.message
              : "Unable to load the practice problem."
          );
        }
      });

    return () => {
      active = false;
    };
  }, []);

  async function executeCode(submit: boolean) {
    setHasRun(true);
    setSubmitted(submit);
    setSubmissionStatus("");
    setExecutionError("");
    setActiveTab(submit ? "testcases" : "output");

    if (!code.trim()) {
      setOutput("No code found. Write your solution first.");
      return;
    }

    if (!problemId) {
      setOutput(problemError || "The practice problem is still loading.");
      return;
    }

    setIsExecuting(true);
    try {
      const result = await apiRequest<ExecutionResponse>(
        `/practice/problems/${problemId}/${submit ? "submit" : "run"}`,
        {
          method: "POST",
          body: JSON.stringify({ code, language: "Python" }),
        }
      );

      setResults(
        result.results.map((test) => ({
          input: test.input || "",
          expected: test.expected || "",
          output: test.error || test.output || test.status,
          status: test.passed ? "passed" : "failed",
        }))
      );
      setSubmissionStatus(result.status || "");
      const visibleResults = result.results.filter(
        (test) => test.input !== undefined
      );
      setOutput(
        `${result.message}\n${result.passed} of ${result.total} test cases passed.\n\n${visibleResults
          .map(
            (test) =>
              `Test Case ${test.testCase}: ${test.status}\n${test.error || test.output || "(no output)"}`
          )
          .join("\n\n")}`
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Code execution failed.";
      setExecutionError(message);
      if (submit) setSubmissionStatus("Judge Error");
      setOutput(message);
    } finally {
      setIsExecuting(false);
    }
  }

  function handleRun() {
    void executeCode(false);
  }

  function handleSubmit() {
    void executeCode(true);
  }

  function resetCode() {
    setCode(starterCode);
    setHasRun(false);
    setSubmitted(false);
    setResults([]);
    setSubmissionStatus("");
    setExecutionError("");
    setHintLevel(0);
    setActiveTab("testcases");
    setOutput("Run your code to see the output here.");
  }

  function showHint() {
    setHintLevel((current) =>
      Math.min(current + 1, hints.length)
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <DashboardHeader />

          <div className="relative overflow-hidden">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[110px]" />

              <div className="absolute -left-24 top-[650px] h-72 w-72 rounded-full bg-[#E4F7F5] blur-[110px]" />
            </div>

            <div className="relative mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
              {/* PAGE HEADER */}

              <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7]">
                      Arrays
                    </span>

                    <span className="rounded-full bg-[#E4F7F5] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#317C77]">
                      Recommended
                    </span>

                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Easy
                    </span>
                  </div>

                  <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
                    Find the Largest Element
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    Practice array traversal while learning how values
                    change during execution.
                  </p>
                  {problemError && (
                    <p role="alert" className="mt-3 text-sm text-red-600">
                      {problemError}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Problem
                    </p>

                    <p className="mt-0.5 text-xs font-bold">
                      1 of 5
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Language
                    </p>

                    <p className="mt-0.5 text-xs font-bold text-[#6C5CE7]">
                      Python
                    </p>
                  </div>
                </div>
              </section>

              {/* WORKSPACE */}

              <section className="mt-6 grid gap-5 xl:grid-cols-[0.82fr_1.3fr]">
                {/* LEFT SIDE */}

                <div className="space-y-5">
                  {/* Problem */}

                  <div className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_45px_rgba(23,23,43,0.04)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                          PROBLEM
                        </p>

                        <h2 className="mt-2 text-xl font-bold">
                          Find the largest value
                        </h2>
                      </div>

                      <span className="rounded-lg bg-[#F3F1FA] px-3 py-1.5 text-[10px] font-bold text-slate-500">
                        10 XP
                      </span>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-600">
                      Given an array of integers, write a function that
                      returns the largest element in the array.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Traverse the array and determine which value is
                      greater than all the others.
                    </p>

                    {/* Example */}

                    <div className="mt-6 rounded-2xl bg-[#F8F7FC] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        EXAMPLE
                      </p>

                      <div className="mt-4 space-y-3 font-mono text-xs">
                        <div>
                          <span className="text-slate-400">
                            Input:
                          </span>

                          <span className="ml-2 font-semibold">
                            [4, 7, 2, 9, 5]
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400">
                            Output:
                          </span>

                          <span className="ml-2 font-semibold text-[#6C5CE7]">
                            9
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Constraints */}

                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        CONSTRAINTS
                      </p>

                      <div className="mt-3 space-y-2 text-xs text-slate-500">
                        <p>
                          • The array contains at least one element.
                        </p>

                        <p>
                          • Elements may be positive or negative
                          integers.
                        </p>

                        <p>
                          • Do not sort the array to solve the problem.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Learning Focus */}

                  <div className="rounded-[26px] border border-[#DCD8FF] bg-[#F0EDFF] p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-bold text-[#6C5CE7] shadow-sm">
                        VS
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6C5CE7]">
                          LEARNING FOCUS
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Recommended from your roadmap
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 text-sm font-bold">
                      Focus on array traversal and comparisons.
                    </p>

                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      Try solving the problem yourself first. If you get
                      stuck, VizStruct can progressively guide you
                      without immediately revealing the answer.
                    </p>
                  </div>

                  {/* Learning Rule */}

                  <div className="rounded-[26px] border border-slate-200 bg-white p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      VIZSTRUCT LEARNING MODE
                    </p>

                    <div className="mt-4 space-y-3">
                      {[
                        "Attempt the problem yourself",
                        "Use progressive hints if needed",
                        "Run and inspect your code",
                        "Visualize execution",
                        "Diagnose mistakes",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#ECE9FF] text-[9px] font-bold text-[#6C5CE7]">
                            {index + 1}
                          </div>

                          <p className="text-xs font-semibold text-slate-500">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}

                <div className="space-y-5">
                  {/* CODE EDITOR */}

                  <div className="overflow-hidden rounded-[26px] border border-[#34336D] bg-[#1E1E46] shadow-[0_20px_60px_rgba(23,23,43,0.16)]">
                    {/* Editor header */}

                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#292865] px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#8EDBD5]" />
                        </div>

                        <span className="text-xs font-semibold text-white/55">
                          solution.py
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={resetCode}
                          className="rounded-lg px-3 py-1.5 text-[10px] font-bold text-white/45 transition hover:bg-white/10 hover:text-white"
                        >
                          Reset
                        </button>

                        <span className="rounded-lg bg-white/10 px-3 py-1.5 text-[10px] font-bold text-[#8EDBD5]">
                          Python 3
                        </span>
                      </div>
                    </div>

                    {/* Editor */}

                    <div className="relative">
                      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-12 border-r border-white/[0.06] bg-black/10" />

                      <textarea
                        value={code}
                        onChange={(event) => {
                          setCode(event.target.value);
                          setSubmitted(false);
                          setSubmissionStatus("");
                          setResults([]);
                        }}
                        spellCheck={false}
                        className="min-h-[440px] w-full resize-none bg-transparent py-5 pl-16 pr-5 font-mono text-[13px] leading-7 text-[#E8E7F4] outline-none"
                      />

                      {/* Line numbers */}

                      <div className="pointer-events-none absolute left-0 top-5 flex w-12 flex-col items-center font-mono text-[11px] leading-7 text-white/20">
                        {Array.from({
                          length: Math.max(
                            code.split("\n").length,
                            14
                          ),
                        }).map((_, index) => (
                          <span key={index}>{index + 1}</span>
                        ))}
                      </div>
                    </div>

                    {/* Buttons */}

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#292865] px-5 py-4">
                      <p className="text-[10px] text-white/35">
                        Executed in the Judge0 sandbox
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={showHint}
                          className="rounded-xl border border-[#8EDBD5]/30 bg-[#8EDBD5]/10 px-5 py-2.5 text-xs font-bold text-[#8EDBD5] transition hover:bg-[#8EDBD5]/20"
                        >
                          💡 Hint
                        </button>

                        <button
                          type="button"
                          onClick={handleRun}
                          disabled={isExecuting || !problemId}
                          className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 disabled:cursor-wait disabled:opacity-50"
                        >
                          {isExecuting && !submitted ? "Running..." : "▶ Run Code"}
                        </button>

                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isExecuting || !problemId}
                          className="rounded-xl bg-[#6C5CE7] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#5B4BCF] disabled:cursor-wait disabled:opacity-50"
                        >
                          {isExecuting && submitted ? "Judging..." : "Submit →"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* HINT */}

                  {hintLevel > 0 && (
                    <div className="rounded-[26px] border border-[#DCD8FF] bg-[#F0EDFF] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#8EDBD5]" />

                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                              HINT {hintLevel} OF {hints.length}
                            </p>
                          </div>

                          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                            {hints[hintLevel - 1]}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setHintLevel(0)}
                          className="text-xs font-bold text-slate-400 transition hover:text-[#17172B]"
                        >
                          ✕
                        </button>
                      </div>

                      {hintLevel < hints.length && (
                        <button
                          type="button"
                          onClick={showHint}
                          className="mt-4 text-xs font-bold text-[#6C5CE7]"
                        >
                          I need another hint →
                        </button>
                      )}

                      {hintLevel === hints.length && (
                        <p className="mt-4 text-[10px] font-semibold text-slate-400">
                          This is the strongest hint. Try translating the
                          pseudocode into Python yourself.
                        </p>
                      )}
                    </div>
                  )}

                  {/* TEST CASES / OUTPUT */}

                  <div className="overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_15px_45px_rgba(23,23,43,0.04)]">
                    {/* Tabs */}

                    <div className="flex items-center justify-between border-b border-slate-100 px-5">
                      <div className="flex">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveTab("testcases")
                          }
                          className={`border-b-2 px-4 py-4 text-xs font-bold transition ${
                            activeTab === "testcases"
                              ? "border-[#6C5CE7] text-[#6C5CE7]"
                              : "border-transparent text-slate-400"
                          }`}
                        >
                          Test Cases
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab("output")}
                          className={`border-b-2 px-4 py-4 text-xs font-bold transition ${
                            activeTab === "output"
                              ? "border-[#6C5CE7] text-[#6C5CE7]"
                              : "border-transparent text-slate-400"
                          }`}
                        >
                          Output
                        </button>
                      </div>

                      {submitted && (
                        <span className="rounded-full bg-[#FFF4D9] px-3 py-1.5 text-[10px] font-bold text-[#946A16]">
                          {isExecuting
                            ? "Evaluation in progress"
                            : submissionStatus || "Evaluated"}
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      {/* Test Cases */}

                      {activeTab === "testcases" && (
                        <div className="space-y-3">
                          {testCases.map((test, index) => {
                            const result = results[index];

                            return (
                              <div
                                key={test.input}
                                className="rounded-2xl border border-slate-100 bg-[#FAF9FC] p-4"
                              >
                                <div className="flex items-center justify-between">
                                  <p className="text-xs font-bold">
                                    Test Case {index + 1}
                                  </p>

                                  {result && (
                                    <span
                                      className={`text-[10px] font-bold ${
                                        result.status === "passed"
                                          ? "text-[#317C77]"
                                          : "text-[#B75A5A]"
                                      }`}
                                    >
                                      {result.status === "passed"
                                        ? "✓ Passed"
                                        : "✕ Not Passed"}
                                    </span>
                                  )}
                                </div>

                                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                                  <div>
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                      Input
                                    </p>

                                    <code className="mt-1 block text-[11px] text-slate-600">
                                      {test.input}
                                    </code>
                                  </div>

                                  <div>
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                      Expected
                                    </p>

                                    <code className="mt-1 block text-[11px] text-slate-600">
                                      {test.expected}
                                    </code>
                                  </div>

                                  <div>
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                      Your Output
                                    </p>

                                    <code className="mt-1 block text-[11px] text-slate-600">
                                      {result
                                        ? result.output
                                        : "Not tested"}
                                    </code>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Output */}

                      {activeTab === "output" && (
                        <div className="min-h-[170px] rounded-2xl bg-[#17172B] p-5">
                          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8EDBD5]">
                            CONSOLE
                          </p>

                          <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-6 text-white/70">
                            {output}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* VISUALIZATION */}

                  {hasRun && code.trim() && (
                      <div className="rounded-[26px] border border-[#DCD8FF] bg-gradient-to-r from-[#F0EDFF] to-white p-5">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-[#8EDBD5]" />

                              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                                EXECUTION VISUALIZATION
                              </p>
                            </div>

                            <h3 className="mt-2 text-base font-bold">
                              See what your code is doing.
                            </h3>

                            <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                              VizStruct will visualize the student&apos;s
                              own execution flow — including mistakes —
                              instead of showing only a predefined correct
                              solution.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              router.push("/practice/visualize")
                            }
                            className="shrink-0 rounded-xl bg-[#17172B] px-5 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5"
                          >
                            Visualize Execution →
                          </button>
                        </div>
                      </div>
                    )}

                  {/* SUBMISSION MESSAGE */}

                  {submitted && (
                    <div
                      className={`rounded-[26px] border p-5 ${
                        !code.trim()
                          ? "border-[#F1D5D5] bg-[#FFF6F6]"
                          : "border-[#E8DDBA] bg-[#FFFBEE]"
                      }`}
                    >
                      <p
                        className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
                          !code.trim()
                            ? "text-[#B75A5A]"
                            : "text-[#946A16]"
                        }`}
                      >
                        {!code.trim()
                          ? "SOLUTION INCOMPLETE"
                          : submissionStatus || "SUBMISSION EVALUATED"}
                      </p>

                      <h3 className="mt-2 text-base font-bold">
                        {!code.trim()
                          ? "Write your solution before submitting."
                          : output}
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        {executionError
                          ? "Check that the backend and Judge0 are configured and available."
                          : "Your code was executed by Judge0 and evaluated against the problem test cases."}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
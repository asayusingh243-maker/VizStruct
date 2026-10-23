
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

const starterCode = `def find_largest(arr):
    # Write your solution here
    pass


numbers = [4, 7, 2, 9, 5]
print(find_largest(numbers))`;

const testCases = [
  {
    input: "[4, 7, 2, 9, 5]",
    expected: "9",
  },
  {
    input: "[12, 3, 8, 6]",
    expected: "12",
  },
  {
    input: "[-5, -2, -9, -1]",
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
  status: "pending" | "passed" | "failed";
};

type PracticeProblem = {
  _id: string;
  title?: string;
};

export default function PracticePage() {
  const router = useRouter();

  const [code, setCode] = useState(starterCode);

  const [output, setOutput] = useState(
    "Run your code to see the output here."
  );

  const [hasRun, setHasRun] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [esults, setResults] = useState<TestResult[]>([]);

  const [activeTab, setActiveTab] = useState<
    "testcases" | "output"
  >("testcases");

  const [hintLevel, setHintLevel] = useState(0);

  function handleRun() {
    setHasRun(true);
    setSubmitted(false);
    setActiveTab("output");

    if (!code.trim()) {
      setOutput("No code found. Write your solution first.");
      return;
    }

    if (code.includes("pass")) {
      setOutput(`Your function is not implemented yet.

Complete the function and run your code again.

Need help? Try using the Hint button.`);
      return;
    }

    setOutput(`Mock execution started.

Your code has been received successfully.

Real Python execution will be connected through Judge0 during backend integration.

For now, you can continue to the execution visualizer to inspect the learning flow.`);
  }

  async function handleSubmit() {
    setHasRun(true);
    setSubmitted(true);
    setActiveTab("testcases");

    if (!code.trim() || code.includes("pass")) {
      const incompleteResults: TestResult[] = testCases.map((test) => ({
        ...test,
        output: "Not executed",
        status: "failed",
      }));

      setResults(incompleteResults);

      setOutput(
        "Your solution is incomplete. Finish the function before submitting."
      );

      return;
    }

    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");

      if (!token) {
        setOutput("You are not logged in. Please log in again.");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured."
        );
      }

      // Get practice problems from MongoDB through the backend.
      const problemsResponse = await fetch(
        `${apiUrl}/api/practice/problems`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const problemsData = await problemsResponse.json();

      if (!problemsResponse.ok) {
        throw new Error(
          problemsData.message ||
            "Could not load practice problems."
        );
      }

      // The backend returns an array of MongoDB problem documents.
const problems: PracticeProblem[] = Array.isArray(problemsData)
  ? problemsData
  : problemsData.problems || problemsData.data || [];

// Find the existing "Find the Largest Element" document.
const problem = problems.find(
  (item: { title?: string }) =>
    item.title?.toLowerCase().includes("largest")
);

const problemId = problem?._id || problem?.id;

if (!problemId) {
  throw new Error(
    "Find the Largest Element problem was not found in the database."
  );
}
      // Save the student's code submission.
   const submitResponse = await fetch(
  `${apiUrl}/api/practice/problems/${problemId}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            code,
          }),
        }
      );

      const submitData = await submitResponse.json();

      if (!submitResponse.ok) {
        throw new Error(
          submitData.message ||
            "Could not submit the solution."
        );
      }

      // Backend currently saves the submission,
      // but real Python execution is not connected yet.
      const pendingResults: TestResult[] = testCases.map(
        (test) => ({
          ...test,
          output: "Awaiting real execution",
          status: "pending",
        })
      );

      setResults(pendingResults);

      setOutput(
        "Submission saved successfully. Real test-case evaluation will be connected through Judge0."
      );
    } catch (error) {
      console.error(
        "Practice submission error:",
        error
      );

      setOutput(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your solution."
      );
    }
  }

  function resetCode() {
    setCode(starterCode);
    setHasRun(false);
    setSubmitted(false);
    setResults([]);
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
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Progress
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-slate-700">
                      {submitted ? "Submitted" : "In progress"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/learn/arrays")}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Back to Arrays
                  </button>
                </div>
              </section>

              {/* MAIN CONTENT */}
              <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                {/* LEFT SIDE */}
                <div className="space-y-5">
                  {/* PROBLEM */}
                  <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">
                        Problem
                      </h2>

                      <span className="rounded-lg bg-[#ECE9FF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7]">
                        Arrays
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      Write a function that finds and returns the
                      largest element in an array.
                    </p>

                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Example
                      </p>

                      <div className="mt-3 space-y-2 font-mono text-sm">
                        <p>
                          Input:{" "}
                          <span className="text-[#6C5CE7]">
                            [4, 7, 2, 9, 5]
                          </span>
                        </p>

                        <p>
                          Output:{" "}
                          <span className="font-bold text-[#317C77]">
                            9
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <h3 className="text-sm font-bold">
                        Requirements
                      </h3>

                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li className="flex gap-2">
                          <span className="text-[#6C5CE7]">
                            •
                          </span>
                          Return the largest value in the array.
                        </li>

                        <li className="flex gap-2">
                          <span className="text-[#6C5CE7]">
                            •
                          </span>
                          Your solution should work with negative
                          numbers.
                        </li>

                        <li className="flex gap-2">
                          <span className="text-[#6C5CE7]">
                            •
                          </span>
                          Traverse the array instead of sorting it.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* TEST CASES */}
                  <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">
                        Test Cases
                      </h2>

                      <span className="text-xs font-semibold text-slate-400">
                        {testCases.length} cases
                      </span>
                    </div>

                    <div className="mt-5 space-y-3">
                      {testCases.map((test, index) => {
                        const result = results[index];

                        return (
                          <div
                            key={index}
                            className="rounded-2xl border border-slate-200 p-4"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-slate-500">
                                Test Case {index + 1}
                              </p>

                              {result && (
                                <span
                                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                    result.status === "passed"
                                      ? "bg-[#E4F7F5] text-[#317C77]"
                                      : result.status === "failed"
                                        ? "bg-red-50 text-red-500"
                                        : "bg-amber-50 text-amber-600"
                                  }`}
                                >
                                  {result.status}
                                </span>
                              )}
                            </div>

                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Input
                                </p>

                                <p className="mt-1 rounded-lg bg-slate-50 p-2 font-mono text-xs text-slate-700">
                                  {test.input}
                                </p>
                              </div>

                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Expected
                                </p>

                                <p className="mt-1 rounded-lg bg-slate-50 p-2 font-mono text-xs text-slate-700">
                                  {test.expected}
                                </p>
                              </div>
                            </div>

                            {result && (
                              <div className="mt-3">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Output
                                </p>

                                <p className="mt-1 rounded-lg bg-slate-50 p-2 font-mono text-xs text-slate-700">
                                  {result.output}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* HINT */}
                  {hintLevel > 0 && (
                    <div className="rounded-[26px] border border-[#8EDBD5]/40 bg-[#E4F7F5] p-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#317C77]">
                          Hint {hintLevel}
                        </span>
                      </div>

                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {hints[hintLevel - 1]}
                      </p>
                    </div>
                  )}
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
                          <span key={index}>
                            {index + 1}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#292865] px-5 py-4">
                      <p className="text-[10px] text-white/35">
                        Backend submission connected
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={showHint}
                          className="rounded-xl border border-[#8EDBD5]/30 bg-[#8EDBD5]/10 px-5 py-2.5 text-xs font-bold text-[#8EDBD5] transition hover:bg-[#8EDBD5]/20"
                        >
                          Hint
                        </button>

                        <button
                          type="button"
                          onClick={handleRun}
                          className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
                        >
                          Run Code
                        </button>

                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="rounded-xl bg-[#6C5CE7] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#5D4DD6]"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* OUTPUT */}
                  <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-1 border-b border-slate-200 px-5">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTab("testcases")
                        }
                        className={`px-4 py-3 text-xs font-bold ${
                          activeTab === "testcases"
                            ? "border-b-2 border-[#6C5CE7] text-[#6C5CE7]"
                            : "text-slate-400"
                        }`}
                      >
                        Test Cases
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveTab("output")
                        }
                        className={`px-4 py-3 text-xs font-bold ${
                          activeTab === "output"
                            ? "border-b-2 border-[#6C5CE7] text-[#6C5CE7]"
                            : "text-slate-400"
                        }`}
                      >
                        Output
                      </button>
                    </div>

                    <div className="min-h-[170px] p-5">
                      {activeTab === "testcases" ? (
                        <div>
                          <p className="text-xs font-bold text-slate-500">
                            Submission status
                          </p>

                          <p className="mt-3 text-sm leading-7 text-slate-500">
                            {submitted
                              ? "Your code has been sent to the VizStruct backend."
                              : "Submit your solution to save your progress."}
                          </p>

                          {hasRun && (
                            <div className="mt-4 rounded-xl bg-slate-50 p-4">
                              <p className="text-xs text-slate-500">
                                Test-case execution is not connected
                                yet.
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="whitespace-pre-line font-mono text-xs leading-6 text-slate-600">
                            {output}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* EXECUTION NOTE */}
                  <div className="rounded-[26px] border border-slate-200 bg-white p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Execution
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Your submission is currently saved to MongoDB.
                      Actual Python execution and test-case evaluation
                      will be added through a sandboxed execution
                      service such as Judge0.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
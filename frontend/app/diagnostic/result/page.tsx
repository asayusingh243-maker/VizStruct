"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type DiagnosticResult = {
  score: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  strengths: string[];
  weaknesses: string[];
};

export default function DiagnosticResultPage() {
  const router = useRouter();

  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadResult() {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is not configured.");
        }

        const response = await fetch(`${apiUrl}/api/diagnostic/result`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load diagnostic result."
          );
        }

        const savedResult = data.result || data;

        setResult({
          score: Number(savedResult.score ?? 0),
          correctCount: Number(savedResult.correctCount ?? 0),
          totalQuestions: Number(savedResult.totalQuestions ?? 0),
          percentage: Number(
            savedResult.percentage ??
              savedResult.scorePercentage ??
              savedResult.score ??
              0
          ),
          strengths: Array.isArray(savedResult.strengths)
            ? savedResult.strengths
            : [],
          weaknesses: Array.isArray(savedResult.weaknesses)
            ? savedResult.weaknesses
            : [],
        });
      } catch (error) {
        console.error("Diagnostic result loading error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load diagnostic result."
        );
      } finally {
        setLoading(false);
      }
    }

    loadResult();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F7FC]">
        <p className="text-sm font-semibold text-slate-500">
          Loading your diagnostic result...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F7FC] px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-[#17172B]">
            Unable to load your result
          </h1>

          <p className="mt-3 text-sm text-red-500">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-[#6C5CE7] px-5 py-3 text-sm font-bold text-white"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F7FC] px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-[#17172B]">
            No diagnostic result found
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Complete the diagnostic assessment first.
          </p>

          <button
            type="button"
            onClick={() => router.push("/diagnostic")}
            className="mt-5 rounded-xl bg-[#6C5CE7] px-5 py-3 text-sm font-bold text-white"
          >
            Take Diagnostic
          </button>
        </div>
      </main>
    );
  }

  const percentage = Math.max(0, Math.min(100, result.percentage));

  const learnerLevel =
    percentage >= 80
      ? "Advanced"
      : percentage >= 50
        ? "Intermediate"
        : "Beginner";

  const focusTopic =
    result.weaknesses.length > 0
      ? result.weaknesses[0]
      : result.strengths.length > 0
        ? result.strengths[0]
        : "Programming Fundamentals";

  const focusDescription =
    result.weaknesses.length > 0
      ? `Your diagnostic shows that ${focusTopic} needs more practice. We will prioritize this area in your personalized learning path.`
      : "Your diagnostic shows a balanced foundation. Continue building consistency through guided practice.";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7FC] text-[#17172B]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[100px]" />
        <div className="absolute -right-24 top-[350px] h-80 w-80 rounded-full bg-[#E4F7F5] blur-[100px]" />
        <div className="absolute bottom-[-100px] left-1/3 h-72 w-72 rounded-full bg-[#F1ECFF] blur-[100px]" />
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
        <header className="border-b border-[#17172B]/5 bg-[#F8F7FC]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
            <button
              type="button"
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

            <div className="flex items-center gap-2 rounded-full border border-[#CFEDE9] bg-[#EAF9F7] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#56BDB4]" />
              <span className="text-xs font-bold text-[#317C77]">
                Diagnostic Complete
              </span>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          {/* Intro */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
              YOUR DIAGNOSTIC RESULT
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              We found your{" "}
              <span className="text-[#6C5CE7]">starting point.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
              Your diagnostic has been saved to your profile. VizStruct will
              use these results to personalize your learning roadmap.
            </p>
          </div>

          {/* Score overview */}
          <div className="mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Score */}
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(23,23,43,0.06)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                OVERALL PERFORMANCE
              </p>

              <div className="mt-7 flex items-center gap-6">
                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-[#ECE9FF]">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#6C5CE7]">
                        {percentage}%
                      </p>

                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Score
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-xs font-bold text-[#6C5CE7]">
                    {learnerLevel}
                  </span>

                  <h2 className="mt-4 text-2xl font-bold">
                    {result.correctCount} / {result.totalQuestions}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Correct answers
                  </p>
                </div>
              </div>
            </div>

            {/* Personalized analysis */}
            <div className="rounded-[28px] bg-[#292865] p-7 text-white shadow-[0_20px_60px_rgba(41,40,101,0.15)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8EDBD5]">
                PERSONALIZED ANALYSIS
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                What happens next
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/75">
                Your diagnostic result has been connected to your learner
                profile. Your strengths and weaknesses will be used to
                prioritize your roadmap.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-bold text-[#CFC9FF]">
                  CURRENT FOCUS
                </p>

                <p className="mt-2 text-lg font-bold">{focusTopic}</p>

                <p className="mt-2 text-sm leading-6 text-white/70">
                  {focusDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Strengths and weaknesses */}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* Strengths */}
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(23,23,43,0.05)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#317C77]">
                YOUR STRENGTHS
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Concepts you understand well
              </h2>

              {result.strengths.length > 0 ? (
                <div className="mt-6 space-y-3">
                  {result.strengths.map((strength) => (
                    <div
                      key={strength}
                      className="flex items-center gap-3 rounded-2xl border border-[#CFEDE9] bg-[#EAF9F7] p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D5F2EE] text-sm font-bold text-[#317C77]">
                        ✓
                      </span>

                      <span className="text-sm font-semibold text-[#317C77]">
                        {strength}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  Your diagnostic did not identify a strong topic yet. Keep
                  practicing and your profile will become more precise.
                </p>
              )}
            </div>

            {/* Weaknesses */}
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(23,23,43,0.05)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B34D5A]">
                AREAS TO STRENGTHEN
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Concepts that need practice
              </h2>

              {result.weaknesses.length > 0 ? (
                <div className="mt-6 space-y-3">
                  {result.weaknesses.map((weakness) => (
                    <div
                      key={weakness}
                      className="flex items-center gap-3 rounded-2xl border border-[#F2D6DA] bg-[#FCEAEC] p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#B34D5A]">
                        !
                      </span>

                      <span className="text-sm font-semibold text-[#B34D5A]">
                        {weakness}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  No major weaknesses were identified from this diagnostic.
                </p>
              )}
            </div>
          </div>

          {/* Recommended starting point */}
          <div className="mt-6 rounded-[28px] border border-[#DCD8FF] bg-[#F0EDFF] p-7">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                  RECOMMENDED STARTING POINT
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Focus on {focusTopic}.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Your personalized roadmap will prioritize this concept based
                  on your diagnostic performance. You can continue learning
                  from there at your own pace.
                </p>
              </div>

              <div className="rounded-2xl bg-white px-6 py-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-400">
                  CURRENT LEVEL
                </p>

                <p className="mt-1 font-bold text-[#6C5CE7]">
                  {learnerLevel}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => router.push("/roadmap")}
              className="rounded-xl bg-[#6C5CE7] px-7 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(108,92,231,0.18)] transition hover:bg-[#5B4BCF]"
            >
              View My Roadmap →
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Go to Dashboard
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
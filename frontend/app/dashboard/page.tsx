"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

type UserProfile = {
  id: string;
  fullName?: string;
  email?: string;
  level?: string;
};

type LearnerProfile = {
  skillLevel?: string;
  programmingLanguages?: string[];
  strengths?: string[];
  weaknesses?: string[];
  learningPreferences?: string[];
  interests?: string[];
  goals?: string[];
};

type ProfileResponse = {
  user?: UserProfile;
  learnerProfile?: LearnerProfile | null;
};

type TopicProgress = {
  topic: string;
  attempted: number;
  solved: number;
  accuracy: number;
};

type ProgressData = {
  problemsAttempted: number;
  problemsSolved: number;
  problemsFailed: number;
  accuracy: number;
  topicsCompleted: number;
  topicProgress: TopicProgress[];
  totalSubmissions: number;
  lastActivity?: string;
};

type RoadmapTopic = {
  topic: string;
  difficulty?: string;
  order?: number;
  status?: string;
};

type RoadmapData = {
  topics?: RoadmapTopic[];
  currentTopic?: string;
  completedTopics?: string[];
};

type DiagnosticTopic = {
  topic: string;
  score: number;
  correct: number;
  total: number;
  status?: string;
};

type DiagnosticResult = {
  percentage: number;
  level: string;
  strengths: string[];
  weaknesses: string[];
  topicResults: DiagnosticTopic[];
  recommendedTopic?: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<ProfileResponse | null>(null);

  const [progress, setProgress] =
    useState<ProgressData | null>(null);

  const [roadmap, setRoadmap] =
    useState<RoadmapData | null>(null);

  const [diagnostic, setDiagnostic] =
    useState<DiagnosticResult | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token") ||
          localStorage.getItem("accessToken") ||
          sessionStorage.getItem("accessToken");

        if (!token) {
          router.push("/login");
          return;
        }

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured."
          );
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          profileResponse,
          progressResponse,
          roadmapResponse,
          diagnosticResponse,
        ] = await Promise.all([
          fetch(`${apiUrl}/api/profile`, {
            method: "GET",
            headers,
          }),

          fetch(`${apiUrl}/api/progress`, {
            method: "GET",
            headers,
          }),

          fetch(`${apiUrl}/api/roadmap`, {
            method: "GET",
            headers,
          }),

          fetch(`${apiUrl}/api/diagnostic/result`, {
            method: "GET",
            headers,
          }),
        ]);

        const profileData =
          await profileResponse.json();

        const progressData =
          await progressResponse.json();

        const roadmapData =
          await roadmapResponse.json();

        const diagnosticData =
          await diagnosticResponse.json();

        if (!profileResponse.ok) {
          throw new Error(
            profileData.message ||
              "Could not load your profile."
          );
        }

        if (!progressResponse.ok) {
          throw new Error(
            progressData.message ||
              "Could not load your progress."
          );
        }

        if (!roadmapResponse.ok) {
          throw new Error(
            roadmapData.message ||
              "Could not load your roadmap."
          );
        }

        setProfile(
          profileData.profile || null
        );

        setProgress(
          progressData.progress || null
        );

        setRoadmap(
          roadmapData.roadmap || null
        );

        /*
         * A user may not have completed a diagnostic yet.
         * In that case the dashboard can still load.
         */
        if (diagnosticResponse.ok) {
          setDiagnostic(
            diagnosticData.result || null
          );
        } else {
          setDiagnostic(null);
        }
      } catch (error) {
        console.error(
          "Dashboard loading error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading your dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  const userName =
    profile?.user?.fullName?.trim() ||
    profile?.user?.email?.split("@")[0] ||
    "Learner";

  const userLevel = formatLevel(
    profile?.user?.level ||
      profile?.learnerProfile?.skillLevel
  );

  const problemsSolved =
    progress?.problemsSolved ?? 0;

  const totalSubmissions =
    progress?.totalSubmissions ?? 0;

  const accuracy =
    progress?.accuracy ?? 0;

  const roadmapTopics =
    roadmap?.topics || [];

  const completedTopics =
    roadmap?.completedTopics || [];

  const roadmapProgress =
    roadmapTopics.length > 0
      ? Math.round(
          (completedTopics.length /
            roadmapTopics.length) *
            100
        )
      : 0;

  /*
   * Roadmap currentTopic is now generated from the
   * learner's diagnostic weaknesses/strengths.
   */
  const currentTopic =
    roadmap?.currentTopic ||
    diagnostic?.recommendedTopic ||
    diagnostic?.weaknesses?.[0] ||
    roadmapTopics[0]?.topic ||
    "Start your learning path";

  /*
   * Prefer diagnostic topic scores because those are
   * calculated directly from the user's assessment.
   *
   * This prevents the old fake fallback such as:
   * weakness = 35%.
   */
  const skillSnapshot = useMemo(() => {
    if (
      diagnostic?.topicResults &&
      diagnostic.topicResults.length > 0
    ) {
      return diagnostic.topicResults
        .slice()
        .sort((a, b) => {
          if (a.score !== b.score) {
            return b.score - a.score;
          }

          return a.topic.localeCompare(
            b.topic
          );
        })
        .slice(0, 4)
        .map((item) => ({
          name: item.topic,
          score: Math.max(
            0,
            Math.min(100, item.score)
          ),
          label:
            item.score >= 80
              ? "Strength"
              : item.score >= 60
                ? "Developing"
                : "Focus Area",
        }));
    }

    const topicProgress =
      progress?.topicProgress || [];

    if (topicProgress.length > 0) {
      return topicProgress
        .slice(0, 4)
        .map((item) => ({
          name: item.topic,
          score: Math.max(
            0,
            Math.min(100, item.accuracy)
          ),
          label:
            item.solved > 0
              ? `${item.solved} solved`
              : item.attempted > 0
                ? "Needs practice"
                : "Not started",
        }));
    }

    const strengths =
      profile?.learnerProfile?.strengths ||
      [];

    const weaknesses =
      profile?.learnerProfile?.weaknesses ||
      [];

    return [
      ...strengths.map((topic) => ({
        name: topic,
        score: 100,
        label: "Strength",
      })),

      ...weaknesses.map((topic) => ({
        name: topic,
        score: 0,
        label: "Focus Area",
      })),
    ].slice(0, 4);
  }, [
    diagnostic,
    progress,
    profile,
  ]);

  const visibleRoadmap =
    roadmapTopics.slice(0, 3);

  const strengths =
    diagnostic?.strengths?.length
      ? diagnostic.strengths
      : profile?.learnerProfile?.strengths ||
        [];

  const weaknesses =
    diagnostic?.weaknesses?.length
      ? diagnostic.weaknesses
      : profile?.learnerProfile?.weaknesses ||
        [];

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
        <div className="flex min-h-screen">
          <AppSidebar />

          <div className="min-w-0 flex-1">
            <DashboardHeader />

            <div className="flex min-h-[80vh] items-center justify-center">
              <p className="text-sm font-semibold text-slate-400">
                Loading your personalized dashboard...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
        <div className="flex min-h-screen">
          <AppSidebar />

          <div className="min-w-0 flex-1">
            <DashboardHeader />

            <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center px-6">
              <div className="w-full rounded-[26px] border border-red-100 bg-white p-8 text-center shadow-sm">
                <h1 className="text-xl font-bold">
                  Could not load your dashboard
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    window.location.reload()
                  }
                  className="mt-6 rounded-xl bg-[#6C5CE7] px-5 py-3 text-sm font-bold text-white"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <DashboardHeader />

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[110px]" />

              <div className="absolute -left-20 top-[500px] h-72 w-72 rounded-full bg-[#E4F7F5] blur-[100px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
              {/* Header */}
              <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                    YOUR LEARNING SPACE
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    Welcome, {userName}
                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                    Your dashboard is personalized from
                    your profile, diagnostic performance,
                    progress, and roadmap.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#CFEDE9] bg-[#EAF9F7] px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#56BDB4]" />

                  <span className="text-xs font-bold text-[#317C77]">
                    Learning path active
                  </span>
                </div>
              </section>

              {/* Main learning card */}
              <section className="mt-8 grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
                <div className="relative overflow-hidden rounded-[28px] bg-[#292865] p-7 text-white shadow-[0_20px_60px_rgba(41,40,101,0.15)] sm:p-8">
                  <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#6C5CE7]/30 blur-3xl" />

                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#8EDBD5]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8EDBD5]">
                        Continue Learning
                      </span>

                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/60">
                        Personalized for you
                      </span>
                    </div>

                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                      Current Concept
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                      {currentTopic}
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                      Your current concept is selected
                      from your personalized roadmap and
                      diagnostic performance.
                    </p>

                    <div className="mt-7 max-w-lg">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/45">
                          Roadmap progress
                        </span>

                        <span className="font-bold text-[#8EDBD5]">
                          {roadmapProgress}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#8EDBD5]"
                          style={{
                            width: `${roadmapProgress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          router.push("/roadmap")
                        }
                        className="rounded-xl bg-[#6C5CE7] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#5B4BCF]"
                      >
                        Continue Learning →
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          router.push("/roadmap")
                        }
                        className="rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white/70"
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
                      {getCompanionMessage(
                        strengths,
                        weaknesses,
                        currentTopic
                      )}
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
                <StatCard
                  label="Current Level"
                  value={userLevel}
                  note="From your profile"
                />

                <StatCard
                  label="Problems Solved"
                  value={String(problemsSolved)}
                  note="Saved progress"
                />

                <StatCard
                  label="Total Submissions"
                  value={String(totalSubmissions)}
                  note="Saved submissions"
                />

                <StatCard
                  label="Accuracy"
                  value={`${accuracy}%`}
                  note="Based on submissions"
                />
              </section>

              {/* Skills + roadmap */}
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
                      onClick={() =>
                        router.push(
                          "/diagnostic/result"
                        )
                      }
                      className="text-xs font-bold text-[#6C5CE7]"
                    >
                      Full analysis →
                    </button>
                  </div>

                  {skillSnapshot.length > 0 ? (
                    <div className="mt-7 space-y-5">
                      {skillSnapshot.map(
                        (item) => (
                          <div key={item.name}>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-bold">
                                  {item.name}
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-400">
                                  {item.label}
                                </p>
                              </div>

                              <span className="text-xs font-bold text-slate-500">
                                {item.score}%
                              </span>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#ECEAF2]">
                              <div
                                className="h-full rounded-full bg-[#6C5CE7]"
                                style={{
                                  width: `${item.score}%`,
                                }}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="mt-7 rounded-2xl bg-[#F8F7FC] p-5 text-center">
                      <p className="text-sm text-slate-500">
                        Complete your diagnostic to
                        build your concept profile.
                      </p>
                    </div>
                  )}
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
                      onClick={() =>
                        router.push("/roadmap")
                      }
                      className="text-xs font-bold text-[#6C5CE7]"
                    >
                      View all →
                    </button>
                  </div>

                  {visibleRoadmap.length > 0 ? (
                    <div className="mt-6 space-y-3">
                      {visibleRoadmap.map(
                        (item, index) => (
                          <div
                            key={`${item.topic}-${index}`}
                            className={`flex items-center gap-4 rounded-2xl border p-4 ${
                              item.status ===
                              "in_progress"
                                ? "border-[#CFC9FF] bg-[#F8F7FF]"
                                : "border-slate-100 bg-[#FCFBFD]"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                                item.status ===
                                "in_progress"
                                  ? "bg-[#6C5CE7] text-white"
                                  : item.status ===
                                      "completed"
                                    ? "bg-[#E4F7F5] text-[#317C77]"
                                    : "bg-[#ECE9FF] text-[#6C5CE7]"
                              }`}
                            >
                              {item.status ===
                              "completed"
                                ? "✓"
                                : String(
                                    item.order ||
                                      index + 1
                                  ).padStart(
                                    2,
                                    "0"
                                  )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold">
                                {item.topic}
                              </p>

                              <p className="mt-1 text-[10px] text-slate-400">
                                {formatRoadmapStatus(
                                  item.status
                                )}
                              </p>
                            </div>

                            {item.status ===
                              "in_progress" && (
                              <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-[9px] font-bold text-[#6C5CE7]">
                                Current
                              </span>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="mt-6 rounded-2xl bg-[#F8F7FC] p-5 text-center">
                      <p className="text-sm text-slate-500">
                        Your roadmap will appear after
                        your diagnostic.
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

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(23,23,43,0.035)]">
      <p className="text-xs font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-3 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {note}
      </p>
    </div>
  );
}

function formatLevel(level?: string) {
  if (!level) {
    return "Beginner";
  }

  return (
    level.charAt(0).toUpperCase() +
    level.slice(1).toLowerCase()
  );
}

function formatRoadmapStatus(
  status?: string
) {
  if (status === "in_progress") {
    return "Currently learning";
  }

  if (status === "completed") {
    return "Completed";
  }

  return "Not started";
}

function getCompanionMessage(
  strengths: string[],
  weaknesses: string[],
  currentTopic: string
) {
  if (
    strengths.length > 0 &&
    weaknesses.length > 0
  ) {
    return `Your strengths include ${strengths
      .slice(0, 2)
      .join(
        " and "
      )}. Focus next on ${weaknesses
      .slice(0, 2)
      .join(
        " and "
      )} while continuing with ${currentTopic}.`;
  }

  if (weaknesses.length > 0) {
    return `Your current focus is ${weaknesses
      .slice(0, 2)
      .join(
        " and "
      )}. Continue with ${currentTopic} to strengthen your foundation.`;
  }

  if (strengths.length > 0) {
    return `You are showing strength in ${strengths
      .slice(0, 2)
      .join(
        " and "
      )}. Keep building from those concepts as you work through ${currentTopic}.`;
  }

  return `Your learning path is currently focused on ${currentTopic}. Complete more activities and VizStruct will personalize your recommendations further.`;
}
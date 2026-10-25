"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

type RoadmapTopic = {
  topic: string;
  difficulty?: string;
  order?: number;
  status?: "completed" | "in_progress" | "not_started" | "current" | "next";
};

type RoadmapData = {
  topics?: RoadmapTopic[];
  currentTopic?: string;
  completedTopics?: string[];
};

type LearnerProfile = {
  skillLevel?: string;
  strengths?: string[];
  weaknesses?: string[];
};

type UserProfile = {
  fullName?: string;
  email?: string;
  level?: string;
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

export default function RoadmapPage() {
  const router = useRouter();

  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRoadmap() {
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

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is not configured.");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [roadmapResponse, profileResponse, progressResponse] =
          await Promise.all([
            fetch(`${apiUrl}/api/roadmap`, {
              method: "GET",
              headers,
            }),

            fetch(`${apiUrl}/api/profile`, {
              method: "GET",
              headers,
            }),

            fetch(`${apiUrl}/api/progress`, {
              method: "GET",
              headers,
            }),
          ]);

        const roadmapData = await roadmapResponse.json();
        const profileData = await profileResponse.json();
        const progressData = await progressResponse.json();

        if (!roadmapResponse.ok) {
          throw new Error(
            roadmapData.message || "Could not load your roadmap."
          );
        }

        if (!profileResponse.ok) {
          throw new Error(
            profileData.message || "Could not load your profile."
          );
        }

        if (!progressResponse.ok) {
          throw new Error(
            progressData.message || "Could not load your progress."
          );
        }

        setRoadmap(roadmapData.roadmap || null);
        setProfile(profileData.profile || null);
        setProgress(progressData.progress || null);
      } catch (error) {
        console.error("Roadmap loading error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading your roadmap."
        );
      } finally {
        setLoading(false);
      }
    }

    loadRoadmap();
  }, [router]);

  const topics = roadmap?.topics || [];

  const completedTopics = roadmap?.completedTopics || [];

  const strengths = profile?.learnerProfile?.strengths || [];

  const weaknesses = profile?.learnerProfile?.weaknesses || [];

  const currentTopic =
    roadmap?.currentTopic ||
    topics.find(
      (topic) =>
        topic.status === "in_progress" || topic.status === "current"
    )?.topic ||
    topics.find((topic) => topic.status !== "completed")?.topic ||
    topics[0]?.topic ||
    "Start your learning path";

  const currentLevel = formatLevel(
    profile?.user?.level || profile?.learnerProfile?.skillLevel
  );

  const overallProgress =
    topics.length > 0
      ? Math.round((completedTopics.length / topics.length) * 100)
      : 0;

  const topicProgressMap = useMemo(() => {
    const map = new Map<string, TopicProgress>();

    for (const item of progress?.topicProgress || []) {
      map.set(item.topic.trim().toLowerCase(), item);
    }

    return map;
  }, [progress]);

  const getTopicProgress = (topic: string) => {
    const item = topicProgressMap.get(topic.trim().toLowerCase());

    if (!item) {
      return 0;
    }

    return Math.max(0, Math.min(100, item.accuracy));
  };

  const currentTopicProgress = getTopicProgress(currentTopic);

  const visibleTopics = topics;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
        <div className="flex min-h-screen">
          <AppSidebar />

          <div className="min-w-0 flex-1">
            <DashboardHeader />

            <div className="flex min-h-[80vh] items-center justify-center">
              <p className="text-sm font-semibold text-slate-400">
                Building your personalized roadmap...
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
                  Could not load your roadmap
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
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
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[110px]" />

              <div className="absolute -left-24 top-[600px] h-72 w-72 rounded-full bg-[#E4F7F5] blur-[110px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
              {/* Header */}
              <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                    PERSONALIZED ROADMAP
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    Your learning path
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    This roadmap is generated from your diagnostic performance
                    and saved learning progress.
                  </p>
                </div>

                <div className="rounded-full border border-[#CFEDE9] bg-[#EAF9F7] px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#56BDB4]" />

                    <span className="text-xs font-bold text-[#317C77]">
                      Adaptive roadmap active
                    </span>
                  </div>
                </div>
              </section>

              {/* Overview */}
              <section className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
                  <p className="text-xs font-semibold text-slate-400">
                    Overall Progress
                  </p>

                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-3xl font-bold">
                      {overallProgress}%
                    </p>

                    <span className="text-xs font-semibold text-[#6C5CE7]">
                      {completedTopics.length} of {topics.length} completed
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F0EEF5]">
                    <div
                      className="h-full rounded-full bg-[#6C5CE7]"
                      style={{
                        width: `${overallProgress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
                  <p className="text-xs font-semibold text-slate-400">
                    Current Focus
                  </p>

                  <p className="mt-3 text-xl font-bold">
                    {currentTopic}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Selected from your personalized roadmap
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
                  <p className="text-xs font-semibold text-slate-400">
                    Current Level
                  </p>

                  <p className="mt-3 text-xl font-bold">
                    {currentLevel}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Based on your learner profile
                  </p>
                </div>
              </section>

              {/* Main */}
              <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_0.75fr]">
                {/* Learning journey */}
                <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_45px_rgba(23,23,43,0.04)] sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        LEARNING JOURNEY
                      </p>

                      <h2 className="mt-2 text-xl font-bold">
                        Recommended sequence
                      </h2>
                    </div>

                    <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-[10px] font-bold text-[#6C5CE7]">
                      Personalized
                    </span>
                  </div>

                  {visibleTopics.length === 0 ? (
                    <div className="mt-8 rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                      <p className="text-sm font-semibold text-slate-500">
                        No roadmap topics are available yet.
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        Complete your diagnostic assessment to generate your
                        personalized learning path.
                      </p>

                      <button
                        type="button"
                        onClick={() => router.push("/diagnostic")}
                        className="mt-5 rounded-xl bg-[#6C5CE7] px-5 py-3 text-xs font-bold text-white"
                      >
                        Take Diagnostic
                      </button>
                    </div>
                  ) : (
                    <div className="mt-8">
                      {visibleTopics.map((item, index) => {
                        const isCompleted =
                          item.status === "completed";

                        const isCurrent =
                          item.topic.trim().toLowerCase() ===
                          currentTopic.trim().toLowerCase();

                        const isNext =
                          !isCompleted &&
                          !isCurrent &&
                          index >
                            visibleTopics.findIndex(
                              (topic) =>
                                topic.topic
                                  .trim()
                                  .toLowerCase() ===
                                currentTopic
                                  .trim()
                                  .toLowerCase()
                            );

                        const progressValue = getTopicProgress(
                          item.topic
                        );

                        return (
                          <div
                            key={`${item.topic}-${item.order || index}`}
                            className="relative flex gap-4"
                          >
                            {/* Timeline */}
                            <div className="flex w-12 shrink-0 flex-col items-center">
                              <div
                                className={`z-10 flex h-11 w-11 items-center justify-center rounded-xl text-xs font-bold ${
                                  isCompleted
                                    ? "bg-[#E4F7F5] text-[#317C77]"
                                    : isCurrent
                                    ? "bg-[#6C5CE7] text-white shadow-lg shadow-[#6C5CE7]/20"
                                    : "bg-[#ECE9FF] text-[#6C5CE7]"
                                }`}
                              >
                                {isCompleted
                                  ? "✓"
                                  : String(index + 1).padStart(2, "0")}
                              </div>

                              {index !== visibleTopics.length - 1 && (
                                <div
                                  className={`min-h-[105px] w-[2px] flex-1 ${
                                    isCompleted
                                      ? "bg-[#8EDBD5]"
                                      : "bg-[#E8E6EE]"
                                  }`}
                                />
                              )}
                            </div>

                            {/* Topic card */}
                            <div
                              className={`mb-4 min-w-0 flex-1 rounded-2xl border p-5 transition ${
                                isCurrent
                                  ? "border-[#CFC9FF] bg-[#F8F7FF]"
                                  : "border-slate-200/80 bg-white"
                              }`}
                            >
                              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-bold">
                                      {item.topic}
                                    </h3>

                                    {isCompleted && (
                                      <span className="rounded-full bg-[#E4F7F5] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#317C77]">
                                        Completed
                                      </span>
                                    )}

                                    {isCurrent && (
                                      <span className="rounded-full bg-[#ECE9FF] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#6C5CE7]">
                                        Current
                                      </span>
                                    )}

                                    {isNext && (
                                      <span className="rounded-full bg-[#F4F2FF] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#6C5CE7]">
                                        Next
                                      </span>
                                    )}
                                  </div>

                                  <p className="mt-2 text-xs leading-5 text-slate-500">
                                    {getTopicDescription(
                                      item.topic,
                                      isCompleted,
                                      isCurrent
                                    )}
                                  </p>

                                  <p className="mt-3 text-[10px] font-semibold uppercase text-slate-400">
                                    {String(
                                      item.difficulty || "easy"
                                    ).toUpperCase()}{" "}
                                    DIFFICULTY
                                  </p>
                                </div>

                                {isCurrent && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      router.push("/learn")
                                    }
                                    className="shrink-0 rounded-xl bg-[#6C5CE7] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#5B4BCF]"
                                  >
                                    Continue →
                                  </button>
                                )}

                                {!isCurrent && !isCompleted && (
                                  <div className="text-lg text-slate-300">
                                    →
                                  </div>
                                )}
                              </div>

                              {isCurrent && (
                                <div className="mt-5">
                                  <div className="flex justify-between text-[10px]">
                                    <span className="font-semibold text-slate-400">
                                      Concept progress
                                    </span>

                                    <span className="font-bold text-[#6C5CE7]">
                                      {progressValue}%
                                    </span>
                                  </div>

                                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E8E5F5]">
                                    <div
                                      className="h-full rounded-full bg-[#6C5CE7]"
                                      style={{
                                        width: `${progressValue}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right column */}
                <div className="space-y-5">
                  {/* Why this path */}
                  <div className="rounded-[28px] bg-[#292865] p-6 text-white">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#8EDBD5]" />

                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8EDBD5]">
                        WHY THIS PATH?
                      </p>
                    </div>

                    <h2 className="mt-4 text-xl font-bold">
                      Built from your diagnostic
                    </h2>

                    <p className="mt-3 text-xs leading-6 text-white/60">
                      Your roadmap uses your saved learner profile and
                      diagnostic performance to determine what you should
                      work on next.
                    </p>

                    {/* Strengths */}
                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                        YOUR STRENGTHS
                      </p>

                      {strengths.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {strengths.map((strength) => (
                            <span
                              key={strength}
                              className="rounded-full bg-[#8EDBD5]/15 px-3 py-1.5 text-[10px] font-bold text-[#8EDBD5]"
                            >
                              ✓ {strength}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-3 text-xs text-white/50">
                          Complete the diagnostic to identify strengths.
                        </p>
                      )}
                    </div>

                    {/* Focus areas */}
                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                        FOCUS AREAS
                      </p>

                      {weaknesses.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {weaknesses.map((area) => (
                            <span
                              key={area}
                              className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/75"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-3 text-xs text-white/50">
                          No focus areas identified yet.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Current focus */}
                  <div className="rounded-[28px] border border-[#DCD8FF] bg-[#F0EDFF] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      CURRENT FOCUS
                    </p>

                    <h3 className="mt-3 text-xl font-bold">
                      {currentTopic}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      This concept was selected based on your current roadmap
                      state and diagnostic performance.
                    </p>

                    <button
                      type="button"
                      onClick={() => router.push("/learn")}
                      className="mt-5 w-full rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#6C5CE7] shadow-sm transition hover:bg-[#FAF9FF]"
                    >
                      Continue Learning →
                    </button>
                  </div>

                  {/* Adaptive learning */}
                  <div className="rounded-[28px] border border-slate-200/80 bg-white p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      ADAPTIVE LEARNING
                    </p>

                    <h3 className="mt-3 text-lg font-bold">
                      Your path can change.
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      As you complete lessons and solve problems, your saved
                      progress can be used to refine future recommendations.
                    </p>

                    <div className="mt-5 space-y-3">
                      {[
                        ["01", "Complete lessons"],
                        ["02", "Solve coding problems"],
                        ["03", "Analyze mistakes"],
                        ["04", "Update recommendations"],
                      ].map(([number, label]) => (
                        <div
                          key={number}
                          className="flex items-center gap-3 rounded-xl bg-[#F8F7FC] p-3"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-[#6C5CE7]">
                            {number}
                          </div>

                          <p className="text-xs font-semibold text-slate-600">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Companion */}
                  <div className="rounded-[28px] border border-slate-200/80 bg-white p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECE9FF] text-xs font-bold text-[#6C5CE7]">
                        VS
                      </div>

                      <div>
                        <p className="text-sm font-bold">
                          Learning Companion
                        </p>

                        <p className="text-[10px] text-slate-400">
                          Roadmap guidance
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-xs leading-6 text-slate-500">
                      {getCompanionMessage(
                        strengths,
                        weaknesses,
                        currentTopic
                      )}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function formatLevel(level?: string) {
  if (!level) {
    return "Learner";
  }

  return level
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getTopicDescription(
  topic: string,
  completed: boolean,
  current: boolean
) {
  if (completed) {
    return `You have completed ${topic} and can continue building on this foundation.`;
  }

  if (current) {
    return `This is your current personalized learning focus based on your diagnostic and saved progress.`;
  }

  return `This topic will become relevant as you progress through your personalized learning path.`;
}

function getCompanionMessage(
  strengths: string[],
  weaknesses: string[],
  currentTopic: string
) {
  if (strengths.length > 0 && weaknesses.length > 0) {
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
    return `Your current focus areas are ${weaknesses
      .slice(0, 2)
      .join(
        " and "
      )}. Continue with ${currentTopic} and build confidence through practice.`;
  }

  if (strengths.length > 0) {
    return `You are showing strength in ${strengths
      .slice(0, 2)
      .join(
        " and "
      )}. Keep building on those foundations while progressing through ${currentTopic}.`;
  }

  return `Complete your diagnostic and continue learning to receive personalized guidance for ${currentTopic}.`;
}
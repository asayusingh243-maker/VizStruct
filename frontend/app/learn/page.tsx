"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

type RoadmapTopic = {
  topic: string;
  difficulty: string;
  order: number;
  status: "not_started" | "in_progress" | "completed" | string;
};

type Roadmap = {
  topics: RoadmapTopic[];
  currentTopic?: string;
  completedTopics?: string[];
};

type Profile = {
  user?: {
    id?: string;
    fullName?: string;
    email?: string;
    level?: string;
  };
  learnerProfile?: {
    strengths?: string[];
    weaknesses?: string[];
  };
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  roadmap?: T;
  profile?: T;
};

function formatLevel(level?: string) {
  if (!level) {
    return "Not assessed";
  }

  return level.charAt(0).toUpperCase() + level.slice(1);
}

function formatDifficulty(difficulty?: string) {
  if (!difficulty) {
    return "Difficulty not set";
  }

  return `${difficulty.charAt(0).toUpperCase()}${difficulty.slice(1)} difficulty`;
}

function getTopicDescription(topic: string, status: string) {
  const normalized = topic.trim().toLowerCase();

  const descriptions: Record<string, string> = {
    "programming fundamentals":
      "Build the core programming concepts needed for the rest of your learning path.",

    variables:
      "Practice storing, updating, and using values while building a strong programming foundation.",

    conditions:
      "Strengthen decision-making with conditional logic and clear control flow.",

    loops:
      "Practice repetition, iteration, loop conditions, and boundary reasoning.",

    arrays:
      "Learn indexing, traversal, element access, and common array operations.",

    strings:
      "Work with text data, indexing, traversal, and common string operations.",

    hashing:
      "Learn efficient lookup, frequency counting, and key-value based problem solving.",

    recursion:
      "Build recursive thinking by breaking problems into smaller versions of themselves.",

    trees:
      "Understand hierarchical data structures, traversal, and tree-based reasoning.",

    graphs:
      "Develop graph thinking through nodes, edges, traversal, and connectivity.",

    "dynamic programming":
      "Learn how to break complex problems into reusable subproblems and states.",
  };

  if (descriptions[normalized]) {
    return descriptions[normalized];
  }

  if (status === "completed") {
    return `You completed ${topic}. Review it when your future practice indicates reinforcement is needed.`;
  }

  if (status === "in_progress") {
    return `${topic} is currently part of your active personalized learning path.`;
  }

  return `${topic} will become relevant as you progress through your personalized learning path.`;
}

function getTopicProgress(topic: RoadmapTopic) {
  if (topic.status === "completed") {
    return 100;
  }

  if (topic.status === "in_progress") {
    return 0;
  }

  return 0;
}

function getTopicStatusLabel(topic: RoadmapTopic) {
  if (topic.status === "completed") {
    return "Completed";
  }

  if (topic.status === "in_progress") {
    return "Continue";
  }

  return "Upcoming";
}

function getTopicRoute(topic: string) {
  const normalized = topic.trim().toLowerCase();

  /*
   * At the moment VizStruct has a dedicated lesson page
   * for Arrays. Other topics stay on the personalized
   * learning page until their dedicated lesson pages exist.
   */
  if (normalized === "arrays") {
    return "/learn/arrays";
  }

  return "/learn";
}

export default function LearnPage() {
  const router = useRouter();

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLearningData() {
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
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured."
          );
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [roadmapResponse, profileResponse] =
          await Promise.all([
            fetch(`${apiUrl}/api/roadmap`, {
              headers,
            }),

            fetch(`${apiUrl}/api/profile`, {
              headers,
            }),
          ]);

        const roadmapData: ApiResponse<Roadmap> =
          await roadmapResponse.json();

        const profileData: ApiResponse<Profile> =
          await profileResponse.json();

        if (!roadmapResponse.ok) {
          throw new Error(
            roadmapData.message ||
              "Failed to load your learning roadmap."
          );
        }

        if (!profileResponse.ok) {
          throw new Error(
            profileData.message ||
              "Failed to load your profile."
          );
        }

        setRoadmap(roadmapData.roadmap || null);
        setProfile(profileData.profile || null);
      } catch (error) {
        console.error(
          "Learn page loading error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load your personalized learning path."
        );
      } finally {
        setLoading(false);
      }
    }

    loadLearningData();
  }, [router]);

  const topics = roadmap?.topics || [];

  const completedCount = useMemo(() => {
    return topics.filter(
      (topic) => topic.status === "completed"
    ).length;
  }, [topics]);

  const overallProgress =
    topics.length > 0
      ? Math.round((completedCount / topics.length) * 100)
      : 0;

  const currentTopic = useMemo(() => {
    if (!roadmap) {
      return null;
    }

    const savedCurrentTopic =
      roadmap.currentTopic?.trim().toLowerCase();

    if (savedCurrentTopic) {
      const matchingTopic = topics.find(
        (topic) =>
          topic.topic.trim().toLowerCase() ===
          savedCurrentTopic
      );

      if (matchingTopic) {
        return matchingTopic;
      }
    }

    return (
      topics.find(
        (topic) => topic.status === "in_progress"
      ) ||
      topics.find(
        (topic) => topic.status !== "completed"
      ) ||
      topics[0] ||
      null
    );
  }, [roadmap, topics]);

  const strengths =
    profile?.learnerProfile?.strengths || [];

  const weaknesses =
    profile?.learnerProfile?.weaknesses || [];

  const displayName =
    profile?.user?.fullName?.trim() || "Learner";

  const currentLevel = formatLevel(
    profile?.user?.level
  );

  function handleContinue(topic: RoadmapTopic) {
    const route = getTopicRoute(topic.topic);

    if (route === "/learn") {
      router.push("/roadmap");
      return;
    }

    router.push(route);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17172B]">
              <span className="font-bold text-white">
                V
              </span>
            </div>

            <p className="text-sm font-semibold">
              Loading your learning path...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Preparing your personalized content
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              !
            </div>

            <h1 className="mt-4 text-xl font-bold">
              Unable to load your learning path
            </h1>

            <p className="mt-3 text-sm leading-6 text-red-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 rounded-xl bg-[#6C5CE7] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#5B4BCF]"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!roadmap || topics.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-bold">
              Your learning path is not ready yet
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Complete your diagnostic assessment so
              VizStruct can create a personalized learning
              path for you.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/diagnostic")
              }
              className="mt-6 rounded-xl bg-[#6C5CE7] px-5 py-3 text-xs font-bold text-white"
            >
              Take Diagnostic →
            </button>
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
              <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[110px]" />

              <div className="absolute -left-24 top-[600px] h-72 w-72 rounded-full bg-[#E4F7F5] blur-[110px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
              {/* PAGE HEADER */}
              <section className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                  PERSONALIZED LEARNING
                </p>

                <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                  <div>
                    <h1 className="text-3xl font-bold tracking-[-0.04em]">
                      Welcome, {displayName}
                    </h1>

                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                      Your learning path is based on your
                      saved profile, diagnostic performance,
                      and roadmap progress.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-[13px] border border-slate-200 bg-white px-4 py-2.5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        OVERALL PROGRESS
                      </p>

                      <p className="mt-0.5 text-lg font-bold">
                        {overallProgress}%
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ADAPTIVE SUMMARY */}
              <section className="mb-6 rounded-[22px] bg-[#17172B] p-5 text-white sm:p-6">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8EDBD5]">
                      ADAPTIVE LEARNING PATH
                    </p>

                    <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] sm:text-2xl">
                      {currentTopic
                        ? `Focus on ${currentTopic.topic}.`
                        : "Continue your personalized path."}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-white/50">
                      {currentTopic
                        ? getTopicDescription(
                            currentTopic.topic,
                            currentTopic.status
                          )
                        : "Your roadmap will determine what you should work on next."}
                    </p>
                  </div>

                  {currentTopic && (
                    <button
                      type="button"
                      onClick={() =>
                        handleContinue(currentTopic)
                      }
                      className="w-fit shrink-0 rounded-[12px] bg-white px-5 py-3 text-xs font-bold text-[#17172B] transition hover:-translate-y-0.5"
                    >
                      Continue Learning →
                    </button>
                  )}
                </div>
              </section>

              {/* CURRENT FOCUS */}
              <section className="mb-6">
                <div className="mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    CURRENT FOCUS
                  </p>

                  <h2 className="mt-1 text-lg font-bold">
                    {currentTopic?.topic ||
                      "Personalized Learning"}
                  </h2>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1fr_270px]">
                  {/* CURRENT COURSE */}
                  <div className="rounded-[20px] border border-slate-200 bg-white p-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#ECE9FF] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6C5CE7]">
                            {currentTopic?.status ===
                            "completed"
                              ? "COMPLETED"
                              : "IN PROGRESS"}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[9px] font-bold text-slate-500">
                            {formatDifficulty(
                              currentTopic?.difficulty
                            )}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-bold tracking-[-0.03em]">
                          {currentTopic?.topic}
                        </h3>

                        <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
                          {currentTopic
                            ? getTopicDescription(
                                currentTopic.topic,
                                currentTopic.status
                              )
                            : ""}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-xl font-bold">
                          {currentTopic
                            ? getTopicProgress(
                                currentTopic
                              )
                            : 0}
                          %
                        </p>

                        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          COMPLETE
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#6C5CE7] transition-all"
                        style={{
                          width: `${
                            currentTopic
                              ? getTopicProgress(
                                  currentTopic
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>

                    <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                      {currentTopic && (
                        <button
                          type="button"
                          onClick={() =>
                            handleContinue(currentTopic)
                          }
                          className="rounded-[11px] bg-[#6C5CE7] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#5D4FD3]"
                        >
                          Continue Learning
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          router.push("/practice")
                        }
                        className="rounded-[11px] border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                      >
                        Practice
                      </button>
                    </div>
                  </div>

                  {/* PERSONALIZED FOCUS */}
                  <div className="rounded-[20px] bg-[#ECE9FF] p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#6C5CE7]">
                      PERSONALIZED FOCUS
                    </p>

                    <h3 className="mt-2 text-base font-bold">
                      Based on your profile
                    </h3>

                    <div className="mt-3 space-y-2">
                      {weaknesses.length > 0 ? (
                        weaknesses
                          .slice(0, 3)
                          .map((weakness) => (
                            <div
                              key={weakness}
                              className="rounded-[12px] bg-white px-3.5 py-2.5"
                            >
                              <p className="text-xs font-bold">
                                {weakness}
                              </p>

                              <p className="mt-0.5 text-[10px] text-slate-400">
                                Focus area from your learner
                                profile
                              </p>
                            </div>
                          ))
                      ) : strengths.length > 0 ? (
                        strengths
                          .slice(0, 3)
                          .map((strength) => (
                            <div
                              key={strength}
                              className="rounded-[12px] bg-white px-3.5 py-2.5"
                            >
                              <p className="text-xs font-bold">
                                {strength}
                              </p>

                              <p className="mt-0.5 text-[10px] text-slate-400">
                                Current strength
                              </p>
                            </div>
                          ))
                      ) : (
                        <div className="rounded-[12px] bg-white px-3.5 py-2.5">
                          <p className="text-xs font-bold">
                            {currentTopic?.topic}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Current personalized focus
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* LEARNING PATH */}
              <section>
                <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      YOUR PATH
                    </p>

                    <h2 className="mt-1 text-lg font-bold">
                      Personalized Learning Sequence
                    </h2>
                  </div>

                  <p className="text-xs text-slate-400">
                    {completedCount} of {topics.length} topics
                    completed
                  </p>
                </div>

                <div className="space-y-3">
                  {topics.map((topic) => {
                    const progress =
                      getTopicProgress(topic);

                    const isActive =
                      topic.status === "in_progress";

                    const isCompleted =
                      topic.status === "completed";

                    return (
                      <div
                        key={`${topic.order}-${topic.topic}`}
                        className={`rounded-[20px] border p-4 sm:p-5 ${
                          isActive
                            ? "border-[#DCD8FF] bg-white"
                            : "border-slate-200 bg-white/70"
                        }`}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          {/* NUMBER */}
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-xs font-bold ${
                              isActive
                                ? "bg-[#6C5CE7] text-white"
                                : isCompleted
                                ? "bg-[#E4F7F5] text-[#317C77]"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {isCompleted
                              ? "✓"
                              : String(
                                  topic.order
                                ).padStart(2, "0")}
                          </div>

                          {/* CONTENT */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-bold sm:text-base">
                                {topic.topic}
                              </h3>

                              {isActive && (
                                <span className="rounded-full bg-[#ECE9FF] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#6C5CE7]">
                                  Current
                                </span>
                              )}

                              {isCompleted && (
                                <span className="rounded-full bg-[#E4F7F5] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#317C77]">
                                  Completed
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {getTopicDescription(
                                topic.topic,
                                topic.status
                              )}
                            </p>

                            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                              {formatDifficulty(
                                topic.difficulty
                              )}
                            </p>

                            {isActive && (
                              <div className="mt-3">
                                <div className="flex justify-between text-[9px]">
                                  <span className="font-semibold text-slate-400">
                                    Topic progress
                                  </span>

                                  <span className="font-bold text-[#6C5CE7]">
                                    {progress}%
                                  </span>
                                </div>

                                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                  <div
                                    className="h-full rounded-full bg-[#6C5CE7]"
                                    style={{
                                      width: `${progress}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* STATUS */}
                          <div className="flex items-center justify-between gap-3 sm:shrink-0">
                            <span
                              className={`text-[10px] font-bold ${
                                isActive
                                  ? "text-[#6C5CE7]"
                                  : isCompleted
                                  ? "text-[#317C77]"
                                  : "text-slate-400"
                              }`}
                            >
                              {getTopicStatusLabel(
                                topic
                              )}
                            </span>

                            {isActive ? (
                              <button
                                type="button"
                                onClick={() =>
                                  handleContinue(topic)
                                }
                                className="rounded-[10px] border border-[#DCD8FF] px-4 py-2 text-[10px] font-bold text-[#6C5CE7] transition hover:bg-[#ECE9FF]"
                              >
                                Open
                              </button>
                            ) : (
                              <span className="rounded-[10px] bg-slate-100 px-4 py-2 text-[10px] font-bold text-slate-400">
                                {isCompleted
                                  ? "Done"
                                  : "Upcoming"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* PERSONALIZATION SUMMARY */}
              <section className="mt-5 rounded-[20px] border border-slate-200 bg-white p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      PERSONALIZATION SUMMARY
                    </p>

                    <h3 className="mt-2 text-base font-bold">
                      Your learning path adapts to you
                    </h3>

                    <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-500">
                      Your current level is{" "}
                      <span className="font-semibold text-slate-700">
                        {currentLevel}
                      </span>
                      . The roadmap contains{" "}
                      <span className="font-semibold text-slate-700">
                        {topics.length}
                      </span>{" "}
                      topics, with{" "}
                      <span className="font-semibold text-slate-700">
                        {completedCount}
                      </span>{" "}
                      completed so far.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      router.push("/roadmap")
                    }
                    className="rounded-[11px] border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    View Full Roadmap →
                  </button>
                </div>
              </section>

              {/* LEARNING CYCLE */}
              <section className="mt-5 rounded-[20px] border border-slate-200 bg-white p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  VIZSTRUCT LEARNING CYCLE
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {[
                    "Learn",
                    "Practice",
                    "Visualize",
                    "Diagnose",
                    "Recover",
                    "Adapt",
                  ].map((item, index, items) => (
                    <div
                      key={item}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={`rounded-full px-3.5 py-1.5 text-[10px] font-bold ${
                          index === 0
                            ? "bg-[#ECE9FF] text-[#6C5CE7]"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item}
                      </span>

                      {index < items.length - 1 && (
                        <span className="text-slate-300">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
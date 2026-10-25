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

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);

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

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is not configured.");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [profileResponse, progressResponse, roadmapResponse] =
          await Promise.all([
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
          ]);

        const profileData = await profileResponse.json();
        const progressData = await progressResponse.json();
        const roadmapData = await roadmapResponse.json();

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

        if (!roadmapResponse.ok) {
          throw new Error(
            roadmapData.message || "Could not load your roadmap."
          );
        }

        setProfile(profileData.profile || null);
        setProgress(progressData.progress || null);
        setRoadmap(roadmapData.roadmap || null);
      } catch (error) {
        console.error("Dashboard loading error:", error);

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
    profile?.user?.level || profile?.learnerProfile?.skillLevel
  );

  const problemsSolved = progress?.problemsSolved ?? 0;
  const totalSubmissions = progress?.totalSubmissions ?? 0;
  const accuracy = progress?.accuracy ?? 0;

  const roadmapTopics = roadmap?.topics || [];
  const completedTopics = roadmap?.completedTopics || [];

  const roadmapProgress =
    roadmapTopics.length > 0
      ? Math.round((completedTopics.length / roadmapTopics.length) * 100)
      : 0;

  const currentTopic =
    roadmap?.currentTopic ||
    roadmapTopics.find(
      (topic) =>
        topic.status === "in_progress" || topic.status === "current"
    )?.topic ||
    roadmapTopics[0]?.topic ||
    "Start your learning path";

  const skillSnapshot = useMemo(() => {
    const topicProgress = progress?.topicProgress || [];

    if (topicProgress.length > 0) {
      return topicProgress.slice(0, 4).map((item) => ({
        name: item.topic,
        score: Math.max(0, Math.min(100, item.accuracy)),
        label:
          item.solved > 0
            ? `${item.solved} solved`
            : item.attempted > 0
              ? "Needs practice"
              : "Not started",
      }));
    }

    const strengths = profile?.learnerProfile?.strengths || [];
    const weaknesses = profile?.learnerProfile?.weaknesses || [];

    const fallbackTopics = [
      ...strengths.map((topic) => ({
        name: topic,
        score: 100,
        label: "Strength",
      })),
      ...weaknesses.map((topic) => ({
        name: topic,
        score: 35,
        label: "Focus Area",
      })),
    ];

    return fallbackTopics.slice(0, 4);
  }, [progress, profile]);

  const visibleRoadmap = roadmapTopics.slice(0, 3);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
        <div className="flex min-h-screen">
          <AppSidebar />

          <div className="min-w-0 flex-1">
            <DashboardHeader />

            <div className="flex min-h-[80vh] items-center justify-center">
              <div className="text-sm font-semibold text-slate-400">
                Loading your personalized dashboard...
              </div>
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
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[110px]" />
              <div className="absolute -left-20 top-[500px] h-72 w-72 rounded-full bg-[#E4F7F5] blur-[100px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
              {/* Welcome */}
              <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                    YOUR LEARNING SPACE
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    Welcome, {userName}
                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                    Your dashboard is personalized from your profile, progress,
                    and learning roadmap.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#CFEDE9] bg-[#EAF9F7] px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#56BDB4]" />
                  <span className="text-xs font-bold text-[#317C77]">
                    Learning path active
                  </span>
                </div>
              </section>

              {/* Main grid */}
              <section className="mt-8 grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
                {/* Continue learning */}
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
                      Continue from your current roadmap topic and build your
                      skills based on your actual learning progress.
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
                          style={{ width: `${roadmapProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => router.push("/learn/arrays")}
                        className="rounded-xl bg-[#6C5CE7] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#5B4BCF]"
                      >
                        Continue Learning →
                      </button>

                      <button
                        type="button"
                        onClick={() => router.push("/roadmap")}
                        className="rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/10"
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
                        profile?.learnerProfile?.strengths || [],
                        profile?.learnerProfile?.weaknesses || [],
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
                {[
                  ["Current Level", userLevel, "From your profile"],
                  ["Problems Solved", String(problemsSolved), "Your saved progress"],
                  ["Total Submissions", String(totalSubmissions), "Saved submissions"],
                  ["Accuracy", `${accuracy}%`, "Based on submissions"],
                ].map(([label, value, note]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(23,23,43,0.035)]"
                  >
                    <p className="text-xs font-semibold text-slate-400">
                      {label}
                    </p>

                    <p className="mt-3 text-2xl font-bold">{value}</p>

                    <p className="mt-1 text-xs text-slate-400">{note}</p>
                  </div>
                ))}
              </section>

              {/* Lower grid */}
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
                      onClick={() => router.push("/progress")}
                      className="text-xs font-bold text-[#6C5CE7]"
                    >
                      Full analysis →
                    </button>
                  </div>

                  <div className="mt-6 space-y-5">
                    {skillSnapshot.length > 0 ? (
                      skillSnapshot.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-bold">{skill.name}</p>

                              <p className="mt-0.5 text-[10px] text-slate-400">
                                {skill.label}
                              </p>
                            </div>

                            <p className="text-xs font-bold text-slate-500">
                              {skill.score}%
                            </p>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#F0EEF5]">
                            <div
                              className="h-full rounded-full bg-[#6C5CE7]"
                              style={{ width: `${skill.score}%` }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-slate-600">
                          Your skill profile is not available yet.
                        </p>

                        <p className="mt-2 text-xs leading-5 text-slate-400">
                          Complete your diagnostic or start practicing to build
                          personalized progress data.
                        </p>
                      </div>
                    )}
                  </div>
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
                      onClick={() => router.push("/roadmap")}
                      className="text-xs font-bold text-[#6C5CE7]"
                    >
                      View all →
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {visibleRoadmap.length > 0 ? (
                      visibleRoadmap.map((item, index) => {
                        const isCurrent =
                          item.topic === currentTopic ||
                          item.status === "in_progress" ||
                          item.status === "current";

                        const isCompleted = completedTopics.includes(
                          item.topic
                        );

                        return (
                          <div
                            key={`${item.topic}-${index}`}
                            className={`flex items-center gap-4 rounded-2xl border p-4 ${
                              isCurrent
                                ? "border-[#DCD8FF] bg-[#F8F7FF]"
                                : "border-slate-100 bg-[#FCFBFE]"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                                isCurrent
                                  ? "bg-[#6C5CE7] text-white"
                                  : "bg-[#ECE9FF] text-[#6C5CE7]"
                              }`}
                            >
                              {String(item.order || index + 1).padStart(2, "0")}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold">
                                {item.topic}
                              </p>

                              <p className="mt-1 text-[10px] text-slate-400">
                                {isCompleted
                                  ? "Completed"
                                  : isCurrent
                                    ? "Current"
                                    : item.status || "Upcoming"}
                              </p>
                            </div>

                            {isCompleted ? (
                              <span className="rounded-full bg-[#E4F7F5] px-3 py-1 text-[10px] font-bold text-[#317C77]">
                                Done
                              </span>
                            ) : isCurrent ? (
                              <span className="rounded-full bg-[#ECE9FF] px-3 py-1 text-[10px] font-bold text-[#6C5CE7]">
                                Current
                              </span>
                            ) : (
                              <span className="text-xs text-slate-300">
                                →
                              </span>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="rounded-2xl bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-slate-600">
                          Your roadmap is being prepared.
                        </p>

                        <p className="mt-2 text-xs leading-5 text-slate-400">
                          Complete your profile or diagnostic to personalize
                          your learning path.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Recommendation */}
              <section className="mt-5 rounded-[26px] border border-[#DCD8FF] bg-white p-6 sm:p-7">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#8EDBD5]" />

                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        NEXT RECOMMENDED PRACTICE
                      </p>
                    </div>

                    <h2 className="mt-3 text-xl font-bold">
                      Practice {currentTopic}.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                      Your next activity is based on the current topic in your
                      saved learning roadmap.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/practice")}
                    className="rounded-xl bg-[#17172B] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                  >
                    Start Practice →
                  </button>
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
    return "Beginner";
  }

  return level.charAt(0).toUpperCase() + level.slice(1);
}

function getCompanionMessage(
  strengths: string[],
  weaknesses: string[],
  currentTopic: string
) {
  if (strengths.length > 0 && weaknesses.length > 0) {
    return `Your strengths include ${strengths
      .slice(0, 2)
      .join(" and ")}. Focus next on ${weaknesses
      .slice(0, 2)
      .join(" and ")} while continuing with ${currentTopic}.`;
  }

  if (weaknesses.length > 0) {
    return `Your current focus areas are ${weaknesses
      .slice(0, 2)
      .join(" and ")}. Keep practicing ${currentTopic} to strengthen your learning path.`;
  }

  if (strengths.length > 0) {
    return `You are showing strength in ${strengths
      .slice(0, 2)
      .join(" and ")}. Use that foundation as you continue with ${currentTopic}.`;
  }

  return `Your personalized learning path currently starts with ${currentTopic}. Complete more learning activities to build your progress profile.`;
}
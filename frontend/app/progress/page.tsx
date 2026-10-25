"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

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
};

type ProfileData = {
  name?: string;
  level?: string;
  strengths?: string[];
  weaknesses?: string[];
};

type RoadmapTopic = {
  topic: string;
  difficulty: string;
  status: string;
  order: number;
};

type RoadmapData = {
  currentTopic?: string;
  completedTopics?: string[];
  topics?: RoadmapTopic[];
};

export default function ProgressPage() {
  const router = useRouter();

  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const loadData = async () => {
      try {
        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [progressRes, profileRes, roadmapRes] =
          await Promise.all([
            fetch(`${apiUrl}/api/progress`, { headers }),
            fetch(`${apiUrl}/api/profile`, { headers }),
            fetch(`${apiUrl}/api/roadmap`, { headers }),
          ]);

        if (progressRes.ok) {
          const data = await progressRes.json();
          setProgress(data.progress);
        }

        if (profileRes.ok) {
          const data = await profileRes.json();
          setProfile(data.profile);
        }

        if (roadmapRes.ok) {
          const data = await roadmapRes.json();
          setRoadmap(data.roadmap);
        }
      } catch (error) {
        console.error("Failed to load progress:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [apiUrl, router]);

  const mastery = useMemo(() => {
    if (!progress?.topicProgress) return [];

    return [...progress.topicProgress]
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 6)
      .map((item) => {
        let status = "Needs Practice";

        if (item.accuracy >= 80) {
          status = "Strong";
        } else if (item.accuracy >= 60) {
          status = "Improving";
        }

        return {
          ...item,
          status,
          detail:
            item.accuracy >= 80
              ? "Consistent performance"
              : item.accuracy >= 60
                ? "Continue practicing"
                : "Needs more practice",
        };
      });
  }, [progress]);

  const currentFocus =
    roadmap?.currentTopic ||
    profile?.weaknesses?.[0] ||
    "Programming Fundamentals";

  const strongestTopic =
    profile?.strengths?.[0] ||
    mastery[0]?.topic ||
    "Not enough data";

  const weakestTopic =
    profile?.weaknesses?.[0] ||
    mastery[mastery.length - 1]?.topic ||
    "Not enough data";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm font-medium text-slate-500">
            Loading your progress...
          </p>
        </div>
      </main>
    );
  }

  const safeProgress = progress || {
    problemsAttempted: 0,
    problemsSolved: 0,
    problemsFailed: 0,
    accuracy: 0,
    topicsCompleted: 0,
    topicProgress: [],
    totalSubmissions: 0,
  };

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <DashboardHeader />

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#ECE9FF] blur-[120px]" />
              <div className="absolute -left-28 top-[700px] h-80 w-80 rounded-full bg-[#E4F7F5] blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-[1500px] px-5 py-7 lg:px-8">

              {/* HEADER */}

              <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
                    LEARNING ANALYTICS
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    {profile?.name
                      ? `${profile.name}'s Progress`
                      : "Your Progress"}
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    Your progress is calculated from your actual coding
                    attempts, solved problems, submissions, and topic
                    performance.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/roadmap")}
                  className="rounded-xl bg-[#17172B] px-5 py-3 text-xs font-bold text-white"
                >
                  View Learning Roadmap →
                </button>
              </section>

              {/* TOP STATS */}

              <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  label="OVERALL ACCURACY"
                  value={`${safeProgress.accuracy}%`}
                  detail={`${safeProgress.totalSubmissions} total submissions`}
                  accent="violet"
                />

                <StatCard
                  label="PROBLEMS SOLVED"
                  value={String(safeProgress.problemsSolved)}
                  detail={`${safeProgress.problemsAttempted} problems attempted`}
                  accent="cyan"
                />

                <StatCard
                  label="TOPICS COMPLETED"
                  value={String(safeProgress.topicsCompleted)}
                  detail={`${roadmap?.topics?.length || 0} roadmap topics`}
                  accent="violet"
                />

                <StatCard
                  label="CURRENT FOCUS"
                  value={currentFocus}
                  detail={`Level: ${profile?.level || "Not assessed"}`}
                  accent="cyan"
                />
              </section>

              {/* MASTERY */}

              <section className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                    CONCEPT MASTERY
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Your topic performance
                  </h2>

                  {mastery.length === 0 ? (
                    <div className="mt-8 rounded-2xl bg-[#F8F7FC] p-5 text-sm text-slate-500">
                      No practice data yet. Start solving problems to build
                      your topic mastery.
                    </div>
                  ) : (
                    <div className="mt-7 space-y-6">
                      {mastery.map((item) => (
                        <MasteryRow
                          key={item.topic}
                          concept={item.topic}
                          score={item.accuracy}
                          status={item.status}
                          detail={`${item.solved} solved / ${item.attempted} attempts`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* SUMMARY */}

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                    LEARNING SUMMARY
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    What your data says
                  </h2>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <SummaryCard
                      label="STRONGEST AREA"
                      value={strongestTopic}
                    />

                    <SummaryCard
                      label="FOCUS AREA"
                      value={weakestTopic}
                    />

                    <SummaryCard
                      label="FAILED SUBMISSIONS"
                      value={String(safeProgress.problemsFailed)}
                    />

                    <SummaryCard
                      label="CURRENT LEVEL"
                      value={profile?.level || "Not assessed"}
                    />
                  </div>

                  <div className="mt-5 rounded-[20px] border border-[#CFEDE9] bg-[#EAF9F7] p-5">
                    <p className="text-sm font-bold text-[#317C77]">
                      Personalized next step
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Continue practicing{" "}
                      <strong>{currentFocus}</strong>. Your roadmap is
                      generated from your learner profile and updated
                      according to your progress.
                    </p>
                  </div>
                </div>
              </section>

              {/* ROADMAP PROGRESS */}

              <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      PERSONALIZED ROADMAP
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      Your learning path
                    </h2>
                  </div>

                  <span className="text-xs text-slate-400">
                    {safeProgress.topicsCompleted} completed
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {(roadmap?.topics || []).map((topic) => {
                    const topicStats = safeProgress.topicProgress.find(
                      (item) =>
                        item.topic.toLowerCase() ===
                        topic.topic.toLowerCase()
                    );

                    return (
                      <div
                        key={`${topic.order}-${topic.topic}`}
                        className="flex flex-col gap-3 rounded-[20px] border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                              topic.status === "completed"
                                ? "bg-[#EAF9F7] text-[#317C77]"
                                : topic.status === "in_progress"
                                  ? "bg-[#ECE9FF] text-[#6C5CE7]"
                                  : "bg-[#F1EFF5] text-slate-400"
                            }`}
                          >
                            {topic.order}
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {topic.topic}
                            </p>

                            <p className="mt-1 text-[10px] text-slate-400">
                              {topic.difficulty} · {topic.status.replace("_", " ")}
                            </p>
                          </div>
                        </div>

                        <div className="min-w-[150px]">
                          <div className="mb-1 flex justify-between text-[9px] text-slate-400">
                            <span>Practice</span>
                            <span>
                              {topicStats?.accuracy || 0}%
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-[#ECEAF1]">
                            <div
                              className="h-full rounded-full bg-[#6C5CE7]"
                              style={{
                                width: `${topicStats?.accuracy || 0}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* PERSONALIZATION */}

              <section className="mt-5 grid gap-5 lg:grid-cols-2">

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                    STRENGTHS
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Areas you're doing well in
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(profile?.strengths || []).length === 0 ? (
                      <p className="text-xs text-slate-400">
                        Complete your diagnostic to identify strengths.
                      </p>
                    ) : (
                      profile!.strengths!.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-xl bg-[#EAF9F7] px-3 py-2 text-xs font-bold text-[#317C77]"
                        >
                          {topic}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                    WEAKNESSES
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Areas needing more practice
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(profile?.weaknesses || []).length === 0 ? (
                      <p className="text-xs text-slate-400">
                        Complete your diagnostic to identify focus areas.
                      </p>
                    ) : (
                      profile!.weaknesses!.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-xl bg-[#FFF4E4] px-3 py-2 text-xs font-bold text-[#A56A22]"
                        >
                          {topic}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </section>

              {/* EMPTY STATE */}

              {safeProgress.totalSubmissions === 0 && (
                <section className="mt-5 rounded-[28px] bg-[#17172B] p-7 text-white">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8EDBD5]">
                    START BUILDING YOUR DATA
                  </p>

                  <h2 className="mt-3 text-2xl font-bold">
                    Your progress will appear here as you practice.
                  </h2>

                  <p className="mt-3 max-w-2xl text-xs leading-6 text-white/50">
                    Solve problems and submit your solutions. VizStruct will
                    track your attempts, solutions, accuracy, and topic
                    performance for this account.
                  </p>

                  <button
                    type="button"
                    onClick={() => router.push("/practice")}
                    className="mt-6 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#17172B]"
                  >
                    Start Practice →
                  </button>
                </section>
              )}

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
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  accent: "violet" | "cyan";
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5">
      <div
        className={`mb-5 h-1 w-10 rounded-full ${
          accent === "violet"
            ? "bg-[#6C5CE7]"
            : "bg-[#8EDBD5]"
        }`}
      />

      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-3xl font-bold tracking-[-0.04em]">
        {value}
      </p>

      <p className="mt-2 text-[10px] text-slate-400">
        {detail}
      </p>
    </div>
  );
}

function MasteryRow({
  concept,
  score,
  status,
  detail,
}: {
  concept: string;
  score: number;
  status: string;
  detail: string;
}) {
  const strong = score >= 80;
  const improving = score >= 60 && score < 80;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold">{concept}</p>

          <p className="mt-1 text-[10px] text-slate-400">
            {detail}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-bold">{score}%</p>

          <p
            className={`mt-1 text-[9px] font-bold ${
              strong
                ? "text-[#317C77]"
                : improving
                  ? "text-[#6C5CE7]"
                  : "text-[#A56429]"
            }`}
          >
            {status}
          </p>
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#ECEAF1]">
        <div
          className="h-full rounded-full bg-[#6C5CE7]"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] bg-[#F8F7FC] p-5">
      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-3 break-words text-lg font-bold">
        {value}
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "../../components/dashboard/AppSidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import {
  usePreferences,
  type VisualStyle,
} from "../../context/PreferencesContext";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const languages = ["Python", "C++", "Java", "JavaScript"];

const goals = [
  "Learn Fundamentals",
  "Data Structures",
  "Problem Solving",
  "Coding Interviews",
];

const routines = [
  "15 min / day",
  "30 min / day",
  "1 hour / day",
  "Few sessions / week",
];

const visualStyles: {
  id: VisualStyle;
  name: string;
  preview: string;
  description: string;
}[] = [
  {
    id: "classic",
    name: "Classic",
    preview: "123",
    description: "Simple numeric visualization",
  },
  {
    id: "cat",
    name: "Cat",
    preview: "🐱",
    description: "Friendly cat tokens",
  },
  {
    id: "dog",
    name: "Dog",
    preview: "🐶",
    description: "Friendly dog tokens",
  },
  {
    id: "objects",
    name: "Objects",
    preview: "🍎",
    description: "Visual object tokens",
  },
  {
    id: "surprise",
    name: "Surprise Me",
    preview: "✨",
    description: "Different visual tokens",
  },
];

type ProfileResponse = {
  success: boolean;
  profile: {
    user: {
      id: string;
      fullName: string;
      email: string;
      level: string;
    };
    learnerProfile: {
      skillLevel?: string;
      programmingLanguages?: string[];
      strengths?: string[];
      weaknesses?: string[];
      learningPreferences?: string[];
      interests?: string[];
      goals?: string[];
    } | null;
  };
};

type RoadmapResponse = {
  success: boolean;
  roadmap: {
    currentTopic?: string;
    topics?: {
      topic: string;
      difficulty: string;
      status: string;
      order: number;
    }[];
  };
};

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
const [saveError, setSaveError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const [level, setLevel] = useState("beginner");
  const [language, setLanguage] = useState("Python");
  const [goal, setGoal] = useState("Learn Fundamentals");
  const [routine, setRoutine] = useState("30 min / day");

  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [currentFocus, setCurrentFocus] = useState("");

  const {
    companion,
    setCompanion,
    visualStyle,
    setVisualStyle,
    adaptiveVisualization,
    setAdaptiveVisualization,
  } = usePreferences();

  useEffect(() => {
    async function loadProfile() {
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

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [profileResponse, roadmapResponse] =
          await Promise.all([
            fetch(`${API_URL}/api/profile`, {
              headers,
            }),
            fetch(`${API_URL}/api/roadmap`, {
              headers,
            }),
          ]);

        if (!profileResponse.ok) {
          throw new Error("Failed to load profile");
        }

        const profileData =
          (await profileResponse.json()) as ProfileResponse;

        const learnerProfile =
          profileData.profile.learnerProfile;

        setName(profileData.profile.user.fullName || "");
        setEmail(profileData.profile.user.email || "");

        setLevel(
          learnerProfile?.skillLevel ||
            profileData.profile.user.level ||
            "beginner"
        );

        const savedLanguages =
          learnerProfile?.programmingLanguages || [];

        if (savedLanguages.length > 0) {
          setLanguage(savedLanguages[0]);
        }

        const savedGoals = learnerProfile?.goals || [];

        if (savedGoals.length > 0) {
          setGoal(savedGoals[0]);
        }

        const savedPreferences =
          learnerProfile?.learningPreferences || [];

        const savedRoutine = savedPreferences.find((item) =>
          routines.includes(item)
        );

        if (savedRoutine) {
          setRoutine(savedRoutine);
        }

        setStrengths(learnerProfile?.strengths || []);
        setWeaknesses(learnerProfile?.weaknesses || []);

        if (roadmapResponse.ok) {
          const roadmapData =
            (await roadmapResponse.json()) as RoadmapResponse;

          setCurrentFocus(
            roadmapData.roadmap?.currentTopic ||
              roadmapData.roadmap?.topics?.find(
                (topic) => topic.status === "in_progress"
              )?.topic ||
              roadmapData.roadmap?.topics?.[0]?.topic ||
              ""
          );
        }
      } catch (loadError) {
        console.error("Load profile error:", loadError);
        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  async function handleSave() {
  try {
    setSaving(true);
    setSaveError("");

    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";

    const response = await fetch(
      `${apiUrl}/api/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
  fullName: name,
  email,
  level:
    level.charAt(0).toUpperCase() +
    level.slice(1).toLowerCase(),
  skillLevel: level.toLowerCase(),
  programmingLanguages: [language],
  learningPreferences: [routine],
  goals: [goal],
}),
         
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to save profile."
      );
    }

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  } catch (error) {
    console.error("Profile save error:", error);

    setSaveError(
      error instanceof Error
        ? error.message
        : "Failed to save profile."
    );
  } finally {
    setSaving(false);
  }
}

  function handleRetakeDiagnostic() {
    router.push("/diagnostic");
  }

  const displayLevel =
    level.charAt(0).toUpperCase() + level.slice(1);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17172B]">
              <span className="text-xl font-bold text-white">
                V
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold">
              Loading your profile...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Fetching your personalized learning data
            </p>
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
              <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#ECE9FF] blur-[120px]" />

              <div className="absolute -left-32 top-[800px] h-80 w-80 rounded-full bg-[#E4F7F5] blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
              <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
                    PROFILE & SETTINGS
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    Make VizStruct work your way.
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    Manage your learner profile, learning preferences,
                    companion and visualization experience.
                  </p>
                </div>

               <button
  type="button"
  onClick={handleSave}
  disabled={saving}
  className="rounded-xl bg-[#6C5CE7] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-[#6C5CE7]/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
>
  {saving ? "Saving..." : "Save Changes"}
</button>
              </section>

              {error && (
                <div className="mt-5 rounded-[18px] border border-red-200 bg-red-50 px-5 py-4">
                  <p className="text-xs font-semibold text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {saved && (
                <div className="mt-5 flex items-center justify-between rounded-[18px] border border-[#CFEDE9] bg-[#EAF9F7] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#317C77]">
                      ✓
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#317C77]">
                        Preferences saved
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        Your profile has been saved to your account.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <section className="mt-7 overflow-hidden rounded-[28px] border border-slate-200 bg-white">
                <div className="grid lg:grid-cols-[0.65fr_1.35fr]">
                  <div className="relative overflow-hidden bg-[#17172B] p-7 text-white">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#6C5CE7]/25 blur-[60px]" />

                    <div className="relative">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#6C5CE7] text-2xl font-bold">
                        {name.trim()
                          ? name.trim().charAt(0).toUpperCase()
                          : "L"}
                      </div>

                      <h2 className="mt-5 text-2xl font-bold">
                        {name || "Learner"}
                      </h2>

                      <p className="mt-1 text-xs text-white/40">
                        {email}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-[#6C5CE7]/20 px-3 py-1.5 text-[9px] font-bold text-[#CFC9FF]">
                          {displayLevel}
                        </span>

                        <span className="rounded-lg bg-[#8EDBD5]/10 px-3 py-1.5 text-[9px] font-bold text-[#8EDBD5]">
                          {language}
                        </span>
                      </div>

                      <div className="mt-7 border-t border-white/10 pt-5">
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/30">
                          CURRENT FOCUS
                        </p>

                        <p className="mt-2 text-sm font-bold">
                          {currentFocus || "Complete your diagnostic"}
                        </p>

                        <p className="mt-1 text-[10px] text-white/40">
                          Based on your personalized learning roadmap
                        </p>
                      </div>

                      {strengths.length > 0 && (
                        <div className="mt-6">
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/30">
                            STRENGTHS
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {strengths.slice(0, 4).map((item) => (
                              <span
                                key={item}
                                className="rounded-lg bg-white/10 px-3 py-1.5 text-[9px] font-semibold text-white/70"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {weaknesses.length > 0 && (
                        <div className="mt-5">
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/30">
                            FOCUS AREAS
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {weaknesses.slice(0, 4).map((item) => (
                              <span
                                key={item}
                                className="rounded-lg bg-[#E4F7F5]/10 px-3 py-1.5 text-[9px] font-semibold text-[#8EDBD5]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                        LEARNER PROFILE
                      </p>

                      <h2 className="mt-2 text-xl font-bold">
                        Basic information
                      </h2>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <Field label="DISPLAY NAME">
                        <input
                          value={name}
                          onChange={(event) =>
                            setName(event.target.value)
                          }
                          className="w-full rounded-[14px] border border-slate-200 bg-[#FAFAFC] px-4 py-3 text-sm outline-none transition focus:border-[#6C5CE7]"
                          placeholder="Your name"
                        />
                      </Field>

                      <Field label="EMAIL">
                        <input
                          value={email}
                          onChange={(event) =>
                            setEmail(event.target.value)
                          }
                          className="w-full rounded-[14px] border border-slate-200 bg-[#FAFAFC] px-4 py-3 text-sm outline-none transition focus:border-[#6C5CE7]"
                          placeholder="Your email"
                        />
                      </Field>

                      <Field label="CURRENT LEVEL">
                        <div className="flex h-[46px] items-center justify-between rounded-[14px] border border-slate-200 bg-[#FAFAFC] px-4">
                          <span className="text-sm font-semibold">
                            {displayLevel}
                          </span>

                          <span className="rounded-full bg-[#ECE9FF] px-3 py-1 text-[8px] font-bold text-[#6C5CE7]">
                            Adaptive
                          </span>
                        </div>
                      </Field>

                      <Field label="CURRENT FOCUS">
                        <div className="flex min-h-[46px] items-center rounded-[14px] border border-slate-200 bg-[#FAFAFC] px-4 py-3 text-sm font-semibold">
                          {currentFocus || "Complete your diagnostic"}
                        </div>
                      </Field>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6 sm:p-7">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                    LEARNING PREFERENCES
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Personalize your learning path
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    These preferences are saved to your learner profile
                    and can be changed at any time.
                  </p>
                </div>

                <div className="mt-7 grid gap-6 xl:grid-cols-3">
                  <PreferenceGroup
                    title="Preferred Language"
                    description="Language used for coding practice."
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {languages.map((item) => (
                        <SelectionButton
                          key={item}
                          selected={language === item}
                          onClick={() => setLanguage(item)}
                        >
                          {item}
                        </SelectionButton>
                      ))}
                    </div>
                  </PreferenceGroup>

                  <PreferenceGroup
                    title="Learning Goal"
                    description="What you currently want to improve."
                  >
                    <div className="space-y-2">
                      {goals.map((item) => (
                        <SelectionButton
                          key={item}
                          selected={goal === item}
                          onClick={() => setGoal(item)}
                        >
                          {item}
                        </SelectionButton>
                      ))}
                    </div>
                  </PreferenceGroup>

                  <PreferenceGroup
                    title="Learning Routine"
                    description="Your preferred practice schedule."
                  >
                    <div className="space-y-2">
                      {routines.map((item) => (
                        <SelectionButton
                          key={item}
                          selected={routine === item}
                          onClick={() => setRoutine(item)}
                        >
                          {item}
                        </SelectionButton>
                      ))}
                    </div>
                  </PreferenceGroup>
                </div>
              </section>

              <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6 sm:p-7">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      LEARNING COMPANION
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      Choose who guides your learning.
                    </h2>

                    <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-400">
                      Your companion changes the visual learning
                      experience only. It does not affect difficulty,
                      scoring or recommendations.
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-[#ECE9FF] px-3 py-1.5 text-[9px] font-bold text-[#6C5CE7]">
                    Optional
                  </span>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  <CompanionCard
                    title="Male Companion"
                    description="Professional coding companion"
                    symbol="M"
                    selected={companion === "male"}
                    onClick={() => setCompanion("male")}
                  />

                  <CompanionCard
                    title="Female Companion"
                    description="Professional coding companion"
                    symbol="F"
                    selected={companion === "female"}
                    onClick={() => setCompanion("female")}
                  />

                  <CompanionCard
                    title="No Character"
                    description="Keep the interface minimal"
                    symbol="○"
                    selected={companion === "none"}
                    onClick={() => setCompanion("none")}
                  />
                </div>
              </section>

              <section className="mt-5 rounded-[28px] border border-[#DCD8FF] bg-white p-6 sm:p-7">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                      VISUALIZATION PREFERENCE
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      Choose how values appear during execution.
                    </h2>

                    <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-400">
                      Visual tokens can make execution easier to
                      follow, while the actual numeric value always
                      remains visible for accurate reasoning.
                    </p>
                  </div>

                  <div className="rounded-[14px] bg-[#ECE9FF] px-4 py-3">
                    <p className="text-[9px] font-bold text-[#6C5CE7]">
                      Current:{" "}
                      {
                        visualStyles.find(
                          (style) => style.id === visualStyle
                        )?.name
                      }
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {visualStyles.map((style) => {
                    const selected = visualStyle === style.id;

                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setVisualStyle(style.id)}
                        className={`rounded-[22px] border p-5 text-left transition ${
                          selected
                            ? "border-[#6C5CE7] bg-[#F3F1FF] shadow-sm"
                            : "border-slate-200 bg-white hover:border-[#CFC9FF]"
                        }`}
                      >
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-[16px] text-xl font-bold ${
                            selected
                              ? "bg-[#6C5CE7] text-white"
                              : "bg-[#F8F7FC] text-[#17172B]"
                          }`}
                        >
                          {style.preview}
                        </div>

                        <p className="mt-4 text-sm font-bold">
                          {style.name}
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-slate-400">
                          {style.description}
                        </p>

                        <div className="mt-4 flex items-center gap-2">
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                              selected
                                ? "border-[#6C5CE7] bg-[#6C5CE7]"
                                : "border-slate-300"
                            }`}
                          >
                            {selected && (
                              <span className="text-[8px] text-white">
                                ✓
                              </span>
                            )}
                          </div>

                          <span
                            className={`text-[9px] font-bold ${
                              selected
                                ? "text-[#6C5CE7]"
                                : "text-slate-400"
                            }`}
                          >
                            {selected ? "Selected" : "Select"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 overflow-hidden rounded-[22px] bg-[#17172B] p-5 text-white">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#8EDBD5]">
                        LIVE PREFERENCE PREVIEW
                      </p>

                      <p className="mt-2 text-xs text-white/50">
                        Values remain readable regardless of the
                        selected visual style.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      {[4, 7, 2].map((value, index) => (
                        <VisualToken
                          key={value}
                          value={value}
                          index={index}
                          style={visualStyle}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col justify-between gap-5 rounded-[22px] border border-[#CFEDE9] bg-[#EAF9F7] p-5 sm:flex-row sm:items-center">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#317C77]">
                      ✦
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Adaptive Visualization
                      </p>

                      <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                        Allow VizStruct to recommend a visualization
                        style based on learning behaviour. You always
                        remain free to choose another style.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-pressed={adaptiveVisualization}
                    onClick={() =>
                      setAdaptiveVisualization(
                        !adaptiveVisualization
                      )
                    }
                    className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                      adaptiveVisualization
                        ? "bg-[#317C77]"
                        : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                        adaptiveVisualization
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>
                  {saveError && (
  <div className="mt-5 rounded-[18px] border border-red-200 bg-red-50 px-5 py-4">
    <p className="text-xs font-bold text-red-600">
      {saveError}
    </p>
  </div>
)}
                </div>
              </section>

              <section className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                    LEARNING DATA
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Assessment & personalization
                  </h2>

                  <div className="mt-6 divide-y divide-slate-100">
                    <SettingAction
                      title="Retake Diagnostic Assessment"
                      description="Reassess your current concept understanding and update your learning path."
                      button="Retake"
                      onClick={handleRetakeDiagnostic}
                    />

                    <SettingAction
                      title="View Learning Progress"
                      description="Review your current concept mastery and submission performance."
                      button="View"
                      onClick={() => router.push("/progress")}
                    />

                    <SettingAction
                      title="View Personalized Roadmap"
                      description="See the learning sequence generated from your current profile."
                      button="Open"
                      onClick={() => router.push("/roadmap")}
                    />
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                    ACCOUNT
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Account information
                  </h2>

                  <div className="mt-6 rounded-[20px] bg-[#F8F7FC] p-5">
                    <p className="text-sm font-bold">
                      Your personalized account
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Your profile, diagnostic results, learning
                      preferences and progress are connected to your
                      authenticated account.
                    </p>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                        <span className="text-[10px] font-semibold text-slate-400">
                          PROFILE
                        </span>

                        <span className="text-[10px] font-bold text-[#317C77]">
                          Connected
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                        <span className="text-[10px] font-semibold text-slate-400">
                          ROADMAP
                        </span>

                        <span className="text-[10px] font-bold text-[#317C77]">
                          Personalized
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                        <span className="text-[10px] font-semibold text-slate-400">
                          DIAGNOSTIC
                        </span>

                        <span className="text-[10px] font-bold text-[#317C77]">
                          Connected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-5 rounded-[28px] bg-[#17172B] p-6 text-white">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8EDBD5]">
                      YOUR LEARNING EXPERIENCE
                    </p>

                    <h2 className="mt-2 text-lg font-bold">
                      Keep your preferences up to date.
                    </h2>

                    <p className="mt-2 text-xs text-white/40">
                      Learning preferences can change without resetting
                      your progress.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-xl bg-[#6C5CE7] px-6 py-3 text-xs font-bold text-white disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Preferences"}
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label>
      <p className="mb-2 text-[9px] font-bold tracking-[0.14em] text-slate-400">
        {label}
      </p>

      {children}
    </label>
  );
}

function PreferenceGroup({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[22px] bg-[#F8F7FC] p-5">
      <h3 className="text-sm font-bold">{title}</h3>

      <p className="mt-1 text-[10px] leading-5 text-slate-400">
        {description}
      </p>

      <div className="mt-4">{children}</div>
    </div>
  );
}

function SelectionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[13px] border px-4 py-3 text-left text-[11px] font-bold transition ${
        selected
          ? "border-[#6C5CE7] bg-[#ECE9FF] text-[#6C5CE7]"
          : "border-slate-200 bg-white text-slate-500 hover:border-[#CFC9FF]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span>{children}</span>

        {selected && <span>✓</span>}
      </div>
    </button>
  );
}

function CompanionCard({
  title,
  description,
  symbol,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  symbol: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[22px] border p-5 text-left transition ${
        selected
          ? "border-[#6C5CE7] bg-[#F3F1FF]"
          : "border-slate-200 bg-white hover:border-[#CFC9FF]"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold ${
          selected
            ? "bg-[#6C5CE7] text-white"
            : "bg-[#F2F0F8] text-slate-500"
        }`}
      >
        {symbol}
      </div>

      <p className="mt-4 text-sm font-bold">{title}</p>

      <p className="mt-1 text-[10px] text-slate-400">
        {description}
      </p>

      <p
        className={`mt-4 text-[9px] font-bold ${
          selected ? "text-[#6C5CE7]" : "text-slate-300"
        }`}
      >
        {selected ? "✓ Selected" : "Select"}
      </p>
    </button>
  );
}

function VisualToken({
  value,
  index,
  style,
}: {
  value: number;
  index: number;
  style: VisualStyle;
}) {
  const objects = ["🍎", "🍊", "🍋"];
  const surprise = ["🚀", "⭐", "💎"];

  let token = String(value);

  if (style === "cat") token = "🐱";
  if (style === "dog") token = "🐶";
  if (style === "objects") token = objects[index];
  if (style === "surprise") token = surprise[index];

  return (
    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.06]">
      <span className="text-lg font-bold">{token}</span>

      {style !== "classic" && (
        <span className="mt-1 text-[9px] font-bold text-[#8EDBD5]">
          {value}
        </span>
      )}
    </div>
  );
}

function SettingAction({
  title,
  description,
  button,
  onClick,
}: {
  title: string;
  description: string;
  button: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-bold">{title}</p>

        <p className="mt-1 max-w-lg text-[10px] leading-5 text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="w-fit shrink-0 rounded-xl border border-slate-200 px-4 py-2.5 text-[10px] font-bold text-slate-600 transition hover:border-[#6C5CE7] hover:text-[#6C5CE7]"
      >
        {button} →
      </button>
    </div>
  );
}
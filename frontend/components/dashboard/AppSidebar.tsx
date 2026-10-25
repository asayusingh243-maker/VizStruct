"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "⌂" },
  { name: "Learn", href: "/learn", icon: "◫" },
  { name: "Practice", href: "/practice", icon: "</>" },
  { name: "Roadmap", href: "/roadmap", icon: "◇" },
  { name: "Progress", href: "/progress", icon: "↗" },
];

type ProfileResponse = {
  success?: boolean;
  user?: {
    fullName?: string;
    email?: string;
    level?: string;
  };
  learnerProfile?: {
    skillLevel?: string;
  };
};

function formatLevel(level?: string) {
  if (!level) return "Beginner";

  return level.charAt(0).toUpperCase() + level.slice(1);
}

export default function AppSidebar() {
  const pathname = usePathname();

  const [name, setName] = useState("Learner");
  const [level, setLevel] = useState("Beginner");

  useEffect(() => {
    async function loadProfile() {
      try {
        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        if (!token) {
          return;
        }

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000";

        const response = await fetch(
          `${apiUrl}/api/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const data: ProfileResponse = await response.json();

        const userName =
          data.user?.fullName?.trim() || "Learner";

        const userLevel =
          data.learnerProfile?.skillLevel ||
          data.user?.level ||
          "beginner";

        setName(userName);
        setLevel(formatLevel(userLevel));
      } catch (error) {
        console.error(
          "Failed to load sidebar profile:",
          error
        );
      }
    }

    loadProfile();
  }, []);

  const initial =
    name.trim().charAt(0).toUpperCase() || "L";

  return (
    <aside className="hidden min-h-screen w-[250px] shrink-0 border-r border-slate-200/70 bg-white/80 px-4 py-6 backdrop-blur-xl lg:flex lg:flex-col">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-3 px-3"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECE9FF] font-mono text-xs font-bold text-[#6C5CE7]">
          {"</>"}
        </div>

        <div>
          <p className="text-xl font-bold tracking-tight text-[#17172B]">
            Viz<span className="text-[#6C5CE7]">Struct</span>
          </p>

          <p className="text-[7px] font-semibold tracking-[0.18em] text-slate-400">
            VISUALIZE · UNDERSTAND · MASTER
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="mt-10 space-y-1.5">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Learning Space
        </p>

        {navigation.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-[#ECE9FF] text-[#6C5CE7]"
                  : "text-slate-500 hover:bg-[#F8F7FC] hover:text-[#17172B]"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs ${
                  active
                    ? "bg-white text-[#6C5CE7]"
                    : "bg-[#F5F4F8] text-slate-400"
                }`}
              >
                {item.icon}
              </span>

              {item.name}

              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#6C5CE7]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Adaptive status */}
      <div className="mt-auto rounded-2xl bg-[#292865] p-4 text-white">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#8EDBD5]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8EDBD5]">
            Adaptive Path
          </p>
        </div>

        <p className="mt-3 text-sm font-semibold">
          Your path is active.
        </p>

        <p className="mt-2 text-xs leading-5 text-white/55">
          Recommendations will adapt as you complete problems.
        </p>
      </div>

      {/* Profile */}
      <Link
        href="/profile"
        className={`mt-4 flex items-center gap-3 rounded-xl px-2 py-3 transition ${
          pathname === "/profile"
            ? "bg-[#ECE9FF]"
            : "hover:bg-[#F8F7FC]"
        }`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ECE9FF] text-sm font-bold text-[#6C5CE7]">
          {initial}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#17172B]">
            {name}
          </p>

          <p className="text-xs text-slate-400">
            {level}
          </p>
        </div>

        <span className="text-slate-300">•••</span>
      </Link>
    </aside>
  );
}

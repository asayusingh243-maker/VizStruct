"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      if (!data.token) {
        setError("Login succeeded, but no authentication token was received.");
        return;
      }

      if (keepLoggedIn) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      window.location.href = "/onboarding";
    } catch {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-[#292865] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-violet-400/20 blur-[100px]" />
          <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-[100px]" />

          <Link href="/" className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 font-mono text-sm font-bold">
              {"</>"}
            </div>

            <div>
              <p className="text-2xl font-bold">
                Viz<span className="text-[#BDBBFF]">Struct</span>
              </p>

              <p className="text-[9px] tracking-[0.22em] text-white/50">
                VISUALIZE · UNDERSTAND · MASTER
              </p>
            </div>
          </Link>

          <div className="relative z-10 max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#BDBBFF]">
              Welcome back
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight">
              Continue your journey.
              <span className="block text-[#8EDBD5]">
                Keep improving every day.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/70">
              Pick up where you left off and continue building your coding
              skills with personalized learning and feedback.
            </p>

            <div className="mt-10 space-y-4 text-sm text-white/75">
              {[
                "Personalized learning path",
                "Step-by-step code visualization",
                "Track your progress",
                "Adaptive problem recommendations",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs text-[#8EDBD5]">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-xs text-white/40">
            Built for learners who want to understand, not just submit.
          </p>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-8 lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECE9FF] font-mono text-xs font-bold text-[#6C5CE7]">
                  {"</>"}
                </div>

                <p className="text-xl font-bold">
                  Viz<span className="text-[#6C5CE7]">Struct</span>
                </p>
              </Link>
            </div>

            {/* Heading */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                Welcome back
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em]">
                Log in to VizStruct.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Continue your personalized coding journey and pick up from
                your latest recommendation.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="mt-9 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-[#6C5CE7] hover:text-[#5b4dd1]"
                    onClick={() =>
                      setError("Password reset will be available soon.")
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative mt-2">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-16 outline-none focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#6C5CE7]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Keep logged in */}
              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(event) =>
                    setKeepLoggedIn(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300"
                />

                Keep me logged in
              </label>

              {/* Error message */}
              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#6C5CE7] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5b4dd1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log In →"}
              </button>
            </form>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-slate-500">
              New to VizStruct?
            </p>

            <Link
              href="/register"
              className="mt-4 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-center text-sm font-semibold text-[#17172B] transition hover:border-[#6C5CE7] hover:text-[#6C5CE7]"
            >
              Create a VizStruct Account
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

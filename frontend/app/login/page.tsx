"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [error, setError] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // The backend teammate will provide the login API endpoint and JWT response.
    setError("The login service will be connected when the backend API is ready.");
  }

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-[#292865] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          {/* Background glows */}
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-violet-400/20 blur-[100px]" />
          <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-[100px]" />

          {/* Logo */}
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

          {/* Main message */}
          <div className="relative z-10 max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#BDBBFF]">
              Welcome Back
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight">
              Continue where
              <span className="block text-[#8EDBD5]">
                you left off.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/70">
              Your learning path evolves with every problem you solve.
              Sign in to continue practicing, visualizing, and improving.
            </p>

            {/* Mini learning path */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                Your Journey
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/75">
                <span>Learn</span>
                <span className="text-[#8EDBD5]">→</span>

                <span>Practice</span>
                <span className="text-[#8EDBD5]">→</span>

                <span>Visualize</span>
                <span className="text-[#8EDBD5]">→</span>

                <span>Improve</span>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-xs text-white/40">
            Understand the logic. Master the structure.
          </p>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-10 lg:hidden">
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
                Welcome Back
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em]">
                Log in to VizStruct.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Continue your personalized coding journey and pick up from your
                latest recommendation.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="mt-9 space-y-5">

              {/* Email */}
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-[#6C5CE7] focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#6C5CE7] hover:underline"
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
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 outline-none transition placeholder:text-slate-400 focus:border-[#6C5CE7] focus:ring-4 focus:ring-violet-100"
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

              {/* Remember */}
              <label className="flex items-center gap-3 text-sm text-slate-500">
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(event) => setKeepLoggedIn(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />

                Keep me logged in
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {/* Login */}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#6C5CE7] px-6 py-3.5 font-semibold text-white shadow-[0_10px_30px_rgba(108,92,231,0.18)] transition hover:-translate-y-0.5 hover:bg-[#5B4BCF]"
              >
                Log In →
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs text-slate-400">
                New to VizStruct?
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Register */}
            <Link
              href="/register"
              className="mt-6 block w-full rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-[#17172B] transition hover:border-violet-300 hover:text-[#6C5CE7]"
            >
              Create a VizStruct Account
            </Link>

            <Link
              href="/"
              className="mt-8 block text-center text-xs font-medium text-slate-400 hover:text-[#6C5CE7]"
            >
              ← Back to homepage
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    setError("");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please complete every field.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please agree to the educational-use terms.");
      return;
    }

    setError(
      "The registration service will be connected when the backend API is ready."
    );
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
              Your coding journey starts here
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight">
              Learn at your level.
              <span className="block text-[#8EDBD5]">
                Improve with every problem.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/70">
              Create your learner profile and let VizStruct build a personalized
              path based on your skills, mistakes, and progress.
            </p>

            <div className="mt-10 space-y-4 text-sm text-white/75">
              {[
                "Personalized learning path",
                "Step-by-step code visualization",
                "Misconception detection",
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

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
                Create your account
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em]">
                Start learning with VizStruct.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Your account will be used to save your learner profile,
                diagnostic results, progress, and recommendations.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleRegister}
              noValidate
              className="mt-8 space-y-5"
            >

              {/* FULL NAME */}
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-[#6C5CE7] focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {/* EMAIL */}
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
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-[#6C5CE7] focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
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

                <p className="mt-2 text-xs text-slate-400">
                  Use at least 8 characters.
                </p>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-slate-700"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-[#6C5CE7] focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {/* TERMS */}
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-500">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />

                <span>
                  I agree to use VizStruct for educational purposes and
                  understand that my learning data will be used to personalize
                  recommendations.
                </span>
              </label>

              {/* ERROR MESSAGE */}
              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#6C5CE7] px-6 py-3.5 font-semibold text-white shadow-[0_10px_30px_rgba(108,92,231,0.18)] transition hover:-translate-y-0.5 hover:bg-[#5B4BCF]"
              >
                Create Account →
              </button>
            </form>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs text-slate-400">
                Already registered?
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#6C5CE7] hover:underline"
              >
                Log in
              </Link>
            </p>

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

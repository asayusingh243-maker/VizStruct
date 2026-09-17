"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [error, setError] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    // Frontend-only login for now.
    // Real authentication will be connected during backend integration.
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}

        <section className="relative hidden overflow-hidden bg-[#17172B] lg:flex">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#6C5CE7]/20 blur-[100px]" />

          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[#8EDBD5]/10 blur-[110px]" />

          <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">
            <Link
              href="/"
              className="text-xl font-bold tracking-[-0.04em] text-white"
            >
              Viz<span className="text-[#8EDBD5]">Struct</span>
            </Link>

            <div className="max-w-lg">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8EDBD5]">
                PERSONALIZED CODING LEARNING
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.04em] text-white xl:text-5xl">
                Welcome back.
                <br />
                <span className="text-[#CFC9FF]">
                  Let&apos;s continue learning.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/45">
                Continue from where you left off, practice coding problems,
                visualize execution and improve through targeted feedback.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[9px] font-bold text-white/55">
                  Assess
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[9px] font-bold text-white/55">
                  Practice
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[9px] font-bold text-white/55">
                  Visualize
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[9px] font-bold text-white/55">
                  Adapt
                </span>
              </div>
            </div>

            <p className="text-[10px] text-white/25">
              Understand code by visualizing how it works.
            </p>
          </div>
        </section>

        {/* RIGHT SIDE */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}

            <Link
              href="/"
              className="mb-10 block text-xl font-bold tracking-[-0.04em] lg:hidden"
            >
              Viz<span className="text-[#6C5CE7]">Struct</span>
            </Link>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
                WELCOME BACK
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
                Log in to VizStruct
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Continue your personalized coding journey.
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400"
                >
                  EMAIL
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#6C5CE7]"
                />
              </div>

              {/* PASSWORD */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400"
                  >
                    PASSWORD
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Password recovery will be connected later.")
                    }
                    className="text-[10px] font-bold text-[#6C5CE7]"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm outline-none transition focus:border-[#6C5CE7]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 transition hover:text-[#6C5CE7]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* KEEP LOGGED IN */}

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(event) =>
                    setKeepLoggedIn(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 accent-[#6C5CE7]"
                />

                <span className="text-xs text-slate-500">
                  Keep me logged in
                </span>
              </label>

              {/* ERROR */}

              {error && (
                <div className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* LOGIN */}

              <button
                type="submit"
                className="w-full rounded-[14px] bg-[#6C5CE7] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#6C5CE7]/15 transition hover:-translate-y-0.5 hover:bg-[#5D4FD3]"
              >
                Log In
              </button>
            </form>

            {/* REGISTER */}

            <p className="mt-7 text-center text-xs text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#6C5CE7] hover:underline"
              >
                Create an account
              </Link>
            </p>

            {/* HOME */}

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="text-[10px] font-bold text-slate-400 transition hover:text-[#6C5CE7]"
              >
                ← Back to home
              </Link>
            </div>

            <p className="mt-8 text-center text-[9px] leading-5 text-slate-400">
              Frontend demo: authentication will be connected to the
              VizStruct backend later.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
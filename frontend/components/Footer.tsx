export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#17172B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C5CE7] font-mono text-xs font-bold text-white">
                {"</>"}
              </div>

              <div>
                <p className="text-xl font-bold">
                  Viz<span className="text-[#A89CFF]">Struct</span>
                </p>

                <p className="text-[9px] tracking-[0.2em] text-slate-500">
                  VISUALIZE · UNDERSTAND · MASTER
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
              An intelligent and personalized coding-learning platform designed
              to help students understand code execution, mistakes, and what to
              learn next.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-sm font-bold">Product</p>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <a href="#features" className="block hover:text-white">
                Features
              </a>

              <a href="#how-it-works" className="block hover:text-white">
                How It Works
              </a>

              <a href="#diagnostic" className="block hover:text-white">
                Diagnostic Test
              </a>

              <a href="#roadmap" className="block hover:text-white">
                Learning Path
              </a>
            </div>
          </div>

          {/* Learning */}
          <div>
            <p className="text-sm font-bold">Learning</p>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <a href="#mistakes" className="block hover:text-white">
                Error Analysis
              </a>

              <a href="#features" className="block hover:text-white">
                Code Visualization
              </a>

              <a href="#roadmap" className="block hover:text-white">
                Adaptive Recommendations
              </a>

              <a href="/register" className="block hover:text-white">
                Start Learning
              </a>
            </div>
          </div>

          {/* Project */}
          <div>
            <p className="text-sm font-bold">Project</p>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <a href="#about" className="block hover:text-white">
                About VizStruct
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-white"
              >
                GitHub
              </a>

              <a href="/login" className="block hover:text-white">
                Login
              </a>

              <a href="/register" className="block hover:text-white">
                Create Account
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 VizStruct. Built for programming learners.</p>

          <p>
            Assess → Recommend → Execute → Visualize → Diagnose → Recover
          </p>
        </div>
      </div>
    </footer>
  );
}
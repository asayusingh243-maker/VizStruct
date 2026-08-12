export default function Navbar() {
  return (
    <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
      {/* Logo */}
      <a href="#home" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-200 bg-violet-100 font-mono text-sm font-bold text-violet-700">
          {"</>"}
        </div>

        <div>
          <p className="text-2xl font-bold tracking-tight text-[#17172B]">
            Viz<span className="text-[#6C5CE7]">Struct</span>
          </p>

          <p className="text-[9px] tracking-[0.24em] text-slate-400">
            VISUALIZE · UNDERSTAND · MASTER
          </p>
        </div>
      </a>

      {/* Navigation */}
      <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
        <a href="#home" className="transition hover:text-[#6C5CE7]">
          Home
        </a>

        <a href="#how-it-works" className="transition hover:text-[#6C5CE7]">
          How It Works
        </a>

        <a href="#features" className="transition hover:text-[#6C5CE7]">
          Features
        </a>

        <a href="#roadmap" className="transition hover:text-[#6C5CE7]">
          Roadmap
        </a>

        <a href="#about" className="transition hover:text-[#6C5CE7]">
          About
        </a>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <a
          href="/login"
          className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700 sm:block"
        >
          Log in
        </a>

        <a
          href="/register"
          className="rounded-xl bg-[#6C5CE7] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#5B4BCF]"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
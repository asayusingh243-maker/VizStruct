import Image from "next/image";

export default function LearningCompanionSection() {
  const companions = [
    {
      label: "Male",
      description: "A focused anime-style coding companion.",
      icon: "M",
    },
    {
      label: "Female",
      description: "A focused anime-style coding companion.",
      icon: "F",
    },
    {
      label: "None",
      description: "Use VizStruct without a visual companion.",
      icon: "—",
    },
  ];

  return (
    <section
      id="companion"
      className="relative overflow-hidden bg-white py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[110px]" />

      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#E7F8F7] blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
        {/* LEFT — COMPANION ARTWORK */}
        <div className="relative min-h-[560px]">
          <div className="absolute inset-6 rounded-[40px] bg-gradient-to-br from-[#F1EFFF] via-[#FAF9FF] to-[#EAF8F7]" />

          <div className="absolute inset-0 z-10">
            <Image
              src="/images/vizstruct-companions.png"
              alt="VizStruct male and female learning companions helping with coding concepts"
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-contain object-center"
            />
          </div>

          {/* Floating guidance bubble */}
          <div className="absolute left-0 top-12 z-20 hidden max-w-[210px] rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-[0_15px_40px_rgba(108,92,231,0.10)] backdrop-blur sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6C5CE7]">
              Companion Guidance
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-600">
              “Let&apos;s trace the loop and see how the value changes.”
            </p>
          </div>

          {/* Small state bubble */}
          <div className="absolute bottom-10 right-0 z-20 hidden rounded-2xl border border-cyan-100 bg-white/95 px-5 py-4 shadow-lg sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Current Step
            </p>

            <p className="mt-2 font-mono text-sm font-semibold text-[#3A9994]">
              arr[2] = 8
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6C5CE7]">
            Your Learning Companion
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] text-[#17172B] sm:text-5xl">
            Learn with guidance
            <span className="block text-[#6C5CE7]">
              when you need it.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            VizStruct companions support important learning moments by
            explaining execution, highlighting misconceptions, and guiding you
            toward the next step.
          </p>

          {/* Capabilities */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Explain execution steps",
              "Highlight misconceptions",
              "Guide recovery exercises",
              "Support learning progress",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#FAFAFD] px-4 py-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F7F5] text-xs font-bold text-[#3A9994]">
                  ✓
                </span>

                <p className="text-sm font-medium text-slate-600">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Companion preference */}
          <div className="mt-9">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[#17172B]">
                Choose your preference
              </p>

              <span className="text-xs text-slate-400">
                Optional
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {companions.map((companion, index) => (
                <div
                  key={companion.label}
                  className={`rounded-2xl border p-4 transition ${
                    index === 0
                      ? "border-[#6C5CE7] bg-[#F1EFFF]"
                      : "border-slate-200 bg-white hover:border-violet-200"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${
                      index === 0
                        ? "bg-[#6C5CE7] text-white"
                        : "bg-[#F1EFFF] text-[#6C5CE7]"
                    }`}
                  >
                    {companion.icon}
                  </div>

                  <p className="mt-4 font-bold text-[#17172B]">
                    {companion.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {companion.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-violet-100 bg-[#F8F7FC] p-5">
            <p className="text-sm font-semibold text-[#17172B]">
              Your companion does not affect recommendations.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              It is purely a visual learning preference and can be changed
              later from your profile settings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
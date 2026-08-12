export default function FeatureSection() {
  const features = [
    {
      title: "Visual Code Execution",
      description:
        "Follow variables, loops, arrays, and control flow step by step instead of only seeing the final output.",
      accent: "Visual",
    },
    {
      title: "Misconception Detection",
      description:
        "VizStruct identifies the concept behind a logical mistake and explains why the code behaves differently than expected.",
      accent: "Diagnose",
    },
    {
      title: "Adaptive Learning Path",
      description:
        "Recommendations change according to your diagnostic result, solved problems, mistakes, and learning progress.",
      accent: "Adapt",
    },
    {
      title: "Targeted Recovery",
      description:
        "Get short recovery exercises designed around the exact topic or misconception that needs improvement.",
      accent: "Recover",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#F8F7FC] py-28"
    >
      <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#ECE9FF] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6C5CE7]">
            Core Capabilities
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] text-[#17172B] sm:text-5xl">
            More than a coding
            <span className="block text-[#6C5CE7]">
              practice platform.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            VizStruct is built to help learners understand how code behaves,
            why mistakes happen, and what they should practice next.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-[24px] border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_18px_50px_rgba(108,92,231,0.08)]"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-bold text-[#6C5CE7]">
                  0{index + 1}
                </span>

                <span className="rounded-full bg-[#F1EFFF] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#6C5CE7]">
                  {feature.accent}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-bold text-[#17172B]">
                {feature.title}
              </h3>

              <p className="mt-3 max-w-xl leading-7 text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
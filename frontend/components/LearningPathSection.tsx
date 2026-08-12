export default function LearningPathSection() {
  const journey = [
    {
      number: "01",
      title: "Diagnostic Assessment",
      description:
        "A short questionnaire and coding assessment helps VizStruct understand your current skill level.",
      badge: "Assess",
    },
    {
      number: "02",
      title: "Learner Profile",
      description:
        "Your strengths, weak concepts, preferred language, and learning pace become part of your profile.",
      badge: "Profile",
    },
    {
      number: "03",
      title: "Personalized Learning Path",
      description:
        "VizStruct recommends the right topic and difficulty level instead of giving every learner the same problems.",
      badge: "Recommend",
    },
    {
      number: "04",
      title: "Guided Coding Practice",
      description:
        "Solve carefully selected problems while VizStruct tracks your execution, errors, and understanding.",
      badge: "Practice",
    },
    {
      number: "05",
      title: "Performance Evaluation",
      description:
        "Your solutions, misconceptions, accuracy, and progress are analyzed after every learning cycle.",
      badge: "Evaluate",
    },
    {
      number: "06",
      title: "Updated Recommendations",
      description:
        "Your next topic and problems adapt automatically according to what you have learned and where you still need help.",
      badge: "Adapt",
    },
  ];

  return (
    <section
      id="roadmap"
      className="relative overflow-hidden bg-white py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[110px]" />
      <div className="pointer-events-none absolute -right-28 top-24 h-72 w-72 rounded-full bg-[#E7F8F7] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6C5CE7]">
            Personalized Learning
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] text-[#17172B] sm:text-5xl">
            A learning path
            <span className="block text-[#6C5CE7]">
              that changes with you.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            VizStruct does not treat every learner the same. Your progress,
            mistakes, and strengths continuously influence what you learn next.
          </p>
        </div>

        {/* Learner profile summary */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[28px] border border-violet-100 bg-[#F8F7FC] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C5CE7]">
              Learner Snapshot
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6C5CE7] text-xl font-bold text-white">
                A
              </div>

              <div>
                <p className="font-bold text-[#17172B]">
                  Current Level
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Beginner · Python
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    Variables
                  </span>

                  <span className="font-semibold text-[#3AA6A0]">
                    Strong
                  </span>
                </div>

                <div className="h-2 rounded-full bg-white">
                  <div className="h-2 w-[85%] rounded-full bg-[#8EDBD5]" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    Loops
                  </span>

                  <span className="font-semibold text-[#6C5CE7]">
                    Improving
                  </span>
                </div>

                <div className="h-2 rounded-full bg-white">
                  <div className="h-2 w-[62%] rounded-full bg-[#6C5CE7]" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    Arrays
                  </span>

                  <span className="font-semibold text-[#C77752]">
                    Needs Practice
                  </span>
                </div>

                <div className="h-2 rounded-full bg-white">
                  <div className="h-2 w-[42%] rounded-full bg-[#E7A581]" />
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-violet-100 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Recommended Next
              </p>

              <p className="mt-2 font-bold text-[#17172B]">
                Array Traversal
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Strengthen loop boundaries and array indexing before moving to
                searching algorithms.
              </p>
            </div>
          </div>

          {/* Journey */}
          <div className="relative">
            <div className="absolute bottom-7 left-[23px] top-7 hidden w-px bg-gradient-to-b from-[#6C5CE7]/20 via-[#6C5CE7]/50 to-[#8EDBD5]/20 sm:block" />

            <div className="space-y-4">
              {journey.map((item) => (
                <div
                  key={item.number}
                  className="group relative grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-[0_12px_35px_rgba(108,92,231,0.07)] sm:grid-cols-[48px_1fr_auto]"
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-200 bg-[#F1EFFF] font-mono text-xs font-bold text-[#6C5CE7]">
                    {item.number}
                  </div>

                  <div>
                    <h3 className="font-bold text-[#17172B]">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <div className="self-start">
                    <span className="inline-block rounded-full bg-[#F8F7FC] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#6C5CE7]">
                      {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Adaptive loop */}
        <div className="mt-10 rounded-[24px] bg-[#292865] px-7 py-7 text-white">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BDBBFF]">
                Continuous Learning Cycle
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Every result improves the next recommendation.
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              {[
                "Assess",
                "Recommend",
                "Execute",
                "Visualize",
                "Diagnose",
                "Recover",
              ].map((step, index, array) => (
                <div
                  key={step}
                  className="flex items-center gap-3"
                >
                  <span className="rounded-full border border-white/15 bg-white/[0.08] px-4 py-2">
                    {step}
                  </span>

                  {index < array.length - 1 && (
                    <span className="text-[#8EDBD5]">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
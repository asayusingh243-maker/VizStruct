export default function ComparisonSection() {
  const withoutVizStruct = [
    "Only sees Correct or Wrong Answer",
    "Does not understand why the logic failed",
    "Random problem selection",
    "Repeats the same conceptual mistakes",
    "Limited visibility into program execution",
  ];

  const withVizStruct = [
    "Sees code execution step by step",
    "Gets explanations for logical mistakes",
    "Receives personalized problem recommendations",
    "Practices targeted recovery exercises",
    "Tracks strengths, weaknesses, and progress",
  ];

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6C5CE7]">
            Why VizStruct?
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] text-[#17172B] sm:text-5xl">
            From solving code
            <span className="block text-[#6C5CE7]">
              to understanding it.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Traditional coding practice focuses on the result. VizStruct
            focuses on the learning process behind that result.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Without */}
          <div className="rounded-[28px] border border-red-100 bg-[#FFF9F7] p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B8654D]">
                  Without VizStruct
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#17172B]">
                  Practice without clarity
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFEDE7] text-lg text-[#B8654D]">
                ×
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {withoutVizStruct.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFEDE7] text-xs font-bold text-[#B8654D]">
                    ×
                  </span>

                  <p className="text-sm leading-6 text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* With */}
          <div className="rounded-[28px] border border-violet-100 bg-[#F8F7FC] p-7 shadow-[0_18px_50px_rgba(108,92,231,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                  With VizStruct
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#17172B]">
                  Practice with understanding
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECE9FF] text-lg text-[#6C5CE7]">
                ✓
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {withVizStruct.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F7F5] text-xs font-bold text-[#3A9994]">
                    ✓
                  </span>

                  <p className="text-sm leading-6 text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
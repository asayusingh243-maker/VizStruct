export default function ExecutionSection() {
  const concepts = [
    {
      number: "01",
      title: "Variables",
      description: "Watch values change while each line executes.",
      example: "count: 2 → 3",
    },
    {
      number: "02",
      title: "Loops",
      description: "Follow every iteration instead of guessing what happens.",
      example: "iteration: 3 / 5",
    },
    {
      number: "03",
      title: "Arrays",
      description: "See exactly which element your code is accessing.",
      example: "arr[2] → 8",
    },
    {
      number: "04",
      title: "Execution Flow",
      description: "Trace the path your program takes from line to line.",
      example: "line 4 → line 7",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-28"
    >
      {/* subtle background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-100/60 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6C5CE7]">
            Inside VizStruct
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] text-[#17172B] sm:text-5xl">
            See every step.
            <span className="block text-[#6C5CE7]">
              Understand every change.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Code execution happens quickly. VizStruct slows it down and turns
            invisible program states into something you can follow.
          </p>
        </div>

        {/* Main demonstration */}
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          {/* LEFT — Execution visualizer */}
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#F8F7FC] shadow-[0_20px_60px_rgba(42,38,100,0.08)]">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              </div>

              <p className="font-mono text-xs text-slate-400">
                vizstruct / execution
              </p>

              <span className="rounded-full bg-[#ECE9FF] px-3 py-1 text-[10px] font-semibold text-[#6C5CE7]">
                STEP 3 / 4
              </span>
            </div>

            <div className="grid md:grid-cols-[0.9fr_1.1fr]">
              {/* Code */}
              <div className="bg-[#17172B] p-7 font-mono text-sm">
                <p className="mb-6 text-xs uppercase tracking-[0.18em] text-slate-500">
                  main.py
                </p>

                <div className="space-y-3 text-slate-300">
                  <p>
                    <span className="mr-4 text-slate-600">1</span>
                    nums = [4, 7, 8, 9]
                  </p>

                  <p>
                    <span className="mr-4 text-slate-600">2</span>
                  </p>

                  <p className="rounded-lg border-l-2 border-[#8B7CF6] bg-[#6C5CE7]/15 py-2">
                    <span className="mr-4 pl-3 text-slate-600">3</span>
                    <span className="text-[#C7BFFF]">for</span> n{" "}
                    <span className="text-[#C7BFFF]">in</span> nums:
                  </p>

                  <p>
                    <span className="mr-4 text-slate-600">4</span>
                    <span className="pl-5 text-[#8EDBD5]">print</span>(n)
                  </p>
                </div>
              </div>

              {/* Visualization */}
              <div className="p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Array
                    </p>

                    <p className="mt-1 font-mono text-sm font-semibold text-[#17172B]">
                      nums
                    </p>
                  </div>

                  <span className="text-xs font-medium text-[#3AA6A0]">
                    ● Executing
                  </span>
                </div>

                {/* Array */}
                <div className="mt-8 grid grid-cols-4 gap-3">
                  {[4, 7, 8, 9].map((value, index) => (
                    <div key={index} className="text-center">
                      <div
                        className={`flex h-16 items-center justify-center rounded-xl border font-mono text-lg font-semibold ${
                          index === 2
                            ? "border-[#6C5CE7] bg-[#6C5CE7] text-white shadow-[0_8px_25px_rgba(108,92,231,0.25)]"
                            : "border-slate-200 bg-white text-slate-600"
                        }`}
                      >
                        {value}
                      </div>

                      <p
                        className={`mt-2 font-mono text-[10px] ${
                          index === 2
                            ? "font-semibold text-[#6C5CE7]"
                            : "text-slate-400"
                        }`}
                      >
                        [{index}]
                      </p>
                    </div>
                  ))}
                </div>

                {/* State */}
                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      index
                    </p>
                    <p className="mt-2 font-mono font-semibold text-[#6C5CE7]">
                      2
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      value
                    </p>
                    <p className="mt-2 font-mono font-semibold text-[#3AA6A0]">
                      8
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      line
                    </p>
                    <p className="mt-2 font-mono font-semibold text-[#17172B]">
                      3
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="mt-4 rounded-xl border border-violet-100 bg-[#F1EFFF] p-4">
                  <p className="text-xs font-bold text-[#6C5CE7]">
                    ✦ What&apos;s happening?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The loop has reached index{" "}
                    <span className="font-mono font-semibold text-[#17172B]">
                      2
                    </span>
                    . Variable{" "}
                    <span className="font-mono font-semibold text-[#17172B]">
                      n
                    </span>{" "}
                    now stores the value{" "}
                    <span className="font-mono font-semibold text-[#17172B]">
                      8
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — concepts */}
          <div className="space-y-1">
            {concepts.map((concept) => (
              <div
                key={concept.number}
                className="group grid grid-cols-[50px_1fr] gap-4 border-b border-slate-200 py-6 first:pt-0"
              >
                <span className="font-mono text-xs font-semibold text-[#6C5CE7]">
                  {concept.number}
                </span>

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-[#17172B] transition group-hover:text-[#6C5CE7]">
                      {concept.title}
                    </h3>

                    <span className="rounded-lg bg-[#F1EFFF] px-3 py-1.5 font-mono text-xs text-[#6C5CE7]">
                      {concept.example}
                    </span>
                  </div>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    {concept.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default function MistakeSection() {
  return (
    <section
      id="mistakes"
      className="relative overflow-hidden bg-[#F8F7FC] py-28"
    >
      <div className="pointer-events-none absolute right-[-120px] top-20 h-72 w-72 rounded-full bg-[#EEEAFE] blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6C5CE7]">
            Learn From Mistakes
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] text-[#17172B] sm:text-5xl">
            Your code ran.
            <span className="block text-[#6C5CE7]">
              But why did it fail?
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            VizStruct goes beyond “Wrong Answer” by helping you understand the
            concept behind your mistake and what you should practice next.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* LEFT — Problem */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(42,38,100,0.07)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Submitted Solution
                </p>

                <h3 className="mt-1 text-lg font-bold text-[#17172B]">
                  Print all array elements
                </h3>
              </div>

              <span className="rounded-full bg-[#FFF1EE] px-3 py-1 text-xs font-semibold text-[#C75C46]">
                Logic Error
              </span>
            </div>

            {/* Code panel */}
            <div className="mt-6 overflow-hidden rounded-2xl bg-[#17172B]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <p className="font-mono text-xs text-slate-400">main.py</p>

                <span className="text-[10px] text-slate-500">Python</span>
              </div>

              <div className="space-y-3 p-5 font-mono text-sm text-slate-300">
                <p>
                  <span className="mr-4 text-slate-600">1</span>
                  arr = [4, 7, 2, 9]
                </p>

                <p>
                  <span className="mr-4 text-slate-600">2</span>
                </p>

                <p className="rounded-lg border-l-2 border-red-400 bg-red-500/10 py-2">
                  <span className="mr-4 pl-3 text-slate-600">3</span>
                  <span className="text-[#FFB3A7]">for</span> i{" "}
                  <span className="text-[#FFB3A7]">in</span>{" "}
                  range(len(arr) - 1):
                </p>

                <p>
                  <span className="mr-4 text-slate-600">4</span>
                  <span className="pl-5 text-[#8EDBD5]">print</span>(arr[i])
                </p>
              </div>
            </div>

            {/* Expected vs actual */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-[#FAFAFD] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Expected
                </p>

                <p className="mt-3 font-mono text-sm text-[#3AA6A0]">
                  4 7 2 9
                </p>
              </div>

              <div className="rounded-xl border border-red-100 bg-[#FFF8F6] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Your Output
                </p>

                <p className="mt-3 font-mono text-sm text-[#C75C46]">
                  4 7 2
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-red-100 bg-[#FFF7F4] p-4">
              <p className="text-sm font-semibold text-[#B9543D]">
                Missing final element
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your loop stops before index{" "}
                <span className="font-mono font-semibold text-[#17172B]">
                  3
                </span>
                .
              </p>
            </div>
          </div>

          {/* RIGHT — VizStruct analysis */}
          <div className="space-y-5">
            {/* explanation */}
            <div className="rounded-[24px] border border-violet-100 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECE9FF] text-[#6C5CE7]">
                ✦
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">
                What went wrong?
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#17172B]">
                Your loop boundary is too small.
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                In Python, the final value passed to{" "}
                <span className="font-mono font-semibold text-[#17172B]">
                  range()
                </span>{" "}
                is excluded. Using{" "}
                <span className="font-mono font-semibold text-[#17172B]">
                  len(arr) - 1
                </span>{" "}
                causes the loop to stop before the last array element.
              </p>
            </div>

            {/* Concept */}
            <div className="rounded-[24px] border border-cyan-100 bg-[#F7FCFC] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3A9994]">
                Concept To Review
              </p>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-[#17172B]">
                    Python Range Boundaries
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Understand start, stop, and excluded upper bounds.
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#3A9994] shadow-sm">
                  Needs Review
                </span>
              </div>
            </div>

            {/* Recovery */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Recovery Exercise
              </p>

              <h3 className="mt-3 text-xl font-bold text-[#17172B]">
                Fix the traversal
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Modify the loop so that every element in the array is visited
                exactly once.
              </p>

              <div className="mt-5 rounded-xl bg-[#F8F7FC] p-4">
                <p className="font-mono text-sm text-[#17172B]">
                  arr = [5, 3, 8, 1]
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Expected output: 5 3 8 1
                </p>
              </div>

              <button className="mt-5 rounded-xl bg-[#6C5CE7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5B4BCF]">
                Try Recovery Exercise →
              </button>
            </div>
          </div>
        </div>

        {/* Adaptive connection */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-violet-100 bg-[#F1EFFF] px-6 py-5 sm:flex-row">
          <div>
            <p className="font-semibold text-[#17172B]">
              VizStruct remembers this learning gap.
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Future recommendations can include more loop-boundary practice
              until the concept improves.
            </p>
          </div>

          <div className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#6C5CE7]">
            Diagnose → Recover → Adapt
          </div>
        </div>
      </div>
    </section>
  );
}
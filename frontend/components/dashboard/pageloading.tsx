"use client";

type PageLoadingProps = {
  message?: string;
};

export default function PageLoading({
  message = "Preparing your learning space…",
}: PageLoadingProps) {
  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#17172B]">
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17172B]">
            <div className="text-xl font-bold text-white">
              V
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-[#6C5CE7]" />

            <span
              className="h-2 w-2 animate-bounce rounded-full bg-[#6C5CE7]"
              style={{ animationDelay: "120ms" }}
            />

            <span
              className="h-2 w-2 animate-bounce rounded-full bg-[#6C5CE7]"
              style={{ animationDelay: "240ms" }}
            />
          </div>

          <p className="text-sm font-medium text-[#17172B]">
            {message}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            VizStruct
          </p>

        </div>
      </div>
    </main>
  );
}
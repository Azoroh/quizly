import { FileText, Laptop, Smartphone, Sparkles } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto mt-40 px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1 - Context-Aware AI (wide) */}
        <div className="md:col-span-8 relative overflow-hidden rounded-[2rem] border border-zinc-800/50 bg-zinc-950 p-10 flex flex-col justify-between min-h-[420px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-6">
              Smart Analysis
            </div>
            <h2 className="text-4xl font-black text-white leading-tight mb-4">
              Context-Aware AI Generation
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl">
              Our engine doesn't just scan words; it understands concepts,
              hierarchies, and learning outcomes to create challenging
              questions.
            </p>
          </div>

          <div className="relative mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mock: source text being scanned */}
            <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/60 p-5 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Source Text
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="h-2 w-full bg-zinc-800 rounded" />
                <div className="h-2 w-11/12 bg-zinc-800 rounded" />
                <div className="h-2 w-full bg-primary/40 rounded" />
                <div className="h-2 w-4/5 bg-zinc-800 rounded" />
                <div className="h-2 w-full bg-zinc-800 rounded" />
                <div className="h-2 w-3/5 bg-zinc-800 rounded" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-transparent via-transparent to-zinc-950/80 pointer-events-none" />
              <div className="absolute inset-x-5 top-[52px] h-[2px] bg-primary/70 shadow-[0_0_12px_2px_rgba(159,167,255,0.6)] animate-pulse" />
            </div>

            {/* Mock: generated quiz question */}
            <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/60 p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Generated Question
                </span>
              </div>
              <div className="h-2.5 w-full bg-zinc-700 rounded mb-1" />
              <div className="h-2.5 w-4/5 bg-zinc-700 rounded mb-2" />
              <div className="flex flex-col gap-2">
                {["A", "B", "C"].map((opt, i) => (
                  <div
                    key={opt}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${
                      i === 1
                        ? "border-primary/50 bg-primary/10"
                        : "border-zinc-800/70 bg-zinc-900/40"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border ${
                        i === 1
                          ? "border-primary bg-primary"
                          : "border-zinc-600"
                      }`}
                    />
                    <div className="h-1.5 w-24 bg-zinc-700 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Mastery Reports */}
        <div className="md:col-span-4 rounded-[2rem] border border-zinc-800/50 bg-zinc-950 p-10 flex flex-col items-start justify-between text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
          <div>
            <h3 className="text-2xl font-black text-white mb-2">
              Mastery Reports
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Detailed analytics on your performance across different topics to
              identify where you need more focus.
            </p>
          </div>

          <div className="w-full flex items-center justify-center mt-8">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-zinc-800"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="326.7"
                  strokeDashoffset={326.7 * (1 - 0.92)}
                  className="text-primary drop-shadow-[0_0_8px_rgba(159,167,255,0.6)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">92%</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  Accuracy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 - Cross-Platform Sync */}
        <div className="md:col-span-4 rounded-[2rem] border border-zinc-800/50 bg-zinc-950 p-10 flex flex-col items-start justify-between text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
          <div>
            <h3 className="text-2xl font-black text-white mb-2">
              Cross-Platform Sync
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Generate on your laptop, practice on your phone. Your quizzes are
              always ready wherever you study.
            </p>
          </div>

          <div className="w-full flex items-end justify-center gap-4 mt-8">
            <div className="relative w-28 h-20 rounded-lg border border-zinc-700/70 bg-zinc-900/70 flex items-center justify-center">
              <Laptop className="w-8 h-8 text-zinc-500" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full bg-zinc-800/70" />
            </div>
            <div className="relative w-10 h-16 rounded-md border border-primary/50 bg-zinc-900/70 flex items-center justify-center shadow-[0_0_16px_rgba(159,167,255,0.25)]">
              <Smartphone className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Card 4 - Adaptive Formats */}
        <div className="md:col-span-8 rounded-[2rem] border border-zinc-800/50 bg-zinc-950 p-10 flex flex-col md:flex-row items-center gap-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
          <div className="flex-1">
            <h3 className="text-3xl font-black text-white mb-4">
              Multiple Choice, True/False, or Short Answer.
            </h3>
            <p className="text-zinc-400">
              Customize the quiz format to match your upcoming exam style
              precisely.
            </p>
          </div>

          <div className="flex-1 w-full flex flex-col gap-3">
            {/* Multiple choice */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/70 flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <div className="h-2 flex-1 bg-zinc-700 rounded" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                MCQ
              </span>
            </div>

            {/* True / False */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/70 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-primary/20 text-primary">
                  True
                </span>
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-zinc-800 text-zinc-500">
                  False
                </span>
              </div>
              <div className="h-2 flex-1 bg-zinc-700 rounded" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                T/F
              </span>
            </div>

            {/* Short answer */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/70 flex items-center gap-3">
              <div className="h-6 flex-1 rounded-md border border-zinc-700 bg-zinc-950/70 flex items-center px-2">
                <div className="h-1.5 w-1/2 bg-zinc-700 rounded" />
                <span className="ml-1 w-[1px] h-3 bg-primary animate-pulse" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                Short
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

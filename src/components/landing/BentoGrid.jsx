import { FileText, Laptop, Smartphone, Sparkles } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="mt-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Card 1 - Context-Aware AI */}
        <div className="md:col-span-8 rounded-xl border border-zinc-900 bg-zinc-950/50 p-8 flex flex-col justify-between min-h-[380px] hover:border-zinc-800 transition-colors">
          <div>
            <div className="inline-flex items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
              Core Engine
            </div>
            <h2 className="text-2xl font-medium text-zinc-100 mb-2">
              Context-Aware Generation
            </h2>
            <p className="text-zinc-500 text-sm max-w-md">
              Understands concepts, hierarchies, and learning outcomes to
              construct accurate assessments.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 opacity-80">
            <div className="rounded-lg border border-zinc-900 bg-[#09090b] p-4 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-3.5 h-3.5 text-zinc-600" />
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                  Source
                </span>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-zinc-800 rounded-sm" />
                <div className="h-1.5 w-11/12 bg-zinc-800 rounded-sm" />
                <div className="h-1.5 w-4/5 bg-zinc-700 rounded-sm" />
                <div className="h-1.5 w-full bg-zinc-800 rounded-sm" />
              </div>
            </div>

            <div className="rounded-lg border border-zinc-900 bg-[#09090b] p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Output
                </span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-sm mb-1" />
              <div className="flex flex-col gap-1.5 mt-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-6 rounded border flex items-center px-2 ${i === 2 ? "border-zinc-700 bg-zinc-800/50" : "border-zinc-900 bg-[#09090b]"}`}
                  >
                    <div className="h-1 w-16 bg-zinc-700 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Analytics */}
        <div className="md:col-span-4 rounded-xl border border-zinc-900 bg-zinc-950/50 p-8 flex flex-col items-start justify-between hover:border-zinc-800 transition-colors">
          <div>
            <h3 className="text-lg font-medium text-zinc-100 mb-2">
              Performance Analytics
            </h3>
            <p className="text-zinc-500 text-sm">
              Identify knowledge gaps with detailed topic breakdowns.
            </p>
          </div>
          <div className="w-full flex items-center justify-center mt-8">
            <div className="text-5xl font-light text-zinc-300 tracking-tighter">
              92<span className="text-2xl text-zinc-600">%</span>
            </div>
          </div>
        </div>

        {/* Card 3 - Universal Access */}
        <div className="md:col-span-4 rounded-xl border border-zinc-900 bg-zinc-950/50 p-8 flex flex-col items-start justify-between hover:border-zinc-800 transition-colors">
          <div>
            <h3 className="text-lg font-medium text-zinc-100 mb-2">
              Universal Access
            </h3>
            <p className="text-zinc-500 text-sm">
              Generate on desktop. Practice on mobile.
            </p>
          </div>
          <div className="w-full flex items-end justify-center gap-3 mt-8 text-zinc-700">
            <Laptop className="w-12 h-12" strokeWidth={1} />
            <Smartphone
              className="w-6 h-6 mb-1 text-zinc-500"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Card 4 - Formats */}
        <div className="md:col-span-8 rounded-xl border border-zinc-900 bg-zinc-950/50 p-8 flex flex-col md:flex-row items-center gap-8 hover:border-zinc-800 transition-colors">
          <div className="flex-1">
            <h3 className="text-xl font-medium text-zinc-100 mb-2">
              Adaptive Formats
            </h3>
            <p className="text-zinc-500 text-sm">
              MCQ, True/False, or Short Answer logic configured to match your
              specific exam requirements.
            </p>
          </div>
          <div className="flex-1 w-full flex flex-col gap-2">
            {["MCQ", "T/F", "Short"].map((format) => (
              <div
                key={format}
                className="px-4 py-3 rounded-lg border border-zinc-900 bg-[#09090b] flex items-center justify-between"
              >
                <div className="h-1.5 w-24 bg-zinc-800 rounded-sm" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  {format}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { AlertCircleIcon, ArrowLeftIcon, RotateCcwIcon } from "lucide-react";

export default function ErrorScreen({ onTryAgain, onBackToHome, error }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center overflow-x-hidden relative px-4 sm:px-6 py-12">
      <main className="w-full max-w-md flex items-center justify-center relative z-10">
        {/* Minimalist Error Card */}
        <div className="w-full bg-[#09090b] border border-zinc-900 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
          {/* Icon */}
          <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
            <AlertCircleIcon className="size-4 text-zinc-400" />
          </div>

          {/* Text Content */}
          <div className="space-y-2 mb-8">
            <h1 className="text-base font-medium tracking-tight text-zinc-100">
              {error || "Generation Failed"}
            </h1>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Quizly couldn't process your material or generate the assessment.
              Please try again or return to the generator.
            </p>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-2">
            <button
              type="button"
              onClick={onTryAgain}
              className="w-full h-9 flex items-center justify-center gap-2 bg-zinc-100 text-zinc-900 hover:bg-white text-xs font-medium rounded-md transition-all shadow-sm"
            >
              <RotateCcwIcon className="size-3.5 opacity-70" />
              Try Again
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="w-full h-9 flex items-center justify-center gap-2 bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-zinc-100 hover:border-zinc-800 text-xs font-medium rounded-md transition-all"
            >
              <ArrowLeftIcon className="size-3.5 opacity-70" />
              Back to Generator
            </button>
          </div>

          {/* System Tag */}
          <span className="mt-6 text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
            System: Exception caught during execution
          </span>
        </div>
      </main>
    </div>
  );
}

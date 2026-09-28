import { Check, FileText, Sparkles } from "lucide-react";
import { getStageStatus } from "../../utils/getStageStatus";
import { getFileTypeSummary } from "../../utils/getFileTypeSummary";
import { useQuiz } from "@/context/QuizContext";

const STAGES = [
  {
    key: "extracting",
    label: "Extracting content",
    description: "Reading your files and pulling out the raw text.",
  },
  {
    key: "analyzing",
    label: "Understanding key concepts",
    description: "Identifying what matters most in your material.",
  },
  {
    key: "finalizing",
    label: "Creating questions",
    description: "Turning key concepts into quiz questions.",
  },
  {
    key: "ready",
    label: "Finalizing quiz",
    description: "Wrapping everything up for you.",
  },
];

const STAGE_COPY = {
  extracting:
    "Quizly is extracting text from your files and preparing your material for quiz generation.",
  analyzing:
    "Quizly is reading your material, identifying key concepts, and understanding what matters most.",
  finalizing:
    "Quizly is turning those ideas into questions and assembling your personalized quiz.",
  ready: "Your quiz is ready. Preparing everything for you now.",
};

export default function LoadingCard() {
  const { uploadedFiles = [], loadingStage, questionCount } = useQuiz();

  const subtitle =
    STAGE_COPY[loadingStage] ??
    "Quizly is preparing your material and building your personalized quiz.";

  return (
    <div className="w-full max-w-lg bg-[#09090b] border border-zinc-900 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-xl font-medium tracking-tight text-zinc-100 mb-2">
          Generating assessment
        </h1>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* AI data-parsing visual */}
      <div className="relative flex items-end justify-center gap-1 h-12 mb-8 overflow-hidden rounded-lg border border-zinc-900 bg-zinc-950 px-4">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="w-1 rounded-full bg-zinc-700 animate-pulse-bar"
            style={{
              height: `${20 + ((i * 37) % 60)}%`,
              animationDelay: `${(i % 10) * 0.09}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/5 to-transparent animate-scan" />
      </div>

      {/* Source / metadata chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {uploadedFiles.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-1.5 border border-zinc-900 bg-zinc-950 text-zinc-300 text-xs px-2.5 py-1 rounded-md"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-600" />
            <span className="max-w-[140px] truncate">{file.name}</span>
          </div>
        ))}

        <div className="flex items-center gap-1.5 border border-zinc-900 bg-zinc-950 text-zinc-300 text-xs px-2.5 py-1 rounded-md font-mono">
          <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
          {questionCount} Qs &middot; {getFileTypeSummary(uploadedFiles)}
        </div>
      </div>

      {/* Vertical stepper */}
      <div className="flex flex-col gap-4">
        {STAGES.map(({ key, label }, idx) => {
          const status = getStageStatus(key, loadingStage);

          return (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                    status === "done"
                      ? "border-zinc-700 bg-zinc-800 text-zinc-200"
                      : status === "active"
                        ? "border-zinc-500 bg-zinc-900 text-zinc-100"
                        : "border-zinc-900 bg-zinc-950 text-zinc-700"
                  }`}
                >
                  {status === "done" ? (
                    <Check className="w-3 h-3 text-zinc-300 shrink-0" />
                  ) : status === "active" ? (
                    // Pixel-perfect CSS circle spinner
                    <div className="w-3 h-3 rounded-full border-[1.5px] border-zinc-900 border-t-zinc-300 animate-spin shrink-0" />
                  ) : (
                    idx + 1
                  )}
                </div>

                <span
                  className={`text-xs font-medium tracking-tight ${
                    status === "active"
                      ? "text-zinc-100"
                      : status === "done"
                        ? "text-zinc-400"
                        : "text-zinc-700"
                  }`}
                >
                  {label}
                </span>
              </div>

              {status === "active" && (
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Active
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

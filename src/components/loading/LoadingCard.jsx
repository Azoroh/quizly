import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, FileText, Loader2, Sparkles } from "lucide-react";
import { getStageStatus } from "../../utils/getStageStatus";
import { getFileTypeSummary } from "../../utils/getFileTypeSummary";

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

export default function LoadingCard({
  uploadedFiles = [],
  loadingStage,
  questionCount,
}) {
  const subtitle =
    STAGE_COPY[loadingStage] ??
    "Quizly is preparing your material and building your personalized quiz.";

  return (
    <Card className="w-full max-w-2xl bg-zinc-950 border-zinc-800 rounded-2xl shadow-2xl shadow-black/40">
      <CardContent className="p-4 sm:p-8 lg:p-12">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-headline font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3 sm:mb-4">
            Building your personalized quiz
          </h1>
          <p className="font-body text-zinc-400 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* AI data-parsing visual */}
        <div className="relative flex items-end justify-center gap-1 h-16 sm:h-20 mb-8 sm:mb-12 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 px-4">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-zinc-600 to-white/80 animate-pulse-bar"
              style={{
                height: `${20 + ((i * 37) % 60)}%`,
                animationDelay: `${(i % 10) * 0.09}s`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan" />
        </div>

        {/* Source / metadata chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {uploadedFiles.map((file) => (
            <Badge
              key={file.id}
              variant="outline"
              className="gap-1.5 border-zinc-800 bg-zinc-900 text-zinc-300 font-normal px-3 py-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span className="max-w-[160px] truncate">{file.name}</span>
            </Badge>
          ))}

          <Badge
            variant="outline"
            className="gap-1.5 border-zinc-800 bg-zinc-900 text-zinc-300 font-normal px-3 py-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            {questionCount} Questions &middot;{" "}
            {getFileTypeSummary(uploadedFiles)}
          </Badge>
        </div>

        {/* Vertical stepper */}
        <div className="flex flex-col">
          {STAGES.map(({ key, label, description }, idx) => {
            const status = getStageStatus(key, loadingStage);
            const isLast = idx === STAGES.length - 1;

            return (
              <div
                key={key}
                className={`relative flex items-start gap-3 sm:gap-4 ${
                  isLast ? "" : "pb-6 sm:pb-7"
                }`}
              >
                {!isLast && (
                  <div
                    className={`absolute left-3.5 sm:left-4 top-8 bottom-0 w-px transition-colors duration-500 ${
                      status === "done" ? "bg-emerald-500/30" : "bg-zinc-800"
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                    status === "done"
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : status === "active"
                        ? "border-white/20 bg-white/5"
                        : "border-zinc-800 bg-zinc-900"
                  }`}
                >
                  {status === "done" && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                  {status === "active" && (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  )}
                  {status === "upcoming" && (
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  )}
                </div>

                <div className="flex-1 pt-0.5 sm:pt-1">
                  <p
                    className={`text-sm sm:text-base font-semibold tracking-tight transition-colors duration-300 ${
                      status === "active"
                        ? "text-white"
                        : status === "done"
                          ? "text-zinc-400"
                          : "text-zinc-600"
                    }`}
                  >
                    {label}
                  </p>
                  {status === "active" && (
                    <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                      {description}
                    </p>
                  )}
                </div>

                {status === "active" && (
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-500 pt-1.5 sm:pt-2">
                    IN PROGRESS
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

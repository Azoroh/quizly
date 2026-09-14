import { getStageStatus } from "../../utils/getStageStatus";

const stages = [
  { key: "extracting", label: "Extracting content" },
  { key: "analyzing", label: "Understanding key concepts" },
  { key: "finalizing", label: "Creating questions" },
  { key: "ready", label: "Finalizing quiz" },
];

export default function ProgressStages({ loadingStage }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {stages.map(({ key, label }) => {
        const status = getStageStatus(key, loadingStage);

        return (
          <div
            key={key}
            className={`flex items-center gap-3 sm:gap-4 transition-opacity duration-300 ${
              status === "upcoming" ? "opacity-35" : ""
            } ${status === "done" ? "opacity-60" : ""}`}
          >
            {status === "done" && (
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-primary/20 rounded-full">
                <span className="material-symbols-outlined text-secondary text-lg sm:text-xl">
                  check
                </span>
              </div>
            )}

            {status === "active" && (
              <div className="relative flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-primary/20 rounded-full">
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full progress-glow"></div>
              </div>
            )}

            {status === "upcoming" && (
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-outline-variant/30 rounded-full">
                <div className="w-1.5 h-1.5 bg-outline-variant rounded-full"></div>
              </div>
            )}

            <span
              className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                status === "active"
                  ? "text-primary font-bold tracking-tight"
                  : "text-on-surface"
              }`}
            >
              {label}
            </span>

            {status === "active" && (
              <span className="ml-auto text-primary/60 text-[10px] sm:text-xs font-mono">
                IN PROGRESS
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

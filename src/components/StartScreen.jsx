import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

import StartButton from "./start/StartButton";
import { getSourceStatus } from "../utils/getSourceStatus";
import { formatTime } from "../utils/formatTime";
import { FileText, Clock, Layers, ArrowLeft, LineChart } from "lucide-react";

export default function StartScreen() {
  const navigate = useNavigate();
  const { dispatch, questionCount, questions, sourceUsage = [] } = useQuiz();

  const estimatedSeconds = questionCount * 20;
  const timeLabel =
    estimatedSeconds < 60
      ? `${formatTime(estimatedSeconds, true)} sec`
      : `${formatTime(estimatedSeconds, true)} min`;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center overflow-x-hidden relative px-4 sm:px-6 py-12">
      {/* Main Minimalist Container */}
      <div className="w-full max-w-xl bg-[#09090b] border border-zinc-900 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-1">
            <Layers className="size-4 text-zinc-300" strokeWidth={2} />
          </div>

          <h1 className="text-xl font-medium tracking-tight text-zinc-100">
            Your quiz is ready
          </h1>

          <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
            Review your parsed sources below, select your preferred question
            volume, and begin when ready.
          </p>
        </div>

        {/* Body Content */}
        <div className="flex flex-col gap-6">
          {/* Source document badges */}
          {sourceUsage.length > 0 && (
            <section aria-label="Source documents">
              <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 mb-2.5">
                Sources used
              </p>
              <div className="flex flex-wrap gap-1.5">
                {sourceUsage.map((source) => {
                  const status = getSourceStatus(source);

                  return (
                    <div
                      key={source.id}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-900 bg-zinc-950 text-zinc-300 text-xs"
                      title={status.message}
                    >
                      <FileText className="w-3 h-3 text-zinc-600 shrink-0" />
                      <span className="truncate max-w-[160px]">
                        {source.name}
                      </span>
                      {status.tone !== "included" && (
                        <span className="font-mono text-[10px] text-zinc-500 ml-0.5">
                          ({status.label})
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                icon: (
                  <Layers
                    className="w-3.5 h-3.5 text-zinc-500"
                    strokeWidth={2}
                  />
                ),
                label: "Questions",
                value: `${questionCount}`,
                unit: "",
              },
              {
                icon: (
                  <Clock
                    className="w-3.5 h-3.5 text-zinc-500"
                    strokeWidth={2}
                  />
                ),
                label: "Est. Time",
                // Split the time number from the unit so they don't jump around
                value:
                  estimatedSeconds < 60
                    ? `${estimatedSeconds}`
                    : formatTime(estimatedSeconds, true),
                unit: estimatedSeconds < 60 ? "sec" : "min",
              },
              {
                icon: (
                  <LineChart
                    className="w-3.5 h-3.5 text-zinc-500"
                    strokeWidth={2}
                  />
                ),
                label: "Difficulty",
                value: "Medium",
                unit: "",
              },
            ].map(({ icon, label, value, unit }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-between p-3 rounded-lg border border-zinc-900 bg-zinc-950/50 min-h-[76px]"
              >
                {icon}
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600">
                  {label}
                </span>
                {/* Fixed layout container to prevent text shifting */}
                <div className="flex items-baseline gap-1 text-xs font-medium text-zinc-200">
                  <span>{value}</span>
                  {unit && (
                    <span className="text-[10px] font-mono text-zinc-500">
                      {unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Question count selector */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600">
              Select Question Count
            </p>
            <div className="flex p-0.5 bg-zinc-950 border border-zinc-900 rounded-md w-full max-w-[240px]">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    if (count !== questionCount)
                      dispatch({ type: "selectQuestionCount", payload: count });
                  }}
                  className={`flex-1 py-1.5 text-xs font-medium rounded transition-all
                    ${
                      questionCount === count
                        ? "bg-zinc-800 text-zinc-100 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-900">
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "newQuiz" });
              navigate("/");
            }}
            className="h-10 w-10 shrink-0 rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 flex items-center justify-center transition-colors"
            title="Back to generator"
          >
            <ArrowLeft className="size-4" />
          </button>

          <StartButton
            onClick={() => {
              dispatch({ type: "startQuiz" });
              navigate("/quiz");
            }}
            questions={questions}
          />
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

import StartButton from "./start/StartButton";
import { getSourceStatus } from "../utils/getSourceStatus";
import { formatTime } from "../utils/formatTime";
import { formatTitle } from "@/utils/formatTitle";
import { FileText, Clock, Layers, ArrowLeft, LineChart } from "lucide-react";

export default function StartScreen() {
  const navigate = useNavigate();

  const {
    dispatch,
    questionCount,
    questions,
    totalQuestions = [],
    sourceUsage = [],
    isRerun,
    inputText,
  } = useQuiz();

  const estimatedSeconds = questionCount * 20;

  const maxQ =
    totalQuestions.length > 0 ? totalQuestions.length : questions.length || 5;
  let questionOptions = [];

  if (maxQ <= 5) {
    // Fallback if the AI returns fewer than 5 questions
    questionOptions = [maxQ];
  } else {
    const opt1 = 5; // minimum is 5
    const opt3 = maxQ; // maximum is total generated/loaded
    const opt2 = Math.round((opt1 + opt3) / 2); // midpoint without decimals

    // Array.from(new Set(...)) automatically removes duplicates
    questionOptions = Array.from(new Set([opt1, opt2, opt3]));
    // if say: maxQ is 6, it prevents [5, 6, 6] and outputs [5, 6]
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center overflow-x-hidden relative px-4 sm:px-6 py-12">
      <div className="w-full max-w-xl bg-[#09090b] border border-zinc-900 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-1">
            <Layers className="size-4 text-zinc-300" strokeWidth={2} />
          </div>

          <h1 className="text-xl font-medium tracking-tight text-zinc-100">
            {isRerun ? "Quiz loaded from Library" : "Your quiz is ready"}
          </h1>

          <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
            {isRerun
              ? `Review your settings for "${formatTitle(inputText)}" and begin when ready.`
              : "Review your parsed sources below, select your preferred question volume, and begin when ready."}
          </p>
        </div>

        {/* Body Content */}
        <div className="flex flex-col gap-6">
          {/* Source document badges */}
          {!isRerun && sourceUsage.length > 0 && (
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
              {questionOptions.map((count) => (
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
              if (isRerun) {
                navigate("/dashboard");
              } else {
                dispatch({ type: "newQuiz" });
                navigate("/");
              }
            }}
            className="h-10 w-10 shrink-0 rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 flex items-center justify-center transition-colors"
            title={isRerun ? "Back to library" : "Back to generator"}
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

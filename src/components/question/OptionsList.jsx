import { useQuiz } from "@/context/QuizContext";
import { Check, X } from "lucide-react";

const letters = ["A", "B", "C", "D"];

export default function OptionsList() {
  const {
    answer,
    dispatch,
    curQuestion: { options = [], correctOption } = {},
  } = useQuiz();

  const hasSelected = answer !== null;

  return (
    <div className="grid grid-cols-1 gap-3 mb-6 sm:mb-8">
      {options?.map((option, i) => {
        const isSelected = answer === i;
        const isCorrect = correctOption === i;

        let stateClasses =
          "bg-zinc-800/40 border-zinc-700/60 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer";
        let badgeClasses =
          "bg-zinc-800 border border-zinc-700 text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-500";
        let Icon = null;

        if (hasSelected) {
          if (isCorrect) {
            // correct answer highlighted green
            stateClasses =
              "bg-emerald-600/15 border-emerald-500 text-emerald-200 font-semibold shadow-sm ring-1 ring-emerald-500/40";
            badgeClasses =
              "bg-emerald-600 text-white font-bold shadow-sm border-emerald-500";
            Icon = <Check className="w-4 h-4 text-emerald-300 ml-3 shrink-0" />;
          } else if (isSelected && !isCorrect) {
            // wrong answer highlighted red
            stateClasses =
              "bg-rose-600/15 border-rose-500 text-rose-200 font-semibold shadow-sm ring-1 ring-rose-500/40";
            badgeClasses =
              "bg-rose-600 text-white font-bold shadow-sm border-rose-500";
            Icon = <X className="w-4 h-4 text-rose-300 ml-3 shrink-0" />;
          } else {
            // Unselected wrong answers fade
            stateClasses =
              "bg-zinc-800/20 border-zinc-800/50 text-zinc-400 opacity-40 cursor-not-allowed";
            badgeClasses =
              "bg-zinc-800/40 border border-zinc-800 text-zinc-600";
          }
        }

        return (
          <button
            key={i}
            onClick={() => {
              !hasSelected && dispatch({ type: "selectAnswer", payload: i });
            }}
            disabled={hasSelected}
            className={`group flex items-center text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 ease-in-out w-full ${stateClasses}`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg font-semibold text-xs sm:text-sm mr-3 sm:mr-4 transition-colors shrink-0 ${badgeClasses}`}
            >
              {letters[i]}
            </div>

            <span className="text-sm sm:text-base font-medium transition-colors flex-1 leading-relaxed">
              {option}
            </span>

            {Icon}
          </button>
        );
      })}
    </div>
  );
}

import { useQuiz } from "@/context/QuizContext";
import { Check } from "lucide-react";

const letters = ["A", "B", "C", "D"];

export default function OptionsList() {
  const {
    answer,
    dispatch,
    curQuestion: { options = [] } = {},
  } = useQuiz();

  const hasSelected = answer !== null;

  return (
    <div className="grid grid-cols-1 gap-3 mb-6 sm:mb-8">
      {options?.map((option, i) => {
        const isSelected = answer === i;

        let stateClasses =
          "bg-zinc-800/40 border-zinc-700/60 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer";
        let badgeClasses =
          "bg-zinc-800 border border-zinc-700 text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-500";

        if (hasSelected) {
          if (isSelected) {
            stateClasses =
              "bg-violet-600/15 border-violet-500 text-violet-200 font-semibold shadow-sm ring-1 ring-violet-500/40";
            badgeClasses = "bg-violet-600 text-white font-bold shadow-sm";
          } else {
            stateClasses =
              "bg-zinc-800/20 border-zinc-800/50 text-zinc-400 opacity-40 cursor-not-allowed";
            badgeClasses = "bg-zinc-800/40 border border-zinc-800 text-zinc-600";
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

            {isSelected && (
              <Check className="w-4 h-4 text-violet-300 ml-3 shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
}

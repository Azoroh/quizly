import { useQuiz } from "@/context/QuizContext";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function QuestionFooter() {
  const { answer, index, questions, dispatch } = useQuiz();
  const hasSelected = answer !== null;

  const buttonText =
    index !== questions.length - 1 ? "Next Question" : "Final Question";

  return (
    <div className="flex items-center justify-stretch sm:justify-end pt-5 sm:pt-6 border-t border-zinc-800/80">
      <Button
        disabled={!hasSelected}
        onClick={
          index !== questions.length - 1
            ? () => dispatch({ type: "nextQuestion" })
            : () => dispatch({ type: "finish" })
        }
        className={`w-full sm:w-auto h-12 px-6 sm:px-8 rounded-xl font-semibold text-sm sm:text-base gap-2 transition-all duration-200 ${
          hasSelected
            ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25 active:scale-[0.98]"
            : "bg-zinc-800/80 border border-zinc-700/60 text-zinc-500 cursor-not-allowed opacity-50"
        }`}
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </div>
  );
}

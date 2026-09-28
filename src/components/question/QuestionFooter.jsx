import { useQuiz } from "@/context/QuizContext";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuestionFooter() {
  const { answer, index, questions, dispatch } = useQuiz();
  const navigate = useNavigate();
  const hasSelected = answer !== null;

  const buttonText =
    index !== questions.length - 1 ? "Next Question" : "Finish Quiz";

  return (
    <div className="flex items-center justify-end pt-4 border-t border-zinc-900">
      <button
        type="button"
        disabled={!hasSelected}
        onClick={
          index !== questions.length - 1
            ? () => dispatch({ type: "nextQuestion" })
            : () => {
                dispatch({ type: "finish" });
                navigate("/results");
              }
        }
        className={`w-full sm:w-auto h-9 px-4 rounded-md text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-sm ${
          hasSelected
            ? "bg-zinc-100 text-zinc-900 hover:bg-white"
            : "bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed"
        }`}
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
      </button>
    </div>
  );
}

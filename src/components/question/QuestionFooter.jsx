import { useQuiz } from "@/context/QuizContext";

export default function QuestionFooter() {
  const { answer, index, questions, dispatch } = useQuiz();
  const hasSelected = answer !== null;

  const buttonText =
    index !== questions.length - 1 ? "Next Question" : "Final Question";

  return (
    <div className="flex items-center justify-stretch sm:justify-end pt-5 sm:pt-6 border-t border-outline-variant/10">
      <button
        disabled={!hasSelected}
        className={`flex w-full sm:w-auto justify-center items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-headline font-bold transition-all ${
          hasSelected
            ? "bg-gradient-to-r from-primary to-primary-dim text-on-primary shadow-lg shadow-primary/20 active:scale-95"
            : "bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed opacity-80"
        }`}
        onClick={
          index !== questions.length - 1
            ? () => dispatch({ type: "nextQuestion" })
            : () => dispatch({ type: "finish" })
        }
      >
        {buttonText}
        <span className="material-symbols-outlined text-xl">arrow_forward</span>
      </button>
    </div>
  );
}

export default function ResultActions({ onRestart, onNewQuiz }) {
  return (
    <div className="w-full max-w-md flex flex-col gap-3">
      <button
        onClick={onRestart}
        className="w-full py-4 bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-headline font-bold rounded-full transition-all hover:brightness-110 active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(159,167,255,0.5)]"
      >
        Restart Quiz
      </button>
      <button
        onClick={onNewQuiz}
        className="w-full py-3.5 text-on-surface-variant hover:text-on-surface font-label font-semibold transition-colors text-sm rounded-full border border-transparent hover:border-outline-variant/20"
      >
        Generate Another Quiz
      </button>
    </div>
  );
}

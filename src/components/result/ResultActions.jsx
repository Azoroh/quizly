export default function ResultActions({ onRestart, onNewQuiz }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <button
        type="button"
        onClick={onRestart}
        className="w-full h-9 flex items-center justify-center bg-zinc-100 text-zinc-900 hover:bg-white text-xs font-medium rounded-md transition-all shadow-sm"
      >
        Restart Quiz
      </button>
      <button
        type="button"
        onClick={onNewQuiz}
        className="w-full h-9 flex items-center justify-center bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-zinc-100 hover:border-zinc-800 text-xs font-medium rounded-md transition-all"
      >
        Generate Another Quiz
      </button>
    </div>
  );
}

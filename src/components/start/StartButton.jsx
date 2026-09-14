export default function StartButton({ onClick }) {
  return (
    <div className="flex-1">
      <button
        // disabled={questions}
        onClick={onClick}
        className="group relative w-full h-14 rounded-full overflow-hidden bg-gradient-to-r from-primary to-primary-dim font-headline font-bold text-base text-on-primary shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="relative flex items-center justify-center gap-2 transform transition duration-100 group-hover:scale-105">
          Start Quiz
          <span className="material-symbols-outlined text-xl leading-none transform transition duration-300 group-hover:translate-x-1.5">
            arrow_forward
          </span>
        </span>
      </button>
    </div>
  );
}

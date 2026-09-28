import { ArrowRightIcon } from "lucide-react";

export default function StartButton({ onClick }) {
  return (
    <div className="flex-1">
      <button
        type="button"
        onClick={onClick}
        className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-100 text-zinc-900 hover:bg-white text-xs font-medium rounded-md transition-all shadow-sm group"
      >
        Start Quiz
        <ArrowRightIcon className="size-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}

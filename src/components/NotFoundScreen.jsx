import { useNavigate } from "react-router-dom";
import { FileQuestionIcon, ArrowLeftIcon } from "lucide-react";

export default function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center overflow-x-hidden relative px-4 sm:px-6 py-12">
      <main className="w-full max-w-md flex items-center justify-center relative z-10">
        <div className="w-full bg-[#09090b] border border-zinc-900 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
            <FileQuestionIcon className="size-4 text-zinc-400" />
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-base font-medium tracking-tight text-zinc-100">
              Page Not Found
            </h1>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full h-9 flex items-center justify-center gap-2 bg-zinc-100 text-zinc-900 hover:bg-white text-xs font-medium rounded-md transition-all shadow-sm"
          >
            <ArrowLeftIcon className="size-3.5 opacity-70" />
            Back to Generator
          </button>

          <span className="mt-6 text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
            Error: 404 Route Not Found
          </span>
        </div>
      </main>
    </div>
  );
}

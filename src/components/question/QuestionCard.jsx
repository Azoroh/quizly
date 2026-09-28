import { cn } from "@/lib/utils";

export default function QuestionCard({ children, className }) {
  return (
    <div
      className={cn(
        "w-full max-w-xl bg-[#09090b] border border-zinc-900 rounded-xl p-6 sm:p-8 shadow-sm relative overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

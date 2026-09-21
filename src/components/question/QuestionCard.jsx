import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

export default function QuestionCard({ children, className }) {
  return (
    <Card
      className={cn(
        "w-full max-w-2xl bg-zinc-900 border-zinc-800/80 shadow-2xl shadow-black/60 rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden gap-0",
        className,
      )}
    >
      {children}
    </Card>
  );
}

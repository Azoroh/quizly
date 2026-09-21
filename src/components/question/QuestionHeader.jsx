import { useQuiz } from "@/context/QuizContext";
import QuestionTimer from "./QuestionTimer";
import { getProgressPercent } from "@/utils/getProgressPercent";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export default function QuestionHeader() {
  const { dispatch, remainingSeconds, index, questions, answer } = useQuiz();
  const current = index + 1;
  const total = questions.length;
  const progress = getProgressPercent(index, answer, questions.length);

  return (
    <div className="flex flex-col gap-4 sm:gap-5 mb-6 sm:mb-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-zinc-800 bg-zinc-800/60 text-zinc-400 font-medium px-3 py-1 rounded-full text-xs sm:text-sm tracking-wide"
          >
            Question{" "}
            <span className="text-zinc-100 font-bold ml-1">{current}</span>
            <span className="text-zinc-500 mx-1">/</span>
            <span className="text-zinc-400">{total}</span>
          </Badge>
        </div>

        <QuestionTimer
          remainingSeconds={remainingSeconds}
          dispatch={dispatch}
        />
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="h-2 bg-zinc-800/80" />
    </div>
  );
}

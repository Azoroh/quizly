import QuestionTimer from "./QuestionTimer";

export default function QuestionHeader({
  current,
  total,
  remainingSeconds,
  dispatch,
  progress,
}) {
  // const progress = Math.round((current / total) * 100);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 mb-8 sm:mb-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-on-surface font-headline font-bold text-lg sm:text-xl">
          Question {current} of {total}
        </h2>

        <QuestionTimer
          remainingSeconds={remainingSeconds}
          dispatch={dispatch}
        />
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden p-[2px]">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_12px_rgba(159,167,255,0.4)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

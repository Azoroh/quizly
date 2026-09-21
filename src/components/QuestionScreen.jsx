import QuestionCard from "./question/QuestionCard";
import QuestionHeader from "./question/QuestionHeader";
import QuestionFooter from "./question/QuestionFooter";
import OptionsList from "./question/OptionsList";
import { useQuiz } from "@/context/QuizContext";

export default function QuestionScreen() {
  const { curQuestion } = useQuiz();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center overflow-x-hidden relative px-4 sm:px-6 pt-20 sm:pt-28 pb-12">
      {/* Subtle background atmospheric glows */}
      <div
        aria-hidden="true"
        className="fixed top-[-15%] left-[-10%] w-[45%] h-[45%] bg-violet-600/5 blur-[140px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="fixed bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none"
      />

      <main className="w-full flex items-center justify-center relative z-10">
        <QuestionCard>
          <QuestionHeader />

          {/* Active Question Text */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-100 leading-snug">
              {curQuestion?.question}
            </h1>
          </div>

          <OptionsList />

          <QuestionFooter />
        </QuestionCard>
      </main>
    </div>
  );
}

import QuestionCard from "./question/QuestionCard";
import QuestionHeader from "./question/QuestionHeader";
import QuestionFooter from "./question/QuestionFooter";
import OptionsList from "./question/OptionsList";
import { useQuiz } from "@/context/QuizContext";

export default function QuestionScreen() {
  const { curQuestion } = useQuiz();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center overflow-x-hidden relative px-4 sm:px-6 py-12">
      <main className="w-full flex items-center justify-center relative z-10">
        <QuestionCard>
          <QuestionHeader />

          {/* Active Question Text */}
          <div className="my-6">
            <h1 className="text-base sm:text-lg font-medium tracking-tight text-zinc-100 leading-relaxed">
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

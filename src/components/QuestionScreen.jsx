import QuestionCard from "./question/QuestionCard";
import QuestionHeader from "./question/QuestionHeader";
import QuestionFooter from "./question/QuestionFooter";
import OptionsList from "./question/OptionsList";
import { useQuiz } from "@/context/QuizContext";

export default function QuestionScreen() {
  const { curQuestion } = useQuiz();

  return (
    <div className="dark bg-background text-on-surface min-h-screen flex flex-col overflow-x-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 glow-bg pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <main className="flex-grow flex items-start sm:items-center justify-center px-3 sm:px-6 pt-18 sm:pt-24 pb-6 sm:pb-12">
        <div className="w-full max-w-3xl">
          <QuestionCard>
            <QuestionHeader />

            {/* Text */}
            <div className="mb-6 sm:mb-12">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-headline font-bold leading-tight tracking-tight text-on-surface">
                {curQuestion?.question}
              </h1>
            </div>

            <OptionsList />

            <QuestionFooter />
          </QuestionCard>
        </div>
      </main>
    </div>
  );
}

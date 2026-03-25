import QuestionCard from "./question/QuestionCard";
import QuestionHeader from "./question/QuestionHeader";
import QuestionFooter from "./question/QuestionFooter";
import OptionsList from "./question/OptionsList";

export default function QuestionScreen({
  dispatch,
  curQuestion,
  answer,
  index,
  questions,
}) {
  // const [selected, setSelected] = useState(null);

  // console.log(curQuestion);

  return (
    <div className="dark bg-background text-on-surface min-h-screen flex flex-col overflow-x-hidden">
      {/* Atmospheric Blooms */}
      <div className="fixed -top-48 -left-48 w-[600px] h-[600px] bg-radial-bloom pointer-events-none -z-10 blur-[40px]"></div>
      <div className="fixed -bottom-48 -right-48 w-[600px] h-[600px] bg-radial-bloom pointer-events-none -z-10 blur-[40px]"></div>

      {/* Nav */}
      <nav className="flex justify-center items-center w-full px-6 py-8 fixed top-0 z-50">
        <div className="text-2xl font-black text-primary tracking-tight font-headline">
          Quizly
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-3xl">
          <QuestionCard answer={answer}>
            <QuestionHeader current={3} total={15} time="07:42" />

            {/* Question Text */}
            <div className="mb-12">
              <h1 className="text-2xl md:text-3xl font-headline font-bold leading-tight tracking-tight text-on-surface">
                {curQuestion.question}
              </h1>
            </div>

            <OptionsList
              answer={answer}
              dispatch={dispatch}
              options={curQuestion.options}
              correctOption={curQuestion.correctOption}
            />

            <QuestionFooter
              answer={answer}
              onClick={
                index !== questions.length - 1
                  ? () => dispatch({ type: "nextQuestion" })
                  : () => dispatch({ type: "finish" })
              }
              buttonText={
                index !== questions.length - 1
                  ? "Next Question"
                  : "Final Question"
              }
            />
          </QuestionCard>
        </div>
      </main>
    </div>
  );
}

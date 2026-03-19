import { decodeHTML } from "../utils/helpers";
import NextButton from "./NextButton";
import Options from "./Options";
import Progress from "./Progress";

export default function Question({
  dispatch,
  question,
  answer,
  questionsLength,
  index,
  children,
}) {
  return (
    <section className="screen screen-quiz">
      <div className="content-wrap">
        <Progress />

        <div className="glass-card quiz-card">
          <div className="question-top">
            <p className="question-tag">Current Question</p>
            <h2 className="question-text">{decodeHTML(question.question)}</h2>
          </div>

          <Options question={question} dispatch={dispatch} answer={answer} />

          <div className="quiz-footer">
            <NextButton
              dispatch={dispatch}
              answer={answer}
              questionsLength={questionsLength}
              index={index}
            />

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

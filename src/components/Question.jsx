import { decodeHTML } from "../utils/decodeHTML";
import Options from "./Options";

export default function Question({ dispatch, question, answer }) {
  console.log(question);

  return (
    <section className="screen screen-quiz">
      <div className="content-wrap">
        <div className="progress-wrap">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: "48%" }}></div>
          </div>
          <div className="progress-meta">
            <span>Question 6 of 12</span>
            <span>48%</span>
          </div>
        </div>

        <div className="glass-card quiz-card">
          <div className="question-top">
            <p className="question-tag">Current Question</p>
            <h2 className="question-text">{decodeHTML(question.question)}</h2>
          </div>

          <Options question={question} dispatch={dispatch} answer={answer} />

          <div className="quiz-footer">
            <button className="btn btn-secondary">Next</button>

            <div className="timer-pill">
              <span className="timer-label">Time Left</span>
              <span className="timer-value">00:14</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

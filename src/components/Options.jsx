import { decodeHTML, getOptionLetter } from "../utils/helpers";

export default function Options({ dispatch, question, answer }) {
  //   console.log(question.options);
  console.log(answer);
  const hasAnswered = answer !== null;
  console.log(hasAnswered);

  return (
    <div className="options-grid">
      {question.options.map((option, i) => (
        <button
          disabled={hasAnswered}
          key={i}
          className={`option-card 
            ${option === answer ? "option-selected" : ""}
            ${
              hasAnswered
                ? option === question.correct_answer
                  ? "option-correct"
                  : "option-incorrect"
                : ""
            }
            `}
          onClick={() => dispatch({ type: "newAnswer", payload: option })}
        >
          <span className="option-letter">{getOptionLetter(i)}</span>
          <span className="option-text">{decodeHTML(option)}</span>
          {option === answer && <span className="option-state-icon">✓</span>}
        </button>
      ))}

      {/* <button className="option-card">
        <span className="option-letter">A</span>
        <span className="option-text">map()</span>
      </button>

      <button className="option-card option-selected">
        <span className="option-letter">B</span>
        <span className="option-text">reduce()</span>
        <span className="option-state-icon">✓</span>
      </button>

      <button className="option-card">
        <span className="option-letter">C</span>
        <span className="option-text">filter()</span>
      </button>

      <button className="option-card">
        <span className="option-letter">D</span>
        <span className="option-text">find()</span>
      </button> */}
    </div>
  );
}

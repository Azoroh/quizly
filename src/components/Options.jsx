import { decodeHTML, getOptionLetter } from "../utils/helpers";

export default function Options({ dispatch, question, answer }) {
  const hasAnswered = answer !== null;

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
    </div>
  );
}

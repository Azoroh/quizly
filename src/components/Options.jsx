export default function Options({ question }) {
  //   const options = [question.correct_answer, ...question.incorrect_answers].sort(
  //     () => Math.random() - 0.5,
  //   );
  //   console.log(options);

  return (
    <div className="options-grid">
      <button className="option-card">
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
      </button>
    </div>
  );
}

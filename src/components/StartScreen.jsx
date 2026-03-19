export default function StartScreen({ dispatch, numQuestions }) {
  function handleStartQuiz() {
    if (!numQuestions) return;
    dispatch({ type: "start" });
  }

  return (
    <section className="screen screen-start">
      <div className="glass-card start-card">
        <p className="eyebrow">Premium Quiz Experience</p>
        <h1 className="screen-title">Quiz Challenge</h1>
        <p className="screen-subtitle">
          Ready to test your knowledge? Take a deep breath and begin when you’re
          set.
        </p>

        <div className="score-panel">
          <span className="score-label">Highest Score</span>
          <strong className="score-value">18 / 20</strong>
        </div>

        <div className="quiz-settings">
          <label htmlFor="question-count" className="setting-label">
            Number of Questions
          </label>

          <div className="select-wrap">
            <select
              id="question-count"
              className="question-select"
              value={numQuestions}
              onChange={(e) =>
                dispatch({
                  type: "setNumQuestions",
                  payload: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Select number of questions
              </option>
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={20}>20 Questions</option>
              <option value={40}>40 Questions</option>
            </select>

            <span className="select-icon">⌄</span>
          </div>
        </div>

        <button
          disabled={!numQuestions}
          className="btn btn-primary btn-large"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    </section>
  );
}

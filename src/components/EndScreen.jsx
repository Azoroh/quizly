export default function EndScreen({
  points,
  highscore,
  dispatch,
  possibleMaxScore,
}) {
  return (
    <section className="screen screen-end">
      <div className="content-wrap">
        <div className="progress-wrap">
          <div className="progress-track">
            <div
              className="progress-fill progress-complete"
              style={{ width: "100%" }}
            ></div>
          </div>
          <div className="progress-meta">
            <span>Completed</span>
            <span>100%</span>
          </div>
        </div>

        <div className="glass-card end-card">
          <p className="eyebrow">Well Done</p>
          <h2 className="screen-title smaller">Quiz Complete</h2>

          <div className="final-score-block new-high-score">
            <span className="score-label">Your Score</span>
            <strong className="score-value large-score">
              {points} / {possibleMaxScore}
            </strong>
            <span className="new-badge">New High Score</span>
          </div>

          <div className="score-compare">
            <div className="compare-item">
              <span className="compare-label">Your Score</span>
              <strong className="compare-value">{points}</strong>
            </div>

            <div className="compare-item">
              <span className="compare-label">Highest Score</span>
              <strong className="compare-value">{highscore}</strong>
            </div>
          </div>

          <button
            className="btn btn-primary btn-large"
            onClick={() => dispatch({ type: "restart" })}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </section>
  );
}

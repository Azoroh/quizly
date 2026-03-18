import Main from "./components/Main";

export default function App() {
  return (
    <>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <main className="app-shell">
        {/* <!-- START SCREEN --> */}
        <section className="screen screen-start">
          <div className="glass-card start-card">
            <p className="eyebrow">Premium Quiz Experience</p>
            <h1 className="screen-title">Quiz Challenge</h1>
            <p className="screen-subtitle">
              Ready to test your knowledge? Take a deep breath and begin when
              you’re set.
            </p>

            <div className="score-panel">
              <span className="score-label">Highest Score</span>
              <strong className="score-value">18 / 20</strong>
            </div>

            <button className="btn btn-primary btn-large">Start Quiz</button>
          </div>
        </section>

        {/* <!-- QUIZ SCREEN --> */}
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
                <h2 className="question-text">
                  Which JavaScript array method is best suited for turning all
                  items in an array into a single total value?
                </h2>
              </div>

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

        {/* <!-- END SCREEN --> */}
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
                <strong className="score-value large-score">19 / 20</strong>
                <span className="new-badge">New High Score</span>
              </div>

              <div className="score-compare">
                <div className="compare-item">
                  <span className="compare-label">Your Score</span>
                  <strong className="compare-value">19</strong>
                </div>

                <div className="compare-item">
                  <span className="compare-label">Highest Score</span>
                  <strong className="compare-value">19</strong>
                </div>
              </div>

              <button className="btn btn-primary btn-large">
                Restart Quiz
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

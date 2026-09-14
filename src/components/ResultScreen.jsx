// import ResultHeader from "./result/ResultHeader";
import ScoreDisplay from "./result/ScoreDisplay";
import SummaryStats from "./result/SummaryStats";
import AISummaryPanel from "./result/AISummaryPanel";
import ResultActions from "./result/ResultActions";
import { formatTime } from "../utils/formatTime";
import StartHeader from "./start/StartHeader";
import { useEffect } from "react";

import generateReview from "../services/generateReview";

export default function ResultScreen({
  points,
  maxPossiblePoints,
  highScore,
  correctAnswers,
  accuracyPercent,
  quizSeconds,
  dispatch,

  reviewPayload,
  aiSummaryStatus,
  aiSummary,
  focusAreas,
}) {
  useEffect(() => {
    async function fetchSummary() {
      try {
        if (reviewPayload.length > 0 && aiSummaryStatus === "idle") {
          dispatch({ type: "loadSummary" });

          const result = await generateReview(reviewPayload);

          dispatch({ type: "readySummary", payload: result });
        }
      } catch (err) {
        console.error("Summary generation failed:", err);
        dispatch({
          type: "errorSummary",
          payload: err.message || "Failed to generate AI Summary",
        });
      }
    }

    fetchSummary();
  }, [dispatch, reviewPayload, aiSummaryStatus]);

  return (
    <div className="dark bg-surface font-body text-on-surface selection:bg-primary/30 min-h-screen flex flex-col">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 glow-bg pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/*  <ResultHeader /> */}
      {/* <StartHeader /> */}

      <main className="flex-grow flex items-start sm:items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-10">
        <div className="w-full max-w-3xl">
          <div className="glass-card rounded-[1.75rem] sm:rounded-2xl p-4 sm:p-8 md:p-12 flex flex-col items-center shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <ScoreDisplay
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highScore={highScore}
            />
            <SummaryStats
              correctAnswers={correctAnswers}
              accuracyPercent={accuracyPercent}
              time={`${formatTime(quizSeconds)} ${quizSeconds < 60 ? "sec" : "min"}`}
            />

            <AISummaryPanel
              aiSummaryStatus={aiSummaryStatus}
              aiSummary={aiSummary}
              focusAreas={focusAreas}
            />

            <ResultActions
              onRestart={() => dispatch({ type: "restart" })}
              onNewQuiz={() => dispatch({ type: "newQuiz" })}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

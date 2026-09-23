import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ScoreDisplay from "./result/ScoreDisplay";
import SummaryStats from "./result/SummaryStats";
import AISummaryPanel from "./result/AISummaryPanel";
import ResultActions from "./result/ResultActions";
import { formatTime } from "../utils/formatTime";
import { useQuiz } from "@/context/QuizContext";
import generateReview from "../services/generateReview";

export default function ResultScreen() {
  const navigate = useNavigate();
  const {
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
  } = useQuiz();

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start overflow-x-hidden relative px-4 sm:px-6 pt-20 sm:pt-28 pb-12">
      {/* Subtle background glows */}
      <div
        aria-hidden="true"
        className="fixed top-[-15%] left-[-10%] w-[45%] h-[45%] bg-violet-600/5 blur-[140px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="fixed bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none"
      />

      <main className="w-full max-w-3xl flex-grow flex items-start sm:items-center justify-center relative z-10 pb-10">
        <div className="w-full bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/60 rounded-2xl p-6 sm:p-8 md:p-12 flex flex-col items-center">
          <ScoreDisplay
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
          />

          <SummaryStats
            correctAnswers={correctAnswers}
            accuracyPercent={accuracyPercent}
            time={`${formatTime(quizSeconds || 0)} ${(quizSeconds || 0) < 60 ? "sec" : "min"}`}
          />

          <AISummaryPanel
            aiSummaryStatus={aiSummaryStatus}
            aiSummary={aiSummary}
            focusAreas={focusAreas}
          />

          <ResultActions
            onRestart={() => {
              navigate("/ready");
              dispatch({ type: "restart" });
            }}
            onNewQuiz={() => {
              navigate("/");
              dispatch({ type: "newQuiz" });
            }}
          />
        </div>
      </main>
    </div>
  );
}

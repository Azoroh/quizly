import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
        toast.error("AI Insight Failed", {
          description: "We couldn't generate your review this time.",
        });
      }
    }
    fetchSummary();
  }, [dispatch, reviewPayload, aiSummaryStatus]);

  const timeLabel = `${formatTime(quizSeconds || 0)} ${(quizSeconds || 0) < 60 ? "sec" : "min"}`;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center overflow-x-hidden relative px-4 sm:px-6 py-12">
      <main className="w-full max-w-xl flex items-center justify-center relative z-10">
        <div className="w-full bg-[#09090b] border border-zinc-900 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col items-center">
          <ScoreDisplay
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
          />

          <SummaryStats
            correctAnswers={correctAnswers}
            accuracyPercent={accuracyPercent}
            time={timeLabel}
          />

          <AISummaryPanel
            aiSummaryStatus={aiSummaryStatus}
            aiSummary={aiSummary}
            focusAreas={focusAreas}
          />

          <ResultActions
            onRestart={() => {
              navigate("/overview");
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

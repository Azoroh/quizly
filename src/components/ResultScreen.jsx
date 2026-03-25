import ResultHeader from "./result/ResultHeader";
import ScoreDisplay from "./result/ScoreDisplay";
import SummaryStats from "./result/SummaryStats";
import AIInsightPanel from "./result/AiSummaryPanel";
import ResultActions from "./result/ResultActions";

export default function ResultScreen({
  points,
  maxPossiblePoints,
  highScore,
  correctAnswers,
  accuracyPercent,
}) {
  return (
    <div className="dark bg-surface font-body text-on-surface selection:bg-primary/30 min-h-screen flex flex-col">
      {/* Background Decorations */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary-dim opacity-[0.04] blur-[140px] rounded-full -mr-80 -mt-80 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-[0.04] blur-[140px] rounded-full -ml-80 -mb-80 pointer-events-none"></div>
      <div className="fixed inset-0 bg-glow pointer-events-none"></div>

      <ResultHeader />

      <main className="flex-grow flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-3xl">
          <div className="glass-card rounded-2xl p-8 md:p-12 flex flex-col items-center shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <ScoreDisplay
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highScore={highScore}
            />
            <SummaryStats
              correctAnswers={correctAnswers}
              accuracyPercent={accuracyPercent}
              time="6m 42s"
            />
            <AIInsightPanel />
            <ResultActions />
          </div>
        </div>
      </main>
    </div>
  );
}

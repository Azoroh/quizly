import StartHeader from "./start/StartHeader";
import StartHero from "./start/StartHero";
import SummaryStats from "./start/SummaryStats";
import QuestionSelector from "./start/QuestionSelector";
import StartButton from "./start/StartButton";

export default function StartScreen({ dispatch, questionCount }) {
  return (
    <div className="dark bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col items-center justify-center overflow-x-hidden relative">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 glow-bg pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <StartHeader />

      <main className="relative z-10 w-full max-w-2xl px-6 py-12 flex flex-col items-center text-center">
        <StartHero />

        {/* Glass Card */}
        <div className="glass-card w-full rounded-[2rem] p-6 md:p-8 border border-white/5 shadow-2xl flex flex-col gap-8">
          {/* Source Chip */}
          <div className="self-center inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/5 border border-secondary/10">
            <span className="material-symbols-outlined text-secondary text-sm">
              description
            </span>
            <span className="text-xs font-medium text-on-secondary-container/80">
              biology_lecture_notes.pdf
            </span>
          </div>

          <SummaryStats questionCount={questionCount} />

          <QuestionSelector dispatch={dispatch} questionCount={questionCount} />

          <StartButton onClick={() => dispatch({ type: "startQuiz" })} />
        </div>
      </main>

      {/* Bottom Line */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-10 pointer-events-none">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>
    </div>
  );
}

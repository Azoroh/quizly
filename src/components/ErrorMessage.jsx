import StartHeader from "./start/StartHeader";
import LoadingHeader from "./loading/LoadingHeader";

export default function ErrorScreen({ onTryAgain, onBackToHome, error }) {
  return (
    <div className="dark bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col overflow-hidden">
      {/* Header */}

      {/* Atmospheric Background */}
      <div className="fixed inset-0 glow-bg pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* <StartHeader /> */}
      <LoadingHeader />
      {/* <header className="flex items-center justify-center w-full py-6 px-8 fixed top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-headline font-bold tracking-tighter text-primary">
            Quizly
          </span>
        </div>
      </header> */}

      <main className="flex-grow flex items-center justify-center relative px-6 py-20">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow opacity-60"></div>
          <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-primary opacity-[0.03] blur-[100px]"></div>
          <div className="absolute -bottom-[10%] -left-[5%] w-[400px] h-[400px] rounded-full bg-secondary opacity-[0.03] blur-[100px]"></div>
        </div>

        {/* Error Card */}
        <section className="relative w-full max-w-lg glass-panel rounded-xl p-8 md:p-10 text-center z-10">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-primary/80 icon-glow border border-primary/10">
              <span className="material-symbols-outlined text-3xl">info</span>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-3 mb-6">
            <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-on-surface">
              {error}
            </h1>
            <div className="flex justify-center mt-4">
              <div className="px-3 py-1 bg-secondary-container/20 border border-outline-variant/10 rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-secondary/70">
                  description
                </span>
                <span className="text-xs font-medium text-secondary/80">
                  biology_lecture_notes.pdf
                </span>
              </div>
            </div>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-sm mx-auto pt-2">
              Quizly couldn't generate your quiz from the provided material.
              Please try again or return to the previous screen.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onTryAgain}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-br from-primary to-primary-dim text-on-primary-container font-bold rounded-full transition-all hover:brightness-110 active:scale-95 shadow-[0_0_30px_-10px_rgba(159,167,255,0.3)]"
            >
              Try Again
            </button>
            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto px-8 py-3.5 bg-surface-container-highest/40 border border-outline-variant/10 text-on-surface/90 font-semibold rounded-full transition-all hover:bg-surface-bright active:scale-95"
            >
              Back to Home
            </button>
          </div>

          <p className="mt-6 text-[10px] uppercase tracking-widest text-on-surface-variant/30 font-medium">
            System: Temporary format issue detected
          </p>
        </section>
      </main>
    </div>
  );
}

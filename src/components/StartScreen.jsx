import StartHeader from "./start/StartHeader";
import StartHero from "./start/StartHero";
import SummaryStats from "./start/SummaryStats";
import QuestionSelector from "./start/QuestionSelector";
import StartButton from "./start/StartButton";
import { getSourceStatus } from "../utils/getSourceStatus";
import { buildExcludedSourcesMessage } from "../utils/buildExcludedSourcesMessage";
import { useEffect, useMemo, useState } from "react";
import Button from "./Button";

export default function StartScreen({
  dispatch,
  questionCount,
  questions,
  remainingSeconds,
  sourceUsage = [],
  hasShownSourceToast,
}) {
  const excludedSources = useMemo(
    () => sourceUsage.filter((source) => !source.wasIncluded),
    [sourceUsage],
  );

  const toastMessage = useMemo(
    () => buildExcludedSourcesMessage(excludedSources),
    [excludedSources],
  );

  // const hasExcludedSources = excludedSources.length > 0;
  const [showToast, setShowToast] = useState(false);
  const [shouldRenderToast, setShouldRenderToast] = useState(false);

  useEffect(() => {
    if (!toastMessage || hasShownSourceToast) return;

    let renderTimeoutId;
    let enterTimeoutId;
    let hideTimeoutId;

    renderTimeoutId = setTimeout(() => setShouldRenderToast(true), 0);

    enterTimeoutId = setTimeout(() => {
      setShowToast(true);

      dispatch({ type: "shownSourceToast" });
    }, 500);

    hideTimeoutId = setTimeout(() => setShowToast(false), 4000);

    return () => {
      clearTimeout(renderTimeoutId);
      clearTimeout(enterTimeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, [toastMessage, dispatch]);

  function handleToastTransitionEnd() {
    if (!showToast) {
      setShouldRenderToast(false);
    }
  }

  return (
    <div className="dark bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col items-center justify-start overflow-x-hidden relative">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 glow-bg pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* <StartHeader /> */}

      <main className="relative z-10 w-full max-w-2xl px-4 sm:px-6 pt-24 sm:pt-28 pb-10 sm:pb-12 flex flex-col items-center text-center">
        {shouldRenderToast && toastMessage ? (
          <ToastMessage
            onTransitionEnd={handleToastTransitionEnd}
            className={`fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,680px)] rounded-2xl border border-amber-300/20 bg-amber-500/10 backdrop-blur-xl px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out ${
              showToast
                ? "translate-y-0 opacity-100"
                : "-translate-y-6 opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-sm md:text-[15px] text-amber-100 font-medium leading-relaxed">
              {toastMessage}
            </p>
          </ToastMessage>
        ) : null}

        <StartHero />

        {/* Glass Card */}
        <div className="glass-card w-full rounded-[1.75rem] sm:rounded-[2rem] p-4 sm:p-6 md:p-8 border border-white/5 shadow-2xl flex flex-col gap-4 sm:gap-8">
          {/* Source Chip */}
          <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2 sm:gap-3 md:gap-4 justify-center">
            {sourceUsage.map((source) => {
              const status = getSourceStatus(source);
              const toneClasses =
                status.tone === "included"
                  ? "bg-emerald-500/18 border border-emerald-400/35 shadow-[0_0_0_1px_rgba(52,211,153,0.08)]"
                  : status.tone === "trimmed"
                    ? "bg-lime-500/10 border border-yellow-300/30 shadow-[0_0_0_1px_rgba(250,204,21,0.06)]"
                    : "bg-white/5 border border-white/8 opacity-45 saturate-50";

              const textToneClasses =
                status.tone === "included"
                  ? "text-emerald-200"
                  : status.tone === "trimmed"
                    ? "text-yellow-100/90"
                    : "text-on-surface-variant/50";

              const iconToneClasses =
                status.tone === "included"
                  ? source.name.endsWith(".pdf")
                    ? "text-emerald-300"
                    : "text-emerald-300"
                  : status.tone === "trimmed"
                    ? source.name.endsWith(".pdf")
                      ? "text-yellow-300"
                      : "text-lime-300"
                    : "text-on-surface-variant/40";

              return (
                <div
                  key={source.id}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-2xl w-full transition-colors ${toneClasses}`}
                >
                  <span
                    className={`material-symbols-outlined text-sm ${iconToneClasses}`}
                  >
                    {source.name.endsWith(".pdf")
                      ? "picture_as_pdf"
                      : "description"}
                  </span>
                  <span
                    className={`text-xs font-medium truncate ${textToneClasses}`}
                  >
                    {source.name}
                  </span>
                </div>
              );
            })}
          </div>

          <SummaryStats
            questionCount={questionCount}
            remainingSeconds={remainingSeconds}
          />

          <QuestionSelector dispatch={dispatch} questionCount={questionCount} />

          <div className="flex gap-2">
            <Button
              onClick={() => dispatch({ type: "newQuiz" })}
              className="group relative flex items-center justify-center w-16 h-14 rounded-full bg-orange-500 hover:bg-orange-700 text-on-primary shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined leading-none text-xl transform transition duration-300 group-hover:-translate-x-1.5 group-hover:scale-200">
                arrow_back
              </span>
            </Button>

            <StartButton
              onClick={() => dispatch({ type: "startQuiz" })}
              questions={questions}
            />
          </div>
        </div>
      </main>

      {/* Bottom Line */}
      {/* <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-10 pointer-events-none">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div> */}
    </div>
  );
}

function ToastMessage({ children, className, onTransitionEnd }) {
  return (
    <div className={className} onTransitionEnd={onTransitionEnd}>
      {children}
    </div>
  );
}

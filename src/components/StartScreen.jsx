import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import StartButton from "./start/StartButton";
import { getSourceStatus } from "../utils/getSourceStatus";
import { buildExcludedSourcesMessage } from "../utils/buildExcludedSourcesMessage";
import { formatTime } from "../utils/formatTime";
import { FileText, Clock, Layers, ArrowLeft } from "lucide-react";

export default function StartScreen() {
  const navigate = useNavigate();
  const {
    dispatch,
    questionCount,
    questions,
    // remainingSeconds,
    sourceUsage = [],
    hasShownSourceToast,
  } = useQuiz();

  // ── Toast logic (preserved exactly) ───────────────────────────────────────
  const excludedSources = useMemo(
    () => sourceUsage.filter((source) => !source.wasIncluded),
    [sourceUsage],
  );

  const toastMessage = useMemo(
    () => buildExcludedSourcesMessage(excludedSources),
    [excludedSources],
  );

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
    if (!showToast) setShouldRenderToast(false);
  }

  // ── Derived display values ─────────────────────────────────────────────────

  const estimatedSeconds = questionCount * 20;

  const timeLabel =
    estimatedSeconds < 60
      ? `${formatTime(estimatedSeconds, true)} sec`
      : `${formatTime(estimatedSeconds, true)} min`;

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

      {/* ── Excluded-sources toast ──────────────────────────────────────────── */}
      {shouldRenderToast && toastMessage ? (
        <div
          onTransitionEnd={handleToastTransitionEnd}
          className={`fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50
            w-[min(92vw,680px)] rounded-2xl border border-amber-400/20
            bg-amber-500/10 backdrop-blur-xl px-4 py-3
            shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            transition-all duration-300 ease-out
            ${showToast ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"}`}
        >
          <p className="text-sm text-amber-100/90 font-medium leading-relaxed">
            {toastMessage}
          </p>
        </div>
      ) : null}

      {/* ── Main card ───────────────────────────────────────────────────────── */}
      <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 shadow-2xl shadow-black/60 gap-0 py-0">
        {/* Header */}
        <CardHeader className="px-6 pt-8 pb-6 border-b border-zinc-800">
          <div className="flex flex-col items-center text-center gap-3">
            {/* Icon badge */}
            <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-1">
              <Layers className="w-5 h-5 text-zinc-300" strokeWidth={1.75} />
            </div>

            <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50">
              Your quiz is ready
            </CardTitle>

            <CardDescription className="text-zinc-400 text-sm sm:text-base max-w-sm leading-relaxed">
              Quizly successfully generated questions from your study material.
              Review your sources below, then start when you're ready.
            </CardDescription>
          </div>
        </CardHeader>

        {/* Body */}
        <CardContent className="px-6 pt-6 pb-2 flex flex-col gap-6">
          {/* ── Source document badges ───────────────────────────────────── */}
          {sourceUsage.length > 0 && (
            <section aria-label="Source documents">
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                Sources used
              </p>
              <div className="flex flex-wrap gap-2">
                {sourceUsage.map((source) => {
                  const status = getSourceStatus(source);

                  // Map status tone → zinc-based Badge overrides
                  const badgeClass =
                    status.tone === "included"
                      ? "border-emerald-600/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/15"
                      : status.tone === "trimmed"
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/15"
                        : "border-zinc-700 bg-zinc-800/60 text-zinc-500 opacity-60";

                  return (
                    <Badge
                      key={source.id}
                      variant="outline"
                      className={`gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${badgeClass}`}
                      title={status.message}
                    >
                      <FileText className="w-3 h-3 shrink-0" />
                      <span className="truncate max-w-[180px]">
                        {source.name}
                      </span>
                      {status.tone !== "included" && (
                        <span className="opacity-70 ml-0.5">
                          — {status.label}
                        </span>
                      )}
                    </Badge>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Stats row ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: (
                  <Layers
                    className="w-5 h-5 text-zinc-400"
                    strokeWidth={1.75}
                  />
                ),
                label: "Questions",
                value: `${questionCount}`,
              },
              {
                icon: (
                  <Clock className="w-5 h-5 text-zinc-400" strokeWidth={1.75} />
                ),
                label: "Est. time",
                value: timeLabel,
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5 text-zinc-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
                label: "Difficulty",
                value: "Medium",
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/60"
              >
                {icon}
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {label}
                </span>
                <span className="text-sm sm:text-base font-bold text-zinc-100">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* ── Question count selector ───────────────────────────────────── */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              Select question count
            </p>
            <div className="flex p-1 bg-zinc-800 border border-zinc-700 rounded-xl w-full max-w-[280px]">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  onClick={() => {
                    if (count !== questionCount)
                      dispatch({ type: "selectQuestionCount", payload: count });
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200
                    ${
                      questionCount === count
                        ? "bg-zinc-600 text-zinc-50 shadow-sm -translate-y-0.5"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </CardContent>

        {/* Footer — actions */}
        <CardFooter className="px-6 pb-8 pt-6 flex gap-2 border-t border-zinc-800 mt-4">
          {/* Back button — dispatches newQuiz (preserved exactly) */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              dispatch({ type: "newQuiz" });
              navigate("/");
            }}
            className="h-14 w-14 shrink-0 rounded-full border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          {/* Start button — onClick preserved exactly */}
          <StartButton
            onClick={() => {
              dispatch({ type: "startQuiz" });
              navigate("/quiz");
            }}
            questions={questions}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

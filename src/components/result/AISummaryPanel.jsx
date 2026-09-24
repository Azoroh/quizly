import { useEffect, useState } from "react";

export default function AISummaryPanel({
  aiSummaryStatus,
  focusAreas,
  aiSummary,
}) {
  const [isTypingDone, setIsTypingDone] = useState(false);

  // 1. Instantly hide the entire panel if the API crashes
  if (aiSummaryStatus === "error") return null;

  const isReady = aiSummaryStatus === "ready";
  const isLoading = aiSummaryStatus === "loading";

  // Only show the panel when we are actively loading or successfully ready.
  // If it's "idle" (restarted) or "error" (failed), it will smoothly collapse.
  const isVisible = isLoading || isReady;

  return (
    <div
      className={`w-full grid transition-all duration-500 ease-in-out ${
        isVisible
          ? "grid-rows-[1fr] opacity-100 mb-6 sm:mb-10"
          : "grid-rows-[0fr] opacity-0 mb-0"
      }`}
    >
      <div className="overflow-hidden">
        {/* Inner Panel Card */}
        <div className="w-full bg-zinc-800/30 rounded-2xl p-4 sm:p-6 md:p-8 border border-violet-500/10 relative overflow-hidden">
          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500/50 to-transparent"></div>

          <div
            className={`inline-flex items-center gap-2 ${
              isReady ? "mb-4" : ""
            } w-full`}
          >
            <span className="material-symbols-outlined text-violet-400 text-lg">
              auto_awesome
            </span>

            <div
              className={`flex items-center gap-2 text-xs font-bold text-violet-400 tracking-[0.15em] uppercase ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              AI Insight
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : null}
              {isReady ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" x2="9.01" y1="9" y2="9" />
                  <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
              ) : null}
            </div>
          </div>

          <div>
            {isReady ? (
              <TypewriterSummary
                key={aiSummary}
                text={aiSummary}
                onDone={() => setIsTypingDone(true)}
              />
            ) : null}

            {isReady && isTypingDone && focusAreas?.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 mt-4 transition-opacity duration-500">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Focus areas:
                </span>
                {focusAreas.map((area) => (
                  <div
                    key={area}
                    className="bg-zinc-800 text-zinc-300 text-[11px] font-semibold px-3 py-1 rounded-full border border-zinc-700"
                  >
                    {area}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function TypewriterSummary({ text, speed = 18, onDone }) {
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    if (!text) return;

    const intervalId = window.setInterval(() => {
      setTypedLength((current) => {
        if (current >= text.length) {
          window.clearInterval(intervalId);
          return current;
        }
        return current + 1;
      });
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [text, speed]);

  useEffect(() => {
    if (text && typedLength === text.length) {
      onDone?.();
    }
  }, [typedLength, text, onDone]);

  const visibleText = text.slice(0, typedLength);
  const isTyping = typedLength < text.length;

  return (
    <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4 max-w-2xl">
      {visibleText}
      {isTyping ? (
        <span className="inline-block w-2 h-5 ml-1 translate-y-1 bg-violet-500/70 animate-pulse" />
      ) : null}
    </p>
  );
}

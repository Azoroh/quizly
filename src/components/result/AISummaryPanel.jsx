import { useEffect, useState } from "react";
import { SparklesIcon } from "lucide-react";

export default function AISummaryPanel({
  aiSummaryStatus,
  focusAreas,
  aiSummary,
}) {
  const [isTypingDone, setIsTypingDone] = useState(false);

  if (aiSummaryStatus === "error") return null;

  const isReady = aiSummaryStatus === "ready";
  const isLoading = aiSummaryStatus === "loading";
  const isVisible = isLoading || isReady;

  return (
    <div
      className={`w-full grid transition-all duration-300 ease-in-out ${
        isVisible
          ? "grid-rows-[1fr] opacity-100 mb-6"
          : "grid-rows-[0fr] opacity-0 mb-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="w-full bg-zinc-950/50 rounded-lg p-5 border border-zinc-900 relative">
          <div
            className={`flex items-center gap-2 ${isReady ? "mb-3" : ""} w-full`}
          >
            <SparklesIcon className="size-3.5 text-zinc-400" />
            <div
              className={`flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase tracking-wider ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              AI Insight {isLoading && "..."}
            </div>
          </div>

          <div>
            {isReady && (
              <TypewriterSummary
                key={aiSummary}
                text={aiSummary}
                onDone={() => setIsTypingDone(true)}
              />
            )}

            {isReady && isTypingDone && focusAreas?.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-zinc-900">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mr-1">
                  Focus:
                </span>
                {focusAreas.map((area) => (
                  <div
                    key={area}
                    className="bg-zinc-900 text-zinc-300 text-[11px] px-2 py-0.5 rounded border border-zinc-800"
                  >
                    {area}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TypewriterSummary({ text, speed = 15, onDone }) {
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
    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
      {visibleText}
      {isTyping && (
        <span className="inline-block w-1.5 h-3.5 ml-0.5 translate-y-0.5 bg-zinc-400 animate-pulse" />
      )}
    </p>
  );
}

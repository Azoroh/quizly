export default function AISummaryPanel({
  aiSummaryStatus,
  focusAreas,
  aiSummary,
}) {
  const isReadyorError =
    aiSummaryStatus === "ready" || aiSummaryStatus === "error";

  const isLoading = aiSummaryStatus === "loading";

  return (
    <div className="w-full bg-surface-container-low/30 rounded-2xl p-6 md:p-8 mb-10 border border-primary/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/40 to-transparent"></div>

      <div
        className={`inline-flex items-center gap-2 ${isReadyorError ? "mb-4" : ""} w-full`}
      >
        <span className="material-symbols-outlined text-primary text-lg">
          auto_awesome
        </span>

        <span className="text-xs font-bold text-primary tracking-[0.15em] uppercase">
          <div
            className={`flex items-center gap-2 text-xs font-bold text-primary tracking-[0.15em] uppercase ${isLoading ? "animate-pulse" : ""} `}
          >
            AI Insight
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-loader-circle-icon lucide-loader-circle  animate-spin [animation-timing-function:cubic-bezier(0.85,0.2,0.15,1)]"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : null}
            {aiSummaryStatus === "ready" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-smile-icon lucide-smile"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
            ) : null}
            {aiSummaryStatus === "error" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-frown-icon lucide-frown"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
            ) : null}
          </div>
        </span>
      </div>

      {/* {aiSummaryStatus === "ready" ? (
        <div>
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
            {aiSummary}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
              Focus areas:
            </span>
            {focusAreas?.map((area) => (
              <div
                key={area}
                className="bg-surface-container-highest/40 text-on-surface-variant text-[11px] font-semibold px-3 py-1 rounded-full border border-outline-variant/10"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      ) : null} */}

      <div>
        {isReadyorError ? (
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
            {aiSummary}
          </p>
        ) : null}
        {aiSummaryStatus === "ready" ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
              Focus areas:
            </span>
            {focusAreas?.map((area) => (
              <div
                key={area}
                className="bg-surface-container-highest/40 text-on-surface-variant text-[11px] font-semibold px-3 py-1 rounded-full border border-outline-variant/10"
              >
                {area}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

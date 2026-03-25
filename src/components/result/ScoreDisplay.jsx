export default function ScoreDisplay({ points, maxPossiblePoints, highScore }) {
  return (
    <div className="text-center mb-10 w-full">
      <h1 className="font-headline font-bold text-sm tracking-[0.2em] text-primary/80 uppercase mb-4">
        Quiz Complete
      </h1>
      <div className="flex flex-col items-center">
        <span className="font-headline font-extrabold text-7xl md:text-9xl tracking-tighter text-on-surface leading-none">
          {points}
          <span className="text-primary/20 mx-2">/</span>
          {maxPossiblePoints}
        </span>
        <div className="flex items-center gap-2 mt-6 px-4 py-1.5 bg-surface-container-highest/50 rounded-full border border-outline-variant/10">
          <span className="material-symbols-outlined text-sm text-secondary">
            star
          </span>
          <span className="text-sm font-label font-medium text-on-surface-variant">
            High Score:{" "}
            <span className="text-on-surface">
              {highScore} / {maxPossiblePoints}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

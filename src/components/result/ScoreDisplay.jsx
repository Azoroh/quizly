export default function ScoreDisplay({ points, maxPossiblePoints, highScore }) {
  return (
    <div className="text-center mb-6 w-full">
      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 mb-2 block">
        Assessment Complete
      </span>
      <div className="flex flex-col items-center">
        <div className="text-5xl sm:text-6xl font-medium tracking-tight text-zinc-100 font-mono">
          {points}
          <span className="text-zinc-700 mx-2">/</span>
          {maxPossiblePoints}
        </div>
        <div className="flex items-center gap-1.5 mt-3 px-3 py-1 bg-zinc-950 border border-zinc-900 rounded-md">
          <span className="text-xs font-mono text-zinc-500">
            High Score:{" "}
            <span className="text-zinc-300 font-medium">{highScore}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

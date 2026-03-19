import { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  console.log(secondsRemaining);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="timer-pill">
      <span className="timer-label">Time Left</span>
      <span className="timer-value">
        {minutes < 10 && "0"}
        {minutes}:{seconds < 10 && "0"}
        {seconds}
      </span>
    </div>
  );
}

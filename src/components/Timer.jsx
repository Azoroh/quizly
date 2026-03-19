import { useEffect } from "react";

export default function Timer() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("hey");
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="timer-pill">
      <span className="timer-label">Time Left</span>
      <span className="timer-value">00:14</span>
    </div>
  );
}

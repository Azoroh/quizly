export default function Progress() {
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: "48%" }}></div>
      </div>
      <div className="progress-meta">
        <span>Question 6 of 12</span>
        <span>48%</span>
      </div>
    </div>
  );
}

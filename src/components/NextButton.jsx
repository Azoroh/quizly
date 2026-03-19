export default function NextButton({ dispatch }) {
  return (
    <button
      className="btn btn-secondary"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}

export default function NextButton({
  dispatch,
  answer,
  index,
  questionsLength,
}) {
  return (
    <button
      disabled={answer === null}
      className="btn btn-secondary"
      onClick={
        index < questionsLength - 1
          ? () => dispatch({ type: "nextQuestion" })
          : () => dispatch({ type: "finish" })
      }
    >
      {index < questionsLength - 1 ? "Next" : "Finish"}
    </button>
  );
}

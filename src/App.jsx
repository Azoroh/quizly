import { useReducer } from "react";
import { mockQuiz } from "./data/mockQuiz.js";

import LandingScreen from "./components/LandingScreen";
import LoadingScreen from "./components/LoadingScreen";
import StartScreen from "./components/StartScreen";

// status = "landing" | "loading" | "ready" | "active" | "finished" | "error"
const initialState = {
  totalQuestions: mockQuiz.questions,
  questionCount: 5,
  status: "ready",
};

function reducer(state, action) {
  switch (action.type) {
    case "generateQuiz":
      return {
        ...state,
        status: "loading",
      };

    case "ready":
      return {
        ...state,
        status: "ready",
      };

    case "selectQuestionCount":
      return {
        ...state,
        questionCount: action.payload,
        questions: state.totalQuestions.slice(0, action.payload),
      };

    case "startQuiz":
      return {
        ...state,
        status: "active",
      };

    default:
      throw new Error("Unknown Action");
  }
}

function init(initial) {
  return {
    ...initial,
    questions: initial.totalQuestions.slice(0, initial.questionCount),
  };
}

export default function App() {
  const [{ status, questionCount }, dispatch] = useReducer(
    reducer,
    initialState,
    init,
  );

  return (
    <div>
      {status === "landing" && <LandingScreen dispatch={dispatch} />}
      {status === "loading" && <LoadingScreen dispatch={dispatch} />}
      {status === "ready" && (
        <StartScreen dispatch={dispatch} questionCount={questionCount} />
      )}
    </div>
  );
}

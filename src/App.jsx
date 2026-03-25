import { useReducer } from "react";
import { mockQuiz } from "./data/mockQuiz.js";
import { getRandomItems } from "./utils/getRandomItems.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

import LandingScreen from "./components/LandingScreen";
import LoadingScreen from "./components/LoadingScreen";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

const POINTS_PER_QUESTION = 10;
const SECS_PER_QUESTION = 10;

// status = "landing" | "loading" | "ready" | "active" | "finished" | "error"
const initialState = {
  totalQuestions: mockQuiz.questions,
  questionCount: 5,
  status: "finished",
  index: null,
  answer: null,
  points: 0,
  remainingSeconds: 0,
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
        questions: getRandomItems(state.totalQuestions, action.payload),
      };

    case "startQuiz":
      return {
        ...state,
        status: "active",
        index: 0,
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };

    case "selectAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          state.questions[state.index].correctOption === action.payload
            ? state.points + POINTS_PER_QUESTION
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    default:
      throw new Error("Unknown Action");
  }
}

function init(initial) {
  const savedHscore = JSON.parse(localStorage.getItem("highscore"));

  return {
    ...initial,
    questions: getRandomItems(initial.totalQuestions, initial.questionCount),
    highScore: savedHscore || 0,
  };
}

export default function App() {
  const [
    { status, questionCount, questions, index, answer, points, highScore },
    dispatch,
  ] = useReducer(reducer, initialState, init);

  useLocalStorage("highscore", highScore);

  console.log(points);
  const maxPossiblePoints = questions.length * POINTS_PER_QUESTION;
  const correctAnswers = points / POINTS_PER_QUESTION;
  const accuracyPercent = (points / maxPossiblePoints) * 100;

  return (
    <div>
      {status === "landing" && <LandingScreen dispatch={dispatch} />}
      {status === "loading" && <LoadingScreen dispatch={dispatch} />}
      {status === "ready" && (
        <StartScreen dispatch={dispatch} questionCount={questionCount} />
      )}
      {status === "active" && (
        <QuestionScreen
          dispatch={dispatch}
          curQuestion={questions[index]}
          answer={answer}
          questions={questions}
          index={index}
        />
      )}

      {status === "finished" && (
        <ResultScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highScore={highScore}
          correctAnswers={correctAnswers}
          accuracyPercent={accuracyPercent}
        />
      )}
    </div>
  );
}

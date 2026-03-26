import { useReducer } from "react";
import { mockQuiz } from "./data/mockQuiz.js";
import { getRandomItems } from "./utils/getRandomItems.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
// import { generateQuiz } from "./services/generateQuiz.js";

import LandingScreen from "./components/LandingScreen";
import LoadingScreen from "./components/LoadingScreen";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

const POINTS_PER_QUESTION = 10;
const SECS_PER_QUESTION = 5;

// status = "landing" | "loading" | "ready" | "active" | "finished" | "error"
const initialState = {
  totalQuestions: mockQuiz.questions,
  // totalQuestions: generateQuiz("hey"),
  questionCount: 5,
  status: "landing",
  index: null,
  answer: null,
  points: 0,
  remainingSeconds: 0,
  quizSeconds: 0,
  inputText: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "textInput":
      return {
        ...state,
        inputText: action.payload,
      };

    case "generateQuiz":
      return {
        ...state,
        status: "loading",
      };

    case "ready":
      return {
        ...state,
        status: "ready",
        totalQuestions: action.payload,
      };

    case "selectQuestionCount": {
      const selectedQuestions = getRandomItems(
        state.totalQuestions,
        action.payload,
      );

      return {
        ...state,
        questionCount: action.payload,
        questions: selectedQuestions,
        remainingSeconds: selectedQuestions.length * SECS_PER_QUESTION,
      };
    }

    case "startQuiz":
      return {
        ...state,
        status: "active",
        index: 0,
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

    case "restart":
      return {
        ...state,
        answer: null,
        index: null,
        points: 0,
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
        status: "ready",
      };

    case "newQuiz":
      return {
        ...state,
        status: "loading",
      };

    case "tickTock":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
        quizSeconds: state.quizSeconds + 1,
      };

    default:
      throw new Error("Unknown Action");
  }
}

function init(initial) {
  const savedHscore = JSON.parse(localStorage.getItem("highscore"));
  const savedQuestions = getRandomItems(
    initial.totalQuestions,
    initial.questionCount,
  );

  return {
    ...initial,
    questions: savedQuestions,
    highScore: savedHscore || 0,
    remainingSeconds: savedQuestions.length * SECS_PER_QUESTION,
  };
}

export default function App() {
  const [
    {
      status,
      questionCount,
      questions,
      index,
      answer,
      points,
      highScore,
      remainingSeconds,
      quizSeconds,
      inputText,
    },
    dispatch,
  ] = useReducer(reducer, initialState, init);

  useLocalStorage("highscore", highScore);

  const maxPossiblePoints = questions.length * POINTS_PER_QUESTION;
  const correctAnswers = points / POINTS_PER_QUESTION;
  const accuracyPercent = (points / maxPossiblePoints) * 100;

  return (
    <div>
      {status === "landing" && (
        <LandingScreen dispatch={dispatch} inputText={inputText} />
      )}
      {status === "loading" && (
        <LoadingScreen dispatch={dispatch} inputText={inputText} />
      )}

      {status === "ready" && (
        <StartScreen
          dispatch={dispatch}
          questionCount={questionCount}
          questions={questions}
          remainingSeconds={remainingSeconds}
        />
      )}
      {status === "active" && (
        <QuestionScreen
          dispatch={dispatch}
          curQuestion={questions[index]}
          answer={answer}
          questions={questions}
          index={index}
          remainingSeconds={remainingSeconds}
        />
      )}

      {status === "finished" && (
        <ResultScreen
          dispatch={dispatch}
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highScore={highScore}
          correctAnswers={correctAnswers}
          accuracyPercent={accuracyPercent}
          quizSeconds={quizSeconds}
        />
      )}
    </div>
  );
}

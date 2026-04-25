import { useReducer } from "react";
import { getRandomItems } from "./utils/getRandomItems.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
// import { generateQuiz } from "./services/generateQuiz.js";

import LandingScreen from "./components/LandingScreen";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorMessage.jsx";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

const POINTS_PER_QUESTION = 10;
const SECS_PER_QUESTION = 15;

const initialState = {
  totalQuestions: [],
  questions: [],
  questionCount: 5,

  // "landing" | "loading" | "ready" | "active" | "finished" | "error"
  status: "landing",
  index: null,
  answer: null,
  points: 0,
  remainingSeconds: 0,
  quizSeconds: 0,
  inputText: "",
  quizSourceText: "",

  error: null,

  //loading stage states
  loadingStage: "",

  reviewPayload: [],
  // "idle" | "loading" | "ready" | "error"
  aiSummaryStatus: "idle",
  aiSummary: "",
  focusAreas: [],

  // TODO: upload feature
  uploadedFiles: [],
};

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

function reducer(state, action) {
  switch (action.type) {
    case "textInput":
      return {
        ...state,
        inputText: action.payload,
      };

    case "prepareQuizText":
      return {
        ...state,
        quizSourceText: action.payload,
      };

    case "generateQuiz":
      return {
        ...state,
        status: "loading",
      };

    case "ready": {
      const selectedQuestions = getRandomItems(
        action.payload,
        state.questionCount,
      );

      return {
        ...state,
        status: "ready",
        totalQuestions: action.payload,
        questions: selectedQuestions,
        quizSeconds: 0,
        remainingSeconds: selectedQuestions.length * SECS_PER_QUESTION,
        aiSummaryStatus: "idle",
      };
    }

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

    case "selectAnswer": {
      const curQuestion = state.questions[state.index];

      const reviewItem = {
        ...curQuestion,
        selectedOption: action.payload,
        isCorrect: curQuestion.correctOption === action.payload,
        index: state.index,
      };

      const alreadyExists = state.reviewPayload.some(
        (item) => item.index === state.index,
      );

      return {
        ...state,
        answer: action.payload,
        points:
          curQuestion.correctOption === action.payload
            ? state.points + POINTS_PER_QUESTION
            : state.points,

        reviewPayload: alreadyExists
          ? state.reviewPayload.map((item) =>
              item.index === state.index ? reviewItem : item,
            )
          : [...state.reviewPayload, reviewItem],
      };
    }

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
        // quizSeconds: state.quizSeconds - 1,
      };

    case "restart":
      return {
        ...state,
        answer: null,
        index: null,
        points: 0,
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
        status: "ready",
        quizSeconds: 0,
        reviewPayload: [],
        aiSummaryStatus: "idle",
        aiSummary: "",
        focusAreas: [],
      };

    case "newQuiz":
      return {
        ...state,
        status: "landing",
        inputText: state.inputText,
        reviewPayload: [],
        //! LETS GET BACK TO THIS AFTER TESTING
      };

    case "tickTock": {
      const nextRemainingSeconds =
        state.remainingSeconds > 0 ? state.remainingSeconds - 1 : 0;

      return {
        ...state,
        remainingSeconds: nextRemainingSeconds,
        status: nextRemainingSeconds === 0 ? "finished" : state.status,
        quizSeconds: state.quizSeconds + 1,
      };
    }

    case "error":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };

    case "loadSummary":
      return {
        ...state,
        aiSummaryStatus: "loading",
      };

    case "readySummary":
      return {
        ...state,
        aiSummaryStatus: "ready",
        aiSummary: action.payload.summary,
        focusAreas: action.payload.focusAreas,
      };

    case "idleSummary":
      return {
        ...state,
        aiSummaryStatus: "idle",
      };

    case "errorSummary":
      return {
        ...state,
        aiSummaryStatus: "error",
        aiSummary: action.payload,
      };

    case "addFiles":
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, ...action.payload],
      };

    case "removeFiles":
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter(
          (item) => item.id !== action.payload,
        ),
      };

    //loading screen
    case "extractingStage":
      return { ...state, loadingStage: "extracting" };

    case "analyzingStage":
      return { ...state, loadingStage: "analyzing" };

    case "finalizingStage":
      return { ...state, loadingStage: "finalizing" };
    case "readyStage":
      return { ...state, loadingStage: "ready" };

    default:
      throw new Error("Unknown Action");
  }
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
      error,
      reviewPayload,
      aiSummaryStatus,
      aiSummary,
      focusAreas,
      uploadedFiles,
      quizSourceText,
      loadingStage,
    },
    dispatch,
  ] = useReducer(reducer, initialState, init);

  useLocalStorage("highscore", highScore);

  const maxPossiblePoints = questions.length * POINTS_PER_QUESTION;
  const correctAnswers = points / POINTS_PER_QUESTION;
  const accuracyPercent = (points / maxPossiblePoints) * 100;

  console.log(loadingStage);

  return (
    <div>
      {status === "landing" && (
        <LandingScreen
          dispatch={dispatch}
          inputText={inputText}
          uploadedFiles={uploadedFiles}
        />
      )}
      {status === "loading" && (
        <LoadingScreen
          dispatch={dispatch}
          quizSourceText={quizSourceText}
          uploadedFiles={uploadedFiles}
        />
      )}
      {status === "error" && (
        <ErrorScreen
          onTryAgain={() => dispatch({ type: "generateQuiz" })}
          onBackToHome={() => dispatch({ type: "newQuiz" })}
          error={error}
        />
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
          curQuestion={questions?.at(index)}
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
          reviewPayload={reviewPayload}
          aiSummaryStatus={aiSummaryStatus}
          aiSummary={aiSummary}
          focusAreas={focusAreas}
        />
      )}
    </div>
  );
}

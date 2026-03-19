import { useEffect, useReducer } from "react";
import Main from "./Main";
import StartScreen from "./StartScreen";
import EndScreen from "./EndScreen";
import Question from "./Question";
import Error from "./Error";
import Loader from "./Loader";

const POINTS_PER_QUESTION = 10;

const initialState = {
  allQuestions: [],
  questions: [],
  index: 0,
  numQuestions: "",
  status: "loading",
  errorMessage: "",
  points: 0,
  highscore: 0,
  answer: null,
};

function init(initial) {
  return initial;
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        allQuestions: action.payload,
        status: "ready",
        errorMessage: "",
      };

    case "setNumQuestions":
      return {
        ...state,
        numQuestions: action.payload,
        questions: state.allQuestions.slice(0, action.payload),
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
        errorMessage: action.payload,
      };

    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer": {
      const curQuestion = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          curQuestion.correct_answer === action.payload
            ? state.points + POINTS_PER_QUESTION
            : state.points,
      };
    }

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        answer: null,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    {
      questions,
      numQuestions,
      index,
      status,
      errorMessage,
      answer,
      points,
      highscore,
    },
    dispatch,
  ] = useReducer(reducer, initialState, init);

  const questionsLength = questions.length;
  const possibleMaxScore = questionsLength * POINTS_PER_QUESTION;
  console.log(possibleMaxScore);
  console.log(questionsLength);
  console.log(points);

  useEffect(() => {
    const controller = new AbortController();

    async function getData() {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=40&category=18&difficulty=medium`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Failed to fetch questions");

        const data = await res.json();

        if (data.response_code !== 0) {
          throw new Error("Could not load quiz questions");
        }

        const formattedQuestions = data.results.map((q) => ({
          ...q,
          options: [q.correct_answer, ...q.incorrect_answers].sort(
            () => Math.random() - 0.5,
          ),
        }));

        dispatch({ type: "dataReceived", payload: formattedQuestions });
      } catch (err) {
        // console.error(err);
        if (err.name !== "AbortError") {
          dispatch({ type: "dataFailed", payload: err.message });
        }
      }
    }

    getData();

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error message={errorMessage} />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}

        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
            index={index}
            questionsLength={questionsLength}
          />
        )}

        {status === "finished" && (
          <EndScreen
            points={points}
            highscore={highscore}
            dispatch={dispatch}
            possibleMaxScore={possibleMaxScore}
          />
        )}
      </Main>
    </>
  );
}

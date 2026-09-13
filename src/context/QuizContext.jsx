import { getRandomItems } from "./utils/getRandomItems.js";

const POINTS_PER_QUESTION = 10;
const SECS_PER_QUESTION = 30;

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
	sourceUsage: [],
	hasShownSourceToast: false,
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
				sourceUsage: [],
				hasShownSourceToast: false,
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

		case "sourceUsage":
			return {
				...state,
				sourceUsage: action.payload,
				hasShownSourceToast: false,
			};

		case "shownSourceToast":
			return { ...state, hasShownSourceToast: true };

		default:
			throw new Error("Unknown Action");
	}
}

function QuizProvider() {}

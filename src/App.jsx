import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext.jsx";

import LandingScreen from "./components/LandingScreen";
// import LoadingScreen from "./components/LoadingScreen";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import ErrorScreen from "./components/ErrorMessage.jsx";


function AppLegacy() {

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
					uploadedFiles={uploadedFiles}
					loadingStage={loadingStage}
					questionCount={questionCount}
					inputText={inputText}
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
					sourceUsage={sourceUsage}
					hasShownSourceToast={hasShownSourceToast}
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

export default function App() {
	return (
		<QuizProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingScreen />} />
					<Route path="/loading" element={<LoadingScreen />} />
					<Route path="/ready" element={<StartScreen />} />
					<Route path="/quiz" element={<QuestionScreen />} />
					<Route path="/results" element={<ResultScreen />} />
					<Route path="*" element={<ErrorScreen />} />
				</Routes>
			</BrowserRouter>
		</QuizProvider>
	);
}

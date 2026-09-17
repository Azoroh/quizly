import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext.jsx";

import LandingScreen from "./components/LandingScreen";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import ErrorScreen from "./components/ErrorMessage.jsx";

export default function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#08080a] text-white">
          <Routes>
            {/* The Landing Route (also renders the Loading screen while status === "loading") */}
            <Route path="/" element={<LandingScreen />} />

            {/* The pre-quiz ready screen */}
            <Route path="/ready" element={<StartScreen />} />

            {/* The active quiz interface */}
            <Route path="/quiz" element={<QuestionScreen />} />

            {/* The post-quiz results and AI summary */}
            <Route path="/results" element={<ResultScreen />} />

            {/* Catch-all for any bad URLs */}
            <Route path="*" element={<ErrorScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QuizProvider>
  );
}

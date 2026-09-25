import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext.jsx";
import { Toaster } from "./components/ui/sonner";

import LandingScreen from "./components/LandingScreen";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import ErrorScreen from "./components/ErrorMessage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#08080a] text-white">
          <Routes>
            {/* The Landing Route (also renders the Loading screen while status === "loading") */}
            <Route path="/" element={<LandingScreen />} />

            {/* Protected Routes Wrapper */}
            <Route element={<ProtectedRoute />}>
              <Route path="/overview" element={<StartScreen />} />
              <Route path="/quiz" element={<QuestionScreen />} />
              <Route path="/results" element={<ResultScreen />} />
            </Route>

            {/* Catch-all for any bad URLs */}
            <Route path="*" element={<ErrorScreen />} />
          </Routes>

          <Toaster
            theme="dark"
            position="top-center"
            closeButton={true}
            duration={4000}
          />
        </div>
      </BrowserRouter>
    </QuizProvider>
  );
}

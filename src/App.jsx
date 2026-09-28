import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "./components/ui/sonner";

import LandingScreen from "./components/LandingScreen";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import NotFoundScreen from "./components/NotFoundScreen.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; //checking for active quiz
import RequireAuth from "./components/RequireAuth.jsx"; // checking for logged-in user
import AuthPage from "./components/AuthPage.jsx";
import ProfileDashboard from "./components/ProfileDashboard.jsx";

export default function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#08080a] text-white">
            <Routes>
              {
                /* The Landing Route (also renders the Loading screen while status === "loading") */
                // public routes
              }
              <Route path="/" element={<LandingScreen />} />
              <Route path="/auth" element={<AuthPage />} />

              {/* Guest Quiz Flow: Requires a generated quiz, but NOT a login */}
              <Route element={<ProtectedRoute />}>
                <Route path="/overview" element={<StartScreen />} />
                <Route path="/quiz" element={<QuestionScreen />} />
                <Route path="/results" element={<ResultScreen />} />
              </Route>

              {/* Strictly Protected Routes: Requires Login */}
              <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<ProfileDashboard />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>

            <Toaster
              theme="dark"
              position="bottom-right"
              closeButton={false}
              duration={4000}
            />
          </div>
        </BrowserRouter>
      </QuizProvider>
    </AuthProvider>
  );
}

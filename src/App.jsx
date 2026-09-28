import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "./components/ui/sonner";

import ProtectedRoute from "./components/ProtectedRoute.jsx"; //checking for active quiz
import RequireAuth from "./components/RequireAuth.jsx"; // checking for logged-in user

// Lazy load primary components for code splitting
const LandingScreen = lazy(() => import("./components/LandingScreen"));
const AuthPage = lazy(() => import("./components/AuthPage.jsx"));
const StartScreen = lazy(() => import("./components/StartScreen"));
const QuestionScreen = lazy(() => import("./components/QuestionScreen"));
const ResultScreen = lazy(() => import("./components/ResultScreen"));
const ProfileDashboard = lazy(
  () => import("./components/ProfileDashboard.jsx"),
);
const NotFoundScreen = lazy(() => import("./components/NotFoundScreen.jsx"));

// Minimalist loading fallback for chunk resolution
const PageLoader = () => (
  <div className="min-h-screen bg-[#08080a] flex items-center justify-center">
    <div className="size-6 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#08080a] text-white">
            {/* Wrap Routes in Suspense to handle the lazy loading transitions */}
            <Suspense fallback={<PageLoader />}>
              <Routes>
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
            </Suspense>

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

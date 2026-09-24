import { Navigate, Outlet } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";

export default function ProtectedRoute() {
  const { questions } = useQuiz();

  // If there are no questions in memory, the user either refreshed the page
  // or tried to manually type the URL. Bounce them to the home page.
  if (!questions || questions.length === 0) {
    return <Navigate to="/" replace />;
  }

  // If questions exist, let them through to the requested route
  return <Outlet />;
}

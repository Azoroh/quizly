import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { toast } from "sonner";

export default function ProtectedRoute() {
  const { questions } = useQuiz();
  const hasNoQuiz = !questions || questions.length === 0;

  useEffect(() => {
    // Fire the toast only when a user is caught trying to bypass the flow
    if (hasNoQuiz) {
      toast.error("No active quiz found", {
        description: "Please generate a quiz from your study material first.",
      });
    }
  }, [hasNoQuiz]);

  if (hasNoQuiz) {
    return <Navigate to="/" replace />;
  }

  // If questions exist, let them through
  return <Outlet />;
}

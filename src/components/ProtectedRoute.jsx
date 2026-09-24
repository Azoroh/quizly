import { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { toast } from "sonner";

export default function ProtectedRoute() {
  const { questions } = useQuiz();
  const hasNoQuiz = !questions || questions.length === 0;
  const toastFired = useRef(false);

  useEffect(() => {
    // Fire the toast only when a user is caught trying to bypass the flow
    if (hasNoQuiz && !toastFired.current) {
      toast.error("No active quiz found", {
        id: "missing-quiz-toast", // forcing Sonner to never duplicate this specific toast
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

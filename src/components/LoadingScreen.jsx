import { useEffect } from "react";
import LoadingHeader from "./loading/LoadingHeader";
import LoadingCard from "./loading/LoadingCard";
import { extractFileText } from "../services/extractFileText";
import { generateQuiz } from "../services/generateQuiz";

export default function LoadingScreen({
  dispatch,
  inputText,
  uploadedFiles,
  loadingStage,
  questionCount,
}) {
  useEffect(() => {
    let cancelled = false;

    async function fetchQuiz() {
      dispatch({ type: "extractingStage" });

      try {
        let combinedText;

        try {
          const extractedTexts = await Promise.all(
            uploadedFiles.map(extractFileText),
          );

          combinedText = [inputText, ...extractedTexts]
            .filter(Boolean)
            .join("\n\n");
        } catch (error) {
          if (cancelled) return;
          console.error("File extraction failed:", error);

          dispatch({
            type: "error",
            payload:
              error.message || "Failed to extract text from uploaded file",
          });
          return;
        }

        if (cancelled) return;
        dispatch({ type: "analyzingStage" });

        const quiz = await generateQuiz(combinedText);

        if (cancelled) return;

        dispatch({ type: "finalizingStage" });

        await wait(500);

        if (cancelled) return;
        dispatch({ type: "readyStage" });

        await wait(350);

        if (cancelled) return;
        dispatch({ type: "ready", payload: quiz });
      } catch (err) {
        if (cancelled) return;

        console.error("Quiz generation failed:", err);
        dispatch({
          type: "error",
          payload: err.message || "Failed to generate quiz",
        });
      }
    }
    fetchQuiz();

    return () => {
      cancelled = true;
    };
  }, [dispatch, inputText, uploadedFiles]);

  return (
    <div className="dark bg-background text-on-surface font-body min-h-screen flex flex-col overflow-hidden relative">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 glow-bg pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <LoadingHeader />

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <LoadingCard
          uploadedFiles={uploadedFiles}
          loadingStage={loadingStage}
          questionCount={questionCount}
        />
      </main>

      <div className="h-32 w-full bg-gradient-to-t from-primary/5 to-transparent absolute bottom-0 left-0 pointer-events-none"></div>
    </div>
  );
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

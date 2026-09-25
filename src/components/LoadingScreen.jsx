import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuiz } from "../context/QuizContext";

import LoadingCard from "./loading/LoadingCard";
import { extractFileText } from "../services/extractFileText";
import { generateQuiz } from "../services/generateQuiz";
import { buildCappedStudyMaterial } from "../utils/buildCappedStudyMaterial";

export default function LoadingScreen() {
  const { dispatch, inputText, uploadedFiles, loadingStage, questionCount } =
    useQuiz();

  const navigate = useNavigate();

  const MAX_INPUT_CHARS = 12000;

  useEffect(() => {
    let cancelled = false;

    async function fetchQuiz() {
      dispatch({ type: "extractingStage" });

      try {
        let safeText;
        let sources = [];

        try {
          const extractedFiles = await Promise.all(
            uploadedFiles.map(async (uploadedFile) => ({
              id: uploadedFile.id,
              name: uploadedFile.name,
              text: await extractFileText(uploadedFile),
            })),
          );

          const cappedMaterial = buildCappedStudyMaterial({
            inputText,
            extractedFiles,
            maxChars: MAX_INPUT_CHARS,
          });

          safeText = cappedMaterial.combinedText;
          sources = cappedMaterial.sources || [];

          dispatch({
            type: "sourceUsage",
            payload: cappedMaterial.sources,
          });
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

        if (!safeText.trim()) {
          dispatch({
            type: "error",
            payload: "No usable text was found in the provided material.",
          });
          return;
        }

        const quiz = await generateQuiz(safeText);

        if (cancelled) return;
        dispatch({ type: "finalizingStage" });

        await wait(500);

        if (cancelled) return;
        dispatch({ type: "readyStage" });

        await wait(350);

        if (cancelled) return;

        dispatch({ type: "ready", payload: quiz });

        const includedSources = sources.filter((s) => s.wasIncluded);
        const sourceCount =
          includedSources.length > 0 ? includedSources.length : sources.length;
        const description =
          sourceCount > 0
            ? `Parsed ${sourceCount} source${sourceCount > 1 ? "s" : ""} and built your custom quiz.`
            : "Parsed sources and built your custom quiz.";

        toast.success("Quiz Generated Successfully!", {
          description,
        });

        navigate("/overview");
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
  }, [dispatch, inputText, uploadedFiles, navigate]);

  return (
    <div className="dark bg-background text-on-surface font-body h-svh flex flex-col overflow-hidden relative">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 glow-bg pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <main className="flex-grow flex items-start sm:items-center justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-10 relative z-10">
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

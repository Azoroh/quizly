import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuiz } from "../context/QuizContext";

import LoadingCard from "./loading/LoadingCard";
import { extractFileText } from "../services/extractFileText";
import { generateQuiz } from "../services/generateQuiz";
import { buildCappedStudyMaterial } from "../utils/buildCappedStudyMaterial";

export default function LoadingScreen() {
  useEffect(() => {
    // Lock background scrolling
    document.body.style.overflow = "hidden";

    // Unlock when the loading screen goes away
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const {
    dispatch,
    inputText,
    uploadedFiles,
    loadingStage,
    questionCount,
    saveQuizToDatabase,
  } = useQuiz();

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

        //lets create a title based on what user uploaded and then save to our database
        const quizTitle =
          uploadedFiles.length > 0 ? uploadedFiles[0].name : "Custom Text Quiz";

        //we dont need to await this, we just let it run in the background so it doesnt delay our navigation
        saveQuizToDatabase(quizTitle, quiz);

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
    <div className="fixed inset-0 z-50 min-h-[100dvh] w-full flex flex-col overflow-hidden bg-[#09090b] text-zinc-100 font-body">
      <main className="flex-1 flex items-center justify-center w-full p-4 sm:p-6 relative z-10">
        <LoadingCard />
      </main>
    </div>
  );
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

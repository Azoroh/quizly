import { useEffect } from "react";
import LoadingHeader from "./loading/LoadingHeader";
import LoadingCard from "./loading/LoadingCard";
import { generateQuiz } from "../services/generateQuiz";
import StartHeader from "./start/StartHeader";

export default function LoadingScreen({ dispatch, inputText }) {
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const quiz = await generateQuiz(inputText);

        // console.log(quiz);
        dispatch({ type: "ready", payload: quiz });
      } catch (err) {
        console.error("Quiz generation failed:", err);
        dispatch({
          type: "error",
          payload: err.message || "Failed to generate quiz",
        });
      }
    }

    fetchQuiz();
  }, [dispatch, inputText]);

  return (
    <div className="dark bg-background text-on-surface font-body min-h-screen flex flex-col overflow-hidden relative">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 glow-bg pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[100px]"></div>
      </div> */}

      <LoadingHeader />
      {/* <StartHeader /> */}

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <LoadingCard />
      </main>

      <div className="h-32 w-full bg-gradient-to-t from-primary/5 to-transparent absolute bottom-0 left-0 pointer-events-none"></div>
    </div>
  );
}

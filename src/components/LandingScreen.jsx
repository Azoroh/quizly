import { useEffect } from "react";
import { toast } from "sonner";
import { useQuiz } from "../context/QuizContext";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./landing/Navbar";
import Hero from "./landing/Hero";
import BentoGrid from "./landing/BentoGrid";
import Footer from "./landing/Footer";

export default function LandingScreen() {
  const { status, error, dispatch } = useQuiz();

  // Trigger toast error notification via Sonner when status is 'error'
  useEffect(() => {
    if (status === "error" && error) {
      toast.error("Generation Failed", {
        description: error,
      });
      dispatch({ type: "clearError" });
    }
  }, [status, error, dispatch]);

  return (
    <div className="bg-zinc-950 text-zinc-100 font-body selection:bg-primary/30 min-h-screen overflow-x-hidden dark">
      {/* ── Loading overlay ─────────────────────────────────────────────────── */}
      {status === "loading" && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <LoadingScreen />
        </div>
      )}

      <Navbar />

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-14 sm:pb-20">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[700px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(63,63,70,0.35),transparent_70%)] pointer-events-none"
        />

        <Hero />

        <BentoGrid />
      </main>

      <Footer />
    </div>
  );
}

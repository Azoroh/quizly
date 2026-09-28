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
    <div className="bg-[#09090b] text-zinc-100 font-body selection:bg-zinc-800 min-h-screen overflow-x-hidden">
      {/* ── Loading overlay ─────────────────────────────────────────────────── */}
      {status === "loading" && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#09090b]/80 backdrop-blur-sm">
          <LoadingScreen />
        </div>
      )}

      {status !== "loading" && <Navbar />}

      <main className="relative mx-auto max-w-6xl px-6 pt-20 pb-24">
        {/* Subtle top illumination */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(39,39,42,0.2),transparent_100%)] pointer-events-none"
        />

        <Hero />
        <BentoGrid />
      </main>

      <Footer />
    </div>
  );
}

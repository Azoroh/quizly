import { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./landing/Navbar";
import Hero from "./landing/Hero";
import BentoGrid from "./landing/BentoGrid";
import Footer from "./landing/Footer";
import { AlertCircle, X } from "lucide-react";

export default function LandingScreen() {
  const { status, error, dispatch } = useQuiz();

  const [showToast, setShowToast] = useState(false);
  const [shouldRenderToast, setShouldRenderToast] = useState(false);

  // Show toast whenever an error lands
  useEffect(() => {
    if (!error) return;

    setShouldRenderToast(true);
    // Tiny delay so the DOM node is mounted before the transition fires
    const enterTimer = setTimeout(() => setShowToast(true), 20);

    // Auto-dismiss after 5 s
    const hideTimer = setTimeout(() => setShowToast(false), 5000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(hideTimer);
    };
  }, [error]);

  // When the slide-out transition ends, unmount and clear state
  function handleToastTransitionEnd() {
    if (!showToast) {
      setShouldRenderToast(false);
      dispatch({ type: "clearError" });
    }
  }

  function dismissToast() {
    setShowToast(false);
  }

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 font-body selection:bg-primary/30 min-h-screen overflow-x-hidden dark">
      {/* ── Error toast ──────────────────────────────────────────────────────── */}
      {shouldRenderToast && error && (
        <div
          onTransitionEnd={handleToastTransitionEnd}
          className={`fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-[60]
            w-[min(92vw,640px)] flex items-start gap-3
            rounded-2xl border border-red-500/30 bg-red-500/10
            backdrop-blur-xl px-4 py-3.5
            shadow-[0_20px_50px_rgba(0,0,0,0.45)]
            transition-all duration-300 ease-out
            ${showToast ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`}
        >
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-red-200 leading-snug">
              Quiz generation failed
            </p>
            <p className="text-xs text-red-300/70 mt-0.5 leading-relaxed truncate">
              {error}
            </p>
          </div>
          <button
            onClick={dismissToast}
            aria-label="Dismiss error"
            className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-red-300/50 hover:text-red-200 hover:bg-red-500/20 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
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

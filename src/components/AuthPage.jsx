import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";
import { Loader2Icon, SparklesIcon, ArrowLeftIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  async function handleAuth(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        //create new user
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        toast.success("Account created!.", {
          description: "Check your email for the confirmation link.",
        });
      } else {
        //log in an existing user
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/dashboard"); // direct them to the startscreen on success
      }
    } catch (error) {
      toast.error(error.message || "An error occured during authentication.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100dvh] w-full bg-[#09090b] text-zinc-100 font-body flex flex-col selection:bg-zinc-800">
      {/* Top Nav */}
      <nav className="w-full p-6">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeftIcon className="size-4 opacity-70 group-hover:-translate-x-0.5 transition-transform" />
          Back to Generator
        </button>
      </nav>

      {/* Centered Minimalist Auth Form */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 pb-24">
        <div className="w-full max-w-[340px] flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-2">
              <SparklesIcon className="size-5 text-zinc-300" />
            </div>
            <h1 className="text-xl font-medium tracking-tight text-zinc-100">
              {isSignUp ? "Create your account" : "Sign in to Quizly"}
            </h1>
            <p className="text-sm text-zinc-500">
              {isSignUp
                ? "Sign up to start saving your generated quizzes."
                : "Access your library and continue studying."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium text-zinc-400"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-[#09090b] border border-zinc-800 text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 rounded-md px-3 py-2 transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium text-zinc-400"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#09090b] border border-zinc-800 text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 rounded-md px-3 py-2 transition-all shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center bg-zinc-100 text-zinc-900 hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-500 text-sm font-medium py-2 rounded-md transition-all shadow-sm"
            >
              {loading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "No account? Sign up"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

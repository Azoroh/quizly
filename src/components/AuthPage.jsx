import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";
import {
  Loader2Icon,
  MailIcon,
  LockKeyholeIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "lucide-react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        navigate("/overview"); // direct them to the startscreen on success
      }
    } catch (error) {
      toast.error(error.message || "An error occured during authentication.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dark bg-background text-on-surface font-body min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 glow-bg pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-[400px] relative z-10">
        {/* Subtle glowing border effect behind the card */}
        <div className="absolute -inset-[1px] bg-gradient-to-b from-zinc-700/50 to-zinc-900/50 rounded-[24px] blur-sm opacity-70"></div>

        <main className="relative bg-[#09090b]/90 backdrop-blur-xl border border-zinc-800/80 p-8 sm:p-10 rounded-[24px] shadow-2xl flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-12 w-12 bg-zinc-900 border border-zinc-800/80 rounded-2xl flex items-center justify-center shadow-inner">
              <SparklesIcon className="size-6 text-zinc-100" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
                {isSignUp ? "Create an account" : "Welcome back"}
              </h1>
              <p className="text-sm text-zinc-400 mt-1.5">
                {isSignUp
                  ? "Enter your details to start saving quizzes."
                  : "Enter your details to sign in to your account."}
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleAuth} className="flex flex-col gap-5">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 ml-1">
                  Email
                </label>
                <div className="relative group">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <LockKeyholeIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-zinc-100 text-zinc-900 font-medium text-sm rounded-xl py-2.5 mt-2 flex items-center justify-center gap-2 overflow-hidden transition-all hover:bg-white active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
            >
              {loading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Sign Up" : "Log In"}
                  <ArrowRightIcon className="size-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="text-center text-sm text-zinc-400">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-zinc-100 font-medium hover:underline underline-offset-4 transition-all"
            >
              {isSignUp ? "Log in" : "Sign up"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

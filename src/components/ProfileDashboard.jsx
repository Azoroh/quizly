import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Loader2Icon,
  FileTextIcon,
  ClockIcon,
  LogOutIcon,
  ArrowLeftIcon,
  SparklesIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfileDashboard() {
  const { user, signOut } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserQuizzes() {
      try {
        const { data, error } = await supabase
          .from("quizzes")
          .select("*")
          .order("created_at", { ascending: false }); //Newest first

        if (error) throw error;

        if (data) {
          const titleTracker = {}; //calculate generation count dynamically

          // We reverse the array to process oldest-to-newest, assign numbers,
          // then reverse it back so newest is at the top of the UI.
          const processedQuizzes = [...data]
            .reverse()
            .map((quiz) => {
              titleTracker[quiz.title] = (titleTracker[quiz.title] || 0) + 1;
              return {
                ...quiz,
                generation: titleTracker[quiz.title],
              };
            })
            .reverse();

          setQuizzes(processedQuizzes);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error.message);
        toast.error("Failed to load quiz history");
      } finally {
        setLoading(false);
      }
    }

    if (user) fetchUserQuizzes();
  }, [user]);

  async function handleLogout() {
    await signOut();
    toast.success("Logged out");
    navigate("/");
  }

  return (
    <div className="min-h-[100dvh] w-full flex flex-col dark bg-background text-on-surface font-body relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 glow-bg pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Navbar Layer */}
      <nav className="relative z-10 w-full p-4 sm:px-8 border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Generator
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400 hidden sm:inline-block">
            {user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 text-zinc-300 text-sm font-medium rounded-lg transition-all"
          >
            <LogOutIcon className="size-4" />
            Log Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto p-4 sm:p-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Your Study Vault
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Review and retake your past generated quizzes.
          </p>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2Icon className="size-8 animate-spin text-zinc-600" />
          </div>
        ) : quizzes.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30 backdrop-blur-sm">
            <FileTextIcon className="size-12 text-zinc-600 mb-4" />
            <h3 className="text-lg font-medium text-zinc-300">
              No quizzes found
            </h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-sm text-center">
              You haven't saved any quizzes yet. Go back to the generator to
              create your first one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="group relative flex flex-col p-5 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-2xl hover:border-zinc-600 hover:bg-zinc-800/50 transition-all cursor-pointer overflow-hidden"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex justify-between items-start gap-2 relative z-10">
                  <h3
                    className="text-base font-semibold text-zinc-200 line-clamp-2"
                    title={quiz.title}
                  >
                    {quiz.title}
                  </h3>

                  {/* GENERATION BADGE - Only shows if this source has been used more than once */}
                  {quiz.generation > 1 && (
                    <span className="flex-shrink-0 flex items-center gap-1 bg-primary/10 text-primary-400 border border-primary/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      <SparklesIcon className="size-3" />
                      Gen {quiz.generation}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-4 text-xs font-medium text-zinc-500 relative z-10">
                  <span className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-800/80">
                    <FileTextIcon className="size-3" />
                    {quiz.questions?.length || 0} Qs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="size-3" />
                    {new Date(quiz.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

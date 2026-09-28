import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  LogOutIcon,
  FileTextIcon,
  Loader2Icon,
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

  const formatTitle = (title) => title.replace(/\.(pdf|txt|docx?|md)$/i, "");

  return (
    <div className="min-h-[100dvh] w-full bg-[#09090b] text-zinc-100 font-body flex flex-col selection:bg-zinc-800">
      {/* Minimalist Top Nav */}
      <nav className="w-full border-b border-zinc-900 bg-[#09090b]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeftIcon className="size-4 opacity-70 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          <div className="flex items-center gap-6">
            <span className="text-xs font-mono text-zinc-500 hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-zinc-500 hover:text-zinc-100 transition-colors"
              title="Log Out"
            >
              <LogOutIcon className="size-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-xl font-medium tracking-tight text-zinc-100">
            Library
          </h1>
          {!loading && quizzes.length > 0 && (
            <span className="text-xs font-mono text-zinc-500">
              {quizzes.length} Items
            </span>
          )}
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2Icon className="size-5 animate-spin text-zinc-700" />
          </div>
        ) : quizzes.length === 0 ? (
          <div className="py-20 border border-dashed border-zinc-900 rounded-lg flex flex-col items-center justify-center text-center">
            <p className="text-sm text-zinc-500 mb-4">
              No quizzes generated yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Create your first quiz &rarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="group flex flex-col justify-between p-4 min-h-[120px] bg-zinc-950/50 border border-zinc-900 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <FileTextIcon className="size-4 text-zinc-600 shrink-0 mt-0.5" />
                    <h3
                      className="text-sm text-start font-medium text-zinc-300 group-hover:text-zinc-100 line-clamp-2 leading-snug transition-colors"
                      title={quiz.title}
                    >
                      {formatTitle(quiz.title)}
                    </h3>
                  </div>

                  {quiz.generation > 1 && (
                    <span className="shrink-0 flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 text-zinc-400">
                      v{quiz.generation}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 text-[11px] font-medium text-zinc-500">
                  <span>{quiz.questions?.length || 0} Qs</span>
                  <span>
                    {new Date(quiz.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
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

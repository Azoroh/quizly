import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  LogOutIcon,
  FileTextIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { formatTitle } from "@/utils/formatTitle";
import { useQuiz } from "@/context/QuizContext";

export default function ProfileDashboard() {
  const { user, signOut } = useAuth();
  const { dispatch } = useQuiz();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function handleDeleteQuiz(e, quizId, rawTitle) {
    e.stopPropagation();

    const cleanTitle = formatTitle(rawTitle);
    const displayTitle =
      cleanTitle.length > 20 ? `${cleanTitle.slice(0, 20).trim()}` : cleanTitle;

    // const previousQuizzes = [...quizzes];
    const quizToRestore = quizzes.find((quiz) => quiz.id === quizId);

    setQuizzes((currentQuizzes) =>
      currentQuizzes.filter((quiz) => quiz.id !== quizId),
    );

    const deleteTimeout = setTimeout(async () => {
      try {
        const { error } = await supabase
          .from("quizzes")
          .delete()
          .eq("id", quizId);

        if (error) throw error;

        // toast.success(`"${displayTitle}" deleted`);
      } catch (error) {
        console.error("Error deleting quiz:", error);
        setQuizzes((current) => {
          const restored = [quizToRestore, ...current];
          return restored.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at),
          );
        });
        toast.error(`Failed to delete "${displayTitle}". Restored.`);
      }
    }, 3000);

    toast(`"${displayTitle}" deleted`, {
      duration: 4000,
      action: {
        label: "Undo",
        onClick: () => {
          clearTimeout(deleteTimeout); //cancel the timer: cancel databse deletion

          setQuizzes((current) => {
            const restored = [quizToRestore, ...current];
            return restored.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at),
            );
          });
          toast.success(`Restored`);
        },
      },
    });
  }

  function handleRerunQuiz(quiz) {
    dispatch({
      type: "loadRerun",
      payload: { questions: quiz.questions, title: quiz.title },
    });

    navigate("/overview");
  }

  useEffect(() => {
    async function fetchUserQuizzes() {
      try {
        const { data, error } = await supabase
          .from("quizzes")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data) {
          const titleTracker = {};
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

        {/* Smooth Transition Container for Loading State */}
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            loading ? "opacity-100" : "opacity-0 pointer-events-none hidden"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between p-4 min-h-[120px] bg-zinc-950/30 border border-zinc-900/80 rounded-xl animate-pulse"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <div className="size-4 bg-zinc-800/60 rounded shrink-0 mt-0.5" />
                    <div className="space-y-2 w-full">
                      <div className="h-3.5 bg-zinc-800/60 rounded w-full" />
                      <div className="h-3.5 bg-zinc-800/40 rounded w-3/4" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="h-3 bg-zinc-800/40 rounded w-8" />
                  <div className="h-3 bg-zinc-800/40 rounded w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loaded / Empty State Container */}
        {!loading && (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            {quizzes.length === 0 ? (
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
                    onClick={() => handleRerunQuiz(quiz)}
                    className="group flex flex-col justify-between p-4 min-h-[120px] bg-zinc-950/50 border border-zinc-900 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/50 transition-all cursor-pointer"
                  >
                    {/* TOP ROW: Title and Version Badge Only */}
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

                    {/* BOTTOM ROW: Metadata and Delete Action */}
                    <div className="flex items-center justify-between mt-4 text-[11px] font-medium text-zinc-500">
                      <div className="flex items-center gap-3">
                        <span>{quiz.questions?.length || 0} Qs</span>
                        <span>
                          {new Date(quiz.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>

                      {/* The Delete Button (Isolated at the bottom right) */}
                      <button
                        onClick={(e) =>
                          handleDeleteQuiz(e, quiz.id, quiz.title)
                        }
                        className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity p-1.5 -mr-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-md"
                        title="Delete Quiz"
                      >
                        <Trash2Icon className="size-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

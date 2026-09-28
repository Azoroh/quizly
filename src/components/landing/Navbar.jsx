import { Link, useNavigate } from "react-router-dom";
import { Sparkles, LogOutIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  }

  return (
    <nav className="sticky top-0 w-full z-50 bg-[#09090b] border-b border-zinc-900">
      {/* Changed to remove justify-between */}
      <div className="flex items-center max-w-6xl mx-auto px-6 h-14">
        {/* LEFT SECTION: Wrapped in flex-1 to anchor the left side */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="size-4 text-zinc-100 opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm font-semibold tracking-tight text-zinc-100">
              Quizly
            </span>
          </Link>
        </div>

        {/* CENTER SECTION: Links stay perfectly centered */}
        <div className="hidden md:flex items-center justify-center gap-6">
          <Link
            className="text-xs font-medium text-zinc-500 hover:text-zinc-100 transition-colors"
            to="/features"
          >
            Features
          </Link>
          <Link
            className="text-xs font-medium text-zinc-500 hover:text-zinc-100 transition-colors"
            to="/how-it-works"
          >
            How it Works
          </Link>
          <Link
            className="text-xs font-medium text-zinc-500 hover:text-zinc-100 transition-colors"
            to="/pricing"
          >
            Pricing
          </Link>
        </div>

        {/* RIGHT SECTION: Wrapped in flex-1 & justify-end to anchor the right side */}
        <div className="flex-1 flex items-center justify-end">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-500 hidden sm:block">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-zinc-500 hover:text-zinc-100 transition-colors"
                  title="Log Out"
                >
                  <LogOutIcon className="size-4" />
                </button>
              </div>
              <Link
                to="/profile"
                className="text-xs font-medium px-3 py-1.5 bg-zinc-100 text-zinc-900 hover:bg-white rounded-md transition-all shadow-sm"
              >
                Library
              </Link>
            </div>
          ) : (
            <Link
              to="/auth"
              className="text-xs font-medium px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-zinc-100 rounded-md transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

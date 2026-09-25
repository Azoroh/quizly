import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
          <span className="text-xl sm:text-2xl font-black text-white font-headline tracking-tight">
            Quizly
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-zinc-400 font-medium font-['Inter'] text-sm hover:text-white transition-colors duration-300"
            to="/features"
          >
            Features
          </Link>
          <Link
            className="text-zinc-400 font-medium font-['Inter'] text-sm hover:text-white transition-colors duration-300"
            to="/how-it-works"
          >
            How it Works
          </Link>
          <Link
            className="text-zinc-400 font-medium font-['Inter'] text-sm hover:text-white transition-colors duration-300"
            to="/pricing"
          >
            Pricing
          </Link>
        </div>

        <Button
          asChild
          variant="outline"
          className="rounded-full border-zinc-700 bg-zinc-900/50 px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all duration-200"
        >
          <Link to="/sign-in">Sign In</Link>
        </Button>
      </div>
    </nav>
  );
}

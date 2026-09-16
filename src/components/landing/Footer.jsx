import { Link } from "react-router-dom";
import { Twitter, Github, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900">
      <div className="w-full py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto px-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="text-lg font-bold text-white font-headline">
              Quizly
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              AI-powered quizzes that make learning faster and more fun.
            </p>
            <p className="text-xs text-zinc-600 mt-4">
              © 2024 Quizly AI. All rights reserved.
            </p>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Product
            </h4>
            <Link
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
              to="/features"
            >
              Features
            </Link>
            <Link
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
              to="/pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
              to="/changelog"
            >
              Changelog
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Legal
            </h4>
            <Link
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
              to="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
              to="/terms"
            >
              Terms of Service
            </Link>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Socials
            </h4>
            <a
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              <Twitter className="w-4 h-4" />
              Twitter / X
            </a>
            <a
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="w-4 h-4" />
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

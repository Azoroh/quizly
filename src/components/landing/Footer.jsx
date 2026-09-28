import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#09090b] border-t border-zinc-900 text-left">
      <div className="w-full py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 max-w-6xl mx-auto px-6">
          {/* Brand - Spans full width on mobile, 1 column on desktop */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-3">
            <div className="text-sm font-semibold text-zinc-100 tracking-tight">
              Quizly
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">
              Intelligent assessment generation for accelerated learning.
            </p>
            <p className="text-[10px] font-mono text-zinc-600 mt-2">
              © 2026 Quizly AI.
            </p>
          </div>

          {/* Product */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">
              Product
            </h4>
            <Link
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              to="/features"
            >
              Features
            </Link>
            <Link
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              to="/pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              to="/changelog"
            >
              Changelog
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">
              Legal
            </h4>
            <Link
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              to="/privacy"
            >
              Privacy
            </Link>
            <Link
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              to="/terms"
            >
              Terms
            </Link>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">
              Connect
            </h4>
            <a
              className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              href="https://twitter.com"
            >
              <XIcon className="w-3.5 h-3.5" /> Twitter
            </a>
            <a
              className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              href="https://github.com"
            >
              <GithubIcon className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

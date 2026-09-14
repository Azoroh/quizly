import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0e0e0f]/80 backdrop-blur-xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <div className="flex items-center gap-1.5">
          <img
            src={logo}
            alt="Quizly logo"
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
          />
          <span className="text-xl sm:text-2xl font-black text-white font-headline tracking-tight translate-y-0.5">
            Quizly
          </span>
        </div>
        {/* <div className="text-2xl font-black text-white tracking-tighter font-headline">
          Quizly
        </div> */}
        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-[#9fa7ff] font-bold font-['Inter'] text-sm hover:text-white transition-colors duration-300"
            href="#"
          >
            Features
          </a>
          <a
            className="text-gray-400 font-medium font-['Inter'] text-sm hover:text-white transition-colors duration-300"
            href="#"
          >
            How it works
          </a>
          <a
            className="text-gray-400 font-medium font-['Inter'] text-sm hover:text-white transition-colors duration-300"
            href="#"
          >
            Pricing
          </a>
        </div>
        <button className="bg-surface-container-highest px-4 sm:px-6 py-2 rounded-full border border-white/5 text-xs sm:text-sm font-bold text-white hover:bg-surface-bright transition-all duration-200 scale-95 hover:scale-100">
          Sign In
        </button>
      </div>
    </nav>
  );
}

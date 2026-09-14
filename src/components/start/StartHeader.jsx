import logo from "../../assets/logo.png";

export default function StartHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0e0e0f]/35 backdrop-blur-xl">
      <div className="mx-auto flex h-16 sm:h-20 w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
      </div>
    </header>
  );
}

// className="fixed top-0 w-full z-50 "

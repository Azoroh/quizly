export default function Footer() {
  return (
    <footer className="bg-[#0e0e0f]">
      <div className="w-full py-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-8">
          <div className="flex flex-col gap-2 mb-8 md:mb-0">
            <div className="text-lg font-bold text-white font-headline">
              Quizly
            </div>
            <p className="text-sm text-gray-500">
              © 2024 Quizly AI. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8">
            <a
              className="text-sm text-gray-500 hover:text-[#9fa7ff] transition-colors duration-300"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-sm text-gray-500 hover:text-[#9fa7ff] transition-colors duration-300"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-sm text-gray-500 hover:text-[#9fa7ff] transition-colors duration-300"
              href="#"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

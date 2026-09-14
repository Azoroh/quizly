export default function StartHero() {
  return (
    <>
      {/* Icon */}
      <div className="mb-4 sm:mb-6 relative">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150"></div>
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-surface-container-high flex items-center justify-center border border-primary/20">
          <span className="material-symbols-outlined text-[28px] sm:text-3xl text-primary">
            task_alt
          </span>
        </div>
      </div>

      <h1 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 sm:mb-3 text-on-surface">
        Your personalized quiz is ready
      </h1>
      <p className="text-on-surface-variant text-sm sm:text-base max-w-md mb-5 sm:mb-8 leading-relaxed">
        Quizly has analyzed your study material and generated a custom quiz
        tailored to your notes.
      </p>
    </>
  );
}

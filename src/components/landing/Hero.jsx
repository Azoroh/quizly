export default function Hero({ dispatch, inputText }) {
  const isDisabled = inputText.trim().length < 50;

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-white">
        Turn your study material into a{" "}
        <span className="animated-hero-gradient">personalized quiz</span>
      </h1>
      <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
        Paste your notes or upload a file and let Quizly generate a
        comprehensive quiz to master your material instantly.
      </p>

      {/* Input Panel */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>

        <div className="relative glass-panel rounded-t-[2.25rem] rounded-b-[2rem] p-4 md:p-6 border border-white/10 glow-border">
          <textarea
            className="w-full min-h-[240px] px-4 py-3 bg-transparent border-none outline-none focus:outline focus:outline-1 focus:outline-primary/40 rounded-t-2xl text-on-surface text-lg placeholder:text-on-surface-variant/50 resize-none font-small"
            placeholder="Paste your notes or study material to generate a quiz instantly..."
            onChange={(e) =>
              dispatch({ type: "textInput", payload: e.target.value })
            }
            value={inputText}
          />
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-white/5 gap-4">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-all duration-200 border border-white/5">
              <span className="material-symbols-outlined text-[20px]">
                upload_file
              </span>
              <span className="text-sm font-bold tracking-tight">
                PDF, DOCX, Slides
              </span>
            </button>
            <button
              disabled={isDisabled}
              className={`w-full md:w-auto px-8 py-3.5 rounded-full font-black text-base transition-all duration-300 ${
                isDisabled
                  ? "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed shadow-[0_0_30px_rgba(159,167,255,0.3)] hover:shadow-[0_0_40px_rgba(159,167,255,0.4)] active:scale-95"
              }`}
              onClick={() => dispatch({ type: "generateQuiz" })}
            >
              Generate Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Action Chips */}
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {[
          "Upload PDF",
          "Paste Notes",
          "Study Guide",
          "Lecture Slides",
          "Practice Quiz",
        ].map((label, i) => (
          <button
            key={label}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              i === 0
                ? "bg-secondary-container/20 border border-secondary/20 text-secondary hover:bg-secondary-container/30"
                : "bg-surface-container-highest border border-white/5 text-on-surface-variant hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto mt-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1 */}
        <div className="md:col-span-8 bg-surface-container-low rounded-[2rem] p-10 flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-6">
              Smart Analysis
            </div>
            <h2 className="text-4xl font-black text-white leading-tight mb-4">
              Context-Aware AI Generation
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl">
              Our engine doesn't just scan words; it understands concepts,
              hierarchies, and learning outcomes to create challenging
              questions.
            </p>
          </div>
          <div className="relative mt-8 h-48 w-full rounded-2xl overflow-hidden bg-surface-container">
            <img
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBTjJPJutQgRLF_SjLrlsrNf7yy586xwqb6nQEXSGPgHqc2zRSePCae98CYcMPbFjTMX5OY8mvoB5woz5Gr5nJsQWGrKt7r6dIOddo7wg7wEHWlzHSAOAaHAQpM1Fg2mMWgs21_JpUbjZ0lG_v_rMafWmuKq2fEkMzCJ19Q_ygJGv0SpoYnmIGDwUmo4VdrXZr0cFNtD1vuGIGBJ9_DJjBUBeKimos2B0rr0v7MBQmUq40aU1UKmgTayc0_GFgsHKo--gLHzd0oPvz"
              alt="Abstract neural network visualization"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="md:col-span-4 bg-surface-container-high rounded-[2rem] p-10 flex flex-col items-start justify-center text-left">
          <span className="material-symbols-outlined text-primary text-5xl mb-6">
            history_edu
          </span>
          <h3 className="text-2xl font-black text-white mb-4">
            Mastery Reports
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Detailed analytics on your performance across different topics to
            identify where you need more focus.
          </p>
        </div>

        {/* Card 3 */}
        <div className="md:col-span-4 bg-surface-container-high rounded-[2rem] p-10 flex flex-col items-start justify-center text-left">
          <span className="material-symbols-outlined text-secondary text-5xl mb-6">
            cloud_sync
          </span>
          <h3 className="text-2xl font-black text-white mb-4">
            Cross-Platform Sync
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Generate on your laptop, practice on your phone. Your quizzes are
            always ready wherever you study.
          </p>
        </div>

        {/* Card 4 */}
        <div className="md:col-span-8 bg-surface-container-low rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-3xl font-black text-white mb-4">
              Multiple Choice, True/False, or Short Answer.
            </h3>
            <p className="text-on-surface-variant">
              Customize the quiz format to match your upcoming exam style
              precisely.
            </p>
          </div>
          <div className="flex-1 w-full flex flex-col gap-3">
            {[
              {
                label: "Conceptual Matching",
                color: "bg-primary",
                opacity: "",
                dot: "shadow-[0_0_8px_rgba(159,167,255,0.8)]",
              },
              {
                label: "Critical Thinking Prompts",
                color: "bg-secondary",
                opacity: "opacity-70",
                dot: "",
              },
              {
                label: "Vocabulary Drills",
                color: "bg-outline",
                opacity: "opacity-40",
                dot: "",
              },
            ].map(({ label, color, opacity, dot }) => (
              <div
                key={label}
                className={`p-4 rounded-xl bg-surface-container-highest border border-white/5 flex items-center gap-4 ${opacity}`}
              >
                <div className={`w-2 h-2 rounded-full ${color} ${dot}`}></div>
                <span className="font-bold text-white text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

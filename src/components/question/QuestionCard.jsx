export default function QuestionCard({ children }) {
  return (
    <div className="glass-card glow-effect rounded-[1.75rem] sm:rounded-[2rem] p-4 sm:p-8 md:p-12 relative overflow-hidden">
      {children}
    </div>
  );
}

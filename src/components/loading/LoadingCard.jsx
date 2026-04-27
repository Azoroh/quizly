import MetadataPills from "./MetadataPills";
import SourceReceived from "./SourceReceived";
import ProgressStages from "./ProgressStages";
import { getLoadingStageVal } from "../../utils/getLoadingStageVal";

const stageCopy = {
  extracting:
    "Quizly is extracting text from your files and preparing your material for quiz generation.",
  analyzing:
    "Quizly is reading your material, identifying key concepts, and understanding what matters most.",
  finalizing:
    "Quizly is turning those ideas into questions and assembling your personalized quiz.",
  ready: "Your quiz is ready. Preparing everything for you now.",
};

export default function LoadingCard({
  uploadedFiles,
  loadingStage,
  questionCount,
}) {
  const subtitle =
    stageCopy[loadingStage] ??
    "Quizly is preparing your material and building your personalized quiz.";

  return (
    <div className="w-full max-w-2xl glass-card rounded-xl p-8 lg:p-12 glow-soft">
      <div className="text-center mb-10">
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-on-surface tracking-tight mb-4">
          Building your personalized quiz
        </h1>
        <p className="font-body text-on-surface-variant text-lg max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="relative w-full h-1.5 bg-surface-container-highest rounded-full mb-12 overflow-hidden">
        <div
          style={{ width: `${getLoadingStageVal(loadingStage)}%` }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-dim to-primary rounded-full progress-glow transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        ></div>
      </div>

      <MetadataPills
        loadingStage={loadingStage}
        uploadedFiles={uploadedFiles}
        questionCount={questionCount}
      />
      <SourceReceived
        uploadedFiles={uploadedFiles}
        loadingStage={loadingStage}
      />
      <ProgressStages loadingStage={loadingStage} />
    </div>
  );
}

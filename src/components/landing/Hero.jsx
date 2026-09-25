import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Link2, Loader2, Sparkles, Upload, X } from "lucide-react";
import { useQuiz } from "../../context/QuizContext";

const MAX_INPUT_CHARS = 12000;

const TABS = [
  { id: "paste", label: "Paste Text", icon: FileText },
  { id: "pdf", label: "Upload PDF", icon: Upload },
  { id: "url", label: "Web URL", icon: Link2 },
];

export default function Hero() {
  const { dispatch, inputText, uploadedFiles, status } = useQuiz();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState(() => {
    // if files already exist, default to PDF tab
    if (uploadedFiles?.length > 0) return "pdf";
    // Otherwise, default to the paste tab
    return "paste";
  });
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const isLoading = status === "loading";
  const isDisabled =
    isLoading ||
    (inputText.trim().length < 50 && (uploadedFiles?.length ?? 0) < 1);

  // useEffect(() => {
  //   if (status === "ready") navigate("/overview");
  // }, [status, navigate]);

  function addFiles(fileList) {
    const newFiles = Array.from(fileList).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    }));

    dispatch({ type: "addFiles", payload: newFiles });
  }

  function handleFileChange(e) {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }

  function handleGenerate(e) {
    if (e) e.preventDefault();
    if (isDisabled) return;
    dispatch({ type: "generateQuiz" });
  }

  return (
    <div className="max-w-4xl mx-auto text-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".pdf,.docx"
      />

      <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-[1.05] text-white">
        Turn your study material into a{" "}
        <span className="bg-gradient-to-r from-slate-200 to-zinc-500 bg-clip-text text-transparent">
          personalized quiz
        </span>
      </h1>
      <p className="font-body text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-16 font-medium leading-relaxed">
        Paste your notes or upload a file and let Quizly generate a
        comprehensive quiz to master your material instantly.
      </p>

      {/* Input Panel */}
      <div className="relative">
        <div className="relative bg-zinc-900/50 border border-zinc-800 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* Tab Bar */}
          <div className="flex items-center gap-1 p-2 border-b border-zinc-800/80">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="hero-tab-indicator"
                      className="absolute inset-0 rounded-xl bg-zinc-800"
                      transition={{
                        type: "spring",
                        duration: 0.5,
                        bounce: 0.15,
                      }}
                    />
                  )}
                  <Icon className="relative z-10 w-4 h-4" strokeWidth={2.25} />
                  <span className="relative z-10 hidden sm:inline">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-4 md:p-6">
            <AnimatePresence mode="wait">
              {activeTab === "paste" && (
                <motion.div
                  key="paste"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <textarea
                    className="w-full min-h-[220px] sm:min-h-[240px] px-3 sm:px-4 py-3 bg-transparent border-none outline-none focus:outline focus:outline-1 focus:outline-zinc-600 rounded-xl text-zinc-100 text-base sm:text-lg placeholder:text-zinc-500 resize-none font-body"
                    placeholder="Paste your notes or study material to generate a quiz instantly..."
                    onChange={(e) =>
                      dispatch({ type: "textInput", payload: e.target.value })
                    }
                    value={inputText}
                  />
                </motion.div>
              )}

              {activeTab === "pdf" && (
                <motion.div
                  key="pdf"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="min-h-[220px] sm:min-h-[240px] flex flex-col gap-4"
                >
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingFile(true);
                    }}
                    onDragLeave={() => setIsDraggingFile(false)}
                    onDrop={handleDrop}
                    className={`flex-1 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-colors px-6 py-10 ${
                      isDraggingFile
                        ? "border-zinc-500 bg-zinc-800/40"
                        : "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/20"
                    }`}
                  >
                    <Upload
                      className="w-8 h-8 text-zinc-500"
                      strokeWidth={1.75}
                    />
                    <div className="text-center">
                      <p className="text-sm font-semibold text-zinc-200">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        PDF or DOCX files
                      </p>
                    </div>
                  </button>

                  {uploadedFiles?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {uploadedFiles.map((uploadedFile) => (
                        <div
                          key={uploadedFile.id}
                          className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-zinc-800/60 border border-zinc-700/60 text-left"
                        >
                          <span className="flex items-center gap-2 min-w-0 text-sm font-medium text-zinc-200">
                            <FileText className="w-4 h-4 text-zinc-500 shrink-0" />
                            <span className="truncate">
                              {uploadedFile.name}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch({
                                type: "removeFiles",
                                payload: uploadedFile.id,
                              })
                            }
                            className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-colors shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "url" && (
                <motion.div
                  key="url"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="min-h-[220px] sm:min-h-[240px] flex flex-col items-center justify-center gap-3 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-zinc-500" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-200">
                    Generate from a web page
                  </p>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-800 text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                    Coming soon
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-t border-zinc-800/80 px-3 sm:px-4 md:px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
              <span
                className={
                  inputText.length > MAX_INPUT_CHARS ? "text-amber-400" : ""
                }
              >
                {inputText.length.toLocaleString()} /{" "}
                {MAX_INPUT_CHARS.toLocaleString()} characters
              </span>
              {uploadedFiles?.length > 0 && (
                <>
                  <span className="h-1 w-1 rounded-full bg-zinc-700" />
                  <span>
                    {uploadedFiles.length} file
                    {uploadedFiles.length > 1 ? "s" : ""} attached
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              disabled={isDisabled}
              onClick={handleGenerate}
              className={`w-full sm:w-auto sm:min-w-[190px] inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${
                isDisabled
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-95"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Quiz
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

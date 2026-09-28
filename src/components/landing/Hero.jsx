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
    <div className="max-w-3xl mx-auto text-center pt-12">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".pdf,.docx"
      />

      <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6 leading-tight text-zinc-100">
        Transform study material <br className="hidden sm:block" />
        into active recall.
      </h1>
      <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto mb-12">
        Upload documents or paste your notes. Our engine generates context-aware
        quizzes instantly.
      </p>

      {/* Input Panel */}
      <div className="relative text-left bg-[#09090b] border border-zinc-900 rounded-xl overflow-hidden shadow-sm">
        {/* Tab Bar */}
        <div className="flex items-center gap-6 px-4 border-b border-zinc-900 bg-zinc-950/30">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 py-3 text-xs font-medium transition-colors ${
                  isActive
                    ? "text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {isActive && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-zinc-100" />
                )}
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-5">
          <AnimatePresence mode="wait">
            {activeTab === "paste" && (
              <motion.div
                key="paste"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                <textarea
                  className="w-full min-h-[180px] bg-transparent border-none outline-none text-sm text-zinc-300 placeholder:text-zinc-600 resize-none font-body leading-relaxed"
                  placeholder="Paste your notes here..."
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
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="min-h-[180px] flex flex-col gap-4"
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
                  className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed transition-colors px-6 py-8 ${
                    isDraggingFile
                      ? "border-zinc-600 bg-zinc-900/50"
                      : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/30"
                  }`}
                >
                  <Upload className="w-5 h-5 text-zinc-500" />
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-zinc-300">
                      Click or drag and drop
                    </p>
                    <p className="text-[11px] text-zinc-600 mt-1 uppercase tracking-wider font-mono">
                      PDF or DOCX
                    </p>
                  </div>
                </button>

                {uploadedFiles?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {uploadedFiles.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-zinc-900/50 border border-zinc-800"
                      >
                        <span className="flex items-center gap-2 min-w-0 text-xs font-medium text-zinc-300">
                          <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          <span className="truncate">{f.name}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({ type: "removeFiles", payload: f.id })
                          }
                          className="text-zinc-600 hover:text-zinc-300 transition-colors shrink-0"
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
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="min-h-[180px] flex flex-col items-center justify-center gap-3 text-center"
              >
                <Link2 className="w-5 h-5 text-zinc-600" />
                <p className="text-xs font-medium text-zinc-400">
                  Web URL generation
                </p>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-zinc-900 text-zinc-500">
                  Coming soon
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-t border-zinc-900 px-4 sm:px-5 py-3 sm:flex-row sm:items-center sm:justify-between bg-[#09090b]">
          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500">
            <span
              className={
                inputText.length > MAX_INPUT_CHARS ? "text-amber-400" : ""
              }
            >
              {inputText.length.toLocaleString()} /{" "}
              {MAX_INPUT_CHARS.toLocaleString()} chars
            </span>
            {uploadedFiles?.length > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-zinc-800" />
                <span>
                  {uploadedFiles.length} file
                  {uploadedFiles.length > 1 ? "s" : ""}
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            disabled={isDisabled}
            onClick={handleGenerate}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md text-xs font-medium transition-all shadow-sm ${
              isDisabled
                ? "bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed"
                : "bg-zinc-100 text-zinc-900 hover:bg-white"
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}

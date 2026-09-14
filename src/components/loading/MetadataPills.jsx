// const pills = [
//   { icon: "auto_awesome", label: "5 Concepts" },
//   { icon: "description", label: "4 Pages" },
//   { icon: "quiz", label: "15 Questions" },
// ];

// export default function MetadataPills({ loadingStage }) {
//   const isLoading = loadingStage !== "finalizing" && loadingStage !== "ready";
//   if (isLoading) {
//     return (
//       <div className="flex flex-wrap justify-center gap-3 mb-12">
//         {pills.map((pill, i) => (
//           <div
//             key={i}
//             className="flex items-center gap-2 px-4 py-1.5 bg-secondary-container/20 rounded-full border border-secondary/10"
//           >
//             <div
//               style={{ animationDelay: `${i * 0.2 - 0.3}s` }}
//               className="h-2 w-2 bg-secondary rounded-full animate-bounce mt-1.5"
//             ></div>
//             <div
//               style={{ animationDelay: `${i * 0.2 - 0.15}s` }}
//               className="h-2 w-2 bg-secondary rounded-full animate-bounce mt-1.5"
//             ></div>
//             <div
//               style={{ animationDelay: `${i * 0.2}s` }}
//               className="h-2 w-2 bg-secondary rounded-full animate-bounce mt-1.5"
//             ></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-wrap justify-center gap-3 mb-12">
//       {pills.map(({ icon, label }) => (
//         <div
//           key={label}
//           className="flex items-center gap-2 px-4 py-1.5 bg-secondary-container/20 rounded-full border border-secondary/10"
//         >
//           <span className="material-symbols-outlined text-secondary text-sm">
//             {icon}
//           </span>
//           <span className="text-secondary font-label text-sm font-semibold">
//             {label}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

import { getFileTypeSummary } from "../../utils/getFileTypeSummary";
import { getStageLabel } from "../../utils/getStageLabel";

export default function MetadataPills({
  loadingStage,
  uploadedFiles = [],
  questionCount = 15,
}) {
  const pills = [
    {
      icon: "folder",
      label: `${uploadedFiles.length || 1} Source${uploadedFiles.length === 1 ? "" : "s"}`,
    },
    {
      icon: "description",
      label: getFileTypeSummary(uploadedFiles),
    },
    {
      icon: "quiz",
      label: `${questionCount} Questions`,
    },
    {
      icon: "bolt",
      label: getStageLabel(loadingStage),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
      {pills.map(({ icon, label }) => (
        <div
          key={label}
          className="flex min-w-0 items-center justify-center gap-2 px-3 sm:px-4 py-1.5 bg-secondary-container/20 rounded-full border border-secondary/10"
        >
          <span className="material-symbols-outlined text-secondary text-sm">
            {icon}
          </span>
          <span className="truncate text-secondary font-label text-xs sm:text-sm font-semibold">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

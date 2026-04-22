const letters = ["A", "B", "C", "D"];

export default function OptionsList({
  answer,
  dispatch,
  options,
  correctOption,
}) {
  // console.log(correctOption);

  const hasSelected = answer !== null;

  function getStyles(i) {
    if (!hasSelected) {
      return {
        button:
          "bg-surface-container-low border-outline-variant/10 hover:bg-surface-bright hover:border-outline-variant/30",
        badge:
          "bg-surface-container-highest text-on-surface-variant group-hover:text-on-surface",
        text: "text-on-surface-variant group-hover:text-on-surface",
        icon: null,
      };
    }

    // correct answer always shows green after selection
    if (i === correctOption) {
      return {
        button: "bg-green-500/10 border-green-500/30 ring-1 ring-green-500/20",
        badge: "bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]",
        text: "text-green-400",
        icon: "check_circle",
      };
    }

    // the wrong option the user picked
    if (i === answer) {
      return {
        button: "bg-red-500/10 border-red-500/30 ring-1 ring-red-500/20",
        badge: "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]",
        text: "text-red-400",
        icon: "cancel",
      };
    }

    // all other unselected options dim out
    return {
      button: "bg-surface-container-low border-outline-variant/10 opacity-40",
      badge: "bg-surface-container-highest text-on-surface-variant",
      text: "text-on-surface-variant",
      icon: null,
    };
  }

  return (
    <div className="grid grid-cols-1 gap-4 mb-12">
      {options?.map((option, i) => {
        const styles = getStyles(i);
        return (
          <button
            key={i}
            onClick={() => {
              !hasSelected && dispatch({ type: "selectAnswer", payload: i });
            }}
            disabled={hasSelected}
            className={`group flex items-center text-left p-6 rounded-2xl transition-all duration-300 border ${styles.button}`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl font-headline font-bold text-lg mr-6 transition-colors flex-shrink-0 ${styles.badge}`}
            >
              {letters[i]}
            </div>
            <span
              className={`text-lg font-body font-medium transition-colors flex-1 ${styles.text}`}
            >
              {option}
            </span>
            {styles.icon && (
              <span
                className={`material-symbols-outlined ml-4 ${i === correctOption ? "text-green-500" : "text-red-500"}`}
              >
                {styles.icon}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  // return (
  //   <div className="grid grid-cols-1 gap-4 mb-12">
  //     {options.map((option, i) => {
  //       const isSelected = answer === i;

  //       return (
  //         <button
  //           key={i}
  //           onClick={() => dispatch({ type: "selectAnswer", payload: i })}
  //           className={`group flex items-center text-left p-6 rounded-2xl transition-all duration-300 border ${
  //             isSelected
  //               ? "bg-primary/10 border-primary/40"
  //               : "bg-surface-container-low border-outline-variant/10 hover:bg-surface-bright hover:border-outline-variant/30"
  //           }`}
  //         >
  //           <div
  //             className={`flex items-center justify-center w-12 h-12 rounded-xl font-headline font-bold text-lg mr-6 transition-colors ${
  //               isSelected
  //                 ? "bg-primary text-on-primary"
  //                 : "bg-surface-container-highest text-on-surface-variant group-hover:text-on-surface"
  //             }`}
  //           >
  //             {letters[i]}
  //           </div>

  //           <span
  //             className={`text-lg font-body font-medium transition-colors ${
  //               isSelected
  //                 ? "text-on-surface"
  //                 : "text-on-surface-variant group-hover:text-on-surface"
  //             }`}
  //           >
  //             {option}
  //           </span>
  //         </button>
  //       );
  //     })}
  //   </div>
  // );
}

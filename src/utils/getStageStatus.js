const stageOrder = ["extracting", "analyzing", "finalizing", "ready"];


export function getStageStatus(stageKey, loadingStage) {
    const currentIndex = stageOrder.indexOf(loadingStage);
    const stageIndex = stageOrder.indexOf(stageKey);

    if (currentIndex === -1) return "upcoming";
    if (stageIndex < currentIndex) return "done";
    if (stageIndex === currentIndex) return "active";
    return "upcoming";
}
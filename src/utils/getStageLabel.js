export function getStageLabel(loadingStage) {
    switch (loadingStage) {
        case "extracting":
            return "Extracting";
        case "analyzing":
            return "Analyzing";
        case "finalizing":
            return "Finalizing";
        case "ready":
            return "Ready";
        default:
            return "Preparing";
    }
}
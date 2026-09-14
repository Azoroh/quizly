export function getLoadingStageVal(stage) {
    switch (stage) {
        case "extracting":
            return 25;
        case "analyzing":
            return 55;
        case "finalizing":
            return 85;
        case "ready":
            return 100;

        default:
            return 1;
    }
}
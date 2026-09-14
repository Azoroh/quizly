export function buildExcludedSourcesMessage(excludedSources = []) {
    if (excludedSources.length === 0) return "";

    const names = excludedSources.map((source) => source.name);

    if (names.length === 1) {
        return `${names[0]} was excluded because the study material was too large.`;
    }

    if (names.length === 2) {
        return `${names[0]} and ${names[1]} were excluded because the total study material was too large.`;
    }

    const allButLast = names.slice(0, -1).join(", ");
    const last = names.at(-1);

    return `${allButLast}, and ${last} were excluded because the total study material was too large.`;
}

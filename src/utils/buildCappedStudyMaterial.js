export function buildCappedStudyMaterial({
    inputText = '',
    extractedFiles = [],
    maxChars = 12000
}) {

    const sources = []

    if (inputText.trim()) {
        sources.push({
            id: "manual-input",
            name: "Pasted Notes",
            text: inputText.trim(),
            kind: "manual",
        })
    }

    for (const file of extractedFiles) {
        if (!file.text?.trim()) continue;

        sources.push({ id: file.id, name: file.name, text: file.text.trim(), kind: 'file' })
    }

    let remaining = maxChars
    const includedParts = []
    const sourceSummaries = []


    for (const source of sources) {
        if (remaining <= 0) {
            sourceSummaries.push({
                id: source.id,
                name: source.name,
                kind: source.kind,
                originalLength: source.text.length,
                includedLength: 0,
                wasIncluded: false,
                wasTruncated: false,
            })
            continue

        }

        const separator = includedParts.length > 0 ? "\n\n" : "";
        const separatorLength = separator.length;
        const availableForText = Math.max(remaining - separatorLength, 0);


        if (availableForText <= 0) {
            sourceSummaries.push({
                id: source.id,
                name: source.name,
                kind: source.kind,
                originalLength: source.text.length,
                includedLength: 0,
                wasIncluded: false,
                wasTruncated: false,
            });
            continue;
        }


        const fitsFully = source.text.length <= availableForText

        const includedText = fitsFully ? source.text : truncateAtWordBoundary(source.text, availableForText)

        if (!includedText) {
            sourceSummaries.push({
                id: source.id,
                name: source.name,
                kind: source.kind,
                originalLength: source.text.length,
                includedLength: 0,
                wasIncluded: false,
                wasTruncated: false,
            });
            continue;
        }


        includedParts.push(`${separator}${includedText}`);
        remaining -= separatorLength + includedText.length;

        sourceSummaries.push({
            id: source.id,
            name: source.name,
            kind: source.kind,
            originalLength: source.text.length,
            includedLength: includedText.length,
            wasIncluded: true,
            wasTruncated: includedText.length < source.text.length,
        });
    }

    return {
        combinedText: includedParts.join(""),
        sources: sourceSummaries,
        totalIncludedChars: maxChars - remaining,
        totalOriginalChars: sources.reduce((sum, source) => sum + source.text.length, 0),
        wasTrimmed: sourceSummaries.some((source) => source.wasTruncated || !source.wasIncluded),
    };

}





function truncateAtWordBoundary(text, maxChars) {
    if (text.length <= maxChars) return text;
    if (maxChars <= 0) return "";

    const sliced = text.slice(0, maxChars);
    const lastSpace = sliced.lastIndexOf(" ");

    if (lastSpace < 40) {
        return sliced.trim();
    }

    return sliced.slice(0, lastSpace).trim();
}

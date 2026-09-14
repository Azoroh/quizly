export function getSourceStatus(source) {
    if (!source.wasIncluded) {
        return {
            label: "Excluded",
            tone: "excluded",
            message: "Not used because earlier sources filled the input limit.",
        };
    }

    if (source.wasTruncated) {
        return {
            label: "Trimmed",
            tone: "trimmed",
            message: `Used ${source.includedLength} of ${source.originalLength} characters.`,
        };
    }

    return {
        label: "Included",
        tone: "included",
        message: `Used all ${source.originalLength} characters.`,
    };
}

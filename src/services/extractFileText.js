import { extractDocxText } from "./extraction/extractDocxText";
import { extractPdfText } from "./extraction/extractPdfText";

export async function extractFileText(fileItem) {
    const file = fileItem.file;

    if (file.type === "application/pdf") {
        return extractPdfText(file);
    }

    if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        return extractDocxText(file);
    }

    throw new Error(`Unsupported file type: ${file.type}`);
}

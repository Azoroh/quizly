export function getFileTypeSummary(uploadedFiles) {
    const hasPdf = uploadedFiles.some((file) => file.name.endsWith(".pdf"));
    const hasDocx = uploadedFiles.some((file) => file.name.endsWith(".docx"));

    if (hasPdf && hasDocx) return "PDF + DOCX";
    if (hasPdf) return "PDF";
    if (hasDocx) return "DOCX";
    return "Text Only";
}
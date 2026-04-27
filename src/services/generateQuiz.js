export async function generateQuiz(inputText, questionCount = 15) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 12000);

    try {
        const res = await fetch("/api/generate-quiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputText, questionCount }),
            signal: controller.signal,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to generate quiz");
        }

        const data = await res.json();
        return data.questions;
    } catch (err) {
        if (err.name === "AbortError") {
            throw new Error("Quiz generation timed out. Please try again.");
        }

        throw err;
    } finally {
        clearTimeout(timeoutId);
    }
}

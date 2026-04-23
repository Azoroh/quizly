export async function generateQuiz(inputText, questionCount = 15) {
    const res = await fetch("/api/generate-quiz", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText, questionCount })
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate quiz");
    }

    const data = await res.json()
    return data.questions
}
export default async function generateReview(reviewPayload) {
    const controller = new AbortController()

    const timeoutId = setTimeout(() => {
        controller.abort()
    }, 12000)

    try {
        const res = await fetch("/api/generate-review", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reviewPayload }),
            signal: controller.signal
        })

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to generate review");
        }

        return await res.json()
    } catch (err) {
        if (err.name === 'AbortError') {
            throw new Error("Review request timed out. Please try again.");
        }

        throw err
    } finally {
        clearTimeout(timeoutId)
    }
}
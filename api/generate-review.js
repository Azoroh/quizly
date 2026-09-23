import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Safely parse the body whether it arrives as a string or object
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // 2. Prevent destructuring crashes if body is missing
    if (!body || !body.reviewPayload) {
      return res
        .status(400)
        .json({ error: "Missing reviewPayload in request" });
    }

    const { reviewPayload } = body;

    if (!Array.isArray(reviewPayload) || reviewPayload.length === 0) {
      return res
        .status(400)
        .json({ error: "A non-empty reviewPayload array is required" });
    }

    // 3. Fix AI Context: Map indices to actual text so the AI knows the answers
    const simplifiedPayload = reviewPayload.map((item) => ({
      question: item.question,
      selectedAnswer: item.options
        ? item.options[item.selectedOption]
        : item.selectedOption,
      correctAnswer: item.options
        ? item.options[item.correctOption]
        : item.correctOption,
      isCorrect: item.isCorrect,
    }));

    const prompt = `
    You are an AI tutor reviewing a student's quiz performance.
    
    Return ONLY valid JSON in this format:
    {
      "summary": "string",
      "focusAreas": ["string", "string", "string"]
    }
    
    Student quiz performance:
    ${JSON.stringify(simplifiedPayload, null, 2)}
    
    Instructions:
    - Write a short, encouraging performance summary.
    - Mention strengths and mistakes clearly.
    - Base your review only on the quiz performance provided.
    - "focusAreas" must contain exactly 3 short topic areas to revise next.
    - Do not return markdown.
    - Do not add extra keys.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a precise AI tutor that returns only valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const rawText = chatCompletion.choices[0].message.content.trim();

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      return res.status(500).json({
        error: "Model returned invalid JSON",
        raw: rawText,
      });
    }

    // 4. Safe optional chaining in case JSON parses to null
    const summary =
      typeof parsed?.summary === "string" ? parsed.summary.trim() : "";
    const focusAreas = Array.isArray(parsed?.focusAreas)
      ? parsed.focusAreas.filter((item) => typeof item === "string").slice(0, 3)
      : [];

    if (!summary || focusAreas.length === 0) {
      return res.status(500).json({
        error: "Model returned an invalid review structure",
      });
    }

    return res.status(200).json({ summary, focusAreas });
  } catch (error) {
    console.error("Quizly Summary Generation Error:", error);
    // 5. Send the REAL error message to the frontend toast
    return res.status(500).json({
      error: error.message || "Failed to generate review from server",
    });
  }
}

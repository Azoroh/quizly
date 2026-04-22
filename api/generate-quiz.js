import Groq from "groq-sdk";

// Initialize Groq with your API key
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { inputText, questionCount = 15 } = req.body;

        if (!inputText || !inputText.trim()) {
            return res.status(400).json({ error: "No input text provided" });
        }

        // Keep it within safe limits for the free tier
        const safeQuestionCount = Math.min(Math.max(Number(questionCount) || 10, 1), 40);

        const prompt = `
        You are generating quiz questions from study material.
        Return ONLY valid JSON.
        Do not wrap the response in markdown blocks like \`\`\`json.
        Do not add commentary.

        Return this exact JSON structure:
        {
          "questions": [
            {
              "question": "string",
              "options": ["string", "string", "string", "string"],
              "correctOption": 0,
              "explanation": "string"
            }
          ]
        }

        Rules:
        - Generate exactly ${safeQuestionCount} multiple choice questions.
        - Every question must be based only on the study material provided.
        - Each question must have exactly 4 options.
        - Only one option can be correct.
        - "correctOption" must be a number from 0 to 3.
        - Avoid duplicate or trick questions.

        Study material:
        ${inputText}
        `;

        // Using Groq Chat Completion
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a specialized JSON-only quiz generator."
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            // Use llama-3.1-8b-instant for speed or llama-3.3-70b-versatile for higher logic
            model: "llama-3.1-8b-instant",
            // This forces Groq to output valid JSON
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const rawText = chatCompletion.choices[0].message.content.trim();

        let parsed;
        try {
            parsed = JSON.parse(rawText);
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: "Model returned invalid JSON",
                raw: rawText,
            });
        }

        // Your existing cleaning logic works perfectly here
        const cleanedQuestions = (parsed.questions || []).filter((q) => {
            return (
                q &&
                typeof q.question === "string" &&
                Array.isArray(q.options) &&
                q.options.length === 4 &&
                Number.isInteger(q.correctOption) &&
                q.correctOption >= 0 &&
                q.correctOption <= 3 &&
                typeof q.explanation === "string"
            );
        });

        if (cleanedQuestions.length === 0) {
            return res.status(500).json({
                error: "No valid questions were generated",
            });
        }

        return res.status(200).json({
            questions: cleanedQuestions,
        });

    } catch (error) {
        console.error("Quizly Generation Error:", error);
        return res.status(500).json({
            error: "Failed to generate quiz",
        });
    }
}
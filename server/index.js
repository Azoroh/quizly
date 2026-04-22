import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/generate-quiz", async (req, res) => {
    try {
        const { inputText, questionCount = 15 } = req.body;

        if (!inputText || !inputText.trim()) {
            return res.status(400).json({ error: "No input text provided" });
        }

        const safeQuestionCount = Math.min(
            Math.max(Number(questionCount) || 15, 1),
            40
        );

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
        return res.status(500).json({ error: "Failed to generate quiz" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

# 🧠 Quizly

> Turn your study material into a personalized AI-powered quiz — instantly.

Quizly is a premium AI study tool that allows users to paste notes or upload documents (PDF/DOCX) to generate a comprehensive, personalized multiple-choice quiz.

🔗 **[Live Preview](https://your-vercel-project-url.vercel.app)** _(Update this with your live Vercel URL)_

---

## 🚀 Tech Stack

**Frontend**

- **React 18** + **Vite**
- **React Router DOM** (with Protected Routes)
- **Context API** (Global State Management)

**Backend & AI**

- **Vercel Serverless Functions** (`/api` routes)
- **Groq SDK** (Powered by the `openai/gpt-oss-20b` model)

**UI & Styling**

- **Tailwind CSS v3** (Zinc Dark Theme Aesthetic)
- **shadcn/ui** (Accessible component primitives)
- **Framer Motion** (Smooth mount/unmount animations)
- **Lucide React** (Clean, consistent iconography)
- **Sonner** (Toast notifications)

---

## 📦 Getting Started

### Prerequisites

- Node.js v18+
- npm
- Vercel CLI (for running serverless functions locally)
- A [Groq API Key](https://console.groq.com/keys)

### Install & Run

Because Quizly uses Vercel serverless functions for the AI backend, you must run the local development server using the Vercel CLI to bridge the frontend and backend.

```bash
# 1. Install dependencies
npm install

# 2. Link your local project to your Vercel account
npx vercel link

# 3. Pull your development environment variables (GROQ_API_KEY)
npx vercel env pull .env.local

# 4. Start the unified development server
npx vercel dev
```

---

## 📱 Architecture & Routing

Quizly utilizes a secure, protected routing system to ensure users cannot access interactive screens without an active quiz loaded in memory.

| Route        | Component        | Description                                                                     |
| :----------- | :--------------- | :------------------------------------------------------------------------------ |
| `/`          | `LandingScreen`  | Hero section, file/text input panel, and bento feature grid.                    |
| _(Internal)_ | `LoadingScreen`  | Interstitial state with animated, real-time AI processing stages.               |
| `/overview`  | `StartScreen`    | Quiz intro — review parsed sources, select question count, and begin.           |
| `/quiz`      | `QuestionScreen` | Active quiz — questions, multiple-choice options, and progress tracking.        |
| `/results`   | `ResultScreen`   | Score breakdown and a custom AI-generated Insight Summary based on performance. |

---

## ✨ Key Features

- **Multi-Format Input:** Paste raw study text or upload PDF/DOCX files directly.
- **Smart Context Parsing:** Automatically extracts, chunks, and caps document text (up to 12,000 characters) to optimize AI context windows.
- **Lightning-Fast Generation:** Utilizes Groq's LPU architecture and the `gpt-oss-20b` model for rapid question generation.
- **AI Insight Summaries:** At the end of a quiz, the AI analyzes the user's specific answers to generate a personalized review and highlight focus areas.
- **Bulletproof Routing:** React Router guards prevent app crashes by silently bouncing users back to the home screen if they attempt to bypass the generation flow.
- **Modern Zinc Aesthetic:** A sleek, dark-themed UI featuring custom background glows, smooth CSS grid animations, perfectly clipped border radiuses, and Lucide icons.

---

## 📝 License

MIT

# 🧠 Quizly

> Turn your study material into a personalized AI-powered quiz — instantly.

Quizly is a premium AI study tool that allows users to paste notes or upload documents (PDF/DOCX) to generate a comprehensive, personalized multiple-choice quiz. Users can create accounts to save their generated quizzes, track their scores, and build a personal study library.

🔗 **[Live Preview](https://jay-quizly.netlify.app)**

---

## 🚀 Tech Stack

**Frontend**

- **React 18** + **Vite**
- **React Router DOM** (with Protected & Public Routes)
- **Context API** (`QuizContext` & `AuthContext` for global state management)

**Backend & Data**

- **Supabase** (PostgreSQL Database & Authentication)
- **Vercel Serverless Functions** (`/api` routes)
- **Groq SDK & Google AI APIs** (Rapid question generation and custom insights)

**UI & Styling**

- **Tailwind CSS v3** (Zinc Dark Theme Aesthetic)
- **shadcn/ui** (Accessible component primitives)
- **Radix UI** (Unstyled primitive components)
- **Lucide React** (Clean, consistent iconography)
- **Sonner** (Toast notifications)

---

## 📦 Getting Started

### Prerequisites

- Node.js v18+
- npm
- Vercel CLI (for running serverless functions locally)
- API Keys for Groq, Google AI, and a Supabase project

### Install & Run

Because Quizly uses Vercel serverless functions for the AI backend, you must run the local development server using the Vercel CLI to bridge the frontend and backend.

```bash
# 1. Install dependencies
npm install

# 2. Link your local project to your Vercel account
npx vercel link

# 3. Pull your development environment variables
npx vercel env pull .env.local

# 4. Start the unified development server
npx vercel dev
```

---

## 📱 Architecture & Routing

Quizly utilizes a secure, protected routing system to ensure users cannot access interactive screens without an active quiz loaded in memory, alongside authentication guards for library access.

| Route        | Component          | Description                                                                     |
| :----------- | :----------------- | :------------------------------------------------------------------------------ |
| `/`          | `LandingScreen`    | Hero section, file/text input panel, and bento feature grid.                    |
| `/dashboard` | `ProfileDashboard` | Protected route for users to view saved quizzes, scores, and initiate reruns.   |
| _(Internal)_ | `LoadingScreen`    | Interstitial state with animated, real-time AI processing stages.               |
| `/overview`  | `StartScreen`      | Quiz intro — review parsed sources, dynamic question counts, and settings.      |
| `/quiz`      | `QuestionScreen`   | Active quiz — questions, multiple-choice options, and progress tracking.        |
| `/results`   | `ResultScreen`     | Score breakdown and a custom AI-generated Insight Summary based on performance. |

---

## ✨ Key Features

- **Personal Study Library:** Securely log in via Supabase to automatically save generated quizzes, allowing you to easily revisit, rerun, and track progress over time.
- **Multi-Format Input:** Paste raw study text or upload PDF/DOCX files directly.
- **Smart Context Parsing:** Automatically extracts, chunks, and caps document text (up to 12,000 characters) to optimize AI context windows.
- **Lightning-Fast Generation:** Utilizes Groq's LPU architecture alongside Google AI to generate structured assessments rapidly.
- **AI Insight Summaries:** At the end of a quiz, the AI analyzes the user's specific answers to generate a personalized review and highlight focus areas.
- **Bulletproof Routing:** React Router guards prevent app crashes by silently bouncing users back to the home screen if they attempt to bypass the generation flow.
- **Modern Zinc Aesthetic:** A sleek, dark-themed UI featuring custom background glows, smooth CSS grid animations, perfectly clipped border radiuses, and dynamic CSS loading spinners.

---

## 📝 License

MIT

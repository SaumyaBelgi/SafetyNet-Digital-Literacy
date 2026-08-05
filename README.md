# 🛡️ Guardian Path

Guardian Path is an AI-powered cybersecurity awareness platform that helps users recognize and defend against online scams through realistic AI-driven conversations, interactive learning modules, and a voice-guided assistant.

---

## Features

- 🤖 AI-powered scam simulation using Google Gemini
- 🎙️ Voice-controlled Bambi Assistant
- 🛡️ Scam detection and guardrails
- 📚 Interactive learning modules & quizzes
- 📈 Session history tracking
- 📱 Responsive React interface

---

## Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- Google Gemini API

**Database**
- JSON Storage (MongoDB supported)

---

## Project Structure

```text
Guardian-Path/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── data/
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

---

## Architecture

```text
React Frontend
       │
 REST API
       │
Express Backend
       │
Routes → Controllers
       │
Validation + Guardrails
       │
 Gemini AI Service
       │
 Session Model
       │
 JSON Storage / MongoDB
```

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/<your-username>/guardian-path.git
cd guardian-path
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=YOUR_API_KEY
PORT=5000
```

Run:

```bash
npm start
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## Workflow

```text
User
 │
 ▼
Frontend
 │
 ▼
Express API
 │
 ▼
Validation & Guardrails
 │
 ▼
Gemini AI
 │
 ▼
Session Storage
 │
 ▼
Frontend Response
```

---

## Bambi Voice Assistant

```text
User Speaks
     │
Speech Recognition
     │
Speech → Text
     │
Command Matching
     │
Navigate / Highlight UI
     │
Text-to-Speech Response
```

---

## API Endpoints

| Method | Endpoint |
|--------|----------|
| POST | `/api/scam-sessions/start` |
| POST | `/api/scam-sessions/:id/message` |
| GET | `/api/scam-sessions/:id` |
| GET | `/api/scam-sessions/history` |
| PATCH | `/api/scam-sessions/:id/end` |
| DELETE | `/api/scam-sessions/:id` |

---

## Future Improvements

- JWT Authentication
- MongoDB Integration
- Analytics Dashboard
- Multi-language Support
- Cloud Deployment

---

## License

MIT License

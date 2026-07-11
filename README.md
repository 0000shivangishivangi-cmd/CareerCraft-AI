# CareerCraft AI

CareerCraft AI is an AI-powered Resume Builder that generates ATS-friendly resumes using Google's Gemini AI.

## Features

- AI Resume Generation
- ATS-Friendly Resume Format
- Resume Editing
- Resume Preview
- PDF Download
- Responsive UI
- Clean JSON-based Resume Structure

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- FastAPI
- Python

### AI
- Google Gemini API

### Deployment
- AWS EC2

---

## Project Structure

```
CareerCraft-AI/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── main.py
│
├── Frontend/
│   ├── css/
│   ├── js/
│   ├── assets/
│   ├── images/
│   ├── index.html
│   ├── ai_resume.html
│   ├── preview.html
│   └── edit_ai_resume.html
│
├── docker/
├── docs/
├── README.md
└── .gitignore
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate environment

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
python -m uvicorn app.main:app --reload
```

Open frontend using Live Server.

---

## AI Resume Flow

User Input

↓

Frontend Validation

↓

FastAPI Backend

↓

Gemini AI

↓

Generated Resume JSON

↓

Resume Preview

↓

PDF Download

---

## Future Improvements

- Multiple Resume Templates
- User Authentication
- Resume History
- Cloud Database Integration
- Resume Score Analysis

---

## Author

Developed by Shivangi Maurya
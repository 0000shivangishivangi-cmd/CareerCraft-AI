# CareerCraft AI 🚀

An AI-powered Resume Builder that generates professional, ATS-friendly resumes using **Google Gemini AI**. CareerCraft AI helps users create high-quality resumes in seconds by leveraging Artificial Intelligence and modern web technologies.

---

# ✨ Features

- 🤖 AI Resume Generation using Google Gemini AI
- 📄 ATS-Friendly Resume Format
- ✏️ Edit Generated Resume
- 👀 Live Resume Preview
- 📥 Download Resume as PDF
- 📱 Responsive User Interface
- 📂 JSON-Based Resume Architecture
- ⚡ FastAPI Backend
- 🔥 Clean and Modular Code Structure

---

# 🛠️ Tech Stack

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Python
- FastAPI

## AI Integration
- Google Gemini API

## Tools
- Git
- GitHub
- VS Code

## Deployment
- AWS EC2
- Docker (Planned)

---

# 📁 Project Structure

```text
CareerCraft-AI/
│
├── Frontend/
│   ├── assets/
│   ├── css/
│   ├── images/
│   ├── js/
│   ├── index.html
│   ├── ai_resume.html
│   ├── edit_ai_resume.html
│   └── preview.html
│
├── backend/
│   ├── app/
│   │   ├── config.py
│   │   ├── main.py
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── requirements.txt
│   └── test_model.py
│
├── docker/
├── docs/
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/0000shivangishivangi-cmd/CareerCraft-AI.git
```

## Navigate to Backend

```bash
cd CareerCraft-AI/backend
```

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run FastAPI Server

```bash
python -m uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Open the frontend using **Live Server**.

---

# 🔄 AI Resume Generation Workflow

```text
User Input
      │
      ▼
Frontend Validation
      │
      ▼
FastAPI Backend
      │
      ▼
Google Gemini AI
      │
      ▼
Resume JSON Generated
      │
      ▼
Resume Preview
      │
      ▼
PDF Generation
      │
      ▼
Download Resume
```

---

# 📡 API Endpoint

### Generate AI Resume

```
POST /api/generate-from-ai
```

Returns a structured JSON response containing:

- Summary
- Skills
- Experience
- Projects
- Education
- Certifications
- Achievements
- Languages

---

# 🌟 Future Enhancements

- Multiple Resume Templates
- User Authentication
- Resume History
- Cloud Database Integration
- Resume Score Analyzer
- Resume Sharing via Link
- Cover Letter Generator
- Multi-Language Resume Support

---

# 👥 Team

**Developed by Team Generation-Z**

---

⭐ If you like this project, don't forget to star the repository.
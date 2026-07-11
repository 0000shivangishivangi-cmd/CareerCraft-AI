from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.resume import router as resume_router


app = FastAPI(
    title="CareerCraft AI Resume Builder",
    version="1.0.0"
)


# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routes
app.include_router(resume_router)


@app.get("/")
def home():
    return {
        "message": "CareerCraft AI Backend Running Successfully 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
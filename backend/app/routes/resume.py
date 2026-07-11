from fastapi import APIRouter, HTTPException
from app.schemas.resume_schema import ResumeRequest
from app.services.gemini_service import generate_resume
import traceback
from app.schemas.ai_resume_schema import AIPromptRequest
from app.services.gemini_service import (
    generate_resume,
    generate_resume_from_prompt
)
router = APIRouter(prefix="/api", tags=["Resume"])


@router.post("/generate-resume")
async def create_resume(data: ResumeRequest):
    try:
        resume = generate_resume(data)

        return {
            "status": "success",
            "resume": resume
        }

    except Exception as e:
        traceback.print_exc()      # Terminal me full error print karega
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-from-ai")

async def generate_from_ai(data: AIPromptRequest):
    
    try:

        resume = generate_resume_from_prompt(data.prompt)

        return {
            "status": "success",
            "resume": resume
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
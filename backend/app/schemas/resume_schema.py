from typing import List
from pydantic import Field
from typing import List
from pydantic import BaseModel, Field


# ==========================
# Education
# ==========================
class Education(BaseModel):
    degree: str
    college: str
    cgpa: str
    startYear: str
    passingYear: str


# ==========================
# Experience
# ==========================
class Experience(BaseModel):
    company: str
    role: str
    duration: str
    location: str
    responsibilities: str


# ==========================
# Project
# ==========================
class Project(BaseModel):
    title: str
    technology: str
    description: str
    link: str = ""


# ==========================
# Certification
# ==========================
class Certification(BaseModel):
    name: str
    organization: str
    date: str
    link: str = ""


# ==========================
# Achievement
# ==========================
class Achievement(BaseModel):
    title: str
    description: str


# ==========================
# Language
# ==========================
class Language(BaseModel):
    language: str
    proficiency: str


# ==========================
# Resume Request
# ==========================
class ResumeRequest(BaseModel):
    # ==========================
    # Personal Information
    # ==========================
    full_name: str
    email: str
    phone: str
    target_job: str

    address: str = ""
    linkedin: str = ""
    github: str = ""

    # ==========================
    # Skills
    # ==========================
    technicalSkills: str = ""
    softSkills: str = ""

    # ==========================
    # Career Objective
    # ==========================
    careerObjective: str = ""

    # ==========================
    # Resume Sections
    # ==========================
    education: List[Education] = Field(default_factory=list)

    experience: List[Experience] = Field(default_factory=list)

    projects: List[Project] = Field(default_factory=list)

    certifications: List[Certification] = Field(default_factory=list)

    achievements: List[Achievement] = Field(default_factory=list)

    languages: List[Language] = Field(default_factory=list)

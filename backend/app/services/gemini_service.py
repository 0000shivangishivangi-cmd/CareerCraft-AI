from google import genai
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
# for model in client.models.list():
#     print(model.name)
def generate_with_fallback(prompt):

    models = [
        "gemini-3.5-flash",
        "gemini-3.1-flash-lite",
        "gemini-flash-latest"
    ]

    last_error = None

    for model in models:

        try:

            print(f"\nTrying Model : {model}")

            response = client.models.generate_content(
                model=model,
                contents=prompt
            )

            print(f"Success : {model}")
            return response

        except Exception as e:

            print(f"{model} Failed")
            print(e)
            last_error = e

    raise Exception(f"All Gemini Models Failed.\n{last_error}")

def generate_resume(data):
    print("PROJECTS =", data.projects)
    print("CERTIFICATIONS =", data.certifications)
    print("ACHIEVEMENTS =", data.achievements)
    print("LANGUAGES =", data.languages)
    prompt = f"""
You are an expert ATS Resume Writer.

Generate a modern, ATS-friendly resume.

Return ONLY valid JSON.

Use this exact JSON format:

{{
  "name": "",
  "role": "",
  "email": "",
  "phone": "",
  "linkedin": "",
  "github": "",
  "summary": "",

  "skills": {{
    "Languages": "",
    "Frontend": "",
    "Backend": "",
    "Database": "",
    "Frameworks": "",
    "Tools": "",
    "Concepts": "",
    "CurrentlyLearning": ""
  }},

  "experience": [
    {{
      "jobTitle": "",
      "company": "",
      "duration": "",
      "location": "",
      "points": [
        "",
        "",
        ""
      ]
    }}
  ],

  "projects": [
    {{
      "title": "",
      "technology": "",
      "description": "",
      "link": ""
    }}
  ],

  "education": [
    {{
      "degree": "",
      "college": "",
      "cgpa": "",
      "startYear": "",
      "passingYear": ""
    }}
  ],

  "certifications": [
    {{
      "name": "",
      "organization": "",
      "date": "",
      "link": ""
    }}
  ],

  "achievements": [
    {{
      "title": "",
      "description": ""
    }}
  ],

  "languages": [
    {{
      "language": "",
      "proficiency": ""
    }}
  ]
}}

========================
USER DETAILS
========================

Name:
{data.full_name}

Email:
{data.email}

Phone:
{data.phone}
Address:
{data.address}

LinkedIn:
{data.linkedin}

GitHub:
{data.github}
Target Job:
{data.target_job}

Technical Skills:
{data.technicalSkills}

Soft Skills:
{data.softSkills}

Career Objective:
{data.careerObjective}

Education:
{json.dumps([e.model_dump() for e in data.education], indent=2)}

Experience:
{json.dumps([e.model_dump() for e in data.experience], indent=2)}

Projects:
{json.dumps([p.model_dump() for p in data.projects], indent=2)}

Certifications:
{json.dumps([c.model_dump() for c in data.certifications], indent=2)}

Achievements:
{json.dumps([a.model_dump() for a in data.achievements], indent=2)}

Languages:
{json.dumps([l.model_dump() for l in data.languages], indent=2)}

========================
RULES
========================

1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT wrap JSON inside ```json.
4. Preserve ALL user-provided education entries.
5. Preserve ALL user-provided experience entries.
6. Preserve ALL user-provided project entries.
7. Preserve ALL user-provided certifications.
8. Preserve ALL user-provided achievements.
9. Preserve ALL user-provided languages.
10. Improve grammar and wording without changing facts.
11. Never remove any user entry.
12. Never return an empty array if the user has provided data.
13. If a section is empty, generate ATS-friendly content.
14. Skills should be categorized appropriately.
15. Experience points should be concise ATS bullet points.
16. Keep the same order of all user-provided entries.
17. Do not invent fake companies, colleges or certifications.
Use the education, experience, projects, certifications,
achievements and languages exactly as provided by the user.
18. Preserve personal information exactly as provided,
including address, LinkedIn and GitHub.
Do not remove any entry.

Do not merge multiple entries.

Preserve the order.
Personal Information

Name:
{data.full_name}

Role:
{data.target_job}

Email:
{data.email}

Phone:
{data.phone}

Address:
{data.address}

LinkedIn:
{data.linkedin}

GitHub:
{data.github}

These values MUST be copied exactly into the output JSON.
"""

    # response = client.models.generate_content(
    #     model="gemini-3.1-flash-lite",
    #     contents=prompt
    # )
    response = generate_with_fallback(prompt)
    text = response.text.strip()

    text = text.replace("```json", "")
    text = text.replace("```JSON", "")
    text = text.replace("```Json", "")
    text = text.replace("```", "")
    text = text.strip()

    print("========== GEMINI RESPONSE ==========")
    print(type(text))
    print(text)
    print("=====================================")

    try:
        resume = json.loads(text)
        # resume["address"] = data.address
        # resume["linkedin"] = data.linkedin
        # resume["github"] = data.github

        
        # resume["name"] = data.full_name
        # resume["role"] = data.target_job
        # resume["email"] = data.email
        # resume["phone"] = data.phone
        # resume["address"] = data.address
        # resume["linkedin"] = data.linkedin
        # resume["github"] = data.github
        resume.setdefault("name","")
        resume.setdefault("email","")
        resume.setdefault("phone","")
        resume.setdefault("address","")
        resume.setdefault("linkedin","")
        resume.setdefault("github","")
        print("========== JSON PARSED ==========")
        print(json.dumps(resume, indent=2))
        
        
        print("=================================")

        return resume

    except json.JSONDecodeError as e:
        print("Invalid JSON")
        print(e)
        print(text)
        
        raise Exception("Gemini returned invalid JSON")
    
def generate_resume_from_prompt(user_prompt):

    prompt = f"""
You are an expert ATS Resume Writer and Career Assistant.

Your job is to convert the user's natural language into a professional ATS-friendly resume.

Understand the user's text carefully.

Extract every detail.

Rewrite professionally.

Generate missing ATS-friendly sections only when information is absent.

Never invent personal information.

Return ONLY valid JSON.

Do not return markdown.

Do not wrap JSON inside ```json.

Rules:

1. Extract every detail from the user's input.
2. Rewrite professionally.
3. Never invent personal information (name, email, phone, address, LinkedIn, GitHub).
4. If summary is missing, generate one.
5. Categorize technical skills into:
   - Languages
   - Frontend
   - Backend
   - Database
   - Frameworks
   - Tools
   - Concepts
   - CurrentlyLearning
6. If projects are missing, generate 1–2 beginner-friendly projects based on skills.
7. If experience is missing, create a Fresher experience section.
8. If education is missing, create a generic fresher education template.
9. If certifications are missing, return [].
10. If achievements are missing, generate 2 ATS-friendly achievements.
11. If languages are missing, use:
    - English (Professional)
    - Hindi (Native)
12. Never invent real companies, colleges or certifications.
13. Return ONLY valid JSON.
14. Do NOT use markdown.
Important:

Preserve every project exactly.

Preserve every education entry exactly.

Preserve every experience entry exactly.

Preserve every certification exactly.

Preserve every achievement exactly.

Preserve every language exactly.

Only improve wording and formatting.

Never remove user-provided information.
JSON Format:

{{
  "name":"",
  "role":"",
  "email":"",
  "phone":"",
  "address":"",
  "linkedin":"",
  "github":"",
  "summary":"",

  "skills":{{
      "Languages":"",
      "Frontend":"",
      "Backend":"",
      "Database":"",
      "Frameworks":"",
      "Tools":"",
      "Concepts":"",
      "CurrentlyLearning":""
  }},

  "experience":[
      {{
          "jobTitle":"",
          "company":"",
          "duration":"",
          "location":"",
          "points":[]
      }}
  ],

  "projects":[
      {{
          "title":"",
          "technology":"",
          "description":"",
          "link":""
      }}
  ],

  "education":[
      {{
          "degree":"",
          "college":"",
          "cgpa":"",
          "startYear":"",
          "passingYear":""
      }}
  ],

  "certifications":[
      {{
          "name":"",
          "organization":"",
          "date":"",
          "link":""
      }}
  ],

  "achievements":[
      {{
          "title":"",
          "description":""
      }}
  ],

  "languages":[
      {{
          "language":"",
          "proficiency":""
      }}
  ],

  "generatedFields":[]
}}

User Input:

{user_prompt}
"""

    response = generate_with_fallback(prompt)

    text = response.text.strip()

    text = text.replace("```json", "")
    text = text.replace("```JSON", "")
    text = text.replace("```Json", "")
    text = text.replace("```", "")
    text = text.strip()
    print("========== AI RESPONSE ==========")
    print(text)
    try:
      resume= json.loads(text)
      print("========== JSON PARSED ==========")
      print(json.dumps(resume, indent=2))
      print("=================================")
      return resume
    except json.JSONDecodeError as e:
      print("Invalid JSON")
      print(e)
      print(text)
      print("==================================")

      raise Exception("Gemini returned invalid JSON")

/* ============================================
   CareerCraft AI - Resume Builder JavaScript
   ============================================ */

// Counters for dynamic entries
let educationCount = 1;
let experienceCount = 1;
let projectCount = 1;
let certificationCount = 1;
let achievementCount = 1;
let languageCount = 1;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initFormEvents();
    updateProgressSteps();
});

// Initialize form events
function initFormEvents() {

    const form = document.getElementById("resumeForm");

    if (form) {

        form.addEventListener("submit", async function (e) {

            e.preventDefault();

            saveResumeData();

            const submitBtn = form.querySelector('button[type="submit"]');

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = "Generating Resume...";
            }
            // ===========================
// Collect Education
// ===========================
const education = [];

document.querySelectorAll(".education-entry").forEach(edu => {

    // education.push({
    //     degree: edu.querySelector('input[id^="degree"]')?.value.trim() || "",
    //     college: edu.querySelector('input[id^="college"]')?.value.trim() || "",
    //     cgpa: edu.querySelector('input[id^="cgpa"]')?.value.trim() || "",
    //     startYear: edu.querySelector('input[id^="startYear"]')?.value.trim() || "",
    //     passingYear: edu.querySelector('input[id^="passingYear"]')?.value.trim() || ""
    // });
    const degree =
edu.querySelector('input[id^="degree"]')?.value.trim() || "";

const college =
edu.querySelector('input[id^="college"]')?.value.trim() || "";

if(degree || college){

education.push({

degree,

college,

cgpa:
edu.querySelector('input[id^="cgpa"]')?.value.trim() || "",

startYear:
edu.querySelector('input[id^="startYear"]')?.value.trim() || "",

passingYear:
edu.querySelector('input[id^="passingYear"]')?.value.trim() || ""

});

}

});
// ===========================
// Collect Experience
// ===========================
const experiences = [];

document.querySelectorAll(".experience-entry").forEach(exp => {

    experiences.push({

        company: exp.querySelector('input[id^="company"]')?.value.trim() || "",
        role: exp.querySelector('input[id^="role"]')?.value.trim() || "",
        duration: exp.querySelector('input[id^="duration"]')?.value.trim() || "",
        location: exp.querySelector('input[id^="location"]')?.value.trim() || "",
        responsibilities: exp.querySelector('textarea[id^="responsibilities"]')?.value.trim() || ""

    });

});
// ===========================
// Collect Projects
// ===========================
const projects = [];

document.querySelectorAll(".project-entry").forEach(project => {

    projects.push({

        title: project.querySelector('input[id^="projectName"]')?.value.trim() || "",
        technology: project.querySelector('input[id^="technologies"]')?.value.trim() || "",
        description: project.querySelector('textarea[id^="projectDescription"]')?.value.trim() || "",
        link: project.querySelector('input[id^="projectLink"]')?.value.trim() || ""

    });

});

           // ===========================
// Collect Certifications
// ===========================
const certifications = [];

document.querySelectorAll(".certification-entry").forEach(cert => {

    certifications.push({

        name: cert.querySelector('input[id^="certName"]')?.value.trim() || "",
        organization: cert.querySelector('input[id^="certOrg"]')?.value.trim() || "",
        date: cert.querySelector('input[id^="certDate"]')?.value.trim() || "",
        link: cert.querySelector('input[id^="certLink"]')?.value.trim() || ""

    });

});

           // ===========================
// Collect Achievements
// ===========================
const achievements = [];

document.querySelectorAll(".achievement-entry").forEach(item => {

    achievements.push({

        title: item.querySelector('input[id^="achievement"]')?.value.trim() || "",
        description: item.querySelector('textarea[id^="achievementDesc"]')?.value.trim() || ""

    });

});

           // ===========================
// Collect Languages
// ===========================
const languages = [];

document.querySelectorAll(".language-entry").forEach(lang => {

    languages.push({

        language: lang.querySelector('input[id^="language"]')?.value.trim() || "",
        proficiency: lang.querySelector('select[id^="proficiency"]')?.value || ""

    });

});
            
            // ===========================
// Main Request Object
// ===========================
const data = {

    // ==========================
    // Personal Information
    // ==========================
    full_name: document.getElementById("full_name")?.value.trim() || "",
    email: document.getElementById("email")?.value.trim() || "",
    phone: document.getElementById("phone")?.value.trim() || "",
    address: document.getElementById("address")?.value.trim() || "",
    linkedin: document.getElementById("linkedin")?.value.trim() || "",
    github: document.getElementById("github")?.value.trim() || "",

    // ==========================
    // Education
    // ==========================
    education: education,

    // ==========================
    // Experience
    // ==========================
    experience: experiences,

    // ==========================
    // Projects
    // ==========================
    projects: projects,

    // ==========================
    // Certifications
    // ==========================
    certifications: certifications,

    // ==========================
    // Achievements
    // ==========================
    achievements: achievements,

    // ==========================
    // Languages
    // ==========================
    languages: languages,

    // ==========================
    // Skills
    // ==========================
    // technicalSkills: document.getElementById("technicalSkills")?.value.trim() || "",
    // softSkills: document.getElementById("softSkills")?.value.trim() || "",
    skills:{

    "Technical Skills":
    document.getElementById("technicalSkills")?.value.trim() || "",

    "Soft Skills":
    document.getElementById("softSkills")?.value.trim() || ""

},
    // ==========================
    // Career Objective
    // ==========================
    careerObjective: document.getElementById("careerObjective")?.value.trim() || "",

    // ==========================
    // Target Job
    // ==========================
    target_job:

experiences.find(exp=>exp.role)?.role || ""

};

console.log("Sending Data =", JSON.stringify(data, null, 2));
console.log("Sending Data =", data);

            try {

    console.log("Sending request...");

    const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    console.log("Status =", response.status);

    const result = await response.json();

    console.log("Response =", result);

    if (!response.ok) {
        throw new Error(result.detail || "Server Error");
    }

    console.log("FULL RESPONSE =", result);
    console.log(result.resume);

    localStorage.setItem(
"resumeData",
JSON.stringify(result.resume)
);

localStorage.setItem(
"resumeSource",
"manual"
);
    window.location.href = "preview.html";

} catch (err) {

    console.error(err);
    alert(err.message);

}

            finally {

                if (submitBtn) {

                    submitBtn.disabled = false;
                    submitBtn.innerHTML = "Generate Resume";

                }

            }

        });

    }

    // Progress Tracking
    const inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach(input => {

        input.addEventListener("input", function () {

            updateProgressSteps();

        });

    });

}

// Education Functions
function addEducation() {
    const container = document.getElementById('educationContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry entry-card glass-card-inner';
    newEntry.setAttribute('data-index', educationCount);

    newEntry.innerHTML = `
        <div class="entry-header">
            <span class="entry-number">Education ${educationCount + 1}</span>
            <button type="button" class="btn-remove" onclick="removeEducation(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <div class="row g-3">
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="degree${educationCount}" name="degree${educationCount}" placeholder="Degree">
                    <label for="degree${educationCount}">Degree / Program</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="college${educationCount}" name="college${educationCount}" placeholder="College">
                    <label for="college${educationCount}">Institution Name</label>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-floating">
                    <input type="number" step="0.01" class="form-control" id="cgpa${educationCount}" name="cgpa${educationCount}" placeholder="CGPA">
                    <label for="cgpa${educationCount}">CGPA / GPA</label>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-floating">
                    <input type="number" class="form-control" id="startYear${educationCount}" name="startYear${educationCount}" placeholder="Start Year" min="1950" max="2030">
                    <label for="startYear${educationCount}">Start Year</label>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-floating">
                    <input type="number" class="form-control" id="passingYear${educationCount}" name="passingYear${educationCount}" placeholder="Passing Year" min="1950" max="2030">
                    <label for="passingYear${educationCount}">Passing Year</label>
                </div>
            </div>
        </div>
    `;

    container.appendChild(newEntry);
    educationCount++;
    updateEntryNumbers('educationContainer', 'Education');
}

function removeEducation(button) {
    const entry = button.closest('.education-entry');
    if (document.querySelectorAll('.education-entry').length > 1) {
        entry.remove();
        updateEntryNumbers('educationContainer', 'Education');
    }
}

// Experience Functions
function addExperience() {
    const container = document.getElementById('experienceContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry entry-card glass-card-inner';
    newEntry.setAttribute('data-index', experienceCount);

    newEntry.innerHTML = `
        <div class="entry-header">
            <span class="entry-number">Experience ${experienceCount + 1}</span>
            <button type="button" class="btn-remove" onclick="removeExperience(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <div class="row g-3">
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="company${experienceCount}" name="company${experienceCount}" placeholder="Company">
                    <label for="company${experienceCount}">Company Name</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="role${experienceCount}" name="role${experienceCount}" placeholder="Role">
                    <label for="role${experienceCount}">Job Title / Role</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="duration${experienceCount}" name="duration${experienceCount}" placeholder="Duration">
                    <label for="duration${experienceCount}">Duration (e.g., Jan 2022 - Present)</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="location${experienceCount}" name="location${experienceCount}" placeholder="Location">
                    <label for="location${experienceCount}">Location</label>
                </div>
            </div>
            <div class="col-12">
                <div class="form-floating">
                    <textarea class="form-control" id="responsibilities${experienceCount}" name="responsibilities${experienceCount}" placeholder="Responsibilities" style="height: 120px;"></textarea>
                    <label for="responsibilities${experienceCount}">Responsibilities & Achievements (one per line)</label>
                </div>
            </div>
        </div>
    `;

    container.appendChild(newEntry);
    experienceCount++;
    updateEntryNumbers('experienceContainer', 'Experience');
}

function removeExperience(button) {
    const entry = button.closest('.experience-entry');
    if (document.querySelectorAll('.experience-entry').length > 1) {
        entry.remove();
        updateEntryNumbers('experienceContainer', 'Experience');
    }
}

// Project Functions
function addProject() {
    const container = document.getElementById('projectsContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'project-entry entry-card glass-card-inner';
    newEntry.setAttribute('data-index', projectCount);

    newEntry.innerHTML = `
        <div class="entry-header">
            <span class="entry-number">Project ${projectCount + 1}</span>
            <button type="button" class="btn-remove" onclick="removeProject(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <div class="row g-3">
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="projectName${projectCount}" name="projectName${projectCount}" placeholder="Project Name">
                    <label for="projectName${projectCount}">Project Name</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="technologies${projectCount}" name="technologies${projectCount}" placeholder="Technologies">
                    <label for="technologies${projectCount}">Technologies Used</label>
                </div>
            </div>
            <div class="col-12">
                <div class="form-floating">
                    <textarea class="form-control" id="projectDescription${projectCount}" name="projectDescription${projectCount}" placeholder="Description" style="height: 100px;"></textarea>
                    <label for="projectDescription${projectCount}">Project Description</label>
                </div>
            </div>
            <div class="col-12">
                <div class="form-floating">
                    <input type="url" class="form-control" id="projectLink${projectCount}" name="projectLink${projectCount}" placeholder="Project Link">
                    <label for="projectLink${projectCount}">Project Link (optional)</label>
                </div>
            </div>
        </div>
    `;

    container.appendChild(newEntry);
    projectCount++;
    updateEntryNumbers('projectsContainer', 'Project');
}

function removeProject(button) {
    const entry = button.closest('.project-entry');
    if (document.querySelectorAll('.project-entry').length > 1) {
        entry.remove();
        updateEntryNumbers('projectsContainer', 'Project');
    }
}

// Certification Functions
function addCertification() {
    const container = document.getElementById('certificationsContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'certification-entry entry-card glass-card-inner';
    newEntry.setAttribute('data-index', certificationCount);

    newEntry.innerHTML = `
        <div class="entry-header">
            <span class="entry-number">Certification ${certificationCount + 1}</span>
            <button type="button" class="btn-remove" onclick="removeCertification(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <div class="row g-3">
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="certName${certificationCount}" name="certName${certificationCount}" placeholder="Certification Name">
                    <label for="certName${certificationCount}">Certification Name</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="certOrg${certificationCount}" name="certOrg${certificationCount}" placeholder="Issuing Organization">
                    <label for="certOrg${certificationCount}">Issuing Organization</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="certDate${certificationCount}" name="certDate${certificationCount}" placeholder="Date">
                    <label for="certDate${certificationCount}">Date Obtained</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="url" class="form-control" id="certLink${certificationCount}" name="certLink${certificationCount}" placeholder="Credential Link">
                    <label for="certLink${certificationCount}">Credential Link (optional)</label>
                </div>
            </div>
        </div>
    `;

    container.appendChild(newEntry);
    certificationCount++;
    updateEntryNumbers('certificationsContainer', 'Certification');
}

function removeCertification(button) {
    const entry = button.closest('.certification-entry');
    if (document.querySelectorAll('.certification-entry').length > 1) {
        entry.remove();
        updateEntryNumbers('certificationsContainer', 'Certification');
    }
}

// Achievement Functions
function addAchievement() {
    const container = document.getElementById('achievementsContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'achievement-entry entry-card glass-card-inner';
    newEntry.setAttribute('data-index', achievementCount);

    newEntry.innerHTML = `
        <div class="entry-header">
            <span class="entry-number">Achievement ${achievementCount + 1}</span>
            <button type="button" class="btn-remove" onclick="removeAchievement(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <div class="row g-3">
            <div class="col-12">
                <div class="form-floating">
                    <input type="text" class="form-control" id="achievement${achievementCount}" name="achievement${achievementCount}" placeholder="Achievement">
                    <label for="achievement${achievementCount}">Achievement Title</label>
                </div>
            </div>
            <div class="col-12">
                <div class="form-floating">
                    <textarea class="form-control" id="achievementDesc${achievementCount}" name="achievementDesc${achievementCount}" placeholder="Description" style="height: 80px;"></textarea>
                    <label for="achievementDesc${achievementCount}">Description</label>
                </div>
            </div>
        </div>
    `;

    container.appendChild(newEntry);
    achievementCount++;
    updateEntryNumbers('achievementsContainer', 'Achievement');
}

function removeAchievement(button) {
    const entry = button.closest('.achievement-entry');
    if (document.querySelectorAll('.achievement-entry').length > 1) {
        entry.remove();
        updateEntryNumbers('achievementsContainer', 'Achievement');
    }
}

// Language Functions
function addLanguage() {
    const container = document.getElementById('languagesContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'language-entry entry-card glass-card-inner';
    newEntry.setAttribute('data-index', languageCount);

    newEntry.innerHTML = `
        <div class="entry-header">
            <span class="entry-number">Language ${languageCount + 1}</span>
            <button type="button" class="btn-remove" onclick="removeLanguage(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <div class="row g-3">
            <div class="col-md-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="language${languageCount}" name="language${languageCount}" placeholder="Language">
                    <label for="language${languageCount}">Language</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating">
                    <select class="form-control" id="proficiency${languageCount}" name="proficiency${languageCount}">
                        <option value="">Select Proficiency</option>
                        <option value="Native">Native</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Basic">Basic</option>
                    </select>
                    <label for="proficiency${languageCount}">Proficiency Level</label>
                </div>
            </div>
        </div>
    `;

    container.appendChild(newEntry);
    languageCount++;
    updateEntryNumbers('languagesContainer', 'Language');
}

function removeLanguage(button) {
    const entry = button.closest('.language-entry');
    if (document.querySelectorAll('.language-entry').length > 1) {
        entry.remove();
        updateEntryNumbers('languagesContainer', 'Language');
    }
}

// Update entry numbers after removal
function updateEntryNumbers(containerId, entryType) {
    const container = document.getElementById(containerId);
    const entries = container.querySelectorAll(`[class*="-entry"]`);

    entries.forEach((entry, index) => {
        const numberSpan = entry.querySelector('.entry-number');
        if (numberSpan) {
            numberSpan.textContent = `${entryType} ${index + 1}`;
        }
    });
}

// Update progress steps
function updateProgressSteps() {
    const sections = ['section-personal', 'section-education', 'section-experience', 'section-projects', 'section-skills'];
    const progressSteps = document.querySelectorAll('.progress-step');

    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        const inputs = section ? section.querySelectorAll('input:not([type="hidden"]), textarea, select') : [];
        let filled = 0;

        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                filled++;
            }
        });

        const percentage = inputs.length > 0 ? (filled / inputs.length) * 100 : 0;

        if (progressSteps[index]) {
            if (percentage >= 70) {
                progressSteps[index].classList.add('active');
                progressSteps[index].classList.add('completed');
            } else if (percentage > 0) {
                progressSteps[index].classList.add('active');
                progressSteps[index].classList.remove('completed');
            } else {
                progressSteps[index].classList.remove('active', 'completed');
            }
        }
    });
}

// AI Suggestion (simulated)
function getAISuggestion() {
    const fullName = document.getElementById('full_name')?.value || '';
const role =
document.querySelector('input[id^="role"]')?.value || "";
    const skills = document.getElementById('technicalSkills')?.value || '';

    const suggestions = [
        `Results-driven ${role || 'professional'} with a passion for delivering high-quality solutions. Skilled in ${skills || 'various technologies'} with a proven track record of success. Seeking to leverage my expertise to drive innovation and growth at a forward-thinking organization.`,
        `Dedicated ${role || 'professional'} combining technical expertise with strong problem-solving abilities. Experienced in ${skills || 'modern technologies'} and committed to continuous learning. Eager to contribute to team success and deliver impactful results.`,
        `Motivated ${role || 'professional'} with expertise in ${skills || 'cutting-edge technologies'}. Known for delivering innovative solutions and collaborating effectively with cross-functional teams. Looking to bring my skills and experience to a challenging new role.`
    ];

    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    const suggestionElement = document.getElementById('aiSuggestion');
    if (suggestionElement) {
        suggestionElement.textContent = randomSuggestion;
    }
}

// Clear form
function clearForm() {
    if (confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
        document.getElementById('resumeForm').reset();
        localStorage.removeItem('resumeData');
        updateProgressSteps();

        // Reset dynamic entries
        resetDynamicEntries();
    }
}

function resetDynamicEntries() {
    // Keep only the first entry and remove others
    const containers = ['educationContainer', 'experienceContainer', 'projectsContainer', 'certificationsContainer', 'achievementsContainer', 'languagesContainer'];

    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        const entries = container.querySelectorAll('[class*="-entry"]');
        entries.forEach((entry, index) => {
            if (index > 0) {
                entry.remove();
            }
        });
    });

    // Reset counters
    educationCount = 1;
    experienceCount = 1;
    projectCount = 1;
    certificationCount = 1;
    achievementCount = 1;
    languageCount = 1;
}


function loadSavedData() {
    
    return;
}

/* ============================================
   CareerCraft AI - Preview Page JavaScript
   ============================================ */

// Initialize on page load



function loadResumePreview() {

    const source = localStorage.getItem("resumeSource");

    let resume = null;

    if (source === "manual") {

        const stored = localStorage.getItem("resumeData");

        if (stored) {

            resume = JSON.parse(stored);

        }

    }

    else {

        const stored = localStorage.getItem("generatedResume");

        if (stored) {

            const obj = JSON.parse(stored);

            resume = obj.resume || obj;

        }

    }

    console.log("========== RESUME ==========");

    console.log(resume);

    console.log("============================");

    if (resume) {

        renderResume(resume);

    }

}

// Page load hote hi resume load karo

document.addEventListener("DOMContentLoaded",()=>{

    loadResumePreview();

    const editBtn=document.getElementById("editResumeBtn");

    if(editBtn){

        editBtn.addEventListener("click",()=>{

            const source=localStorage.getItem("resumeSource");

            if(source==="ai"){

                window.location.href="edit_ai_resume.html";

            }else{

                window.location.href="builder.html";

            }

        });

    }

});
// Populate the preview with saved data


// Show placeholder data if no saved data
function showPlaceholderData() {
    // Keep the existing placeholder content in the HTML
    console.log('No saved resume data found. Showing sample data.');
}

// Download PDF functionality
window.downloadPDF = function () {

    const resume = document.getElementById("resumeDocument");

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>CareerCraft Resume</title>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">

        <style>

            @page{
                size:A4;
                margin:12mm;
            }

            *{
                box-sizing:border-box;
            }

            html,body{
                margin:0;
                padding:0;
                background:#fff;
                font-family:Inter,Arial,sans-serif;
                color:#222;
            }

            body{
                padding:0;
            }

            .resume-document{
                width:100%;
                max-width:100%;
                padding:0;
                margin:0;
                box-shadow:none;
                border-radius:0;
            }

        </style>

        <link rel="stylesheet" href="../Frontend/css/preview.css">

    </head>

    <body>

        <div class="resume-document">
            ${resume.innerHTML}
        </div>

    </body>

    </html>
    `);

    printWindow.document.close();

    printWindow.onload = function () {

        printWindow.focus();

        printWindow.print();

        printWindow.close();

    };

};

// Alternative: Generate PDF using browser's print functionality
function generatePDF() {
    const resumeContent = document.getElementById('resumeDocument').cloneNode(true);

    // Create a new window for printing
    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Resume - CareerCraft AI</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Inter', sans-serif;
                    color: #1F2937;
                    line-height: 1.6;
                    padding: 40px;
                    background: white;
                }

                .resume-header {
                    text-align: center;
                    border-bottom: 3px solid #2563EB;
                    padding-bottom: 25px;
                    margin-bottom: 30px;
                }

                .resume-name {
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    color: #0F172A;
                }

                .resume-title {
                    font-size: 18px;
                    color: #2563EB;
                    margin-bottom: 15px;
                }

                .resume-contact {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 15px;
                    font-size: 13px;
                    color: #6B7280;
                }

                .resume-section {
                    margin-bottom: 25px;
                }

                .resume-section-title {
                    font-size: 14px;
                    font-weight: 700;
                    color: #0F172A;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 15px;
                    padding-bottom: 8px;
                    border-bottom: 2px solid #2563EB;
                }

                .resume-entry {
                    margin-bottom: 20px;
                }

                .entry-title-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                }

                .entry-title {
                    font-weight: 600;
                    color: #0F172A;
                }

                .entry-date {
                    color: #6B7280;
                    font-size: 13px;
                }

                .entry-subtitle {
                    color: #374151;
                    margin-bottom: 8px;
                }

                .entry-list {
                    margin-left: 20px;
                }

                .entry-list li {
                    margin-bottom: 5px;
                    color: #4B5563;
                }

                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                }

                .skill-category-title {
                    font-weight: 600;
                    color: #2563EB;
                    margin-bottom: 5px;
                }

                .certifications-grid, .languages-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .achievements-list {
                    margin-left: 20px;
                }

                @media print {
                    body {
                        padding: 0;
                    }
                }
            </style>
        </head>
        <body>
            ${resumeContent.innerHTML}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}



function renderResume(data) {

    console.log("RENDER DATA =", data);

    if (!data) return;

    // ==========================
    // Normalize Resume Object
    // ==========================
    const resume = {

        name: data.full_name || data.name || "",

        role: data.target_job || data.role || "",

        summary: data.careerObjective || data.summary || "",

        email: data.email || "",

        phone: data.phone || "",

        address: data.address || "",

        linkedin: data.linkedin || "",

        github: data.github || "",

        education: Array.isArray(data.education)
            ? data.education
            : [],

        experience: Array.isArray(data.experience)
            ? data.experience
            : Array.isArray(data.experiences)
                ? data.experiences
                : [],

        skills: data.skills || {

            "Technical Skills":
                data.technicalSkills || "",

            "Soft Skills":
                data.softSkills || ""

        },

        projects: Array.isArray(data.projects)
            ? data.projects
            : [],

        certifications: Array.isArray(data.certifications)
            ? data.certifications
            : [],

        achievements: Array.isArray(data.achievements)
            ? data.achievements
            : [],

        languages: Array.isArray(data.languages)
            ? data.languages
            : []

    };

    // ==========================
    // Helper Functions
    // ==========================

    function setText(id, value) {

        const el = document.getElementById(id);

        if (el) {

            el.textContent = value || "";

        }

    }

    function toggleSection(section, show) {

        if (section) {

            section.style.display = show ? "block" : "none";

        }

    }

    // ==========================
    // Personal Information
    // ==========================

    setText("previewName", resume.name);

    setText("previewTitle", resume.role);

    setText("previewSummary", resume.summary);

    const contact = document.getElementById("previewContact");

    if (contact) {

        contact.innerHTML = `

            <span>
                <i class="bi bi-envelope"></i>
                ${resume.email}
            </span>

            <span>
                <i class="bi bi-telephone"></i>
                ${resume.phone}
            </span>

            ${resume.address ?

                `<span>
                    <i class="bi bi-geo-alt"></i>
                    ${resume.address}
                </span>`

                : ""}

            ${resume.linkedin ?

                `<span>
                    <i class="bi bi-linkedin"></i>
                    ${resume.linkedin}
                </span>`

                : ""}

            ${resume.github ?

                `<span>
                    <i class="bi bi-github"></i>
                    ${resume.github}
                </span>`

                : ""}

        `;

    }

    // ==========================
    // Education
    // ==========================

    const educationSection =
        document.getElementById("previewEducationSection");

    const educationContent =
        educationSection?.querySelector(".resume-section-content");

    if (educationSection && educationContent &&
        resume.education.length > 0) {

        toggleSection(educationSection, true);

        educationContent.innerHTML =
            resume.education.map(edu => `

            <div class="resume-entry">

                <div class="entry-title">

                    ${edu.degree || ""}

                </div>

                <div class="entry-subtitle">

                    ${edu.college || ""}

                </div>

                <div class="entry-date">

                    ${
                        edu.startYear || edu.passingYear

                        ?

                        `${edu.startYear || ""} - ${edu.passingYear || ""}`

                        :

                        (edu.year || "")

                    }

                </div>

                ${edu.cgpa ?

                    `<div>

                        CGPA : ${edu.cgpa}

                    </div>`

                    : ""}

            </div>

        `).join("");

    }

    else {

        toggleSection(educationSection, false);

    }

    // ==========================
    // Experience
    // ==========================

    const expSection =
        document.getElementById("previewExperienceSection");

    const expContent =
        expSection?.querySelector(".resume-section-content");

    if (expSection && expContent &&
        resume.experience.length > 0) {

        toggleSection(expSection, true);

        expContent.innerHTML =
            resume.experience.map(exp => `

            <div class="resume-entry">

                <div class="entry-title-row">

                    <div class="entry-title">

                        ${exp.role || exp.jobTitle || ""}

                    </div>

                    <div class="entry-date">

                        ${exp.duration || ""}

                    </div>

                </div>

                <div class="entry-subtitle">

                    ${exp.company || ""}

                    ${exp.location ? " | " + exp.location : ""}

                </div>

                ${Array.isArray(exp.points) && exp.points.length > 0 ?

                    `

                    <ul class="entry-list">

                        ${exp.points
                            .map(point => `<li>${point}</li>`)
                            .join("")}

                    </ul>

                    `

                    :

                    `

                    <p style="margin-top:8px;">

                        ${exp.responsibilities || ""}

                    </p>

                    `}

            </div>

        `).join("");

    }

    else {

        toggleSection(expSection, false);

    }

    // ===== Continue in Part-2 =====
    // ==========================
    // Skills
    // ==========================

    const skillSection =
        document.getElementById("previewSkillsSection");

    const skillDiv =
        document.getElementById("previewSkills");

    if (
        skillSection &&
        skillDiv &&
        resume.skills &&
        Object.keys(resume.skills).length > 0
    ) {

        const filteredSkills = Object.entries(resume.skills)
            .filter(([key, value]) => value && value.toString().trim() !== "");

        if (filteredSkills.length > 0) {

            toggleSection(skillSection, true);

            skillDiv.innerHTML = filteredSkills.map(([key, value]) => `

                <div class="skill-category">

                    <div class="skill-category-title">

                        ${key}

                    </div>

                    <div>

                        ${value}

                    </div>

                </div>

            `).join("");

        }

        else {

            toggleSection(skillSection, false);

        }

    }

    else {

        toggleSection(skillSection, false);

    }


    // ==========================
    // Projects
    // ==========================

    const projectSection =
        document.getElementById("previewProjectsSection");

    const projectDiv =
        document.getElementById("previewProjects");

    if (
        projectSection &&
        projectDiv &&
        resume.projects.length > 0
    ) {

        toggleSection(projectSection, true);

        projectDiv.innerHTML =
            resume.projects.map(project => `

            <div class="resume-entry">

                <div class="entry-title">

                    ${project.title || ""}

                </div>

                ${project.technology ?

                    `<div class="entry-tech">

                        ${project.technology}

                    </div>`

                    : ""}

                ${project.description ?

                    `<p>

                        ${project.description}

                    </p>`

                    : ""}

                ${project.link ?

                    `<div style="margin-top:6px;">

                        <a
                            href="${project.link}"
                            target="_blank">

                            Project Link

                        </a>

                    </div>`

                    : ""}

            </div>

        `).join("");

    }

    else {

        toggleSection(projectSection, false);

    }


    // ==========================
    // Certifications
    // ==========================

    const certSection =
        document.getElementById("previewCertificationsSection");

    const certDiv =
        document.getElementById("previewCertifications");

    if (
        certSection &&
        certDiv &&
        resume.certifications.length > 0
    ) {

        toggleSection(certSection, true);

        certDiv.innerHTML =
            resume.certifications.map(cert => `

            <div class="resume-entry">

                <div class="entry-title">

                    ${cert.name || cert}

                </div>

                ${cert.organization ?

                    `<div>

                        ${cert.organization}

                    </div>`

                    : ""}

                ${cert.date ?

                    `<div class="entry-date">

                        ${cert.date}

                    </div>`

                    : ""}

                ${cert.link ?

                    `<div style="margin-top:6px;">

                        <a
                            href="${cert.link}"
                            target="_blank">

                            Credential

                        </a>

                    </div>`

                    : ""}

            </div>

        `).join("");

    }

    else {

        toggleSection(certSection, false);

    }


    // ==========================
    // Achievements
    // ==========================

    const achievementSection =
        document.getElementById("previewAchievementsSection");

    const achievementDiv =
        document.getElementById("previewAchievements");

    if (
        achievementSection &&
        achievementDiv &&
        resume.achievements.length > 0
    ) {

        toggleSection(achievementSection, true);

        achievementDiv.innerHTML =
            resume.achievements.map(item => `

            <div class="resume-entry">

                <div class="entry-title">

                    ${item.title || item}

                </div>

                ${item.description ?

                    `<p>

                        ${item.description}

                    </p>`

                    : ""}

            </div>

        `).join("");

    }

    else {

        toggleSection(achievementSection, false);

    }


    // ==========================
    // Languages
    // ==========================

    const languageSection =
        document.getElementById("previewLanguagesSection");

    const languageDiv =
        document.getElementById("previewLanguage");

    if (
        languageSection &&
        languageDiv &&
        resume.languages.length > 0
    ) {

        toggleSection(languageSection, true);

        languageDiv.innerHTML =
            resume.languages.map(lang => `

            <span class="badge-resume">

                ${lang.language || lang}

                ${lang.proficiency ?

                    ` (${lang.proficiency})`

                    : ""}

            </span>

        `).join(" ");

    }

    else {

        toggleSection(languageSection, false);

    }


    // ==========================
    // Render Complete
    // ==========================

    console.log("Resume Render Complete");

}
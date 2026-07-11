const stored = JSON.parse(localStorage.getItem("generatedResume"));

if (!stored || !stored.resume) {
    alert("No Resume Found");
    window.location.href = "ai.html";
}

const resume = stored.resume;

console.log(resume);
console.log("Edit AI Resume JS Loaded");

// ---------------------
// Create Experience Card
// ---------------------
function createExperienceCard(exp = {}) {

    const container = document.getElementById("experienceContainer");

    const card = document.createElement("div");

    card.className = "card shadow-sm border-0 mb-4";

    card.innerHTML = `
        <div class="card-header bg-light d-flex justify-content-between align-items-center">

            <h5 class="mb-0">Experience</h5>

            <button
                type="button"
                class="btn btn-danger btn-sm removeExperience">

                <i class="bi bi-trash"></i>

            </button>

        </div>

        <div class="card-body">

            <div class="row">

                <div class="col-md-6 mb-3">
                    <label>Job Title</label>
                    <input
                        type="text"
                        class="form-control jobTitle"
                        value="${exp.role || ""}">
                </div>

                <div class="col-md-6 mb-3">
                    <label>Company</label>
                    <input
                        type="text"
                        class="form-control company"
                        value="${exp.company || ""}">
                </div>

                <div class="col-md-6 mb-3">
                    <label>Duration</label>
                    <input
                        type="text"
                        class="form-control duration"
                        value="${exp.duration || ""}">
                </div>

                <div class="col-md-6 mb-3">
                    <label>Location</label>
                    <input
                        type="text"
                        class="form-control location"
                        value="${exp.location || ""}">
                </div>

                 
            </div>

        </div>
    `;

    card.querySelector(".removeExperience").onclick = () => {

        card.remove();

    };

    container.appendChild(card);

}

// ---------------------
// Load Resume
// ---------------------
if (stored && stored.resume) {

    document.getElementById("name").value = resume.name || "";
    document.getElementById("role").value = resume.role || "";
    document.getElementById("email").value = resume.email || "";
    document.getElementById("phone").value = resume.phone || "";
    document.getElementById("summary").value = resume.summary || "";

    document.getElementById("languagesSkill").value = resume.skills?.Languages || "";
    document.getElementById("frontendSkill").value = resume.skills?.Frontend || "";
    document.getElementById("backendSkill").value = resume.skills?.Backend || "";
    document.getElementById("databaseSkill").value = resume.skills?.Database || "";
    document.getElementById("frameworkSkill").value = resume.skills?.Frameworks || "";
    document.getElementById("toolSkill").value = resume.skills?.Tools || "";
    document.getElementById("conceptSkill").value = resume.skills?.Concepts || "";
    document.getElementById("learningSkill").value = resume.skills?.CurrentlyLearning || "";

    if (resume.experience && resume.experience.length) {

        resume.experience.forEach(exp => {

            createExperienceCard(exp);

        });

    }

}

// ---------------------
// Add Experience Button
// ---------------------
document
    .getElementById("addExperienceBtn")
    .addEventListener("click", () => {

        createExperienceCard();

    });

// ---------------------
// Save Resume
// ---------------------
document
    .getElementById("saveResume")
    .addEventListener("click", () => {

        resume.name = document.getElementById("name").value;
        resume.role = document.getElementById("role").value;
        resume.email = document.getElementById("email").value;
        resume.phone = document.getElementById("phone").value;
        resume.summary = document.getElementById("summary").value;

        resume.skills = {

            Languages: document.getElementById("languagesSkill").value,
            Frontend: document.getElementById("frontendSkill").value,
            Backend: document.getElementById("backendSkill").value,
            Database: document.getElementById("databaseSkill").value,
            Frameworks: document.getElementById("frameworkSkill").value,
            Tools: document.getElementById("toolSkill").value,
            Concepts: document.getElementById("conceptSkill").value,
            CurrentlyLearning: document.getElementById("learningSkill").value

        };

        resume.experience = [];

        document
            .querySelectorAll("#experienceContainer .card")
            .forEach(card => {

                resume.experience.push({

                    role: card.querySelector(".jobTitle").value,

                    company: card.querySelector(".company").value,

                    duration: card.querySelector(".duration").value,

                    location: card.querySelector(".location").value,

                   

                });

            });

localStorage.setItem(
    "generatedResume",
    JSON.stringify({

        status:"success",

        resume:resume

    })
);
        alert("Resume Updated Successfully!");

        window.location.href = "preview.html";

    });
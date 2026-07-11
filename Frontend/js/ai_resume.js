
const progressBox =
document.getElementById("aiProgressBox");

const progressText =
document.getElementById("progressText");

const progressBar =
document.getElementById("progressBar");

const promptBox = document.getElementById("resumePrompt");
const generateBtn = document.getElementById("generateBtn");

console.log("✅ AI Resume JS Loaded");

generateBtn.addEventListener("click", generateResume);
function updateProgress(text, percent){

    progressBox.classList.remove("d-none");

    progressText.innerHTML = text;

    progressBar.style.width = percent + "%";

}
async function generateResume() {

    console.log("🚀 Button Clicked");

    const prompt = promptBox.value.trim();

    if (prompt.length < 20) {
        alert("Please describe yourself in more detail.");
        return;
    }

    generateBtn.disabled = true;

    generateBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Generating...
    `;

    updateProgress(
        "🔍 Analyzing your profile...",
        15
    );

    let interval;

    try {

        console.log("📤 Sending Prompt:", prompt);

        const progressSteps = [

            {
                text: "📚 Reading your details...",
                value: 25
            },

            {
                text: "🧠 Optimizing ATS keywords...",
                value: 45
            },

            {
                text: "✍️ Writing professional summary...",
                value: 65
            },

            {
                text: "💼 Building experience section...",
                value: 80
            },

            {
                text: "📄 Finalizing resume...",
                value: 95
            }

        ];

        let current = 0;

        interval = setInterval(() => {

            if (current < progressSteps.length) {

                updateProgress(
                    progressSteps[current].text,
                    progressSteps[current].value
                );

                current++;

            }

        }, 1500);

        const response = await fetch("http://127.0.0.1:8000/api/generate-from-ai", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt: prompt
            })

        });

        console.log("📥 Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("✅ Server Response:", data);

        console.log("RESUME =", data.resume);

        localStorage.setItem(
            "generatedResume",
            JSON.stringify(data)
        );

        localStorage.setItem(
            "resumeSource",
            "ai"
        );

        clearInterval(interval);

        updateProgress(
            "✅ Resume Generated Successfully",
            100
        );

        setTimeout(() => {

            window.location.href = "preview.html";

        }, 800);

    }

    catch (err) {

        clearInterval(interval);

        updateProgress(
            "❌ Failed to generate resume.",
            100
        );

        console.error("❌ Error:", err);

        alert("Connection Failed");

    }

    finally {

        generateBtn.disabled = false;

        generateBtn.innerHTML = `
            <i class="bi bi-stars me-2"></i>
            Generate Resume
        `;

    }

}
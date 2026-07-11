/* ============================================
   CareerCraft AI - Contact Page JavaScript
   ============================================ */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }
}

// Handle form submission
function handleFormSubmit() {
    // Get form data
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Your WhatsApp Number (Country Code ke sath, + mat lagana)
    const whatsappNumber = "919336584634"; // <-- Apna number yahan likho

    // WhatsApp Message
    const whatsappMessage = `
*New Contact Request*

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
📌 Subject: ${formData.subject}

💬 Message:
${formData.message}
    `;

    // Encode Message
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(url, "_blank");

    // Reset Form
    document.getElementById("contactForm").reset();
}
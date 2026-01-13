// Appointments page specific functionality

// Initialize appointments page
document.addEventListener('DOMContentLoaded', function () {
    initializeAppointmentForm();
    setMinDate();
});

// Initialize appointment form
function initializeAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Set minimum date to today
function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const formData = new FormData(event.target);

    // Validate form
    if (!validateForm(formData)) {
        return;
    }

    // Simulate form submission
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Appointment requested! We\'ll contact you within 24 hours to confirm.');
        event.target.reset();
        submitBtn.textContent = 'Request Appointment';
        submitBtn.disabled = false;
        setMinDate(); // Reset min date after form reset
    }, 1500);
}

// Validate form data
function validateForm(formData) {
    const requiredFields = ['name', 'email', 'phone', 'service', 'date', 'time'];

    for (let field of requiredFields) {
        if (!formData.get(field)) {
            showNotification(`Please fill in the ${field} field.`, 'error');
            return false;
        }
    }

    // Validate email format
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    // Validate phone format (basic)
    const phone = formData.get('phone');
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }

    return true;
}
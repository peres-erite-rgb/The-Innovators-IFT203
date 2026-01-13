// Events page specific functionality

let selectedCategory = 'all';

// Initialize events page
document.addEventListener('DOMContentLoaded', function() {
    initializeEventFilters();
    initializeEventAnimations();
    initializeNewsletter();
});

// Initialize event category filters
function initializeEventFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterEvents(category);
            updateActiveFilter(this);
        });
    });
}

// Filter events by category
function filterEvents(category) {
    selectedCategory = category;
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('slide-up');
        } else {
            card.style.display = 'none';
        }
    });
}

// Update active filter button
function updateActiveFilter(activeButton) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    activeButton.classList.add('active');
}

// Initialize event animations
function initializeEventAnimations() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add register button functionality
        const registerBtn = card.querySelector('.btn-luxury');
        if (registerBtn) {
            registerBtn.addEventListener('click', function() {
                const eventTitle = card.querySelector('.event-title').textContent;
                showNotification(`Registration initiated for: ${eventTitle}`);
            });
        }
        
        // Add learn more button functionality
        const learnMoreBtn = card.querySelector('.btn-ghost');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function() {
                const eventTitle = card.querySelector('.event-title').textContent;
                showNotification(`More information about: ${eventTitle}`);
            });
        }
    });
}

// Initialize newsletter signup
function initializeNewsletter() {
    const newsletterBtn = document.querySelector('.newsletter-form .btn');
    const newsletterInput = document.getElementById('newsletterEmail');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            showNotification('Thank you for subscribing to our newsletter!');
            newsletterInput.value = '';
        });
        
        // Allow Enter key to submit
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }
}
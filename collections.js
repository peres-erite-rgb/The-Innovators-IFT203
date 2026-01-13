// Collections page specific functionality

let favorites = [];

// Initialize collections page
document.addEventListener('DOMContentLoaded', function () {
    loadFavorites();
    initializeCollectionAnimations();
});

// Toggle favorite functionality
function toggleFavorite(id) {
    const heartIcon = document.querySelector(`[onclick="toggleFavorite(${id})"] .heart-icon`);

    if (favorites.includes(id)) {
        favorites = favorites.filter(fav => fav !== id);
        heartIcon.textContent = '♡';
        heartIcon.classList.remove('active');
        showNotification('Removed from favorites');
    } else {
        favorites.push(id);
        heartIcon.textContent = '♥';
        heartIcon.classList.add('active');
        showNotification('Added to favorites');
    }

    saveFavorites();
}

// Save favorites to localStorage
function saveFavorites() {
    localStorage.setItem('atelierFavorites', JSON.stringify(favorites));
}

// Load favorites from localStorage
function loadFavorites() {
    const saved = localStorage.getItem('atelierFavorites');
    if (saved) {
        favorites = JSON.parse(saved);
        favorites.forEach(id => {
            const heartIcon = document.querySelector(`[onclick="toggleFavorite(${id})"] .heart-icon`);
            if (heartIcon) {
                heartIcon.textContent = '♥';
                heartIcon.classList.add('active');
            }
        });
    }
}

// Initialize collection animations
function initializeCollectionAnimations() {
    const collectionItems = document.querySelectorAll('.collection-item');

    collectionItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;

        // Add hover effects for images
        const image = item.querySelector('.collection-image');
        if (image) {
            item.addEventListener('mouseenter', function () {
                image.style.transform = 'scale(1.1)';
            });

            item.addEventListener('mouseleave', function () {
                image.style.transform = 'scale(1)';
            });
        }
    });
}
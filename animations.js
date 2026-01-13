// Animation utilities and effects

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function () {
    initializeScrollAnimations();
    initializeHoverEffects();
    initializeParallaxEffects();
});

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const animationObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Add stagger effect for grouped elements
                if (entry.target.parentElement.classList.contains('stagger-children')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.slide-up, .fade-in, .luxury-hover');
    animatedElements.forEach(el => animationObserver.observe(el));
}

// Enhanced hover effects
function initializeHoverEffects() {
    const hoverElements = document.querySelectorAll('.luxury-hover');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-luxury)';
        });

        element.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-card)';
        });
    });
}

// Parallax scrolling effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Utility function to add entrance animations
function addEntranceAnimation(element, animationType = 'fadeInUp', delay = 0) {
    element.style.opacity = '0';
    element.style.transform = getInitialTransform(animationType);
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    element.style.transitionDelay = `${delay}ms`;

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
    }, 100 + delay);
}

function getInitialTransform(animationType) {
    switch (animationType) {
        case 'fadeInUp':
            return 'translateY(30px)';
        case 'fadeInDown':
            return 'translateY(-30px)';
        case 'fadeInLeft':
            return 'translateX(-30px)';
        case 'fadeInRight':
            return 'translateX(30px)';
        case 'zoomIn':
            return 'scale(0.9)';
        default:
            return 'translateY(30px)';
    }
}

// Loading animation for page transitions
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: hsl(var(--background));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid hsl(var(--border));
            border-top: 3px solid hsl(var(--accent));
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(loader);

    return loader;
}

function hideLoadingAnimation(loader) {
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
}
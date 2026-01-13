// Board page specific functionality

// Initialize board page
document.addEventListener('DOMContentLoaded', function () {
    initializeBoardAnimations();
});

// Member hover functionality
function hoverMember(memberId) {
    const memberImage = document.getElementById(`member-image-${memberId}`);
    const memberOverlay = document.getElementById(`member-overlay-${memberId}`);

    if (memberImage && memberOverlay) {
        memberImage.style.transform = 'scale(1.1)';
        memberImage.style.filter = 'brightness(1.1)';
        memberOverlay.classList.add('active');
    }
}

function unhoverMember() {
    const memberImages = document.querySelectorAll('.member-image');
    const memberOverlays = document.querySelectorAll('.member-overlay');

    memberImages.forEach(image => {
        image.style.transform = 'scale(1)';
        image.style.filter = 'brightness(1)';
    });

    memberOverlays.forEach(overlay => {
        overlay.classList.remove('active');
    });
}

// Initialize board animations
function initializeBoardAnimations() {
    const boardMembers = document.querySelectorAll('.board-member');

    boardMembers.forEach((member, index) => {
        member.style.animationDelay = `${index * 0.2}s`;

        // Add smooth transitions for member info reveal
        const memberInfo = member.querySelector('.member-info');
        if (memberInfo) {
            member.addEventListener('mouseenter', function () {
                memberInfo.style.transform = 'translateY(-5px)';
            });

            member.addEventListener('mouseleave', function () {
                memberInfo.style.transform = 'translateY(0)';
            });
        }
    });
}
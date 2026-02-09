document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');

    // Sticky Navigation on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling with header offset
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerOffset = 80; // Matches CSS padding-top of hero/body
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            });
    }
        });
    });

// --- Profile Flip Card Logic ---
const flipCard = document.getElementById('profileFlipCard');
let isPaused = false;
let autoFlipInterval;

// Toggle on Click
flipCard.addEventListener('click', () => {
    flipCard.classList.toggle('flipped');
});

// Pause on Hover
flipCard.addEventListener('mouseenter', () => {
    isPaused = true;
});

flipCard.addEventListener('mouseleave', () => {
    isPaused = false;
});

// Auto Flip Mechanism
function startAutoFlip() {
    autoFlipInterval = setInterval(() => {
        if (!isPaused) {
            flipCard.classList.toggle('flipped');
        }
    }, 8000); // 8 seconds
}

startAutoFlip();
});

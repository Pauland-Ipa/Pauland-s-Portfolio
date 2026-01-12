/* --- Mobile Menu Toggle --- */
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

/* --- Smooth Scrolling --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            // Auto-close menu on mobile after clicking
            navLinks.classList.remove('active');
        }
    });
});

/* --- Typewriter Effect --- */
const textElement = document.querySelector('.typing-text');
const phrases = ["Student.", "Developer.", "Android Specialist.", "Tech Enthusiast."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!textElement) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex--);
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex++);
    }

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; 
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);
// Typing effect functionality
const textElement = document.getElementById('typing-text');
const words = ["Software Developer", "Student", "UI/UX Designer"]; // Add your titles here
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 200;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end of the word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', type);
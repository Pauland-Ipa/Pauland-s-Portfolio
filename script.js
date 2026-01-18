const textElement = document.getElementById('typing-text');
const words = ["Software Developer", "Student", "Web Designer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    textElement.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    let typeSpeed = isDeleting ? 100 : 200;
    if (!isDeleting && charIndex === currentWord.length) { isDeleting = true; typeSpeed = 2000; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if(textElement) type();
    
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Message sent! (Note: This is a placeholder alert)");
            form.reset();
        });
    }
});
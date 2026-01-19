const textElement = document.getElementById('typing-text');
const words = ["Software Developer", "Student", "Web Designer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (textElement) {
        textElement.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

        let typeSpeed = isDeleting ? 100 : 200;
        if (!isDeleting && charIndex === currentWord.length) { isDeleting = true; typeSpeed = 2000; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; }

        setTimeout(type, typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    type();
    
    // FUNCTIONAL CONTACT FORM LOGIC
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const recipient = "ppawlenchumil@gmail.com";

            // Basic email regex for valid structure check
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailPattern.test(email)) {
                alert("Please enter a valid existing email address.");
                return;
            }

            // Constructing the mailto link
            const subject = encodeURIComponent(`Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            // Redirects to default mail app
            window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
            
            form.reset();
        });
    }
});
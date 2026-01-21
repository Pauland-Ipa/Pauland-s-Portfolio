document.addEventListener('DOMContentLoaded', () => {
    // 1. THEME TOGGLE - DEFAULT TO DARK
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    themeIcon.innerText = currentTheme === 'light' ? 'dark_mode' : 'light_mode';

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.innerText = newTheme === 'light' ? 'dark_mode' : 'light_mode';
    });

    // 2. TYPING EFFECT
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
    type();

    // 3. REVEAL ON SCROLL
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => revealObserver.observe(el));

    // 4. BACK TO TOP
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTop.style.display = 'block';
        else backToTop.style.display = 'none';
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // 5. COPY EMAIL
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = document.getElementById('email-text').innerText;
            navigator.clipboard.writeText(email);
            copyBtn.querySelector('span').innerText = 'done';
            setTimeout(() => { copyBtn.querySelector('span').innerText = 'content_copy'; }, 2000);
        });
    }

    // 6. SUCCESS ANIMATION (PAPER PLANE)
    const contactForm = document.getElementById('contact-form');
    const successAnim = document.getElementById('success-animation');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.querySelectorAll('input, textarea, button').forEach(el => el.classList.add('hidden'));
            successAnim.classList.remove('hidden');
            successAnim.classList.add('active');
            setTimeout(() => {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                window.location.href = `mailto:ppawlenchumil@gmail.com?subject=Portfolio Message&body=Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.querySelectorAll('input, textarea, button').forEach(el => el.classList.remove('hidden'));
                    successAnim.classList.add('hidden');
                    successAnim.classList.remove('active');
                }, 2000);
            }, 1500);
        });
    }

    // 7. HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger) hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));

    // 8. TILT INITIATION
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
});
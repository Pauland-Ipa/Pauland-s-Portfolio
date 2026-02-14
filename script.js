document.addEventListener('DOMContentLoaded', () => {
    // THEME TOGGLE
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

    // TYPING EFFECT
    const textElement = document.getElementById('typing-text');
    if (textElement) {
        const words = [
            "Computer Science Student",
            "Web Developer",
            "UI/UX Designer",
            "Game Developer"
        ];
        let wordIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            textElement.textContent = isDeleting 
                ? currentWord.substring(0, charIndex - 1) 
                : currentWord.substring(0, charIndex + 1);
            
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            let typeSpeed = isDeleting ? 80 : 150;
            
            if (!isDeleting && charIndex === currentWord.length) { 
                isDeleting = true; 
                typeSpeed = 2000; 
            } else if (isDeleting && charIndex === 0) { 
                isDeleting = false; 
                wordIndex = (wordIndex + 1) % words.length; 
                typeSpeed = 500; 
            }
            
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // REVEAL ON SCROLL
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => revealObserver.observe(el));

    // SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });

    // ACTIVE NAVIGATION ON SCROLL
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // BACK TO TOP BUTTON
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.style.display = 'flex';
                backToTop.style.alignItems = 'center';
                backToTop.style.justifyContent = 'center';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // CONTACT FORM HANDLING
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Check if using Formspree or mailto fallback
            const formAction = contactForm.getAttribute('action');
            
            if (formAction && formAction.includes('formspree')) {
                // If using Formspree
                try {
                    const response = await fetch(formAction, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        formStatus.classList.remove('hidden', 'error');
                        formStatus.classList.add('success');
                        formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                        contactForm.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    formStatus.classList.remove('hidden', 'success');
                    formStatus.classList.add('error');
                    formStatus.textContent = '✗ Oops! Something went wrong. Please try again or email me directly.';
                }
                
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            } else {
                // Fallback to mailto
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject') || 'Portfolio Message';
                const message = formData.get('message');
                
                const mailtoLink = `mailto:ppawlenchumil@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                window.location.href = mailtoLink;
                
                // Show success message
                setTimeout(() => {
                    formStatus.classList.remove('hidden', 'error');
                    formStatus.classList.add('success');
                    formStatus.textContent = '✓ Email client opened! Please send the message from your email app.';
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }, 500);
            }
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        });
    }

    // TILT EFFECT FOR PROJECT CARDS
    const tiltElements = document.querySelectorAll('[data-tilt]');
    if (tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(tiltElements, {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
    }

    // COPY EMAIL FUNCTIONALITY (for older pages)
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = document.getElementById('email-text').innerText;
            navigator.clipboard.writeText(email).then(() => {
                const icon = copyBtn.querySelector('span');
                const originalIcon = icon.innerText;
                icon.innerText = 'done';
                
                setTimeout(() => {
                    icon.innerText = originalIcon;
                }, 2000);
            });
        });
    }

    // ANIMATE STATS ON SCROLL
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const finalValue = stat.textContent;
                    if (!isNaN(parseInt(finalValue))) {
                        animateValue(stat, 0, parseInt(finalValue), 1500);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    if (statNumbers.length > 0) {
        statsObserver.observe(statNumbers[0].parentElement.parentElement);
    }

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    }

    // ADD LOADING ANIMATION FOR IMAGES
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    console.log('Portfolio initialized successfully! 🚀');
});
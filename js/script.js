/* =========================================
   MECHANICAL ENGINEER PORTFOLIO - SCRIPT.JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. RECRUITER INTRO ---
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        // Lock scroll
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            introOverlay.classList.add('fade-out');
            // Unlock scroll
            document.body.style.overflow = 'auto';

            // Remove from DOM after transition
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 800); // Wait for CSS transition (0.8s)

        }, 3500); // 3.5 seconds total duration
    }

    // --- 2. MOBILE MENU TOGGLE ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            // Toggle Hamburger Animation
            hamburger.classList.toggle('toggle');
            // Toggle Menu Slide
            mobileMenu.classList.toggle('active');

            // Animate Hamburger Lines (Simple cross effect handled via class toggle if css supported, 
            // but here we just slide menu. You can add css transform for 'toggle' class)
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // --- 3. STICKY NAVBAR & BACK-TO-TOP ---
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            if (backToTop) backToTop.classList.add('active');
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"; // Default
            if (backToTop) backToTop.classList.remove('active');
        }
    });

    // --- 4. SCROLL SECTIONS ACTIVE LINK ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.classList.contains(current)) { // This assumes class matches href #id, which is logic-heavy.
                // Simpler check involves href attribute
            }
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- 5. SCROLL REVEAL ANIMATION (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. TYPEWRITER EFFECT ---
    const typewriterText = ["Diploma Mechanical Engineer", "Production Engineer", "Maintenance Engineer", "CAD Designer"];
    const typeTarget = document.querySelector('.typewriter');
    let typeIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if (!typeTarget) return;

        const currentText = typewriterText[typeIndex];

        if (isDeleting) {
            typeTarget.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typeTarget.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typeIndex = (typeIndex + 1) % typewriterText.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start Tpying
    if (typeTarget) setTimeout(type, 1000);


    // --- 7. DARK MODE TOGGLE ---
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme);
    }

    // --- 8. CONTACT FORM SUBMISSION (Simulation) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent successfully (Simulation).`);
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        });
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        const isExpanded = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);

        // Prevent scroll when mobile menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// BRANDS SCROLL - Hide hint on first hover
// ============================================
const brandsTrack = document.getElementById('brandsTrack');
const brandsHint = document.querySelector('.brands-scroll-hint');

if (brandsTrack && brandsHint) {
    brandsTrack.addEventListener('mouseenter', function() {
        brandsHint.style.display = 'none';
    }, { once: true });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// SCROLL TO TOP BUTTON & FLOATING CTA
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');
const floatingCta = document.getElementById('floatingCta');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

if (floatingCta) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition > 800 && scrollPosition < document.body.scrollHeight - 1500) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target && header) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// FAQ ACCORDION
// ============================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.form-submit');
        if (!submitBtn) return;

        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Wysyłanie...';
        submitBtn.disabled = true;

        setTimeout(() => {
            formMessage.textContent = 'Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';

            contactForm.reset();

            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Wyślij wiadomość';
            submitBtn.disabled = false;

            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .process-step, .brand-card, .benefit-card, .testimonial-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 650ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 650ms cubic-bezier(0.25, 0.1, 0.25, 1)';
    observer.observe(el);
});

// ============================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
        }
        document.body.style.overflow = '';
    }
});

// ============================================
// PERFORMANCE: REDUCE ANIMATIONS ON LOW-END DEVICES
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Console branding
console.log('%c✨ ŚWIAT KLIMATYZACJI', 'color: #00bcd4; font-size: 24px; font-weight: bold; font-family: serif;');
console.log('%cPerfekcyjny klimat, profesjonalna obsługa', 'color: #1a2b5f; font-size: 14px;');

// ============================================
// LIVE VIEWERS COUNTER - DYNAMIC UPDATE
// ============================================
const viewersCountElement = document.getElementById('viewersCount');

if (viewersCountElement) {
    const viewerNumbers = [5, 8, 9, 10, 12, 7, 6, 11, 8, 9];
    let currentIndex = 0;

    function updateViewersCount() {
        const nextCount = viewerNumbers[currentIndex];
        viewersCountElement.style.transform = 'scale(0.8)';
        viewersCountElement.style.opacity = '0.5';

        setTimeout(() => {
            viewersCountElement.textContent = nextCount;
            viewersCountElement.style.transform = 'scale(1)';
            viewersCountElement.style.opacity = '1';
        }, 150);

        currentIndex = (currentIndex + 1) % viewerNumbers.length;
    }

    function scheduleNextUpdate() {
        const randomDelay = Math.floor(Math.random() * 4000) + 6000;
        setTimeout(() => {
            updateViewersCount();
            scheduleNextUpdate();
        }, randomDelay);
    }

    scheduleNextUpdate();
}

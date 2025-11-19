// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    updateThemeToggle(true);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateThemeToggle(false);
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeToggle(true);
        }
    });
}

function updateThemeToggle(isDark) {
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.lastChild;
    
    if (isDark) {
        icon.className = 'fas fa-sun';
        text.textContent = ' Light';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = ' Dark';
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hero section animations
    anime({
        targets: '.hero-title',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.hero-subtitle',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.hero-description',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 400,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.hero-buttons .btn',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(100, {start: 600}),
        easing: 'easeOutExpo'
    });

    // Hero cards animation
    anime({
        targets: '.hero-card',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(200, {start: 800}),
        easing: 'easeOutExpo'
    });

    // Feature cards animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Observe profile cards
    document.querySelectorAll('.profile-card').forEach(card => {
        observer.observe(card);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });

    function animateElement(element) {
        if (element.classList.contains('feature-card') || 
            element.classList.contains('profile-card') || 
            element.classList.contains('project-card')) {
            
            anime({
                targets: element,
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            });
        }

        if (element.classList.contains('skill-item')) {
            const progressBar = element.querySelector('.skill-progress');
            if (progressBar) {
                const progress = progressBar.getAttribute('data-progress');
                anime({
                    targets: progressBar,
                    width: progress + '%',
                    duration: 1500,
                    easing: 'easeOutExpo'
                });
            }
        }
    }

    // Social icons hover animation
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            anime({
                targets: icon,
                scale: 1.2,
                rotate: '1turn',
                duration: 600,
                easing: 'easeInOutQuad'
            });
        });

        icon.addEventListener('mouseleave', () => {
            anime({
                targets: icon,
                scale: 1,
                rotate: '0turn',
                duration: 600,
                easing: 'easeInOutQuad'
            });
        });
    });

    // Animate 'Follow Us' icons on Contact page when they enter viewport
    const followSection = document.querySelector('.social-section.follow');
    if (followSection) {
        const followObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const icons = entry.target.querySelectorAll('.social-icon');
                    anime({
                        targets: icons,
                        translateY: [20, 0],
                        opacity: [0, 1],
                        scale: [0.85, 1],
                        duration: 700,
                        delay: anime.stagger(120),
                        easing: 'easeOutBack'
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        followObserver.observe(followSection);
    }

    // Card hover animations
    document.querySelectorAll('.profile-card, .project-card, .feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -10,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutExpo',
                        begin: () => {
                            card.style.display = 'block';
                        }
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        translateY: [0, -30],
                        duration: 600,
                        easing: 'easeOutExpo',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Animate form submission
            anime({
                targets: '.btn-primary',
                scale: [1, 0.95],
                duration: 200,
                easing: 'easeInOutQuad',
                direction: 'alternate',
                complete: () => {
                    // Show success message
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }
            });
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f56565'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 300px;
            transform: translateX(400px);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        anime({
            targets: notification,
            translateX: [400, 0],
            duration: 600,
            easing: 'easeOutExpo'
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 400],
                opacity: [1, 0],
                duration: 600,
                easing: 'easeInExpo',
                complete: () => {
                    notification.remove();
                }
            });
        }, 3000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            anime({
                targets: navbar,
                translateY: -70,
                duration: 300,
                easing: 'easeInOutQuad'
            });
        } else {
            // Scrolling up
            anime({
                targets: navbar,
                translateY: 0,
                duration: 300,
                easing: 'easeInOutQuad'
            });
        }
        
        lastScrollTop = scrollTop;
    });

    // Loading animation
    window.addEventListener('load', () => {
        // Animate page elements on load
        anime({
            targets: 'body',
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Typing effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Apply typing effect to hero title on home page
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Utility functions
const utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Performance optimization for scroll events
window.addEventListener('scroll', utils.throttle(() => {
    // Add any scroll-based animations here
}, 100));

// Resize handler
window.addEventListener('resize', utils.debounce(() => {
    // Handle responsive adjustments
}, 250));

// Animate learning cards when they enter the viewport
document.addEventListener('DOMContentLoaded', () => {
    const learningItems = document.querySelectorAll('.learning-item');
    if (!learningItems || learningItems.length === 0) return;

    // Prepare initial state via CSS (keeps layout snappy)
    learningItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px) scale(0.98)';
    });

    const learningObserver = new IntersectionObserver((entries, obs) => {
        const toAnimate = [];
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                toAnimate.push(entry.target);
                obs.unobserve(entry.target);
            }
        });

        if (toAnimate.length) {
            anime.timeline({})
                .add({
                    targets: toAnimate,
                    translateY: [20, 0],
                    opacity: [0, 1],
                    scale: [0.98, 1],
                    easing: 'easeOutExpo',
                    duration: 700,
                    delay: anime.stagger(120)
                });
        }
    }, { threshold: 0.12 });

    learningItems.forEach(item => learningObserver.observe(item));
});

// Projects search/filter
document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('projectSearch');
    if (!search) return;

    const cards = Array.from(document.querySelectorAll('.project-card'));

    function normalize(text) {
        return (text || '').toString().trim().toLowerCase();
    }

    function filterProjects(query) {
        const q = normalize(query);
        cards.forEach(card => {
            const titleEl = card.querySelector('.project-content h3');
            const techEls = Array.from(card.querySelectorAll('.tech-tag'));
            const title = normalize(titleEl ? titleEl.textContent : '');
            const techs = techEls.map(t => normalize(t.textContent)).join(' ');
            const hay = (title + ' ' + techs);

            if (q === '' || hay.indexOf(q) !== -1) {
                if (card.style.display === 'none' || window.getComputedStyle(card).display === 'none') {
                    card.style.display = '';
                    anime({ targets: card, opacity: [0,1], translateY: [8,0], duration: 350, easing: 'easeOutExpo' });
                }
            } else {
                // animate out then hide
                anime({ targets: card, opacity: [1,0], translateY: [0,-8], duration: 200, easing: 'easeInExpo', complete: () => { card.style.display = 'none'; card.style.opacity = 1; } });
            }
        });
    }

    // initial state
    filterProjects('');

    let debounceTimer;
    search.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => filterProjects(e.target.value), 150);
    });
});

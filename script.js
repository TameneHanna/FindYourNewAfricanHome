// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('#menuToggle');
const navMenu = document.querySelector('#navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
}

// Card hover animations
const cards = document.querySelectorAll('.service-card, .expertise-card, .stat-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.classList.contains('service-card')) {
            card.style.transform = 'translateY(-15px)';
        } else if (card.classList.contains('expertise-card')) {
            card.style.transform = 'translateY(-10px)';
        } else {
            card.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Background slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide() {
    slides.forEach(slide => {
        slide.style.opacity = 0;
    });
    
    slides[currentSlide].style.opacity = 1;
    
    currentSlide = (currentSlide + 1) % slides.length;
}

// Start slideshow
if (slides.length > 0) {
    showSlide();
    setInterval(showSlide, 5000);
}

// Search form functionality
const searchForm = document.querySelector('.search-box');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input[type="text"]');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
            searchInput.value = '';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        }
    });
});

// Fixed Contact Us button functionality
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
            window.scrollTo({
                top: contactSection.offsetTop - 80,
                behavior: 'smooth'
            });
        } else {
            // Fallback to bottom of page
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const nameInput = this.querySelector('#name');
        const emailInput = this.querySelector('#email');
        const messageInput = this.querySelector('#message');
        let isValid = true;
        
        // Reset errors
        this.querySelectorAll('.error').forEach(el => el.remove());
        
        // Name validation
        if (!nameInput.value.trim()) {
            isValid = false;
            showError(nameInput, 'Name is required');
        }
        
        // Email validation
        if (!emailInput.value.trim()) {
            isValid = false;
            showError(emailInput, 'Email is required');
        } else if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Please enter a valid email');
        }
        
        // Message validation
        if (!messageInput.value.trim()) {
            isValid = false;
            showError(messageInput, 'Message is required');
        }
        
        if (isValid) {
            // In a real application, this would send the form data to a server
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#2D5D2A';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '#F3A712';
                }, 2000);
            }, 1500);
        }
    });
}

// Helper function to show form errors
function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    error.style.color = '#C5283D';
    error.style.fontSize = '0.9rem';
    error.style.marginTop = '5px';
    input.parentNode.appendChild(error);
}

// Helper function to validate email
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = +stat.textContent.replace(/,/g, '');
        const duration = 2000;
        const increment = target / (duration / 16); // 16ms per frame
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                stat.textContent = formatNumber(target);
            } else {
                stat.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    });
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initialize stats animation when section is in view
if (statsSection && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(statsSection);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Initialize animations on scroll
const animatedElements = document.querySelectorAll('.section-header, .service-card, .expertise-card, .stat-card, .contact-info, .contact-form');
if (animatedElements.length > 0) {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
}

// Set active navigation link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        // Check if it's the current page or homepage
        if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
            link.classList.add('active');
        } else if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});
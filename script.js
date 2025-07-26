// Smooth scrolling for navigation links
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

// FAQ Toggle functionality
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Feedback form handling
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const reason = formData.get('reason');
    const comments = formData.get('comments');
    
    // Validate that a reason is selected
    if (!reason) {
        alert('Por favor, selecione um motivo para o cancelamento.');
        return;
    }
    
    // Simulate form submission (in a real app, this would send to a server)
    console.log('Feedback enviado:', {
        reason: reason,
        comments: comments,
        timestamp: new Date().toISOString()
    });
    
    // Show success modal
    showModal();
    
    // Reset form
    this.reset();
});

// Modal functions
function showModal() {
    document.getElementById('confirmModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('confirmModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(button => {
    if (button.getAttribute('href') && button.getAttribute('href').startsWith('http')) {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Redirecionando...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 2000);
        });
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Add initial styles for animation
    const animatedElements = document.querySelectorAll('.info-card, .step, .alternative-card, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects for cards
document.querySelectorAll('.info-card, .alternative-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Progress indicator for multi-step process
function updateProgressIndicator(step) {
    const steps = document.querySelectorAll('.step-number');
    steps.forEach((stepEl, index) => {
        if (index < step) {
            stepEl.style.background = '#1DB954';
            stepEl.innerHTML = '✓';
        } else if (index === step) {
            stepEl.style.background = '#1DB954';
            stepEl.style.animation = 'pulse 2s infinite';
        } else {
            stepEl.style.background = '#e0e0e0';
            stepEl.style.color = '#535353';
        }
    });
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Track user interactions for analytics (mock)
function trackEvent(eventName, eventData) {
    console.log('Analytics Event:', eventName, eventData);
    // In a real application, this would send data to an analytics service
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('button_click', {
            button_text: this.textContent.trim(),
            button_class: this.className,
            timestamp: new Date().toISOString()
        });
    });
});

// Track FAQ interactions
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        trackEvent('faq_toggle', {
            question: this.querySelector('span').textContent.trim(),
            timestamp: new Date().toISOString()
        });
    });
});

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, textarea');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid #1DB954';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add ARIA labels where needed
    document.querySelectorAll('.faq-question').forEach((question, index) => {
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', `faq-answer-${index}`);
        
        const answer = question.nextElementSibling;
        answer.setAttribute('id', `faq-answer-${index}`);
    });
});

// Update ARIA states for FAQ
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items and update ARIA
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const question = item.querySelector('.faq-question');
        question.setAttribute('aria-expanded', 'false');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        element.setAttribute('aria-expanded', 'true');
    }
}

// Mobile menu toggle (if needed for smaller screens)
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const navLinks = nav.innerHTML;
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = navLinks;
    mobileMenu.style.display = 'none';
    
    // Add to header
    document.querySelector('.header .container').appendChild(mobileMenuBtn);
    document.querySelector('.header .container').appendChild(mobileMenu);
    
    // Toggle functionality
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.style.display === 'block';
        mobileMenu.style.display = isOpen ? 'none' : 'block';
        this.innerHTML = isOpen ? '☰' : '✕';
    });
    
    // Show/hide based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            nav.style.display = 'none';
            mobileMenuBtn.style.display = 'block';
        } else {
            nav.style.display = 'flex';
            mobileMenuBtn.style.display = 'none';
            mobileMenu.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', createMobileMenu);


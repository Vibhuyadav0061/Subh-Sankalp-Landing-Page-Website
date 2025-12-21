// Modern landing page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Contact modal functionality
    const contactBtns = document.querySelectorAll('.contact-btn, .cta-button, .btn-primary');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Open contact modal
    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functions
    function closeContactModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeModal?.addEventListener('click', closeContactModal);
    
    // Fix modal overlay click - only close when clicking on overlay, not modal content
    modalOverlay?.addEventListener('click', (e) => {
        // Only close if the click target is the overlay itself, not its children
        if (e.target === modalOverlay) {
            closeContactModal();
        }
    });

    // Prevent modal from closing when clicking inside the modal content
    const modalContent = document.querySelector('.modal-content');
    modalContent?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeContactModal();
        }
    });

    // Newsletter form submission
    document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'SUBSCRIBED!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            this.reset();
        }, 2000);
    });

    // Second newsletter form submission
    document.getElementById('newsletterForm2')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'SUBSCRIBED!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            this.reset();
        }, 2000);
    });

    // Process dots interaction
    const processDots = document.querySelectorAll('.process-dots .dot');
    const processSteps = document.querySelectorAll('.process-step');

    processDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            processDots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Highlight corresponding step
            processSteps.forEach((step, stepIndex) => {
                if (stepIndex === index) {
                    step.style.transform = 'scale(1.05)';
                    step.style.transition = 'transform 0.3s ease';
                } else {
                    step.style.transform = 'scale(1)';
                }
            });
            
            // Reset after animation
            setTimeout(() => {
                processSteps.forEach(step => {
                    step.style.transform = 'scale(1)';
                });
            }, 1000);
        });
    });

    // Process step hover effects
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            processDots[index]?.classList.add('active');
        });
        
        step.addEventListener('mouseleave', () => {
            // Reset to first dot active
            processDots.forEach(d => d.classList.remove('active'));
            processDots[0]?.classList.add('active');
        });
    });

    // Contact form submission with WhatsApp redirect
    document.getElementById('leadForm')?.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value;

        let whatsappMessage = `🏡 *New Inquiry - GoldenCity Township*\n\n`;
        whatsappMessage += `👤 *Name:* ${name}\n`;
        whatsappMessage += `📱 *Phone:* ${phone}\n`;
        
        if (email) {
            whatsappMessage += `📧 *Email:* ${email}\n`;
        }
        
        if (interest) {
            whatsappMessage += `🏠 *Interest:* ${interest}\n`;
        }

        if (message) {
            whatsappMessage += `\n💬 *Message:* ${message}\n`;
        }

        whatsappMessage += `\n✨ *Thank you for your interest in GoldenCity Township!*`;

        const whatsappURL = `https://wa.me/917678379336?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Show success animation
        showSubmissionSuccess();
        
        // Close modal and redirect to WhatsApp
        setTimeout(() => {
            closeContactModal();
            window.open(whatsappURL, "_blank");
        }, 1000);
    });

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

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
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
    document.querySelectorAll('.service-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Add hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to floating action buttons
    document.querySelectorAll('.whatsapp-float, .call-float').forEach(btn => {
        btn.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add parallax effect to hero building model
    const buildingModel = document.querySelector('.building-model');
    if (buildingModel) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            buildingModel.style.transform = `perspective(1000px) rotateY(-15deg) rotateX(5deg) translateY(${rate}px)`;
        });
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});

// Helper function to show submission success
function showSubmissionSuccess() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = '#10b981';
    submitBtn.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.transform = '';
    }, 2000);
}

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            border-top: 1px solid var(--border-light);
        }
        
        .nav-menu.active a {
            margin: 10px 0;
            padding: 10px;
            border-radius: 6px;
            transition: background 0.3s ease;
        }
        
        .nav-menu.active a:hover {
            background: var(--bg-light);
        }
    }
    
    .service-card:hover,
    .project-card:hover {
        transform: translateY(-8px);
    }
    
    .building-model {
        transition: transform 0.3s ease;
    }
    
    .hero h1 {
        border-right: 2px solid var(--text-dark);
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { border-color: var(--text-dark); }
        51%, 100% { border-color: transparent; }
    }
`;
document.head.appendChild(style);

// Remove typing cursor after animation
setTimeout(() => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.borderRight = 'none';
        heroTitle.style.animation = 'none';
    }
}, 6000);



//  ============================================
//  POPUP FORM ON SCROLL FUNCTIONALITY
//  ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const popupForm = document.getElementById("popupForm");
    const successPopup = document.getElementById("successPopup");
    const popupLeadForm = document.querySelector("#popupForm form");
    
    // Check if elements exist
    if (!popupForm || !successPopup || !popupLeadForm) {
        console.warn('Popup elements not found');
        return;
    }

    // 1️⃣ Show popup ONLY once (first scroll)
    let scrollHandlerAdded = false;
    
    function handleScroll() {
        const alreadyShown = localStorage.getItem("leadPopupShown");
        const alreadySubmitted = localStorage.getItem("leadFormSubmitted");

        if (window.scrollY > 300 && !alreadyShown && !alreadySubmitted) {
            popupForm.style.display = "flex";
            localStorage.setItem("leadPopupShown", "true");
            // Remove scroll listener after showing once
            window.removeEventListener("scroll", handleScroll);
        }
    }
    
    // Only add scroll listener if not already submitted
    if (!localStorage.getItem("leadFormSubmitted")) {
        window.addEventListener("scroll", handleScroll);
        scrollHandlerAdded = true;
    }

    // 2️⃣ Close lead popup
    window.closePopup = function() {
        popupForm.style.display = "none";
    };

    // 3️⃣ Handle popup form submit
    popupLeadForm.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log('Popup form submitted!');

        // Collect data
        const formEmail = popupLeadForm.querySelector('input[type="email"]')?.value;
        const formPhone = popupLeadForm.querySelector('input[type="tel"]')?.value;
        
        console.log('Form submitted:', { email: formEmail, phone: formPhone });

        // Hide lead popup with animation
        popupForm.style.opacity = '0';
        setTimeout(() => {
            popupForm.style.display = "none";
            popupForm.style.opacity = '1';
        }, 300);

        // Show success popup with delay for smooth transition
        setTimeout(() => {
            console.log('Showing success popup...');
            successPopup.classList.add("show");
            successPopup.style.display = "flex";
        }, 400);

        // Prevent popup forever after submit
        localStorage.setItem("leadFormSubmitted", "true");

        // Download brochure after a short delay
        setTimeout(downloadBrochure, 1000);
        
        // Auto-close success popup after 8 seconds
        setTimeout(() => {
            console.log('Auto-closing success popup...');
            successPopup.classList.remove("show");
            setTimeout(() => {
                successPopup.style.display = "none";
            }, 300);
        }, 8000);
    });

    // 4️⃣ Close success popup
    window.closeSuccess = function() {
        console.log('Closing success popup manually...');
        successPopup.classList.remove("show");
        setTimeout(() => {
            successPopup.style.display = "none";
        }, 300);
    };

    // Add test button for debugging (remove in production)
    window.testSuccessPopup = function() {
        console.log('Testing success popup...');
        successPopup.classList.add("show");
        successPopup.style.display = "flex";
    };

    // 5️⃣ Download brochure
    function downloadBrochure() {
        // Create a dummy brochure download
        // In production, replace with actual brochure path
        const link = document.createElement("a");
        link.href = "VibhuResume(4).pdf"; // Replace with actual path
        link.download = "VibhuResume(4).pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // If brochure doesn't exist, show alert
        console.log('Brochure download initiated');
    }
});


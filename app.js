// JavaScript for Sushmita Das Gupta's website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navToggle) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 70; // Height of fixed navbar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background change on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(252, 252, 249, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(252, 252, 249, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Handle dark mode
        if (window.matchMedia('(prefers-color-scheme: dark)').matches || 
            document.documentElement.getAttribute('data-color-scheme') === 'dark') {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(31, 33, 33, 0.98)';
            } else {
                navbar.style.background = 'rgba(31, 33, 33, 0.95)';
            }
        }
    }

    // Scroll animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.experience-card, .video-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in', 'visible');
            }
        });
    }

    // Initialize fade-in class for elements
    function initializeAnimations() {
        const elements = document.querySelectorAll('.experience-card, .video-item');
        elements.forEach(element => {
            element.classList.add('fade-in');
        });
    }

    // Contact Form Functionality
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    // Form validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateField(field, value) {
        const errorElement = document.getElementById(`${field}-error`);
        let isValid = true;
        let errorMessage = '';

        // Ensure value is a string and trim it
        const trimmedValue = String(value || '').trim();

        switch (field) {
            case 'name':
                if (!trimmedValue) {
                    errorMessage = 'Full name is required';
                    isValid = false;
                } else if (trimmedValue.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
            case 'email':
                if (!trimmedValue) {
                    errorMessage = 'Email address is required';
                    isValid = false;
                } else if (!validateEmail(trimmedValue)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'subject':
                if (!trimmedValue) {
                    errorMessage = 'Subject is required';
                    isValid = false;
                } else if (trimmedValue.length < 3) {
                    errorMessage = 'Subject must be at least 3 characters';
                    isValid = false;
                }
                break;
            case 'message':
                if (!trimmedValue) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (trimmedValue.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }

        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.toggle('visible', !isValid);
        }

        return isValid;
    }

    // Real-time validation
    if (contactForm) {
        const formFields = ['name', 'email', 'subject', 'message'];
        
        formFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.addEventListener('blur', function() {
                    validateField(fieldName, this.value);
                });
                
                field.addEventListener('input', function() {
                    // Clear error when user starts typing
                    const errorElement = document.getElementById(`${fieldName}-error`);
                    if (errorElement && errorElement.classList.contains('visible')) {
                        errorElement.classList.remove('visible');
                    }
                });
            }
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data directly from form elements
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');

            const name = nameField ? nameField.value : '';
            const email = emailField ? emailField.value : '';
            const subject = subjectField ? subjectField.value : '';
            const message = messageField ? messageField.value : '';

            // Validate all fields
            const isNameValid = validateField('name', name);
            const isEmailValid = validateField('email', email);
            const isSubjectValid = validateField('subject', subject);
            const isMessageValid = validateField('message', message);

            const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

            // Hide previous messages
            formSuccess.classList.add('hidden');
            formError.classList.add('hidden');

            if (isFormValid) {
                // Create mailto link
                const mailtoBody = encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                );
                const mailtoSubject = encodeURIComponent(`Contact Form: ${subject}`);
                const mailtoLink = `mailto:lifecoach.sush@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

                // Open email client
                try {
                    // Create a temporary link element to trigger mailto
                    const tempLink = document.createElement('a');
                    tempLink.href = mailtoLink;
                    tempLink.target = '_blank';
                    tempLink.rel = 'noopener noreferrer';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    
                    // Show success message
                    formSuccess.classList.remove('hidden');
                    
                    // Reset form after short delay
                    setTimeout(() => {
                        contactForm.reset();
                        formSuccess.classList.add('hidden');
                        // Clear any visible error messages
                        document.querySelectorAll('.error-message.visible').forEach(error => {
                            error.classList.remove('visible');
                        });
                    }, 5000);
                    
                } catch (error) {
                    console.error('Error opening email client:', error);
                    formError.classList.remove('hidden');
                }
            } else {
                // Show error message
                formError.classList.remove('hidden');
                
                // Focus on first invalid field
                const firstErrorField = document.querySelector('.error-message.visible');
                if (firstErrorField) {
                    const fieldId = firstErrorField.id.replace('-error', '');
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.focus();
                        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        });
    }

    // Scroll event listener with throttling
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                updateNavbarBackground();
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);

    // Initialize animations and states on page load
    initializeAnimations();
    updateActiveNavLink();
    updateNavbarBackground();
    handleScrollAnimations();

    // Handle resize events
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Handle color scheme changes
    function handleColorSchemeChange() {
        updateNavbarBackground();
    }

    // Listen for color scheme changes
    if (window.matchMedia) {
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        colorSchemeQuery.addEventListener('change', handleColorSchemeChange);
    }

    // Handle manual theme switching
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-color-scheme') {
                handleColorSchemeChange();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-color-scheme']
    });

    // Smooth reveal animation for hero content
    function animateHeroContent() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease-out';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Initialize hero animation
    animateHeroContent();

    // Enhanced video loading
    function optimizeVideoLoading() {
        const videos = document.querySelectorAll('.video-wrapper iframe');
        
        videos.forEach(video => {
            video.setAttribute('loading', 'lazy');
            // Add title for accessibility
            if (!video.hasAttribute('title')) {
                video.setAttribute('title', 'Life Transformation Video');
            }
        });
    }

    optimizeVideoLoading();

    // Ensure external links open in new tabs - FIXED VERSION
    function setupExternalLinks() {
        // Target all external links more specifically
        const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https://"]');
        
        externalLinks.forEach(link => {
            // Ensure target="_blank" is set
            if (!link.hasAttribute('target') || link.getAttribute('target') !== '_blank') {
                link.setAttribute('target', '_blank');
            }
            // Add security attributes
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add click handler to ensure it works
            link.addEventListener('click', function(e) {
                // For external links, let the browser handle normally
                // but ensure attributes are set
                if (!this.hasAttribute('target')) {
                    this.setAttribute('target', '_blank');
                }
                if (!this.hasAttribute('rel')) {
                    this.setAttribute('rel', 'noopener noreferrer');
                }
            });
        });

        // Also handle Instagram and YouTube links specifically
        const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
        const youtubeLinks = document.querySelectorAll('a[href*="youtube.com"]');
        
        [...instagramLinks, ...youtubeLinks].forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add visual feedback on click
            link.addEventListener('click', function() {
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            });
        });
    }

    // Call this after DOM is loaded and again after a short delay
    setupExternalLinks();
    setTimeout(setupExternalLinks, 100);

    // Contact button hover effects
    function addContactButtonEffects() {
        const contactButtons = document.querySelectorAll('.contact-btn');
        
        contactButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    addContactButtonEffects();

    // Add keyboard navigation support
    document.addEventListener('keydown', function(event) {
        // Close mobile menu with Escape key
        if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }

        // Handle form submission with Enter key (for buttons)
        if (event.key === 'Enter' && event.target.type === 'submit') {
            event.target.click();
        }
    });

    // Focus management for accessibility
    if (navToggle) {
        navToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    }

    // Add active navigation styling
    function addActiveNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .nav-link.active {
                color: var(--color-primary) !important;
                background-color: var(--color-secondary) !important;
            }
        `;
        document.head.appendChild(style);
    }

    addActiveNavStyles();

    // Form accessibility improvements
    function improveFormAccessibility() {
        const formInputs = document.querySelectorAll('.form-control');
        
        formInputs.forEach(input => {
            // Add ARIA attributes
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                input.setAttribute('aria-labelledby', label.id || `${input.id}-label`);
                if (!label.id) {
                    label.id = `${input.id}-label`;
                }
            }

            // Add aria-describedby for error messages
            const errorElement = document.getElementById(`${input.name}-error`);
            if (errorElement) {
                input.setAttribute('aria-describedby', errorElement.id);
                errorElement.setAttribute('aria-live', 'polite');
            }
        });
    }

    improveFormAccessibility();

    // Enhanced form user experience
    function enhanceFormUX() {
        const submitButton = document.querySelector('.contact-form-btn');
        const form = document.getElementById('contact-form');
        
        if (form && submitButton) {
            // Add loading state during submission
            form.addEventListener('submit', function() {
                submitButton.disabled = true;
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Opening Email...';
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 2000);
            });

            // Auto-resize textarea
            const textarea = document.getElementById('message');
            if (textarea) {
                textarea.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = Math.max(120, this.scrollHeight) + 'px';
                });
            }
        }
    }

    enhanceFormUX();

    // Debug information
    console.log('Sushmita Das Gupta - Life & Mindset Transformation Coach website loaded successfully!');
    console.log('Contact form functionality enabled with improved email submission');
    
    // Log sections found for debugging
    const sections = document.querySelectorAll('section[id]');
    console.log('Sections found:', Array.from(sections).map(s => s.id));
    
    // Log navigation links for debugging
    const navLinkHrefs = Array.from(navLinks).map(link => link.getAttribute('href'));
    console.log('Navigation links:', navLinkHrefs);

    // Log form status
    if (contactForm) {
        console.log('Contact form initialized successfully with improved validation');
    }

    // Log external links
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https://"]');
    console.log('External links found:', externalLinks.length);
    externalLinks.forEach(link => {
        console.log('External link:', link.href, 'Target:', link.target, 'Rel:', link.rel);
    });
});

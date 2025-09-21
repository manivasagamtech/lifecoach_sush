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

    // Ensure external links open in new tabs
    function setupExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https://"]');
        
        externalLinks.forEach(link => {
            // Ensure target="_blank" is set
            link.setAttribute('target', '_blank');
            // Add security attributes
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Remove any event preventDefault that might interfere
            link.addEventListener('click', function(e) {
                // Let the browser handle the default link behavior
                // Don't preventDefault for external links
            });
        });
    }

    setupExternalLinks();

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

    // Debug information
    console.log('Sushmita Das Gupta - Life & Mindset Transformation Coach website loaded successfully!');
    
    // Log sections found for debugging
    const sections = document.querySelectorAll('section[id]');
    console.log('Sections found:', Array.from(sections).map(s => s.id));
    
    // Log navigation links for debugging
    const navLinkHrefs = Array.from(navLinks).map(link => link.getAttribute('href'));
    console.log('Navigation links:', navLinkHrefs);
});

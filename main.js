/**
 * Main JavaScript functionality for portfolio website
 * Optimized version
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('#navbar');
    const body = document.querySelector('body');

    // Mobile navigation styles
    if (!document.querySelector('#mobile-nav-styles')) {
        const mobileStyles = document.createElement('style');
        mobileStyles.id = 'mobile-nav-styles';
        mobileStyles.textContent = `
            @media (max-width: 991px) {
                #navbar ul {
                    display: none;
                    position: fixed;
                    top: 70px;
                    right: 15px;
                    left: 15px;
                    padding: 20px 0;
                    margin: 0;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
                    z-index: 9999;
                    flex-direction: column;
                    max-height: calc(100vh - 100px);
                    overflow-y: auto;
                    border: 1px solid rgba(139, 0, 0, 0.1);
                }
                
                .mobile-nav-active #navbar ul {
                    display: flex;
                    animation: slideDown 0.3s ease forwards;
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                #navbar ul li {
                    margin: 0;
                    width: 100%;
                }
                
                #navbar ul li a {
                    padding: 15px 25px;
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--text-primary, #2c3e50);
                    border-radius: 8px;
                    margin: 5px 15px;
                    transition: all 0.3s ease;
                    border-left: 3px solid transparent;
                    display: block;
                }
                
                #navbar ul li a:hover,
                #navbar ul li a.active {
                    color: #8b0000;
                    background: rgba(139, 0, 0, 0.08);
                    border-left-color: #8b0000;
                    transform: translateX(5px);
                }
                
                .mobile-nav-toggle {
                    display: block;
                    font-size: 28px;
                    color: #8b0000;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .mobile-nav-toggle:hover {
                    color: #b30000;
                    transform: scale(1.1);
                }
                
                .mobile-nav-active .mobile-nav-toggle {
                    color: #8b0000;
                }
            }
        `;
        document.head.appendChild(mobileStyles);
    }

    // Mobile navigation toggle
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            body.classList.toggle('mobile-nav-active');
            this.classList.toggle('ri-close-line');
            this.classList.toggle('ri-menu-line');
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (body.classList.contains('mobile-nav-active') && 
            !navbar.contains(e.target) && 
            !mobileNavToggle.contains(e.target)) {
            closeMobileNav();
        }
    });

    // Close mobile nav function
    function closeMobileNav() {
        body.classList.remove('mobile-nav-active');
        if (mobileNavToggle) {
            mobileNavToggle.classList.remove('ri-close-line');
            mobileNavToggle.classList.add('ri-menu-line');
        }
    }

    // Smooth scroll
    document.querySelectorAll('a.scrollto, a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            
            if (hash && hash.startsWith('#') && hash.length > 1) {
                e.preventDefault();
                
                if (body.classList.contains('mobile-nav-active')) {
                    closeMobileNav();
                }

                const target = document.querySelector(hash);
                if (target) {
                    const headerHeight = document.querySelector('#header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    if (history.pushState) {
                        history.pushState(null, null, hash);
                    }
                }
            }
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Active navigation link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        if (window.scrollY < 200) {
            current = 'hero';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Image hover effects
    const skillImages = document.querySelectorAll('#clients .img-fluid');
    
    skillImages.forEach(img => {
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'contain';
        img.style.objectPosition = 'center';
        img.style.filter = 'grayscale(100%)';
        img.style.transition = 'filter 0.3s ease, transform 0.3s ease';
        
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'grayscale(0%)';
            this.style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'grayscale(100%)';
            this.style.transform = 'scale(1)';
        });
    });

    /**
     * Initialize AOS (Animate On Scroll) with enhanced settings
     */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-cubic',
            once: true,
            mirror: false,
            offset: 120,
            delay: 0,
            anchorPlacement: 'top-bottom'
        });

        // Refresh AOS on window resize
        window.addEventListener('resize', function() {
            AOS.refresh();
        });
    }

    /**
     * Enhanced typing effect for hero section (optional)
     */
    function initTypingEffect() {
        const heroTitle = document.querySelector('#hero h1');
        const heroSubtitle = document.querySelector('#hero h2');
        
        if (heroTitle && heroSubtitle) {
            const titleText = heroTitle.textContent;
            const subtitleText = heroSubtitle.textContent;
            
            // Only run if page is loaded fresh (not back button)
            if (performance.navigation.type !== 2) {
                heroTitle.textContent = '';
                heroSubtitle.textContent = '';
                
                // Type title
                let titleIndex = 0;
                const titleTimer = setInterval(() => {
                    heroTitle.textContent += titleText[titleIndex];
                    titleIndex++;
                    if (titleIndex >= titleText.length) {
                        clearInterval(titleTimer);
                        
                        // Type subtitle after title is done
                        let subtitleIndex = 0;
                        const subtitleTimer = setInterval(() => {
                            heroSubtitle.textContent += subtitleText[subtitleIndex];
                            subtitleIndex++;
                            if (subtitleIndex >= subtitleText.length) {
                                clearInterval(subtitleTimer);
                            }
                        }, 50);
                    }
                }, 100);
            }
        }
    }

    // Uncomment to enable typing effect
    // initTypingEffect();

    /**
     * Loading animation
     */
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger AOS refresh after page load
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        }
    });

    /**
     * Form handling (if contact form exists)
     */
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form submission logic here
            const formData = new FormData(this);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Üzenet sikeresen elküldve!';
            
            this.appendChild(successMessage);
            this.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    /**
     * Lazy loading for images
     */
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    console.log('🚀 Portfolio website loaded successfully!');

    // Animációk
    const animateElements = document.querySelectorAll('.fade-in-up');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });
});
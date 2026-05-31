/* ========================================
   ANANYA ACADEMY - MAIN JAVASCRIPT
   Premium Coaching Institute Website
   ======================================== */

(function() {
    'use strict';

    // ========================================
    // DOM READY
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initThemeToggle();
        initSearch();
        initMobileMenu();
        initScrollEffects();
        initCounters();
        initTestimonials();
        initCourseTabs();
        initFAQ();
        initGallery();
        initChatWidget();
        initNotificationBar();
        initBackToTop();
        initCountdown();
        initForms();
        initLightbox();
        initSmoothScroll();
    });

    // ========================================
    // NAVIGATION
    // ========================================
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // Active nav link on scroll
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', function() {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;

                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ========================================
    // THEME TOGGLE
    // ========================================
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        const icon = themeToggle.querySelector('i');

        // Check saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    // ========================================
    // SEARCH OVERLAY
    // ========================================
    function initSearch() {
        const searchToggle = document.getElementById('searchToggle');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchClose = document.getElementById('searchClose');
        const searchInput = document.getElementById('courseSearch');
        const searchResults = document.getElementById('searchResults');

        if (!searchToggle) return;

        searchToggle.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 300);
            document.body.style.overflow = 'hidden';
        });

        searchClose.addEventListener('click', closeSearch);
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) closeSearch();
        });

        function closeSearch() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
            searchInput.value = '';
            searchResults.innerHTML = '';
        }

        // Search functionality
        const searchData = [
            { title: 'CTET Preparation', category: 'Course', link: '#courses' },
            { title: 'UPTET Coaching', category: 'Course', link: '#courses' },
            { title: 'Super TET', category: 'Course', link: '#courses' },
            { title: 'TGT All Subjects', category: 'Course', link: '#courses' },
            { title: 'PGT All Subjects', category: 'Course', link: '#courses' },
            { title: 'NET/JRF', category: 'Course', link: '#courses' },
            { title: 'DSSSB Preparation', category: 'Course', link: '#courses' },
            { title: 'Dr. Rajesh Sharma', category: 'Faculty', link: '#faculty' },
            { title: 'Dr. Priya Singh', category: 'Faculty', link: '#faculty' },
            { title: 'Prof. Amit Verma', category: 'Faculty', link: '#faculty' },
            { title: 'Study Material', category: 'Resource', link: '#courses' },
            { title: 'Test Series', category: 'Resource', link: '#courses' },
            { title: 'Video Lectures', category: 'Resource', link: '#courses' },
            { title: 'Online Classes', category: 'Program', link: '#courses' },
            { title: 'Offline Classes', category: 'Program', link: '#courses' },
            { title: 'Hybrid Program', category: 'Program', link: '#courses' },
            { title: 'Scholarship', category: 'Support', link: '#admission' },
            { title: 'Contact Us', category: 'Support', link: '#contact' },
            { title: 'FAQ', category: 'Support', link: '#faq' },
            { title: 'Blog', category: 'Content', link: '#blog' }
        ];

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();

            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            const filtered = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.category.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
                return;
            }

            searchResults.innerHTML = filtered.map(item => `
                <a href="${item.link}" class="search-result-item" onclick="closeSearchOverlay()">
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-category">${item.category}</div>
                </a>
            `).join('');
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });
    }

    // Close search from inline onclick
    window.closeSearchOverlay = function() {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // ========================================
    // MOBILE MENU
    // ========================================
    function initMobileMenu() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        const dropdowns = document.querySelectorAll('.has-dropdown');

        if (!mobileToggle) return;

        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Mobile dropdown toggle
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768 && !this.parentElement.classList.contains('has-dropdown')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // ========================================
    // SCROLL EFFECTS
    // ========================================
    function initScrollEffects() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section-header, .course-card, .faculty-card, .material-card, .blog-card, .faq-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add animate-in class styles
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ========================================
    // ANIMATED COUNTERS
    // ========================================
    function initCounters() {
        const counters = document.querySelectorAll('.counter');

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // ========================================
    // TESTIMONIALS SLIDER
    // ========================================
    function initTestimonials() {
        const slider = document.getElementById('testimonialsSlider');
        if (!slider) return;

        const cards = slider.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');
        const dotsContainer = document.getElementById('testimonialDots');

        let currentIndex = 0;
        let autoSlideInterval;

        // Create dots
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function goToSlide(index) {
            cards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentIndex = index;
            if (currentIndex >= cards.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = cards.length - 1;

            cards[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);

        startAutoSlide();
    }

    // ========================================
    // COURSE TABS
    // ========================================
    function initCourseTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const courseGrids = document.querySelectorAll('.courses-grid');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');

                // Update active tab
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Show corresponding grid
                courseGrids.forEach(grid => {
                    grid.classList.remove('active');
                    if (grid.id === tabId) {
                        grid.classList.add('active');
                    }
                });
            });
        });
    }

    // ========================================
    // FAQ ACCORDION
    // ========================================
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Close all
                faqItems.forEach(i => i.classList.remove('active'));

                // Open clicked if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // ========================================
    // GALLERY FILTER
    // ========================================
    function initGallery() {
        const filterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========================================
    // AI CHAT WIDGET
    // ========================================
    function initChatWidget() {
        const chatToggle = document.getElementById('chatToggle');
        const chatPanel = document.getElementById('chatPanel');
        const chatClose = document.getElementById('chatClose');
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        const chatMessages = document.getElementById('chatMessages');

        if (!chatToggle) return;

        chatToggle.addEventListener('click', function() {
            chatPanel.classList.toggle('active');
        });

        chatClose.addEventListener('click', function() {
            chatPanel.classList.remove('active');
        });

        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Simulate AI response
            setTimeout(() => {
                const response = getAIResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }

        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}`;
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${text}</p>
                    <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function getAIResponse(input) {
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('ctet') || lowerInput.includes('course')) {
                return 'Our CTET preparation course is our most popular program! It includes 200+ video lectures, 50 mock tests, and comprehensive study material. The course duration is 6 months. Would you like to know the fee structure?';
            } else if (lowerInput.includes('fee') || lowerInput.includes('price') || lowerInput.includes('cost')) {
                return 'Our courses start from ₹4,999 for online classes. CTET preparation is priced at ₹9,999 (discounted from ₹15,999). We also offer EMI options and scholarships up to 50%.';
            } else if (lowerInput.includes('enroll') || lowerInput.includes('join') || lowerInput.includes('admission')) {
                return 'You can enroll by filling the admission form on our website or by visiting our campus at 123 Civil Lines, Prayagraj. You can also call us at +91 98765 43210. Would you like me to guide you to the admission form?';
            } else if (lowerInput.includes('demo') || lowerInput.includes('trial')) {
                return 'Yes! We offer 3 free demo classes for all courses. You can book a demo by clicking the "Book Free Demo" button on our homepage or by calling our helpline.';
            } else if (lowerInput.includes('faculty') || lowerInput.includes('teacher')) {
                return 'Our faculty includes Dr. Rajesh Sharma (Founder, 25+ years exp), Dr. Priya Singh (Child Development Expert), Prof. Amit Verma (Mathematics), and 47 more expert educators.';
            } else if (lowerInput.includes('result') || lowerInput.includes('success')) {
                return 'We have a 98% success rate! In 2023-24, over 15,000 of our students got selected. Our students have secured AIR 1 in CTET, AIR 3 in UPTET, and many more top ranks.';
            } else if (lowerInput.includes('offline') || lowerInput.includes('online') || lowerInput.includes('mode')) {
                return 'We offer three learning modes: Offline classes (₹7,999+), Online classes (₹4,999+), and Hybrid program (₹11,999+). All modes include study material and test series.';
            } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('call')) {
                return 'You can reach us at: Phone: +91 98765 43210, Email: info@ananyaacademy.in, Address: 123 Civil Lines, Prayagraj. We are also available on WhatsApp!';
            } else if (lowerInput.includes('scholarship') || lowerInput.includes('discount')) {
                return 'We offer merit-based scholarships up to 50% fee waiver. Early bird registrations get 20% off. Group enrollments and EWS students also get special discounts.';
            } else if (lowerInput.includes('timing') || lowerInput.includes('schedule') || lowerInput.includes('batch')) {
                return 'We have multiple batches throughout the day: Morning (7-10 AM), Afternoon (12-3 PM), and Evening (5-8 PM). Weekend batches are also available. New batches start every Monday!';
            } else {
                return 'Thank you for your question! For more detailed information, please call us at +91 98765 43210 or visit our campus. You can also fill the enquiry form and our team will contact you within 24 hours.';
            }
        }

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });

        // Expose sendSuggestion globally
        window.sendSuggestion = function(text) {
            chatInput.value = text;
            sendMessage();
        };
    }

    // ========================================
    // NOTIFICATION BAR
    // ========================================
    function initNotificationBar() {
        const notificationBar = document.getElementById('notificationBar');
        const notificationClose = document.getElementById('notificationClose');

        if (!notificationClose) return;

        // Check if user previously closed
        if (localStorage.getItem('notificationClosed') === 'true') {
            notificationBar.style.display = 'none';
        }

        notificationClose.addEventListener('click', function() {
            notificationBar.style.display = 'none';
            localStorage.setItem('notificationClosed', 'true');
        });
    }

    // ========================================
    // BACK TO TOP
    // ========================================
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // COUNTDOWN TIMER
    // ========================================
    function initCountdown() {
        const countdownEl = document.getElementById('admissionCountdown');
        if (!countdownEl) return;

        // Set target date (15 days from now)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 15);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('countDays').textContent = String(days).padStart(2, '0');
            document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
            document.getElementById('countMinutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('countSeconds').textContent = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ========================================
    // FORM HANDLING
    // ========================================
    function initForms() {
        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Thank you! Your enquiry has been submitted. We will contact you within 24 hours.', 'success');
                this.reset();
            });
        }

        // Admission form
        const admissionForm = document.getElementById('admissionForm');
        if (admissionForm) {
            admissionForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Application submitted successfully! Our team will contact you shortly.', 'success');
                this.reset();
            });
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            });
        }

        // Result form
        const resultForm = document.getElementById('resultForm');
        if (resultForm) {
            resultForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Result feature coming soon! Please contact our office for your results.', 'info');
            });
        }
    }

    // Notification toast
    function showNotification(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `notification-toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        // Add styles
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 5000;
            transform: translateX(120%);
            transition: transform 0.4s ease;
            font-weight: 500;
        `;

        setTimeout(() => toast.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // ========================================
    // LIGHTBOX
    // ========================================
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');
        const galleryItems = document.querySelectorAll('.gallery-item img');
        let currentIndex = 0;

        if (!lightbox) return;

        galleryItems.forEach((img, index) => {
            img.parentElement.addEventListener('click', function() {
                currentIndex = index;
                openLightbox(img.src);
            });
        });

        function openLightbox(src) {
            lightboxImage.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 100;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // MODAL FUNCTIONS (Global)
    // ========================================
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Close modal on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });

    // ========================================
    // DOWNLOAD BROCHURE
    // ========================================
    window.downloadBrochure = function() {
        showNotification('Brochure download started! Check your downloads folder.', 'success');
    };

})();

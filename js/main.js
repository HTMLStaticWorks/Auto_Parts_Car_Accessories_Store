document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll (if included)
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync Lenis with GSAP ScrollTrigger
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
    }

    // Interactive Lighting
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update interactive lighting if exists
        const ambientLight = document.querySelector('.ambient-light');
        if (ambientLight) {
            gsap.to(ambientLight, {
                x: mouseX - window.innerWidth / 2,
                y: mouseY - window.innerHeight / 2,
                duration: 1,
                ease: "power2.out"
            });
        }
    });

    // 3. Magnetic Buttons/Elements
    const magneticElements = document.querySelectorAll('.magnetic-wrap');
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(elem, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // 4. Navbar Shrink on Scroll
    const navbar = document.querySelector('.navbar-glass');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 5. Loading Screen
    const loader = document.querySelector('.loader-wrapper');
    const progressBar = document.querySelector('.loader-progress');
    
    if (loader && progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Hide loader
                gsap.to(loader, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                    delay: 0.2,
                    onComplete: () => {
                        loader.style.display = 'none';
                        // Trigger entry animations here
                        triggerEntryAnimations();
                    }
                });
            }
            progressBar.style.width = progress + '%';
        }, 100);
    } else {
        triggerEntryAnimations();
    }

    function triggerEntryAnimations() {
        if(typeof gsap !== 'undefined') {
            gsap.utils.toArray('.fade-up').forEach(elem => {
                gsap.from(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });
            
            // 3D Tilt Effect on cards
            const tiltCards = document.querySelectorAll('.tilt-card');
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const multiplier = 20;
                    const xRotate = multiplier * ((y - rect.height / 2) / rect.height);
                    const yRotate = -multiplier * ((x - rect.width / 2) / rect.width);
                    
                    gsap.to(card, {
                        rotationX: xRotate,
                        rotationY: yRotate,
                        transformPerspective: 1000,
                        ease: "power2.out",
                        duration: 0.5
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotationX: 0,
                        rotationY: 0,
                        ease: "power2.out",
                        duration: 0.5
                    });
                });
            });
        }
    }

    // Apply saved theme immediately
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        // Try to update icons if they exist
        setTimeout(() => {
            const icons = document.querySelectorAll('i[data-lucide="moon"], i[data-lucide="sun"]');
            icons.forEach(icon => {
                icon.setAttribute('data-lucide', savedTheme === 'light' ? 'sun' : 'moon');
            });
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 100);
    }

    // Theme toggle logic via event delegation
    document.body.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#themeToggle, #themeBtn, a:has(i[data-lucide="moon"]), a:has(i[data-lucide="sun"])');
        if (toggleBtn) {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update all theme icons on page
            const icons = document.querySelectorAll('i[data-lucide="moon"], i[data-lucide="sun"]');
            icons.forEach(icon => {
                icon.setAttribute('data-lucide', newTheme === 'light' ? 'sun' : 'moon');
            });
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    });

    const rtlToggle = document.getElementById('rtlToggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', (e) => {
            e.preventDefault();
            document.documentElement.dir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
        });
    }

    // Scroll To Top Button
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // --- Gallery Carousel ---
    const slideContainer = document.querySelector('.carousel-slide');
    const slides = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let counter = 0;
    const size = slides.length;

    // Initially position
    updateSlidePosition();

    nextBtn.addEventListener('click', () => {
        if (counter >= size - 1) {
            counter = 0; // Loop back to start
        } else {
            counter++;
        }
        updateSlidePosition();
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) {
            counter = size - 1; // Loop to end
        } else {
            counter--;
        }
        updateSlidePosition();
    });

    function updateSlidePosition() {
        // Translate X by -100% * counter
        slideContainer.style.transform = 'translateX(' + (-counter * 100) + '%)';
    }


    // --- Header Background on Scroll (Optional, to enhance effect) ---
    const header = document.querySelector('.glass-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            header.style.boxShadow = 'none';
        }
    });

    // --- Simple Scroll Fade In Animation ---
    const fadeElems = document.querySelectorAll('.fade-in-left, .fade-in-right');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        // Add basic CSS for these transitions in JS for simplicity or ensure it matches CSS
        elem.style.opacity = '0';
        elem.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        if (elem.classList.contains('fade-in-left')) {
            elem.style.transform = 'translateX(-30px)';
        } else {
            elem.style.transform = 'translateX(30px)';
        }
        
        observer.observe(elem);
    });

    // Add CSS class for 'appear' 
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .appear {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});

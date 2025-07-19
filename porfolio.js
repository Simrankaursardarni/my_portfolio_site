document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbar = document.querySelector('.navbar');

    if (mobileMenuToggle && navbar) {
        mobileMenuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active'); // Optional: change icon if needed
        });

        // Close mobile menu when a link is clicked
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // --- Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Active Navigation Link on Scroll (Basic) ---
    // This is a basic implementation. For more robust solutions, consider Intersection Observer API.
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    function highlightNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - (window.innerHeight * 0.3); // Adjust offset for better timing
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Initial call and on scroll
    highlightNavLink();
    window.addEventListener('scroll', highlightNavLink);


    // --- Smooth Scrolling for Navigation (if not using CSS scroll-behavior) ---
    // If you uncomment this, remove `scroll-behavior: smooth;` from html in CSS.
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();

    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });
});
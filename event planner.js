document.addEventListener('DOMContentLoaded', function() {
  // --- Mobile Menu Toggle ---
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navbar = document.querySelector('.navbar');

  if (mobileMenuToggle && navbar) {
      mobileMenuToggle.addEventListener('click', function() {
          navbar.classList.toggle('active'); // Toggles visibility of the mobile nav
          // Toggles the hamburger icon to a close (X) icon and vice-versa
          const icon = mobileMenuToggle.querySelector('i');
          if (navbar.classList.contains('active')) {
              icon.classList.remove('fa-bars');
              icon.classList.add('fa-times');
          } else {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          }
      });

      // Close mobile menu when a navigation link is clicked for better UX
      navbar.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
              navbar.classList.remove('active');
              mobileMenuToggle.querySelector('i').classList.remove('fa-times');
              mobileMenuToggle.querySelector('i').classList.add('fa-bars');
          });
      });
  }

  // --- Dynamic Year in Footer ---
  // Automatically updates the copyright year to the current year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- Testimonial Carousel ---
  const carousel = document.getElementById('testimonialCarousel');
  const slides = carousel ? carousel.querySelectorAll('.testimonial-slide') : [];
  const dotsContainer = document.querySelector('.carousel-nav');
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
  let currentSlide = 0;
  let slideInterval; // Variable to hold the interval timer

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.classList.remove('active');
          dots[i].classList.remove('active');
          if (i === index) {
              slide.classList.add('active');
              dots[i].classList.add('active');
          }
      });
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }

  function startCarousel() {
      if (slides.length > 1) { // Only start if there's more than one slide
          slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
      }
  }

  function stopCarousel() {
      clearInterval(slideInterval);
  }

  // Add click listeners to dots
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          stopCarousel(); // Stop auto-slide on manual navigation
          currentSlide = index;
          showSlide(currentSlide);
          startCarousel(); // Restart auto-slide after a brief pause
      });
  });

  if (slides.length > 0) {
      showSlide(currentSlide); // Show the initial slide
      startCarousel(); // Start the automatic carousel
  }

  // --- Newsletter Form Submission (Frontend only) ---
  document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', function(e) {
          e.preventDefault(); // Prevent default form submission
          const emailInput = this.querySelector('input[type="email"]');
          if (emailInput && emailInput.value && emailInput.checkValidity()) {
              // Frontend message: In a real scenario, this email would be sent to a newsletter service
              alert('Thank you for subscribing, ' + emailInput.value + '! You\'ll receive our latest updates.');
              emailInput.value = ''; // Clear the input field
          } else {
              alert('Please enter a valid email address to subscribe.');
          }
      });
  });
});
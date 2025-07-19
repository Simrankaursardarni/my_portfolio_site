document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const eventTypeSelect = document.getElementById('eventType');

    // Pre-fill event type if coming from services page link
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam && eventTypeSelect) {
        // Find if an option with that value exists and select it
        const optionExists = Array.from(eventTypeSelect.options).some(option => option.value === serviceParam);
        if (optionExists) {
            eventTypeSelect.value = serviceParam;
        }
    }


    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission for frontend demo

            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            // Basic client-side validation
            requiredFields.forEach(field => {
                if (!field.value.trim()) { // Check if field is empty or just whitespace
                    isValid = false;
                    field.classList.add('error'); // Add a class for visual feedback
                } else {
                    field.classList.remove('error');
                }
            });

            // Specific email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && !emailField.value.includes('@') || !emailField.value.includes('.')) {
                isValid = false;
                emailField.classList.add('error');
            } else {
                 emailField.classList.remove('error');
            }

            if (isValid) {
                // Simulate form submission success
                formMessage.textContent = 'Thank you for your inquiry! We will get back to you shortly.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                formMessage.style.display = 'block';

                contactForm.reset(); // Clear the form

                // In a real application, you would send this data to a backend using Fetch API or XMLHttpRequest:
                /*
                const formData = new FormData(contactForm);
                fetch('/api/contact', { // Replace with your actual API endpoint
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formMessage.textContent = 'Thank you for your inquiry! We will get back to you shortly.';
                        formMessage.classList.remove('error');
                        formMessage.classList.add('success');
                        contactForm.reset();
                    } else {
                        formMessage.textContent = 'There was an error sending your message. Please try again.';
                        formMessage.classList.remove('success');
                        formMessage.classList.add('error');
                    }
                    formMessage.style.display = 'block';
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    formMessage.textContent = 'Network error. Please try again later.';
                    formMessage.classList.remove('success');
                    formMessage.classList.add('error');
                    formMessage.style.display = 'block';
                });
                */

            } else {
                formMessage.textContent = 'Please fill in all required fields correctly.';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            }
        });

        // Optional: Remove error class on input for better UX as user types
        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
                // Hide message if user starts typing after an error
                if (formMessage.style.display === 'block' && formMessage.classList.contains('error')) {
                    formMessage.style.display = 'none';
                }
            });
        });
    }
});
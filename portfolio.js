document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-buttons .button');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove 'active' class from all buttons and add to the clicked one
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter; // Get the filter category (e.g., 'wedding', 'corporate', 'all')

                galleryItems.forEach(item => {
                    const itemCategory = item.dataset.category; // Get the category of the gallery item

                    if (filter === 'all' || itemCategory === filter) {
                        item.style.display = 'block'; // Show matching items
                    } else {
                        item.style.display = 'none'; // Hide non-matching items
                    }
                });
            });
        });
    }
});
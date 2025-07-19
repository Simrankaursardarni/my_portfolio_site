document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-buttons .button');
    const productGrid = document.getElementById('productGrid');
    const allProductCards = productGrid ? Array.from(productGrid.querySelectorAll('.product-card')) : [];
    const sortSelect = document.getElementById('sortOrder');

    let currentFilter = 'all'; // Default filter
    let currentSort = 'default'; // Default sort

    function applyFiltersAndSort() {
        let filteredProducts = [];

        // 1. Filter
        if (currentFilter === 'all') {
            filteredProducts = [...allProductCards];
        } else {
            filteredProducts = allProductCards.filter(card => card.dataset.category === currentFilter);
        }

        // 2. Sort
        filteredProducts.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            const nameA = a.dataset.name.toLowerCase();
            const nameB = b.dataset.name.toLowerCase();

            if (currentSort === 'price-asc') {
                return priceA - priceB;
            } else if (currentSort === 'price-desc') {
                return priceB - priceA;
            } else if (currentSort === 'name-asc') {
                return nameA.localeCompare(nameB);
            }
            // For 'default' or any other value, maintain original order for now (or apply a specific 'featured' logic if present)
            return 0; // No change in order if default
        });

        // 3. Update the DOM
        // Clear existing products
        productGrid.innerHTML = '';
        // Append sorted and filtered products
        filteredProducts.forEach(card => {
            card.style.display = 'flex'; // Ensure visible
            card.style.opacity = 1;
            card.style.transform = 'scale(1)';
            productGrid.appendChild(card);
        });

        // Hide non-filtered items
        allProductCards.forEach(card => {
            if (currentFilter !== 'all' && card.dataset.category !== currentFilter) {
                card.style.opacity = 0;
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300); // Match CSS transition duration
            }
        });
    }

    // Event Listeners for Filters
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            applyFiltersAndSort();
        });
    });

    // Event Listener for Sorting
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            applyFiltersAndSort();
        });
    }

    // Initial Load: Apply filter from URL parameter or default to 'all'
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const initialFilterButton = document.querySelector(`.filter-buttons .button[data-filter="${categoryParam}"]`);
        if (initialFilterButton) {
            initialFilterButton.click(); // Simulate a click to apply the filter
        } else {
            // If URL category doesn't exist, default to 'all'
            document.querySelector('.filter-buttons .button[data-filter="all"]').click();
        }
    } else {
        // Default to 'All' filter and 'default' sort on page load if no parameter
        document.querySelector('.filter-buttons .button[data-filter="all"]').click();
    }
});
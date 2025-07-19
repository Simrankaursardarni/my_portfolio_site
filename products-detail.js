document.addEventListener('DOMContentLoaded', function() {
    // --- Thumbnail Gallery for Product Images ---
    const mainProductImage = document.getElementById('mainProductImage');
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');

    if (mainProductImage && thumbnailGallery) {
        const thumbnails = thumbnailGallery.querySelectorAll('img');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active-thumb'));
                // Add active class to clicked thumbnail
                this.classList.add('active-thumb');
                // Change the main image src to the full-size image data attribute
                mainProductImage.src = this.dataset.fullSrc;
                mainProductImage.alt = this.alt; // Update alt text too
            });
        });
    }

    // --- Dummy Add to Bag Button (for demonstration) ---
    const addToBagButton = document.querySelector('.add-to-bag-button');
    const quantityInput = document.getElementById('quantity');

    if (addToBagButton && quantityInput) {
        addToBagButton.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const quantity = quantityInput.value;
            alert(`Added ${quantity} of product ${productId} to bag! (This is a dummy action)`);

            // In a real application, you'd send this to a backend or update local storage/cart UI
            // Example: updateCart(productId, quantity);
        });
    }

    // --- Dummy Product Data Loading (for demonstration) ---
    // In a real application, this data would come from an API or a backend.
    // Here, we simulate loading data based on a URL parameter.
    const productData = {
        'serum': {
            name: 'Hydrating Glow Serum',
            price: '₹1,850',
            description: 'An intensive hydrating serum infused with Hyaluronic Acid and Niacinamide to plump, smooth, and restore your skin\'s natural moisture barrier. Achieve a dewy, radiant complexion with just a few drops.',
            mainImage: 'images/product-serum-large.jpg',
            thumbnails: [
                { src: 'images/product-serum.jpg', alt: 'Hydrating Glow Serum Bottle', fullSrc: 'images/product-serum-large.jpg' },
                { src: 'images/product-serum-texture.jpg', alt: 'Serum Texture', fullSrc: 'images/product-serum-texture.jpg' },
                { src: 'images/product-serum-usage.jpg', alt: 'Serum Usage', fullSrc: 'images/product-serum-usage.jpg' }
            ],
            benefits: [
                'Deeply hydrates and plumps skin',
                'Improves skin texture and elasticity',
                'Minimizes appearance of fine lines',
                'Boosts natural radiance'
            ],
            ingredients: [
                '**Hyaluronic Acid:** Superior hydration, plumps skin.',
                '**Niacinamide (Vitamin B3):** Minimizes pores, evens tone.',
                '**Glycerin:** Attracts and locks in moisture.',
                '**Green Tea Extract:** Antioxidant protection.'
            ],
            howToUse: 'Apply 2-3 drops to clean, damp skin after toning. Gently pat onto face and neck until absorbed. Follow with your favorite moisturizer. Use morning and night.'
        },
        'moisturizer': {
            name: 'Deep Hydration Cream',
            price: '₹1,500',
            description: 'A rich, nourishing cream formulated with ceramides and peptides to lock in moisture, strengthen the skin barrier, and provide lasting hydration. Ideal for dry and normal skin types.',
            mainImage: 'images/product-moisturizer-large.jpg',
            thumbnails: [
                { src: 'images/product-moisturizer.jpg', alt: 'Deep Hydration Cream Jar', fullSrc: 'images/product-moisturizer-large.jpg' },
                { src: 'images/product-moisturizer-texture.jpg', alt: 'Cream Texture', fullSrc: 'images/product-moisturizer-texture.jpg' }
            ],
            benefits: [
                'Provides intense, long-lasting hydration',
                'Strengthens skin\'s natural barrier',
                'Reduces dryness and flakiness',
                'Promotes a smooth, supple complexion'
            ],
            ingredients: [
                '**Ceramides:** Restores skin barrier function.',
                '**Peptides:** Supports collagen production.',
                '**Shea Butter:** Rich emollient for nourishment.',
                '**Squalane:** Non-greasy moisturizing oil.'
            ],
            howToUse: 'Apply a generous amount to face and neck after serum. Gently massage until absorbed. Use morning and night.'
        },
        // Add more product data here as needed
    };

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId && productData[productId]) {
        const product = productData[productId];

        // Update page title
        const productTitleElement = document.getElementById('productTitle');
        if (productTitleElement) productTitleElement.textContent = `${product.name} - Radiance Skincare`;

        // Update product name
        const productNameElement = document.getElementById('productName');
        if (productNameElement) productNameElement.textContent = product.name;

        // Update product price
        const productPriceElement = document.getElementById('productPrice');
        if (productPriceElement) productPriceElement.textContent = product.price;

        // Update product description
        const productDescriptionElement = document.getElementById('productDescription');
        if (productDescriptionElement) productDescriptionElement.textContent = product.description;

        // Update main product image
        if (mainProductImage) {
            mainProductImage.src = product.mainImage;
            mainProductImage.alt = product.name;
        }

        // Update thumbnail gallery
        if (thumbnailGallery) {
            thumbnailGallery.innerHTML = ''; // Clear existing thumbnails
            product.thumbnails.forEach((thumb, index) => {
                const img = document.createElement('img');
                img.src = thumb.src;
                img.alt = thumb.alt;
                img.dataset.fullSrc = thumb.fullSrc;
                if (index === 0) { // Set the first one as active
                    img.classList.add('active-thumb');
                }
                img.addEventListener('click', function() {
                    thumbnails.forEach(t => t.classList.remove('active-thumb'));
                    this.classList.add('active-thumb');
                    mainProductImage.src = this.dataset.fullSrc;
                    mainProductImage.alt = this.alt;
                });
                thumbnailGallery.appendChild(img);
            });
        }

        // Update key benefits
        const benefitsList = document.querySelector('.product-features ul');
        if (benefitsList) {
            benefitsList.innerHTML = '';
            product.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check-circle"></i> ${benefit}`;
                benefitsList.appendChild(li);
            });
        }

        // Update star ingredients
        const ingredientsList = document.querySelector('.product-ingredients ul');
        if (ingredientsList) {
            ingredientsList.innerHTML = '';
            product.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.innerHTML = ingredient; // Assuming ingredient text might contain bold markdown
                ingredientsList.appendChild(li);
            });
        }

        // Update how to use
        const howToUseSection = document.querySelector('.how-to-use p');
        if (howToUseSection) {
            howToUseSection.textContent = product.howToUse;
        }

        // Update Add to Bag button data
        if (addToBagButton) {
            addToBagButton.dataset.productId = productId;
        }

    } else if (productId) {
        // Product not found, maybe redirect to 404 or products page
        console.warn(`Product with ID '${productId}' not found.`);
        // Optional: window.location.href = 'products.html';
    }
});
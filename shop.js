// Shopping Cart and Checkout System
let cart = [];
let cartCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    setupShopListeners();
    updateCartDisplay();
});

function setupShopListeners() {
    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openCartModal();
        });
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCheckout();
        });
    }
    
    // Product management (admin)
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', openAddProductModal);
    }
    
    const editProductForm = document.getElementById('editProductForm');
    if (editProductForm) {
        editProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProduct();
        });
    }
}

function loadCart() {
    const savedCart = localStorage.getItem('gutech_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('gutech_cart', JSON.stringify(cart));
}

function addToCart(productId, productName, price) {
    // Get size if applicable
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const sizeSelect = productCard.querySelector('.size-select');
    let size = null;
    
    if (sizeSelect) {
        size = sizeSelect.value;
        if (!size) {
            showNotification('Please select a size first!');
            return;
        }
    }
    
    // Check if item already in cart
    const existingItemIndex = cart.findIndex(item => 
        item.productId === productId && item.size === size
    );
    
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            productId: productId,
            productName: productName,
            price: price,
            size: size,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${productName} added to cart!`);
    
    // Reset size selection
    if (sizeSelect) {
        sizeSelect.value = '';
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    updateCartModal();
    showNotification('Item removed from cart');
}

function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function updateCartDisplay() {
    updateCartCount();
}

function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
    updateCartModal();
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

function updateCartModal() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotalSpan.textContent = '0';
        return;
    }
    
    let total = 0;
    let html = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.productName}</h4>
                    <p>${item.size ? 'Size: ' + item.size + ' | ' : ''}Quantity: ${item.quantity}</p>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="cart-item-price">${itemTotal.toFixed(2)} OMR</span>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartItemsDiv.innerHTML = html;
    cartTotalSpan.textContent = total.toFixed(2);
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    closeCartModal();
    openCheckoutModal();
}

function openCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'block';
    updateCheckoutSummary();
    
    // Pre-fill email if user is logged in
    if (currentUser && currentUser.email) {
        document.getElementById('checkoutEmail').value = currentUser.email;
        if (currentUser.displayName) {
            document.getElementById('checkoutName').value = currentUser.displayName;
        }
    }
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function updateCheckoutSummary() {
    const checkoutItemsDiv = document.getElementById('checkoutItems');
    const checkoutTotalSpan = document.getElementById('checkoutTotal');
    
    let total = 0;
    let html = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="checkout-item">
                <span>${item.productName} ${item.size ? '(' + item.size + ')' : ''} x${item.quantity}</span>
                <span>${itemTotal.toFixed(2)} OMR</span>
            </div>
        `;
    });
    
    checkoutItemsDiv.innerHTML = html;
    checkoutTotalSpan.textContent = total.toFixed(2);
}

async function handleCheckout() {
    const name = document.getElementById('checkoutName').value;
    const email = document.getElementById('checkoutEmail').value;
    const phone = document.getElementById('checkoutPhone').value;
    const address = document.getElementById('checkoutAddress').value;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        deliveryAddress: address,
        items: cart,
        total: total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: currentUser ? currentUser.uid : null
    };
    
    try {
        // Save order to Firebase if available
        if (typeof firebase !== 'undefined' && firebase.database) {
            const orderRef = firebase.database().ref('orders').push();
            await orderRef.set(order);
            
            // Send email notification (you would need to set up Firebase Cloud Functions for this)
            console.log('Order placed:', order);
        }
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();
        
        // Close modal
        closeCheckoutModal();
        
        // Show success message
        showNotification('Order placed successfully! We will contact you soon.');
        
        // Optionally, send order details via email (requires backend)
        sendOrderConfirmation(order);
        
    } catch (error) {
        console.error('Checkout error:', error);
        showNotification('Error placing order. Please try again.');
    }
}

function sendOrderConfirmation(order) {
    // This would typically be handled by a backend service
    // For now, we'll just log it and show the user
    console.log('Order confirmation email would be sent to:', order.customerEmail);
    console.log('Order details:', order);
    
    // You could integrate with EmailJS or another email service here
    // Example: https://www.emailjs.com/
}

// Product Management Functions (Admin Only)
function editProduct(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const name = productCard.querySelector('.product-name').textContent;
    const description = productCard.querySelector('.product-description').textContent;
    const priceText = productCard.querySelector('.product-price').textContent;
    const price = parseFloat(priceText.replace(' OMR', ''));
    const hasSizes = productCard.querySelector('.size-select') !== null;
    
    document.getElementById('productModalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = productId;
    document.getElementById('productName').value = name;
    document.getElementById('productDescription').value = description;
    document.getElementById('productPrice').value = price;
    document.getElementById('productHasSizes').checked = hasSizes;
    document.getElementById('productImageUrl').value = '';
    
    document.getElementById('editProductModal').style.display = 'block';
}

function openAddProductModal() {
    // Get the highest product ID and add 1
    const productCards = document.querySelectorAll('.product-card[data-product-id]');
    let maxId = 0;
    productCards.forEach(card => {
        const id = parseInt(card.getAttribute('data-product-id'));
        if (id > maxId) maxId = id;
    });
    
    document.getElementById('productModalTitle').textContent = 'Add New Product';
    document.getElementById('productId').value = maxId + 1;
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productHasSizes').checked = false;
    document.getElementById('productImageUrl').value = '';
    
    document.getElementById('editProductModal').style.display = 'block';
}

function saveProduct() {
    const productId = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const hasSizes = document.getElementById('productHasSizes').checked;
    const imageUrl = document.getElementById('productImageUrl').value;
    
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    
    if (productCard) {
        // Update existing product
        productCard.querySelector('.product-name').textContent = name;
        productCard.querySelector('.product-description').textContent = description;
        productCard.querySelector('.product-price').textContent = `${price} OMR`;
        
        if (imageUrl) {
            const placeholder = productCard.querySelector('.product-placeholder');
            placeholder.style.backgroundImage = `url(${imageUrl})`;
            placeholder.style.backgroundSize = 'cover';
            placeholder.style.backgroundPosition = 'center';
            placeholder.textContent = '';
        }
        
        // Update size selector
        const productActions = productCard.querySelector('.product-actions');
        const existingSizeSelect = productCard.querySelector('.size-select');
        
        if (hasSizes && !existingSizeSelect) {
            const sizeSelect = document.createElement('select');
            sizeSelect.className = 'size-select';
            sizeSelect.innerHTML = `
                <option value="">Select Size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">X-Large</option>
            `;
            productActions.insertBefore(sizeSelect, productActions.firstChild);
        } else if (!hasSizes && existingSizeSelect) {
            existingSizeSelect.remove();
        }
        
        showNotification('Product updated successfully!');
    } else {
        // Add new product
        addNewProduct(productId, name, description, price, hasSizes, imageUrl);
        showNotification('Product added successfully!');
    }
    
    closeEditProductModal();
}

function addNewProduct(productId, name, description, price, hasSizes, imageUrl) {
    const productsGrid = document.getElementById('productsGrid');
    const newProductCard = document.createElement('div');
    newProductCard.className = 'product-card';
    newProductCard.setAttribute('data-product-id', productId);
    
    let imagePlaceholderStyle = '';
    let imagePlaceholderContent = name;
    
    if (imageUrl) {
        imagePlaceholderStyle = `style="background-image: url(${imageUrl}); background-size: cover; background-position: center;"`;
        imagePlaceholderContent = '';
    }
    
    const sizeSelectHTML = hasSizes ? `
        <select class="size-select">
            <option value="">Select Size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">X-Large</option>
        </select>
    ` : '';
    
    newProductCard.innerHTML = `
        <div class="product-image">
            <div class="product-placeholder" ${imagePlaceholderStyle}>${imagePlaceholderContent}</div>
        </div>
        <div class="product-info">
            <h3 class="product-name">${name}</h3>
            <p class="product-description">${description}</p>
            <div class="product-price">${price} OMR</div>
            <div class="product-actions">
                ${sizeSelectHTML}
                <button class="btn btn-primary add-to-cart" onclick="addToCart(${productId}, '${name}', ${price})">Add to Cart</button>
            </div>
        </div>
        <div class="admin-only edit-controls" style="display: ${isAdmin ? 'flex' : 'none'};">
            <button class="btn-edit" onclick="editProduct(${productId})">Edit</button>
            <button class="btn-delete" onclick="deleteProduct(${productId})">Delete</button>
        </div>
    `;
    
    productsGrid.appendChild(newProductCard);
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            productCard.remove();
            showNotification('Product deleted successfully!');
        }
    }
}

function closeEditProductModal() {
    document.getElementById('editProductModal').style.display = 'none';
}

// Make functions globally accessible
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.closeCartModal = closeCartModal;
window.proceedToCheckout = proceedToCheckout;
window.closeCheckoutModal = closeCheckoutModal;
window.closeEditProductModal = closeEditProductModal;


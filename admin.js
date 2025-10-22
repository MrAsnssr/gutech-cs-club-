// Admin Panel for Events and Gallery Management
// Note: Admin access is now controlled by Firebase authentication
// Users with admin@gutech.edu.om will have admin privileges

let allOrders = [];
let filteredOrders = [];

document.addEventListener('DOMContentLoaded', function() {
    setupEventManagement();
    setupGalleryManagement();
    setupOrdersManagement();
    setupAdminSettings();
});

function setupEventManagement() {
    const addEventBtn = document.getElementById('addEventBtn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', openAddEventModal);
    }
    
    const editEventForm = document.getElementById('editEventForm');
    if (editEventForm) {
        editEventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveEvent();
        });
    }
}

function setupGalleryManagement() {
    const addGalleryBtn = document.getElementById('addGalleryBtn');
    if (addGalleryBtn) {
        addGalleryBtn.addEventListener('click', openAddGalleryModal);
    }
    
    const editGalleryForm = document.getElementById('editGalleryForm');
    if (editGalleryForm) {
        editGalleryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveGalleryItem();
        });
    }
}

// Event Management Functions
function editEvent(eventId) {
    const eventCard = document.querySelector(`[data-event-id="${eventId}"]`);
    const title = eventCard.querySelector('.event-title').textContent;
    const date = eventCard.querySelector('.event-date').textContent;
    const description = eventCard.querySelector('.event-description').textContent;
    
    document.getElementById('eventModalTitle').textContent = 'Edit Event';
    document.getElementById('eventId').value = eventId;
    document.getElementById('eventTitle').value = title;
    document.getElementById('eventDate').value = date;
    document.getElementById('eventDescription').value = description;
    
    document.getElementById('editEventModal').style.display = 'block';
}

function openAddEventModal() {
    const eventCards = document.querySelectorAll('.event-card[data-event-id]');
    let maxId = 0;
    eventCards.forEach(card => {
        const id = parseInt(card.getAttribute('data-event-id'));
        if (id > maxId) maxId = id;
    });
    
    document.getElementById('eventModalTitle').textContent = 'Add New Event';
    document.getElementById('eventId').value = maxId + 1;
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventDescription').value = '';
    
    document.getElementById('editEventModal').style.display = 'block';
}

function saveEvent() {
    const eventId = document.getElementById('eventId').value;
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const description = document.getElementById('eventDescription').value;
    
    const eventCard = document.querySelector(`[data-event-id="${eventId}"]`);
    
    if (eventCard) {
        // Update existing event
        eventCard.querySelector('.event-title').textContent = title;
        eventCard.querySelector('.event-date').textContent = date;
        eventCard.querySelector('.event-description').textContent = description;
        showNotification('Event updated successfully!');
    } else {
        // Add new event
        const eventsGrid = document.getElementById('eventsGrid');
        const newEventCard = document.createElement('div');
        newEventCard.className = 'event-card';
        newEventCard.setAttribute('data-event-id', eventId);
        newEventCard.innerHTML = `
            <h3 class="event-title">${title}</h3>
            <p class="event-date">${date}</p>
            <p class="event-description">${description}</p>
            <div class="admin-only edit-controls" style="display: ${isAdmin ? 'flex' : 'none'};">
                <button class="btn-edit" onclick="editEvent(${eventId})">Edit</button>
                <button class="btn-delete" onclick="deleteEvent(${eventId})">Delete</button>
            </div>
        `;
        eventsGrid.appendChild(newEventCard);
        showNotification('Event added successfully!');
    }
    
    closeEditEventModal();
}

function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        const eventCard = document.querySelector(`[data-event-id="${eventId}"]`);
        if (eventCard) {
            eventCard.remove();
            showNotification('Event deleted successfully!');
        }
    }
}

function closeEditEventModal() {
    document.getElementById('editEventModal').style.display = 'none';
}

// Gallery Management Functions
function editGalleryItem(galleryId) {
    const galleryItem = document.querySelector(`[data-gallery-id="${galleryId}"]`);
    const caption = galleryItem.querySelector('.gallery-placeholder').textContent;
    
    document.getElementById('galleryModalTitle').textContent = 'Edit Gallery Item';
    document.getElementById('galleryId').value = galleryId;
    document.getElementById('galleryCaption').value = caption;
    document.getElementById('galleryImageUrl').value = '';
    
    document.getElementById('editGalleryModal').style.display = 'block';
}

function openAddGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item[data-gallery-id]');
    let maxId = 0;
    galleryItems.forEach(item => {
        const id = parseInt(item.getAttribute('data-gallery-id'));
        if (id > maxId) maxId = id;
    });
    
    document.getElementById('galleryModalTitle').textContent = 'Add New Gallery Item';
    document.getElementById('galleryId').value = maxId + 1;
    document.getElementById('galleryCaption').value = '';
    document.getElementById('galleryImageUrl').value = '';
    
    document.getElementById('editGalleryModal').style.display = 'block';
}

function saveGalleryItem() {
    const galleryId = document.getElementById('galleryId').value;
    const caption = document.getElementById('galleryCaption').value;
    const imageUrl = document.getElementById('galleryImageUrl').value;
    
    const galleryItem = document.querySelector(`[data-gallery-id="${galleryId}"]`);
    
    if (galleryItem) {
        // Update existing gallery item
        const placeholder = galleryItem.querySelector('.gallery-placeholder');
        placeholder.textContent = caption;
        
        if (imageUrl) {
            placeholder.style.backgroundImage = `url(${imageUrl})`;
            placeholder.style.backgroundSize = 'cover';
            placeholder.style.backgroundPosition = 'center';
            placeholder.textContent = '';
        }
        showNotification('Gallery item updated successfully!');
    } else {
        // Add new gallery item
        const galleryGrid = document.getElementById('galleryGrid');
        const newGalleryItem = document.createElement('div');
        newGalleryItem.className = 'gallery-item';
        newGalleryItem.setAttribute('data-gallery-id', galleryId);
        
        let placeholderStyle = '';
        let placeholderContent = caption;
        
        if (imageUrl) {
            placeholderStyle = `style="background-image: url(${imageUrl}); background-size: cover; background-position: center;"`;
            placeholderContent = '';
        }
        
        newGalleryItem.innerHTML = `
            <div class="gallery-placeholder" ${placeholderStyle}>${placeholderContent}</div>
            <div class="admin-only edit-controls gallery-controls" style="display: ${isAdmin ? 'flex' : 'none'};">
                <button class="btn-edit" onclick="editGalleryItem(${galleryId})">Edit</button>
                <button class="btn-delete" onclick="deleteGalleryItem(${galleryId})">Delete</button>
            </div>
        `;
        galleryGrid.appendChild(newGalleryItem);
        showNotification('Gallery item added successfully!');
    }
    
    closeEditGalleryModal();
}

function deleteGalleryItem(galleryId) {
    if (confirm('Are you sure you want to delete this gallery item?')) {
        const galleryItem = document.querySelector(`[data-gallery-id="${galleryId}"]`);
        if (galleryItem) {
            galleryItem.remove();
            showNotification('Gallery item deleted successfully!');
        }
    }
}

function closeEditGalleryModal() {
    document.getElementById('editGalleryModal').style.display = 'none';
}

// Orders Management Functions
function setupOrdersManagement() {
    const viewOrdersBtn = document.getElementById('viewOrdersBtn');
    if (viewOrdersBtn) {
        viewOrdersBtn.addEventListener('click', openOrdersModal);
    }
    
    // Also setup the main Orders button in Merch section (Admin)
    const viewOrdersBtnMain = document.getElementById('viewOrdersBtnMain');
    if (viewOrdersBtnMain) {
        viewOrdersBtnMain.addEventListener('click', openOrdersModal);
    }
    
    // Setup My Orders button for regular users
    const myOrdersBtn = document.getElementById('myOrdersBtn');
    if (myOrdersBtn) {
        myOrdersBtn.addEventListener('click', openMyOrdersModal);
    }
}

function openOrdersModal() {
    document.getElementById('ordersModal').style.display = 'block';
    loadOrders();
}

function closeOrdersModal() {
    document.getElementById('ordersModal').style.display = 'none';
}

async function loadOrders() {
    const ordersContainer = document.getElementById('ordersContainer');
    ordersContainer.innerHTML = '<div class="loading-orders"><p>Loading orders...</p></div>';
    
    try {
        if (typeof firebase === 'undefined' || !firebase.database) {
            ordersContainer.innerHTML = '<div class="no-orders"><h3>Firebase not configured</h3><p>Please set up Firebase to view orders.</p></div>';
            return;
        }
        
        const ordersRef = firebase.database().ref('orders');
        const snapshot = await ordersRef.once('value');
        const ordersData = snapshot.val();
        
        if (!ordersData) {
            ordersContainer.innerHTML = '<div class="no-orders"><h3>No orders yet</h3><p>Orders will appear here when customers place them.</p></div>';
            updateOrderStats([], []);
            return;
        }
        
        // Convert orders object to array
        allOrders = Object.keys(ordersData).map(key => ({
            id: key,
            ...ordersData[key]
        }));
        
        // Sort by date (newest first)
        allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        filteredOrders = allOrders;
        displayOrders(filteredOrders);
        updateOrderStats(allOrders, filteredOrders);
        
    } catch (error) {
        console.error('Error loading orders:', error);
        ordersContainer.innerHTML = '<div class="no-orders"><h3>Error loading orders</h3><p>Please try again or check console for details.</p></div>';
    }
}

function displayOrders(orders) {
    const ordersContainer = document.getElementById('ordersContainer');
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = '<div class="no-orders"><h3>No orders found</h3><p>Try changing the filter.</p></div>';
        return;
    }
    
    let html = '';
    
    orders.forEach(order => {
        const date = new Date(order.createdAt);
        const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        let itemsHtml = '';
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                itemsHtml += `
                    <div class="order-item">
                        <span>${item.productName} ${item.size ? '(' + item.size + ')' : ''} x${item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)} OMR</span>
                    </div>
                `;
            });
        }
        
        const statusClass = order.status || 'pending';
        const statusButtons = order.status !== 'completed' && order.status !== 'cancelled' ? `
            <div class="order-actions">
                <button class="btn-mark-complete" onclick="updateOrderStatus('${order.id}', 'completed')">✓ Complete</button>
                <button class="btn-mark-cancelled" onclick="updateOrderStatus('${order.id}', 'cancelled')">✗ Cancel</button>
            </div>
        ` : '';
        
        html += `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-id">Order #${order.id.substring(0, 8)}</div>
                        <div class="order-date">${formattedDate}</div>
                    </div>
                    <span class="order-status ${statusClass}">${statusClass.toUpperCase()}</span>
                </div>
                
                <div class="order-customer">
                    <h4>Customer Information</h4>
                    <p><strong>Name:</strong> ${order.customerName}</p>
                    <p><strong>Email:</strong> ${order.customerEmail}</p>
                    <p><strong>Phone:</strong> ${order.customerPhone}</p>
                    <p><strong>Address:</strong> ${order.deliveryAddress}</p>
                </div>
                
                <div class="order-items">
                    <h4>Items Ordered</h4>
                    ${itemsHtml}
                </div>
                
                <div class="order-footer">
                    <div class="order-total">Total: ${order.total.toFixed(2)} OMR</div>
                    ${statusButtons}
                </div>
            </div>
        `;
    });
    
    ordersContainer.innerHTML = html;
}

function updateOrderStats(all, filtered) {
    const totalOrdersEl = document.getElementById('totalOrders');
    const pendingOrdersEl = document.getElementById('pendingOrders');
    const totalRevenueEl = document.getElementById('totalRevenue');
    
    const totalOrders = all.length;
    const pendingOrders = all.filter(o => o.status === 'pending' || !o.status).length;
    const totalRevenue = all.reduce((sum, order) => sum + (order.total || 0), 0);
    
    if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
    if (pendingOrdersEl) pendingOrdersEl.textContent = pendingOrders;
    if (totalRevenueEl) totalRevenueEl.textContent = totalRevenue.toFixed(2) + ' OMR';
}

function filterOrders() {
    const filterValue = document.getElementById('orderStatusFilter').value;
    
    if (filterValue === 'all') {
        filteredOrders = allOrders;
    } else {
        filteredOrders = allOrders.filter(order => {
            const status = order.status || 'pending';
            return status === filterValue;
        });
    }
    
    displayOrders(filteredOrders);
    updateOrderStats(allOrders, filteredOrders);
}

async function updateOrderStatus(orderId, newStatus) {
    try {
        await firebase.database().ref(`orders/${orderId}/status`).set(newStatus);
        showNotification(`Order marked as ${newStatus}!`);
        loadOrders(); // Refresh the list
    } catch (error) {
        console.error('Error updating order status:', error);
        showNotification('Error updating order status');
    }
}

function refreshOrders() {
    showNotification('Refreshing orders...');
    loadOrders();
}

// My Orders Functions (Regular Users)
function openMyOrdersModal() {
    document.getElementById('myOrdersModal').style.display = 'block';
    loadMyOrders();
}

function closeMyOrdersModal() {
    document.getElementById('myOrdersModal').style.display = 'none';
}

async function loadMyOrders() {
    const myOrdersContainer = document.getElementById('myOrdersContainer');
    myOrdersContainer.innerHTML = '<div class="loading-orders"><p>Loading your orders...</p></div>';
    
    try {
        if (typeof firebase === 'undefined' || !firebase.database) {
            myOrdersContainer.innerHTML = '<div class="no-orders"><h3>Firebase not configured</h3><p>Please set up Firebase to view orders.</p></div>';
            return;
        }
        
        if (!currentUser) {
            myOrdersContainer.innerHTML = '<div class="no-orders"><h3>Not logged in</h3><p>Please login to view your orders.</p></div>';
            return;
        }
        
        const ordersRef = firebase.database().ref('orders');
        const snapshot = await ordersRef.once('value');
        const ordersData = snapshot.val();
        
        if (!ordersData) {
            myOrdersContainer.innerHTML = '<div class="no-orders"><h3>No orders yet</h3><p>You haven\'t placed any orders yet.</p></div>';
            return;
        }
        
        // Filter orders for current user
        const myOrders = Object.keys(ordersData)
            .map(key => ({
                id: key,
                ...ordersData[key]
            }))
            .filter(order => order.userId === currentUser.uid || order.customerEmail === currentUser.email);
        
        if (myOrders.length === 0) {
            myOrdersContainer.innerHTML = '<div class="no-orders"><h3>No orders found</h3><p>You haven\'t placed any orders yet.</p></div>';
            return;
        }
        
        // Sort by date (newest first)
        myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        displayMyOrders(myOrders);
        
    } catch (error) {
        console.error('Error loading my orders:', error);
        myOrdersContainer.innerHTML = '<div class="no-orders"><h3>Error loading orders</h3><p>Please try again or check console for details.</p></div>';
    }
}

function displayMyOrders(orders) {
    const myOrdersContainer = document.getElementById('myOrdersContainer');
    
    let html = '';
    
    orders.forEach(order => {
        const date = new Date(order.createdAt);
        const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        let itemsHtml = '';
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                itemsHtml += `
                    <div class="order-item">
                        <span>${item.productName} ${item.size ? '(' + item.size + ')' : ''} x${item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)} OMR</span>
                    </div>
                `;
            });
        }
        
        const statusClass = order.status || 'pending';
        
        html += `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-id">Order #${order.id.substring(0, 8)}</div>
                        <div class="order-date">${formattedDate}</div>
                    </div>
                    <span class="order-status ${statusClass}">${statusClass.toUpperCase()}</span>
                </div>
                
                <div class="order-customer">
                    <h4>Delivery Information</h4>
                    <p><strong>Name:</strong> ${order.customerName}</p>
                    <p><strong>Phone:</strong> ${order.customerPhone}</p>
                    <p><strong>Address:</strong> ${order.deliveryAddress}</p>
                </div>
                
                <div class="order-items">
                    <h4>Items Ordered</h4>
                    ${itemsHtml}
                </div>
                
                <div class="order-footer">
                    <div class="order-total">Total: ${order.total.toFixed(2)} OMR</div>
                </div>
            </div>
        `;
    });
    
    myOrdersContainer.innerHTML = html;
}

// Make functions globally accessible
window.editEvent = editEvent;
window.deleteEvent = deleteEvent;
window.closeEditEventModal = closeEditEventModal;
window.editGalleryItem = editGalleryItem;
window.deleteGalleryItem = deleteGalleryItem;
window.closeEditGalleryModal = closeEditGalleryModal;
window.switchToLogin = switchToLogin;
window.switchToRegister = switchToRegister;
window.closeAuthModal = closeAuthModal;
window.closeOrdersModal = closeOrdersModal;
window.closeMyOrdersModal = closeMyOrdersModal;
window.filterOrders = filterOrders;
window.updateOrderStatus = updateOrderStatus;
window.refreshOrders = refreshOrders;

// Admin Settings
function setupAdminSettings() {
    const adminSettingsBtn = document.getElementById('adminSettingsBtn');
    if (adminSettingsBtn) {
        adminSettingsBtn.addEventListener('click', openAdminSettingsModal);
    }

    const adminSettingsForm = document.getElementById('adminSettingsForm');
    if (adminSettingsForm) {
        adminSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAdminSettings();
        });
    }

    const createVoteForm = document.getElementById('createVoteForm');
    if (createVoteForm) {
        createVoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createVote();
        });
    }
}

function openAdminSettingsModal() {
    document.getElementById('adminSettingsModal').style.display = 'block';
    loadAdminSettings();
}

function closeAdminSettingsModal() {
    document.getElementById('adminSettingsModal').style.display = 'none';
}

async function createVote() {
    const question = document.getElementById('voteQuestion').value;
    const options = document.getElementById('voteOptions').value.split(',').map(option => option.trim());

    if (question && options.length > 1) {
        try {
            const voteRef = firebase.database().ref('vote');
            const newVote = {
                id: voteRef.push().key,
                question: question,
                options: options.map(option => ({ name: option, count: 0 })),
                active: true
            };
            await voteRef.set(newVote);
            showNotification('Vote created successfully!');
            closeAdminSettingsModal();
            loadVote();
        } catch (error) {
            console.error('Error creating vote:', error);
            showNotification('Error creating vote');
        }
    }
}

async function saveAdminSettings() {
    let registrationLink = document.getElementById('registrationLink').value;
    const registrationEnabled = document.getElementById('registrationEnabled').checked;

    if (registrationLink && !registrationLink.startsWith('http://') && !registrationLink.startsWith('https://')) {
        registrationLink = 'https://' + registrationLink;
    }

    try {
        await firebase.database().ref('settings').set({
            registrationLink: registrationLink,
            registrationEnabled: registrationEnabled
        });
        showNotification('Settings saved successfully!');
        closeAdminSettingsModal();
        loadAdminSettings(); // Reload settings to update UI
    } catch (error) {
        console.error('Error saving settings:', error);
        showNotification('Error saving settings');
    }
}

async function loadAdminSettings() {
    try {
        if (typeof firebase === 'undefined' || !firebase.database) {
            return;
        }

        const snapshot = await firebase.database().ref('settings').once('value');
        const settings = snapshot.val();

        if (settings) {
            const registerBtn = document.getElementById('registerBtn');
            if (registerBtn) {
                if (settings.registrationEnabled) {
                    registerBtn.href = settings.registrationLink;
                    registerBtn.style.display = 'inline-block';
                    document.getElementById('registrationClosedMsg').style.display = 'none';
                } else {
                    registerBtn.style.display = 'none';
                    document.getElementById('registrationClosedMsg').style.display = 'block';
                }
            }

            // For admin settings modal
            const registrationLinkInput = document.getElementById('registrationLink');
            if (registrationLinkInput) {
                registrationLinkInput.value = settings.registrationLink || '';
            }
            const registrationEnabledInput = document.getElementById('registrationEnabled');
            if (registrationEnabledInput) {
                registrationEnabledInput.checked = settings.registrationEnabled || false;
            }
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

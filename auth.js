// Authentication System with Firebase
let currentUser = null;
let isAdmin = false;

// Admin email (you can change this)
const ADMIN_EMAIL = 'admin@gutech.edu.om';

document.addEventListener('DOMContentLoaded', function() {
    setupAuthListeners();
    checkAuthState();
});

function setupAuthListeners() {
    // User auth button
    const userAuthBtn = document.getElementById('userAuthBtn');
    if (userAuthBtn) {
        userAuthBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentUser) {
                // Already logged in, maybe show profile or do nothing
                showNotification('You are already logged in!');
            } else {
                openAuthModal();
            }
        });
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
    
    // Logout buttons (both panel and navigation)
    const userLogoutBtn = document.getElementById('userLogoutBtn');
    if (userLogoutBtn) {
        userLogoutBtn.addEventListener('click', handleLogout);
    }
    
    const navLogoutBtn = document.getElementById('navLogoutBtn');
    if (navLogoutBtn) {
        navLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
}

function checkAuthState() {
    // Listen for auth state changes
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                currentUser = user;
                isAdmin = user.email === ADMIN_EMAIL;
                showUserLoggedIn(user);
            } else {
                currentUser = null;
                isAdmin = false;
                showUserLoggedOut();
            }
            loadAdminSettings();
        });
    }
}

function openAuthModal() {
    document.getElementById('authModal').style.display = 'block';
    switchToLogin(); // Default to login form
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
    clearAuthForms();
}

function switchToLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('authModalTitle').textContent = 'Login to Your Account';
    clearAuthForms();
}

function switchToRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('authModalTitle').textContent = 'Create Your Account';
    clearAuthForms();
}

function clearAuthForms() {
    // Clear login form
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginError').textContent = '';
    
    // Clear register form
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerError').textContent = '';
}

async function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        closeAuthModal();
        showNotification('Login successful! Welcome back!');
    } catch (error) {
        console.error('Login error:', error);
        errorDiv.textContent = getErrorMessage(error.code);
    }
}

async function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const errorDiv = document.getElementById('registerError');
    
    try {
        // Create user account
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        
        // Update profile with name
        await userCredential.user.updateProfile({
            displayName: name
        });
        
        // Save additional user data to database
        await firebase.database().ref('users/' + userCredential.user.uid).set({
            name: name,
            email: email,
            createdAt: new Date().toISOString()
        });
        
        closeAuthModal();
        showNotification('Account created successfully! Welcome!');
    } catch (error) {
        console.error('Registration error:', error);
        errorDiv.textContent = getErrorMessage(error.code);
    }
}

function handleLogout() {
    firebase.auth().signOut().then(function() {
        showNotification('Logged out successfully');
    }).catch(function(error) {
        console.error('Logout error:', error);
        showNotification('Error logging out');
    });
}

function showUserLoggedIn(user) {
    const userAuthBtn = document.getElementById('userAuthBtn');
    const userPanel = document.getElementById('userPanel');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const loginNavItem = document.getElementById('loginNavItem');
    const logoutNavItem = document.getElementById('logoutNavItem');
    
    if (userAuthBtn) {
        userAuthBtn.textContent = '✓ ' + (user.displayName || user.email.split('@')[0]);
        userAuthBtn.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
    }
    
    // Show logout button, hide login button in nav
    if (loginNavItem) loginNavItem.style.display = 'none';
    if (logoutNavItem) logoutNavItem.style.display = 'block';
    
    if (userPanel) {
        userPanel.style.display = 'block';
    }
    
    if (userNameDisplay) {
        userNameDisplay.textContent = user.displayName || user.email.split('@')[0];
    }
    
    // Show admin controls if admin
    if (isAdmin) {
        document.body.classList.add('admin-mode');
        
        // Show Orders button for admin
        const viewOrdersBtn = document.getElementById('viewOrdersBtn');
        if (viewOrdersBtn) {
            viewOrdersBtn.style.display = 'inline-block';
        }

        const adminSettingsBtn = document.getElementById('adminSettingsBtn');
        if (adminSettingsBtn) {
            adminSettingsBtn.style.display = 'inline-block';
        }
    } else {
        // Show "My Orders" button for regular users
        document.body.classList.add('user-logged-in');
    }
}

function showUserLoggedOut() {
    const userAuthBtn = document.getElementById('userAuthBtn');
    const userPanel = document.getElementById('userPanel');
    const loginNavItem = document.getElementById('loginNavItem');
    const logoutNavItem = document.getElementById('logoutNavItem');
    
    if (userAuthBtn) {
        userAuthBtn.textContent = '👤 Login';
        userAuthBtn.style.backgroundColor = '';
    }
    
    // Show login button, hide logout button in nav
    if (loginNavItem) loginNavItem.style.display = 'block';
    if (logoutNavItem) logoutNavItem.style.display = 'none';
    
    if (userPanel) {
        userPanel.style.display = 'none';
    }
    
    // Hide admin controls
    document.body.classList.remove('admin-mode');
    document.body.classList.remove('user-logged-in');
    
    // Hide Orders button
    const viewOrdersBtn = document.getElementById('viewOrdersBtn');
    if (viewOrdersBtn) {
        viewOrdersBtn.style.display = 'none';
    }
}

function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': 'This email is already registered. Please login instead.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled. Please contact admin.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.'
    };
    
    return errorMessages[errorCode] || 'An error occurred. Please try again.';
}

// Notification system
function showNotification(message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
        z-index: 10001;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}


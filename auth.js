// Agricultural Management System - Authentication JavaScript
console.log('Loading auth.js...');

// Initialize authentication when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing authentication...');
    initializeAuth();
});

// Main authentication initialization function
function initializeAuth() {
    console.log('Starting authentication initialization...');
    
    // Check if user is already logged in
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('Authentication initialization complete');
}

// Set up event listeners for forms
function setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    console.log('Processing login...');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('Login successful, redirecting...');
        window.location.href = 'dashboard.html';
    } else {
        showError('Invalid email or password');
    }
}

// Handle signup form submission
function handleSignup(e) {
    e.preventDefault();
    console.log('Processing signup...');
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (!firstName || !lastName || !email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showError('Email already exists');
        return;
    }
    
    const newUser = {
        name: firstName + ' ' + lastName,
        email,
        password,
        id: Date.now()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    console.log('Signup successful, redirecting...');
    window.location.href = 'dashboard.html';
}

// Switch between login and signup tabs
function switchTab(tab) {
    console.log('Switching to tab:', tab);
    
    // Remove active class from all tabs and forms
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
    
    // Activate selected tab and form
    if (tab === 'login') {
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.querySelectorAll('.tab')[1].classList.add('active');
        document.getElementById('signupForm').classList.add('active');
    }
    
    // Hide error message
    document.getElementById('error').style.display = 'none';
}

// Show error message
function showError(message) {
    console.log('Showing error:', message);
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Hide error message
function hideError() {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none';
}

console.log('Auth.js loaded successfully');

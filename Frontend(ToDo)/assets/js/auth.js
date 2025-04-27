import { showPopup } from './popup.js';

const API_BASE_URL = 'https://your-api-endpoint.com/api';
const AUTH_ENDPOINTS = {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout'
};

const authOverlay = document.getElementById('auth-overlay');
const userAuthBtn = document.getElementById('user-auth-btn');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const tabBtns = document.querySelectorAll('.tab-btn');

export function initAuthHandlers() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.add('hidden');
            });
            
            document.getElementById(`${btn.dataset.tab}-form`).classList.remove('hidden');
        });
    });

    userAuthBtn.addEventListener('click', toggleAuthModal);

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;

        if (password !== confirmPassword) {
            showPopup("Passwords don't match!", "error");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.register}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            showPopup("Registration successful! Please login.", "success");
            document.querySelector('.tab-btn[data-tab="login"]').click();
            registerForm.reset();

        } catch (error) {
            showPopup(error.message, "error");
            console.error('Registration error:', error);
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.login}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('authToken', data.token);
            updateAuthUI(true);
            authOverlay.classList.add('hidden');
            loginForm.reset();
            
            showPopup("Login successful!", "success");

        } catch (error) {
            showPopup(error.message, "error");
            console.error('Login error:', error);
        }
    });
}

// Допоміжні функції
function toggleAuthModal() {
    if (localStorage.getItem('authToken')) {
        logoutUser();
    } else {
        authOverlay.classList.toggle('hidden');
    }
}

async function logoutUser() {
    try {
        const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.logout}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('authToken');
            updateAuthUI(false);
            showPopup("Logged out successfully!", "success");
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
}

function updateAuthUI(isAuthenticated) {
    userAuthBtn.textContent = isAuthenticated ? 'Logout' : 'Login';
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        updateAuthUI(true);
    }
});
import { showPopup } from './popup.js';
import { loadTasks, initTaskHandlers } from './tasks.js';

const API_BASE_URL = 'http://localhost:5114';
const AUTH_ENDPOINTS = {
    register: '/auth/register',
    login: '/auth/login',
};

const authOverlay = document.getElementById('auth-overlay');
const userAuthBtn = document.getElementById('user-auth-btn');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const tabBtns = document.querySelectorAll('.tab-btn');
const closeAuthBtn = document.getElementById('close-auth-btn');

export function initAuthHandlers() {
    if (closeAuthBtn) {
        closeAuthBtn.addEventListener('click', closeAuthModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !authOverlay.classList.contains('hidden')) {
            closeAuthModal();
        }
    });

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
        
        const email = document.getElementById('register-email').value;
        const passwordHash = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;

        if (passwordHash !== confirmPassword) {
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
                    email,
                    passwordHash
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
        const passwordHash = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.login}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    passwordHash
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('authToken', data.token);
            updateAuthUI(true);
            closeAuthModal();
            loginForm.reset();
            
            showPopup("Login successful!", "success");
            initTaskHandlers();
            loadTasks();

        } catch (error) {
            showPopup(error.message, "error");
            console.error('Login error:', error);
        }
    });
}

function closeAuthModal() {
    authOverlay.classList.add('hidden');
}

function toggleAuthModal() {
    if (localStorage.getItem('authToken')) {
        logoutUser();
    } else {
        authOverlay.classList.toggle('hidden');
    }
}

async function logoutUser() {
    localStorage.removeItem('authToken');
    updateAuthUI(false);
    showPopup("Logged out successfully!", "success");
}

function updateAuthUI(isAuthenticated) {
    userAuthBtn.textContent = isAuthenticated ? 'Logout' : 'Login';
}

export function initUnauthorizedHandlers() {
    const sendBtn = document.getElementById("send-task");
    const input = document.getElementById("input-line");
    
    function handleUnauthorizedAction() {
        showPopup("Please login to add tasks", "error");
    }
    
    if (sendBtn) {
        sendBtn.addEventListener("click", handleUnauthorizedAction);
    }
    
    if (input) {
        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                handleUnauthorizedAction();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        updateAuthUI(true);
    }
});
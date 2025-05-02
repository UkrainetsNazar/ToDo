import { initTaskHandlers, loadTasks } from './tasks.js';
import { initThemeToggle } from './theme.js';
import { initAuthHandlers, checkAuthToken } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    checkAuthToken();
    initAuthHandlers();
    initThemeToggle();
    initTaskHandlers();
    
    if (localStorage.getItem('authToken')) {
        loadTasks();
    }
}); 
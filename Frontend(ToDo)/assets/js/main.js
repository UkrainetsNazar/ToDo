import { initTaskHandlers, loadTasks } from './tasks.js';
import { initThemeToggle } from './theme.js';
import { initAuthHandlers } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    initAuthHandlers();
    initThemeToggle();
    initTaskHandlers();
    
    if (localStorage.getItem('authToken')) {
        loadTasks();
    }
}); 
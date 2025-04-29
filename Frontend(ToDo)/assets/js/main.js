import { initTaskHandlers, loadTasks } from './tasks.js';
import { initThemeToggle } from './theme.js';
import { initAuthHandlers } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    initAuthHandlers();
    initThemeToggle();
    
    if (localStorage.getItem('authToken')) {
        initTaskHandlers();
        loadTasks();
    }
});
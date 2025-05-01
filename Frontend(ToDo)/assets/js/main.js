import { initTaskHandlers, loadTasks } from './tasks.js';
import { initThemeToggle } from './theme.js';
import { initAuthHandlers, initUnauthorizedHandlers, cleanupUnauthorizedHandlers } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    initAuthHandlers();
    initThemeToggle();
    
    if (localStorage.getItem('authToken')) {
        console.log(localStorage.getItem('authToken'));
        cleanupUnauthorizedHandlers();
        initTaskHandlers();
        loadTasks();
    } else {
        initUnauthorizedHandlers();
    }
});
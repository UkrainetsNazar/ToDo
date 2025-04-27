import { initTaskHandlers } from './tasks.js';
import { initThemeToggle } from './theme.js';
import { initAuthHandlers } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    initAuthHandlers();
    
    if (localStorage.getItem('authToken')) {
        initTaskHandlers();
    }
});
initThemeToggle();
import { initTaskHandlers } from './tasks.js';
import { initThemeToggle } from './theme.js';
import { initAuthHandlers } from './auth.js';
import { loadTasks } from './tasks.js';

document.addEventListener('DOMContentLoaded', () => {
  initAuthHandlers();

  if (localStorage.getItem('authToken')) {
    initTaskHandlers();
    loadTasks();
  }
});

initThemeToggle();
import { showPopup } from './popup.js';
let list;
const API_BASE_URL = 'http://localhost:5114';
const TASKS_ENDPOINTS = {
    create: `/task`,
    read: `/task/active`,
    update: (taskId) => `/task/${taskId}/done`,
    delete: (taskId) => `/task/${taskId}`
};

export function createTaskElement(task, filterType = 'active') {
    const li = document.createElement("li");
    li.dataset.taskId = task.id;
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <div class="task-content">${task.text}</div>
      <div class="task-actions">
        ${filterType === 'active' ? `
          <button class="complete-btn" title="Позначити виконаним">
            <i class="fas fa-check"></i>
          </button>` : ''}
        <button class="delete-btn" title="Видалити завдання">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>`;

    if (filterType === 'active') {
        li.querySelector(".complete-btn").addEventListener("click", async function() {
            try {
                const response = await fetch(`${API_BASE_URL}${TASKS_ENDPOINTS.update(task.id)}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                if (!response.ok) throw new Error('Failed to update task');
                li.remove();
            } catch (error) {
                showPopup("Failed to update task", "error");
                console.error(error);
            }
        });
    }

    li.querySelector(".delete-btn").addEventListener("click", async function() {
        try {
            const response = await fetch(`${API_BASE_URL}${TASKS_ENDPOINTS.delete(task.id)}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete task');
            li.remove();
            showPopup("Task deleted successfully!", "success");
        } catch (error) {
            showPopup("Failed to delete task", "error");
            console.error(error);
        }
    });

    return li;
}

export async function loadTasks(filterType = 'active') {
    try {
        const endpoint = filterType === 'completed' ? '/task/completed' : '/task/active';
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) throw new Error('Failed to load tasks');
        
        const tasks = await response.json();
        list.innerHTML = '';
        
        tasks.forEach(task => {
            list.appendChild(createTaskElement(task, filterType));
        });

    } catch (error) {
        showPopup("Failed to load tasks", "error");
        console.error(error);
    }
}

export function initTaskHandlers() {
    list = document.getElementById("task-list");
    const sendBtn = document.getElementById("send-task");
    const input = document.getElementById("input-line");
    const filterSelect = document.getElementById("filter-select");

    async function addTask() {
        const value = input.value.trim();
        if (!value) {
            showPopup("You can't send empty task!", "error");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}${TASKS_ENDPOINTS.create}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ text: value })
            });

            if (!response.ok) throw new Error('Failed to add task');
            
            const newTask = await response.json();
            
            if (!filterSelect || filterSelect.value === 'active') {
                list.appendChild(createTaskElement(newTask, 'active'));
                showPopup("Task added successfully!", "success");
            }
            
            input.value = "";
            
            if (filterSelect && filterSelect.value === 'completed') {
                showPopup("Switch to 'Active' filter to see your new task", "info");
            }
            
        } catch (error) {
            showPopup("Failed to add task", "error");
            console.error(error);
        }
    }

    sendBtn.addEventListener("click", addTask);
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") addTask();
    });

    if (filterSelect) {
        filterSelect.addEventListener("change", () => {
            loadTasks(filterSelect.value);
        });
    }
}
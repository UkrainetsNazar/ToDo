import { showPopup } from "./popup.js";
export { loadTasks };

let list;
const API_BASE_URL = 'http://localhost:5114';
const TASKS_ENDPOINTS = {
    create: `/task`,
    read: `task/active`,
    update: `/task/${task.id}/done`,
    delete: `task/${task.id}`
};

export function initTaskHandlers() {
  list = document.getElementById("task-list");
  const sendBtn = document.getElementById("send-task");
  const input = document.getElementById("input-line");

  async function addTask() {
    const value = input.value.trim();
    if (!value) {
      showPopup("You can't send empty task!", "error");
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}${TASKS_ENDPOINTS.create}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: value })
      });

      if (!response.ok) throw new Error('Failed to add task');

      const newTask = await response.json();
      createTaskElement(newTask);
      input.value = "";
      showPopup("Task added successfully!", "success");

    } catch (error) {
      showPopup("Failed to add task", "error");
      console.error(error);
    }
  }

  sendBtn.addEventListener("click", addTask);
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTask();
  });
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.dataset.taskId = task.id;
  if (task.completed) li.classList.add('completed');

  li.innerHTML = `
    <div class="task-content">${task.text}</div>
    <div class="task-actions">
      <button class="complete-btn"><i class="fas fa-check"></i></button>
      <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
    </div>`;

  li.querySelector(".complete-btn").addEventListener("click", async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${TASKS_ENDPOINTS.update}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to update task');
      li.classList.add('completed');
      showPopup("Task marked as done!", "success");
    } catch (error) {
      showPopup("Failed to update task", "error");
      console.error(error);
    }
  });

  li.querySelector(".delete-btn").addEventListener("click", async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${TASKS_ENDPOINTS.delete}`, {
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

  list.appendChild(li);
}

async function loadTasks() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}${TASKS_ENDPOINTS.read}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to load tasks');

    const tasks = await response.json();
    list.innerHTML = '';
    tasks.forEach(createTaskElement);
  } catch (error) {
    showPopup("Failed to load tasks", "error");
    console.error(error);
  }
}
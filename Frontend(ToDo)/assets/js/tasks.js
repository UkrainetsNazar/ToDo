import { showPopup } from "./popup.js";

export function initTaskHandlers() {
  const list = document.getElementById("task-list");
  const sendBtn = document.getElementById("send-task");
  const input = document.getElementById("input-line");

  document.addEventListener('DOMContentLoaded', loadTasks);

  async function loadTasks() {
    try {
      const response = await fetch('https://your-api-endpoint.com/tasks', {
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load tasks');
      }

      const tasks = await response.json();
      list.innerHTML = '';

      tasks.forEach(task => {
        createTaskElement(task);
      });

    } catch (error) {
      showPopup("Failed to load tasks", "error");
      console.error(error);
    }
  }

  function createTaskElement(task) {
    const li = document.createElement("li");
    li.dataset.taskId = task.id;
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <div class="task-content">${task.text}</div>
      <div class="task-actions">
        <button class="complete-btn" title="Позначити виконаним">
          <i class="fas fa-check"></i>
        </button>
        <button class="delete-btn" title="Видалити завдання">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>`;

    li.querySelector(".complete-btn").addEventListener("click", async function() {
      try {
        const response = await fetch(`https://your-api-endpoint.com/tasks/${task.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
          },
          body: JSON.stringify({
            
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }

        li.classList.toggle('completed');
        showPopup("Task status updated!", "success");
      } catch (error) {
        showPopup("Failed to update task", "error");
        console.error(error);
      }
    });

    li.querySelector(".delete-btn").addEventListener("click", async function() {
      try {
        const response = await fetch(`https://your-api-endpoint.com/tasks/${task.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        li.remove();
        showPopup("Task deleted successfully!", "success");
      } catch (error) {
        showPopup("Failed to delete task", "error");
        console.error(error);
      }
    });

    list.appendChild(li);
  }

  async function addTask() {
    const value = input.value.trim();
    if (!value) {
      showPopup("You can't send empty task!", "error");
      return;
    }

    try {
      const response = await fetch('https://your-api-endpoint.com/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        },
        body: JSON.stringify({

        })
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

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

  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
}
import { showPopup } from './popup.js';

export function initTaskHandlers() {
  const list = document.getElementById("task-list");
  const sendBtn = document.getElementById("send-task");
  const input = document.getElementById("input-line");

  function addTask() {
    const value = input.value.trim();
    if (value) {
      const li = document.createElement("li");
      li.textContent = value;
      list.appendChild(li);
      input.value = "";
    } else {
      showPopup("You can't send empty task!", "error");
    }
  }

  sendBtn.addEventListener("click", addTask);

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
}

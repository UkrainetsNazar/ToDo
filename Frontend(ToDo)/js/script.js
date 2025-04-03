const list = document.getElementById("task-list");
const sendBtn = document.getElementById("send-task");
const input = document.getElementById("input-line");

function showPopup(message, type = '') {
    const popup = document.createElement("div");
    popup.className = `popup-message ${type}`;
    
    let icon = '';
    if (type === 'error') {
        icon = '<i class="fas fa-exclamation-circle"></i>';
    }
    
    popup.innerHTML = `${icon}${message}`;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
    
    setTimeout(() => {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 2000);
}

function addTask(){
    const value = input.value.trim();
    if(value){
        const li = document.createElement("li");
        li.textContent = value;
        list.appendChild(li);
        input.value = "";
    } else {
        showPopup("You can't send empty task!", "error");
    }
}

sendBtn.addEventListener("click", addTask);

//If user use Enter
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
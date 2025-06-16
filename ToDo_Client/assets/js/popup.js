export function showPopup(message, type = '') {
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
  
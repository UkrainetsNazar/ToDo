const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const moonIcon = themeToggle.querySelector(".fa-moon");
const sunIcon = themeToggle.querySelector(".fa-sun");

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  body.classList.add("dark-theme");
  moonIcon.style.display = "none";
  sunIcon.style.display = "block";
} else {
  sunIcon.style.display = "none";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  const isDark = body.classList.contains("dark-theme");
  moonIcon.style.display = isDark ? "none" : "block";
  sunIcon.style.display = isDark ? "block" : "none";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const loginForm = document.getElementById("login-form");
const subscribeForm = document.getElementById("subscribe-form");
const passwordInput = document.getElementById("password");

document.getElementById("experiment1-desc").addEventListener("click", () => {
	window.location.href = 'experiment1.html';
});

loginForm.addEventListener("submit", e => {
	e.preventDefault();
	const password = passwordInput.value.trim();
	if (password === "CRAYON") {
		document.getElementById("shop").style.display = "flex";
		document.querySelector("main").style.display = "none";
		subscribeForm.style.display = "none";
		subscribeForm.style.display = "none";
		loginForm.style.display = "none";
	} else {
		alert("Неверный пароль!");
	}
});

document.getElementById("backBtn").addEventListener("click", () => {
	window.location.reload();
});

function showSuccessMessage() {
	setTimeout(() => {
		alert("Спасибо! Вы подписаны на обновления.");
		document.getElementById("email").value = "";
	}, 100);
}


// theme logic
function getCSSVar(name) {
	return getComputedStyle(document.body).getPropertyValue(name).trim();
}

let gameColor = getCSSVar('--color-text');

function updateGameColors() {
	gameColor = getCSSVar('--color-text');
}

const toggleBtn = document.getElementById("theme-toggle");
const logo = document.getElementById("hero-logo");
const toggleIcon = document.querySelector("#theme-toggle img");

function applyTheme(theme) {
	if (theme === "light") {
		document.body.classList.add("light-theme");
		logo.src = "./assets/logo-light.svg";
		toggleIcon.src = "./assets/theme-light-icon.svg";
	} else {
		document.body.classList.remove("light-theme");
		logo.src = "./assets/logo-dark.png";
		toggleIcon.src = "./assets/theme-dark-icon.svg";
	}
	updateGameColors();
}

// Применяем сохранённую тему при загрузке
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

// Слушатель клика
toggleBtn.addEventListener("click", () => {
	const newTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
	localStorage.setItem("theme", newTheme);
	applyTheme(newTheme);
});

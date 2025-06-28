const loginForm = document.getElementById("login-form");
const subscribeForm = document.getElementById("subscribe-form");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", e => {
	e.preventDefault();
	const password = passwordInput.value.trim();
	if (password === "CRAYON") {
		document.getElementById("jumpGame").style.display = "block";
		subscribeForm.style.display = "none";
		loginForm.style.display = "none";
		if (platforms.length === 0) {
			createPlatforms();
			gameLoop();
		}
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

function adjustHeroPadding() {
	const hero = document.getElementById("hero");
	const logo = document.getElementById("hero-logo");
	if (logo.complete) {
		hero.style.paddingTop = logo.clientHeight * 0.18 + "px";
	} else {
		logo.onload = () => hero.style.paddingTop = logo.clientHeight * 0.18 + "px";
	}
}
window.addEventListener("load", adjustHeroPadding);
window.addEventListener("resize", adjustHeroPadding);


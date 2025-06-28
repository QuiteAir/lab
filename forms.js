const loginForm = document.getElementById("login-form");
const subscribeForm = document.getElementById("subscribe-form");
const passwordInput = document.getElementById("password");

document.getElementById("experiment1-desc").addEventListener("click", () => {
	window.location.href = 'experiment1';
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


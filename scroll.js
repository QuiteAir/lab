const scrollDoodle = document.getElementById("scroll-doodle");
let scrollAttemptCount = 0;
let scrollAttemptTimer = null;
let preventAnimation = false;
const ATTEMPT_LIMIT = 7;
const ATTEMPT_INTERVAL_MS = 1000;

window.addEventListener("wheel", e => {
	const atBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight;
	if (atBottom && e.deltaY > 0) {
		handleScrollAttempt();
	}
});

window.addEventListener("touchstart", e => {
	if (e.touches.length > 0) {
		window._touchStartY = e.touches[0].clientY;
		console.log(window._touchStartY);
	}
});

window.addEventListener("touchmove", e => {
	if (e.touches.length === 0) return;
	const deltaY = window._touchStartY - e.touches[0].clientY;
	const atBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight;
	if (atBottom && deltaY > 0) {
		handleScrollAttempt(ATTEMPT_LIMIT * 4);
	}
}, { passive: true });

function handleScrollAttempt(limit = ATTEMPT_LIMIT) {
	scrollAttemptCount++;
	if (scrollAttemptTimer) clearTimeout(scrollAttemptTimer);
	scrollAttemptTimer = setTimeout(() => scrollAttemptCount = 0, ATTEMPT_INTERVAL_MS);

	if (scrollAttemptCount >= limit && !preventAnimation) {
		preventAnimation = true;
		setTimeout(() => preventAnimation = false, 3000);
		scrollAttemptCount = 0;
		triggerFakeScrollAnimation();
	}
}

function triggerFakeScrollAnimation() {
	document.body.style.transition = "transform 0.4s";
	document.body.style.transform = "translateY(-40px)";
	scrollDoodle.style.bottom = "20px";
	scrollDoodle.classList.add("spin");

	setTimeout(() => {
		document.body.style.transform = "translateY(0)";
		scrollDoodle.classList.remove("spin");
	}, 800);
}

scrollDoodle.addEventListener("click", () => {
	document.getElementById("login-form").style.display = "none";
	document.getElementById("subscribe-form").style.display = "none";
	scrollDoodle.style.display = "none";
	const canvas = document.getElementById("jumpGame");
	canvas.style.display = "block";
	if (platforms.length === 0) {
		createPlatforms();
		doodler.y = 0;
	}
	gameOver = false;
	gameLoop();
});


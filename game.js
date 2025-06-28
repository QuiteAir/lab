const canvas = document.getElementById("jumpGame");
const ctx = canvas.getContext("2d");

const DOODLER_WIDTH = 50;
const DOODLER_HEIGHT = 73;
let doodler = { x: 180, y: 0, width: DOODLER_WIDTH, height: DOODLER_HEIGHT, vy: 0, jumping: true };
const gravity = 0.3;
const jumpStrength = -9;
const platforms = [];
let targetX = doodler.x;
let gameOver = false;
const doodlerImg = new Image();
doodlerImg.src = "./assets/doodle_new.svg";
let score = 0;

function createPlatforms() {
	for (let i = 0; i < 6; i++) {
		let x = Math.random() * 360;
		let y = 500 - i * 100;
		platforms.push({ x, y, width: 60, height: 10 });
	}
}

function drawDoodler() {
	ctx.drawImage(doodlerImg, doodler.x, doodler.y, doodler.width, doodler.height);
}

function drawPlatforms() {
	ctx.fillStyle = "#fff";
	platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
}

function drawScore() {
	ctx.fillStyle = "#fff";
	ctx.font = "20px Montserrat";
	ctx.fillText(`Счёт: ${score}`, 10, 30);
}

function update() {
	doodler.vy += gravity;
	doodler.y += doodler.vy;
	doodler.x += (targetX - doodler.x) * 0.2;

	if (doodler.x < 0) {
		doodler.x = 0;
	} else if (doodler.x + doodler.width > canvas.width) {
		doodler.x = canvas.width - doodler.width;
	}

	if (doodler.y < 0) {
		doodler.y = 0;
	}

	if (doodler.y > canvas.height) {
		endGame();
		return;
	}

	platforms.forEach(p => {
		if (
			doodler.vy > 0 &&
			doodler.x + doodler.width > p.x &&
			doodler.x < p.x + p.width &&
			doodler.y + doodler.height > p.y &&
			doodler.y + doodler.height < p.y + p.height + doodler.vy
		) {
			doodler.vy = jumpStrength;
			score++;
		}
		p.y += gravity * 10;
		if (p.y > canvas.height) {
			p.y = 0;
			p.x = Math.random() * 340;
		}
	});
}

let lastFrameTime = 0;
function gameLoop(timestamp) {
	if (gameOver) return;
	if (timestamp - lastFrameTime < 16) { // ~60fps
		requestAnimationFrame(gameLoop);
		return;
	}
	lastFrameTime = timestamp;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPlatforms();
	drawDoodler();
	drawScore();
	update();
	requestAnimationFrame(gameLoop);
}

function endGame() {
	gameOver = true;
	document.getElementById("popup").classList.remove("hidden");
}

document.getElementById("replayBtn").addEventListener("click", () => {
	score = 0;
	requestAnimationFrame(gameLoop);
	platforms.length = 0;
	doodler = { x: 180, y: 400, width: DOODLER_WIDTH, height: DOODLER_HEIGHT, vy: 0, jumping: true };
	gameOver = false;
	document.getElementById("popup").classList.add("hidden");
	createPlatforms();
	doodler.y = 0;
	gameLoop();
});

canvas.addEventListener("mousemove", e => {
	const rect = canvas.getBoundingClientRect();
	targetX = e.clientX - rect.left - doodler.width / 2;
});

canvas.addEventListener("touchmove", e => {
	e.preventDefault();
	const rect = canvas.getBoundingClientRect();
	const touch = e.touches[0];
	targetX = touch.clientX - rect.left - doodler.width / 2;
}, { passive: false });


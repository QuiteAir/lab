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


const body = document.body;

body.addEventListener('keypress', (e) => {
	checkMoleIsShowing(e.key);
});

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

console.log(getRandomNumber(150, 650));

// on start

// isGameOver = false;
// while (!isGameOver) {
// setTimout(selectRandomMoleAndShow(), randomTime)
// }
// every random time

// get random mole

// show for random time seconds

// selectRandomMoleAndShow = () => {
//	if (!mole.classlist.contains(showing))
// show()
// setTimout(hide, randomSeconds)
// }

// if key pressed => score point and hide mole

const checkMoleIsShowing = (key) => {
	const whackedMole = document.querySelector(`#${key}`);
	if (whackedMole && whackedMole.classList.contains('showing')) {
		// WHACK
		whackMole(whackedMole);
		// HIDE
	} else hideMole(whackedMole);
};

const whackMole = (mole) => {
	// score++
	hideMole(mole);
};

const hideMole = (mole) => {
	mole.classList.remove('showing');
};

const TEN_SECONDS = 10000;

let score = 0;
let isGameOver = true;

const body = document.body;
const scoreDisplay = document.querySelector('#scoreDisplay');
const startBtn = document.querySelector('#start');
const moles = document.querySelectorAll('.mole');

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
// setTimout(hideMole, randomSeconds)
// }

// if key pressed => score point and hide mole

// SCORE LOGIC

const updateScore = (num) => {
	scoreDisplay.textContent = score;
};

// MOLE LOGIC

const checkMoleIsShowing = (mole) => mole && mole.classList.contains('showing');

const showMole = (mole) => {
	mole.classList.add('showing');
};

const hideMole = (mole) => {
	mole.classList.remove('showing');
};

const whackMole = (mole) => {
	score++;
	hideMole(mole);
	updateScore(score);
};

const handleKeypress = (e) => {
	const moleToWhack = document.querySelector(`#${e.key}`);
	if (checkMoleIsShowing(moleToWhack)) {
		whackMole(moleToWhack);
	}
};

// GAME LOGIC

const showMoles = (molesArray) => {
	const chosenMole = molesArray[Math.floor(Math.random() * molesArray.length)];
	if (!checkMoleIsShowing(chosenMole)) {
		showMole(chosenMole);
	} else {
		showMoles(moles);
		console.log('duplicate mole picked');
	}
};

const startGame = () => {
	isGameOver = false;
	const id = setInterval(showMoles, 500, moles);
	setTimeout(() => {
		isGameOver = true;
		clearInterval(id);
		console.log('game over');
	}, TEN_SECONDS);
};

const handleStartBtnClick = (e) => {
	startGame();
};

body.addEventListener('keypress', handleKeypress);
startBtn.addEventListener('click', handleStartBtnClick);

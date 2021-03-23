const TEN_SECONDS = 10000;
const MIN_TIME = 150;
const MAX_TIME = 650;
const showingClasses = ['show-fast', 'show-medium', 'show-slow'];

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

const updateScoreDisplay = () => {
	scoreDisplay.textContent = score;
};

// MOLE LOGIC

const checkMoleIsShowing = (mole) => mole && mole.classList.contains('showing');

const getRandomShowClass = () => showingClasses[Math.floor(Math.random() * showingClasses.length)];

const showMole = (mole) => {
	mole.classList.add('showing');
};

const hideMole = (mole) => {
	mole.classList.remove([...mole.classList].filter((className) => className !== 'mole')[0]);
};

const whackMole = (mole) => {
	score++;
	hideMole(mole);
	updateScoreDisplay(score);
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
		setTimeout(hideMole, 1000, chosenMole);
	} else {
		showMoles(moles);
		console.log('duplicate mole picked');
	}
};

const resetGame = () => {
	isGameOver = false;
	score = 0;
	updateScoreDisplay(score);
};

const endGame = (intervalID) => {
	isGameOver = true;
	clearInterval(intervalID);
	moles.forEach((mole) => hideMole(mole));
	console.log('game over');
};

const startGame = () => {
	resetGame();
	isGameOver = false;
	const intervalID = setInterval(showMoles, 500, moles);
	setTimeout(() => {
		endGame(intervalID);
	}, TEN_SECONDS);
};

const handleStartBtnClick = () => {
	startGame();
};

body.addEventListener('keypress', handleKeypress);
startBtn.addEventListener('click', handleStartBtnClick);

const gameTime = 30000;
const minTime = 300;
const maxTime = 1900;
const moleKeys = ['q', 'w', 'e', 'a', 's', 'd'];

const happyMoleURL = './assets/happy-mole.svg';
const angryMoleURL = './assets/angry-mole.svg';

const body = document.body;
const deviceDecider = document.querySelector('.device-decider');
const mobileBtn = document.querySelector('#mobileBtn');
const keyboardBtn = document.querySelector('#keyboardBtn');
const headerMoleContainer = document.querySelector('.header__mole-container');
const gamePlayingScoreDisplay = document.querySelector('.game-playing-score');
const scoreDisplay = document.querySelector('#scoreDisplay');
const deviceDisplay = document.querySelector('#deviceDisplay');
const howToPlaySection = document.querySelector('.how-to-play');
const howToPlayBtnContainer = document.querySelector('.how-to-play-btn-container');
const deductPointsPara = document.querySelector('.how-to-play__deduct-points');
const howToPlayBtn = document.querySelector('#howToPlayBtn');
const startBtn = document.querySelector('#start');
const swapDeviceBtn = document.querySelector('#swapDevice');
const main = document.querySelector('main');
const deviceSpan = document.querySelector('.device-span');
const gameOverHeader = document.querySelector('.game-over');
const gameOverDisplay = document.querySelector('#gameOverDisplay');
const moles = document.querySelectorAll('.mole-container');
const keys = document.querySelectorAll('.key');

let score = 0;
let isGameOver = true;
let device;

const scrollToBottom = () => {
	window.scrollTo(0, body.scrollHeight);
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

const hideElements = (...args) => {
	args.forEach((arg) => {
		arg.classList.add('hidden');
	});
};

const showElements = (...args) => {
	args.forEach((arg) => {
		arg.classList.remove('hidden');
	});
};

const updateDisplay = (displayToUpdate, value) => {
	displayToUpdate.innerText = value;
};

const updateDeviceDisplay = (whacker) => {
	device = whacker;
	updateDisplay(deviceDisplay, device);
	updateDisplay(deviceSpan, whacker === 'tap' ? 'whack (tap) its head' : 'whack its key on your keyboard');
};

// MOLE LOGIC

const checkMoleIsShowing = (mole) => mole && mole.classList.contains('showing');

const showMole = (mole) => {
	mole.querySelector('.mole').src = happyMoleURL;
	mole.classList.add('showing');
};

const hideMole = (mole) => {
	mole.classList.remove('showing');
};

const whackMole = (mole) => {
	mole.querySelector('.mole').src = angryMoleURL;
	score++;
	hideMole(mole);
	updateDisplay(scoreDisplay, score);
};

const pressKey = (key) => {
	if (!isGameOver) {
		key.classList.add('pressed');
		setTimeout(() => {
			key.classList.remove('pressed');
		}, 200);
	}
};

const showMoles = (molesArray) => {
	const chosenMole = molesArray[Math.floor(Math.random() * molesArray.length)];
	if (!checkMoleIsShowing(chosenMole)) {
		showMole(chosenMole);
		setTimeout(hideMole, getRandomNumber(minTime, maxTime), chosenMole);
	} else {
		showMoles(moles);
	}
};

const resetMoles = (molesArray) => {
	molesArray.forEach((mole) => {
		mole.src = happyMoleURL;
		hideMole(mole);
	});
};

// GAME LOGIC

const setUpGameForMobile = () => {
	hideElements(headerMoleContainer, deviceDecider, deductPointsPara, ...keys);
	showElements(main);
	updateDeviceDisplay('tap');
	body.removeEventListener('keypress', handleKeypress);
	moles.forEach((mole) => {
		mole.addEventListener('click', handleMoleClick);
	});
};

const setUpGameForKeyboard = () => {
	hideElements(headerMoleContainer, deviceDecider);
	showElements(main, deductPointsPara, ...keys);
	updateDeviceDisplay('keyboard');
	moles.forEach((mole) => {
		mole.removeEventListener('click', handleMoleClick);
	});
	body.addEventListener('keypress', handleKeypress);
};

const endGame = (intervalID) => {
	hideElements(gamePlayingScoreDisplay);
	showElements(gameOverHeader);
	updateDisplay(gameOverDisplay, score);
	startBtn.disabled = false;
	isGameOver = true;
	clearInterval(intervalID);
	resetMoles(moles);
};

const startGame = () => {
	showElements(gamePlayingScoreDisplay, howToPlayBtnContainer);
	hideElements(gameOverHeader, howToPlaySection);
	scrollToBottom();
	startBtn.disabled = true;
	isGameOver = false;
	score = 0;
	updateDisplay(scoreDisplay, score);
	const intervalID = setInterval(showMoles, 500, moles);
	setTimeout(() => {
		endGame(intervalID);
	}, gameTime);
};

// EVENT HANDLERS

const handleHowToPlayBtnClick = () => {
	hideElements(howToPlayBtnContainer);
	showElements(howToPlaySection);
};

const handleSwapBtnClick = () => (device === 'tap' ? setUpGameForKeyboard() : setUpGameForMobile());

const handleMobileBtnClick = () => {
	setUpGameForMobile();
};

const handleKeyboardBtnClick = () => {
	setUpGameForKeyboard();
};

const handleKeypress = (e) => {
	if (moleKeys.includes(e.key)) {
		const moleToWhack = document.querySelector(`#${e.key}`);
		const key = moleToWhack.querySelector('.key');
		if (checkMoleIsShowing(moleToWhack)) {
			whackMole(moleToWhack);
		} else if (!isGameOver) {
			score--;
			updateDisplay(scoreDisplay, score);
		}
		pressKey(key);
	}
};

const handleMoleClick = (e) => {
	const moleToWhack = e.target.closest('.mole-container');
	checkMoleIsShowing(moleToWhack) ? whackMole(moleToWhack) : '';
};

const handleStartBtnClick = () => {
	startGame();
};

// EVENT LISTENERS

mobileBtn.addEventListener('click', handleMobileBtnClick);
keyboardBtn.addEventListener('click', handleKeyboardBtnClick);
howToPlayBtn.addEventListener('click', handleHowToPlayBtnClick);
startBtn.addEventListener('click', handleStartBtnClick);
swapDeviceBtn.addEventListener('click', handleSwapBtnClick);

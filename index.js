const gameTime = 10000;
const minTime = 300;
const maxTime = 1900;
const moleKeys = ['q', 'w', 'e', 'a', 's', 'd'];

const happyMoleURL = './assets/happy-mole.svg';
const angryMoleURL = './assets/angry-mole.svg';

let score = 0;
let isGameOver = true;
let device;

const body = document.body;
const deviceDecider = document.querySelector('.device-decider');
const mobileBtn = document.querySelector('#mobileBtn');
const keyboardBtn = document.querySelector('#keyboardBtn');
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
const moles = document.querySelectorAll('.mole-container');
const keys = document.querySelectorAll('.key');

const showHowToPlaySection = () => {
	howToPlaySection.classList.remove('hidden');
};

const handleHowToPlayBtnClick = () => {
	howToPlayBtnContainer.classList.add('hidden');
	showHowToPlaySection();
};

howToPlayBtn.addEventListener('click', handleHowToPlayBtnClick);

const handleSwapBtnClick = () => {
	if (device === 'tap/click') {
		setUpGameForKeyboard();
	} else {
		setUpGameForMobile();
	}
};

swapDeviceBtn.addEventListener('click', handleSwapBtnClick);

const setUpGameForMobile = () => {
	device = 'tap/click';
	deviceDisplay.innerText = device;
	main.classList.remove('hidden');
	deviceDecider.classList.add('hidden');
	deductPointsPara.classList.add('hidden');
	deviceSpan.innerText = 'whack (tap) its head';
	body.removeEventListener('keypress', handleKeypress);
	moles.forEach((mole) => {
		mole.addEventListener('click', handleMoleClick);
	});
	keys.forEach((key) => {
		key.classList.add('hidden');
	});
};

const handleMobileBtnClick = () => {
	setUpGameForMobile();
};

const setUpGameForKeyboard = () => {
	device = 'keyboard';
	deviceDisplay.innerText = device;
	deviceSpan.innerText = 'whack its key on your keyboard';
	main.classList.remove('hidden');
	deductPointsPara.classList.remove('hidden');
	deviceDecider.classList.add('hidden');
	moles.forEach((mole) => {
		mole.removeEventListener('click', handleMoleClick);
	});
	keys.forEach((key) => {
		key.classList.remove('hidden');
	});
	body.addEventListener('keypress', handleKeypress);
};

const handleKeyboardBtnClick = () => {
	setUpGameForKeyboard();
};

mobileBtn.addEventListener('click', handleMobileBtnClick);
keyboardBtn.addEventListener('click', handleKeyboardBtnClick);

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

// SCORE LOGIC

const updateScoreDisplay = () => {
	scoreDisplay.textContent = score;
};

// MOLE LOGIC

const checkMoleIsShowing = (mole) => mole && mole.classList.contains('showing');

const showMole = (mole) => {
	mole.querySelector('.mole').src = happyMoleURL;
	mole.classList.add('showing');
};

const hideMole = (mole) => {
	mole.classList.remove([...mole.classList].filter((className) => className !== 'mole-container')[0]);
};

const whackMole = (mole) => {
	mole.querySelector('.mole').src = angryMoleURL;
	score++;
	hideMole(mole);
	updateScoreDisplay(score);
};

const pressKey = (key) => {
	if (!isGameOver) {
		key.classList.add('pressed');
		setTimeout(() => {
			key.classList.remove('pressed');
		}, 200);
	}
};

const handleKeypress = (e) => {
	if (moleKeys.includes(e.key)) {
		const moleToWhack = document.querySelector(`#${e.key}`);
		const key = moleToWhack.querySelector('.key');
		if (checkMoleIsShowing(moleToWhack)) {
			whackMole(moleToWhack);
		} else if (!isGameOver) {
			score--;
			updateScoreDisplay(score);
		}
		pressKey(key);
	}
};

const handleMoleClick = (e) => {
	const moleToWhack = e.target.closest('.mole-container');
	if (checkMoleIsShowing(moleToWhack)) {
		whackMole(moleToWhack);
	}
};

// GAME LOGIC

const showMoles = (molesArray) => {
	const chosenMole = molesArray[Math.floor(Math.random() * molesArray.length)];
	if (!checkMoleIsShowing(chosenMole)) {
		showMole(chosenMole);
		setTimeout(hideMole, getRandomNumber(minTime, maxTime), chosenMole);
	} else {
		showMoles(moles);
		console.log('duplicate mole picked');
	}
};

const resetMoles = (molesArray) => {
	molesArray.forEach((mole) => {
		mole.src = happyMoleURL;
		hideMole(mole);
	});
};

const endGame = (intervalID) => {
	startBtn.disabled = false;
	isGameOver = true;
	clearInterval(intervalID);
	resetMoles(moles);
	console.log('game over');
};

const scrollToBottom = () => {
	window.scrollTo(0, body.scrollHeight);
};

const startGame = () => {
	scrollToBottom();
	howToPlayBtnContainer.classList.remove('hidden');
	howToPlaySection.classList.add('hidden');
	startBtn.disabled = true;
	isGameOver = false;
	score = 0;
	updateScoreDisplay(score);
	const intervalID = setInterval(showMoles, 500, moles);
	setTimeout(() => {
		endGame(intervalID);
	}, gameTime);
};

const handleStartBtnClick = () => {
	startGame();
};

startBtn.addEventListener('click', handleStartBtnClick);

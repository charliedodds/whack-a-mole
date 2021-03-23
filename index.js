const gameTime = 10000;
const minTime = 200;
const maxTime = 1900;

const happyMoleURL =
	'https://image.shutterstock.com/image-vector/minimalist-colorful-mole-on-orange-260nw-1493935910.jpg';
const angryMoleURL =
	'https://cdn.vox-cdn.com/thumbor/kW9uPbhSLGZESG0TCZz9RmedCMc=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19739030/Mr._Resetti.jpg';

let score = 0;
let isGameOver = true;
let device;

const body = document.body;
const deviceDecider = document.querySelector('.device-decider');
const mobileBtn = document.querySelector('#mobileBtn');
const desktopBtn = document.querySelector('#desktopBtn');
const scoreDisplay = document.querySelector('#scoreDisplay');
const deviceDisplay = document.querySelector('#deviceDisplay');
const startBtn = document.querySelector('#start');
const changeDeviceBtn = document.querySelector('#changeDevice');
const main = document.querySelector('main');
const deviceSpan = document.querySelector('.device-span');
const moles = document.querySelectorAll('.mole');

const handleChangeBtnClick = () => {
	if (device === 'mobile') {
		setUpGameForDesktop();
	} else {
		setUpGameForMobile();
	}
};

changeDeviceBtn.addEventListener('click', handleChangeBtnClick);

const setUpGameForMobile = () => {
	device = 'mobile';
	deviceDisplay.innerText = device;
	main.classList.remove('hidden');
	deviceDecider.classList.add('hidden');
	deviceSpan.innerText = 'whack (tap) it';
	body.removeEventListener('keypress', handleKeypress);
	moles.forEach((mole) => {
		mole.addEventListener('click', handleMoleClick);
	});
};

const handleMobileBtnClick = () => {
	setUpGameForMobile();
};

const setUpGameForDesktop = () => {
	device = 'desktop';
	deviceDisplay.innerText = device;
	deviceSpan.innerText = 'whack its key on your keyboard';
	main.classList.remove('hidden');
	deviceDecider.classList.add('hidden');
	moles.forEach((mole) => {
		mole.removeEventListener('click', handleMoleClick);
	});
	body.addEventListener('keypress', handleKeypress);
};

const handleDesktopBtnClick = () => {
	setUpGameForDesktop();
};

mobileBtn.addEventListener('click', handleMobileBtnClick);
desktopBtn.addEventListener('click', handleDesktopBtnClick);

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

// SCORE LOGIC

const updateScoreDisplay = () => {
	scoreDisplay.textContent = score;
};

// MOLE LOGIC

const checkMoleIsShowing = (mole) => mole && mole.classList.contains('showing');

const showMole = (mole) => {
	mole.src = happyMoleURL;
	mole.classList.add('showing');
};

const hideMole = (mole) => {
	mole.classList.remove([...mole.classList].filter((className) => className !== 'mole')[0]);
};

const whackMole = (mole) => {
	mole.src = angryMoleURL;
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

const handleMoleClick = (e) => {
	const moleToWhack = e.target;
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

const startGame = () => {
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

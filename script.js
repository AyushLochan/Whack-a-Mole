const holes = document.querySelectorAll('.hole');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start');

let score = 0;
let timeLeft = 30;
let moleTimer;
let countdownTimer;
let speed = 1000;

function randomHole() {
    holes.forEach(hole => hole.classList.remove('mole'));
    const index = Math.floor(Math.random() * holes.length);
    const moleHole = holes[index];
    moleHole.classList.add('mole');

    moleHole.onclick = () => {
        if (moleHole.classList.contains('mole')) {
            score++;
            scoreEl.textContent = score;
            moleHole.classList.remove('mole');
        }
    };
}

function moveMole() {
    moleTimer = setInterval(() => {
        randomHole();
    }, speed);
}

function countdown() {
    countdownTimer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft === 20) speed = 800;
        if (timeLeft === 10) speed = 600;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            clearInterval(moleTimer);
            alert('Time’s up! Your score is: ' + score);
            resetGame();
        }
    }, 1000);
}

function startGame() {
    score = 0;
    timeLeft = 30;
    speed = 1000;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    moveMole();
    countdown();
}

function resetGame() {
    holes.forEach(hole => hole.classList.remove('mole'));
    startBtn.disabled = false;
}

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    startGame();
});

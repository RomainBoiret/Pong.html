const ball = document.getElementById('ball');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const game = document.getElementById('game');
const score = document.getElementById('score');

let ballX = 300, ballY = 200, ballSpeedX = 3, ballSpeedY = 3;
let paddleLeftY = 160, paddleRightY = 160, point = 0, paddleSpeed = 4;
let darkMode = true; 
const keysPressed = { w: false, s: false, ArrowUp: false, ArrowDown: false };

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= 390) ballSpeedY = -ballSpeedY;

    if (ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + 80 || 
        ballX >= 570 && ballY >= paddleRightY && ballY <= paddleRightY + 80) {
        ballSpeedX = -ballSpeedX;
        increaseBallSpeed();
        point++;
        score.innerHTML = "Score: " + point;
        checkForColorChange();
    }

    if (ballX < 0 || ballX > 600) resetBall();

    if (keysPressed.w && paddleLeftY > 0) paddleLeftY -= paddleSpeed;
    if (keysPressed.s && paddleLeftY < 320) paddleLeftY += paddleSpeed;
    if (keysPressed.ArrowUp && paddleRightY > 0) paddleRightY -= paddleSpeed;
    if (keysPressed.ArrowDown && paddleRightY < 320) paddleRightY += paddleSpeed;

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';
}

function increaseBallSpeed() {
    ballSpeedX += ballSpeedX > 0 ? 0.2 : -0.2;
    ballSpeedY += ballSpeedY > 0 ? 0.2 : -0.2;
}

function resetBall() {
    ballX = 300;
    ballY = 200;
    ballSpeedX = 3 * (Math.random() < 0.5 ? 1 : -1);
    ballSpeedY = 3 * (Math.random() < 0.5 ? 1 : -1);
    point = 0;
    score.innerHTML = "Score: " + point;
}

function checkForColorChange() {
    if (point % 5 === 0) {
        toggleColors();
    }
}

function toggleColors() {
    darkMode = !darkMode;
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff';
    score.style.color = darkMode ? '#fff' : '#000';
    game.style.backgroundColor = darkMode ? '#000' : '#fff';
    game.style.borderColor = darkMode ? '#fff' : '#000';
    paddleLeft.style.backgroundColor = darkMode ? '#fff' : '#000';
    paddleRight.style.backgroundColor = darkMode ? '#fff' : '#000';
    ball.style.backgroundColor = darkMode ? '#fff' : '#000';
}

document.addEventListener('keydown', e => keysPressed[e.key] = true);
document.addEventListener('keyup', e => keysPressed[e.key] = false);

setInterval(update, 1000 / 60);

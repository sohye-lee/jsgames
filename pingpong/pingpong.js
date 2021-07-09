var canvas, canvasContext;
var ballX = 75;
var ballY = 75
var ballSpeedX = 5;
var ballSpeedY = 7;

const paddle_width = 100;
const paddle_thickness = 10;
var paddleX = 400;

function updateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    var mouseX = event.clientX - rect.left - root.scrollLeft;

    paddleX = mouseX - paddle_width/2;
}

window.onload = function () {
    canvas = document.getElementById('canvasPingPong');
    canvas.height = 800;
    canvas.width = 800;
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos)
}

function updateAll() {
    moveAll();
    drawAll();
}
function moveAll() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > canvas.width) {
        ballSpeedX *= -1;
    }
    if (ballX < 0) {
        ballSpeedX *= -1;
    }
    if (ballY > canvas.height) {
        ballSpeedY *= -1;
    }
    if (ballY < 0) {
        ballSpeedY *= -1;
    }
}

function drawAll() {
    colorRect(0,0, canvas.width, canvas.height, "black");
    colorCircle(ballX, ballY, 20, 'white');
    colorRect(paddleX, canvas.height - paddle_thickness, 
        paddle_width, paddle_thickness, 'white');
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}
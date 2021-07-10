var canvas, canvasContext;
var ballX = 75;
var ballY = 75
var ballSize = 20;
var ballSpeedX = 5;
var ballSpeedY = 7;

const paddle_width = 100;
const paddle_thickness = 10;
const paddle_from_edge = 50;
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

function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function moveAll() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX + ballSize > canvas.width) {
        ballSpeedX *= -1;
    }
    if (ballX - ballSize < 0) {
        ballSpeedX *= -1;
    }
    if (ballY + ballSize > canvas.height) {
        ballReset();
    }
    if (ballY - ballSize < 0) {
        ballSpeedY *= -1;
    }

    var paddleTopEdgeY = canvas.height - paddle_from_edge;
    var paddleBottomEdgeY = paddleTopEdgeY + paddle_thickness;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleX + paddle_width;

    if (ballY + ballSize  > paddleTopEdgeY && ballY + ballSize < paddleBottomEdgeY &&
        ballX  > paddleLeftEdgeX && ballX < paddleRightEdgeX) {
        
            ballSpeedY *= -1;

            var centerOfPaddleX = paddleX + paddle_width/2;
            var ballDistFromPaddleCenter = ballX - centerOfPaddleX;
            ballSpeedX = ballDistFromPaddleCenter * 0.35;
    }

    
}

function drawAll() {
    colorRect(0,0, canvas.width, canvas.height, "black");
    colorCircle(ballX, ballY, ballSize, 'white');
    colorRect(paddleX, canvas.height - paddle_from_edge, 
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
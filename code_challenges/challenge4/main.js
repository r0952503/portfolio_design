const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

document.getElementById('motion').onclick = requestMotionPermission;

const basketImage = new Image();
basketImage.src = 'images/basket.png'; 

const fruits = [
    { src: 'images/orange.png', x: 0, y: 0, width: 60, height: 60, speed: 2, image: new Image() },
    { src: 'images/strawberry.png', x: 0, y: 0, width: 80, height: 60, speed: 2, image: new Image() }, 
   
];

fruits.forEach(fruit => {
    fruit.image.src = fruit.src;
});

let basket = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 70,
    width: 100,
    height: 70
};

let score = 0;
let timer = 30;
let gameInterval;
let animationFrameId;

function drawBasket() {
    if (basketImage.complete && basketImage.naturalHeight !== 0) {
        context.drawImage(basketImage, basket.x, basket.y, basket.width, basket.height);
    }
}

function drawFruits() {
    fruits.forEach(fruit => {
        if (fruit.image.complete && fruit.image.naturalHeight !== 0) {
            context.drawImage(fruit.image, fruit.x, fruit.y, fruit.width, fruit.height);
        }
    });
}

function updateFruitPosition() {
    fruits.forEach(fruit => {
        fruit.y += fruit.speed;
        if (fruit.y > canvas.height) {
            fruit.y = 0;
            fruit.x = Math.random() * (canvas.width - fruit.width);
        }

        if (fruit.y + fruit.height >= basket.y &&
            fruit.x + fruit.width >= basket.x &&
            fruit.x <= basket.x + basket.width) {
            score++;
            fruit.y = 0;
            fruit.x = Math.random() * (canvas.width - fruit.width);
        }
    });
}

function updateBasketPosition(gamma) {
    const maxSpeed = 10;
    const speed = (gamma / 90) * maxSpeed;
    basket.x += speed;

    if (basket.x < 0) {
        basket.x = 0;
    } else if (basket.x + basket.width > canvas.width) {
        basket.x = canvas.width - basket.width;
    }
}

function drawScore() {
    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText('Score: ' + score, 10, 20);
    context.fillText('Time: ' + timer, 10, 40);
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawFruits();
    updateFruitPosition();
    drawScore();
    animationFrameId = requestAnimationFrame(gameLoop);
}

function handleOrientation(event) {
    updateBasketPosition(event.gamma);
}

function startGame() {
    console.log("Start Game");
    document.getElementById('startScreen').style.display = 'none';
    canvas.style.display = 'block';
    window.addEventListener('deviceorientation', handleOrientation);
    gameLoop();
    startTimer();
}

function startTimer() {
    gameInterval = setInterval(() => {
        timer--;
        if (timer <= 0) {
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    cancelAnimationFrame(animationFrameId); 
    canvas.style.display = 'none';
    document.getElementById('endScreen').style.display = 'flex';
    document.getElementById('finalScore').innerText = 'Your score: ' + score;
    window.removeEventListener('deviceorientation', handleOrientation);
}

document.getElementById('playButton').addEventListener('click', () => {
    startGame();
});

document.getElementById('replayButton').addEventListener('click', () => {
    resetGame();
    startGame();
});

function resetGame() {
    score = 0;
    timer = 30;
    document.getElementById('endScreen').style.display = 'none';
}

basketImage.onload = () => {
    drawBasket();
};

function requestMotionPermission() {
    document.getElementById('motion').style.display = "none";
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientation', handleOrientation);
    }
}
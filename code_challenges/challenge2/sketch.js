let objects = [];
let nose;
let points = 0;
let timer = 30;
let lastCircleTime = 0;
let gameState = "start";

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  const poseNet = ml5.poseNet(video, modelLoaded);
  function modelLoaded() {
    console.log("hooray, model loaded!");
  }
  poseNet.on('pose', (results) => {
    if (results.length > 0) {
      nose = results[0].pose.keypoints.find(k => k.part === 'nose');
    }
  });
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "play") {
    drawGame();
  } else if (gameState === "end") {
    drawEndScreen();
  }
}

function drawGame() {
  background(255);
  image(video, width, 0, -width, height);
  textSize(20);
  fill(0);
  text(`Points: ${points}`, width - 90, 60);
  textSize(20);
  fill(0);
  text(`Timer: ${timer}`, width - 90, 30);
  for (let obj of objects) {
    fill(255);
    ellipse(obj.x, obj.y, obj.size, obj.size);
  }
  if (timer > 0) {
    if (nose) {
      for (let obj of objects) {
        let d = dist(nose.position.x, nose.position.y, obj.x, obj.y);
        if (d < 30) {
          objects = objects.filter(o => o !== obj);
          points++;
        }
      }
    }
    if (frameCount % 60 == 0) {
      timer--;
    }
    if (frameCount - lastCircleTime >= random(30, 60)) {
      objects.push({ x: random(width), y: random(height), size: 50 });
      lastCircleTime = frameCount;
    }
  } else {
    gameState = "end";
  }
}

function drawStartScreen() {
  background(255);
  textAlign(CENTER);
  textSize(36);
  fill(0);
  text("Welcome to the Nose Catcher Game!", width / 2, height / 2 - 50);
  textSize(18);
  text("Try to catch as many circles (30) with your nose as you can before time runs out.", width / 2, height / 2);
  fill('#00CED1');
  rect(width / 2 - 50, height / 2 + 20, 100, 45);
  fill(255);
  text("Play", width / 2, height / 2 + 50);
}

function drawEndScreen() {
  background(255);
  textAlign(CENTER);
  textSize(36);
  fill(0);
  if (points >= 30) {
    fill(0, 255, 0);
    text("You Win!", width/2, height/2 - 50);
  } else {
    fill(255, 0, 0);
    text("You Lose!", width/2, height/2 - 50);
  }
  textSize(24);
  text(`You scored ${points} points.`, width/2, height/2);
  fill('#00CED1');
  rect(width / 2 - 50, height / 2 + 20, 100, 45);
  fill(255);
  text("Replay", width / 2, height / 2 + 50);
}

function mousePressed() {
  if (gameState === "start" && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
    gameState = "play";
    startGame();
  } else if (gameState === "end" && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
    resetGame();
    gameState = "play";
  }
}

function startGame() {
  timer = 30;
  points = 0;
  objects = [];
  for (let i = 0; i < 5; i++) {
    objects.push({ x: random(width), y: random(height), size: 50 });
  }
}

function resetGame() {
  timer = 30;
  points = 0;
  objects = [];
  for (let i = 0; i < 5; i++) {
    objects.push({ x: random(width), y: random(height), size: 50 });
  }
}
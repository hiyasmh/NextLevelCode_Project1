// followed a snake game tutorial by Patt Vira for the general structure.
let cols;
let rows;
let size = 70;
let board = [];
let food;
let head;
let dir;
let gameOver = false;
let length = 1;
let face = [];
let wants = [];
let HomeVideo;
let startTime = 0;

function preload() {
  face = [
    loadImage('imgs/face1.png'),
    loadImage('imgs/face2.png'),
    loadImage('imgs/face3.png'),
    loadImage('imgs/face4.png'),
    loadImage('imgs/face5.png'),
    loadImage('imgs/face6.png'),
    loadImage('imgs/face7.png'),
    loadImage('imgs/face8.png'),
    loadImage('imgs/face9.png'),
    loadImage('imgs/face10.png'),
    loadImage('imgs/face11.png'),
    loadImage('imgs/face12.png'),
    loadImage('imgs/face13.png'),
    loadImage('imgs/face14.png'),
    loadImage('imgs/face16.png'),
    loadImage('imgs/face15.png'),
    loadImage('imgs/face17.png'),
    loadImage('imgs/face19.png'),
    loadImage('imgs/face20.png'),
    loadImage('imgs/face21.png'),
  ];

  wants = [
    loadImage('imgs/wants1.png'),
    loadImage('imgs/wants2.png'),
    loadImage('imgs/wants3.png'),
    loadImage('imgs/wants4.png'),
    loadImage('imgs/wants5.png'),
    loadImage('imgs/wants6.png'),
    loadImage('imgs/wants7.png'),
    loadImage('imgs/wants8.png'),
    loadImage('imgs/wants9.png'),
    loadImage('imgs/wants10.png'),
  ];

  HomeVideo = loadFont('fonts/HomeVideo-BLG6G.ttf');
}

function setup(){
  let canvas = createCanvas(770,770);
  let x = (windowWidth - width) / 8;
  let y = (windowHeight - height) / 2;
  canvas.style('display', 'block');
  canvas.position(x,y);
  canvas.style('border-radius', '18px'); 
  background(101, 130, 0);
  frameRate(4);
  cols = width/size;
  rows = height/size;
  for (let i=0; i<cols; i++){
    board[i] = [];
    for (let j=0; j<rows; j++){
      board[i][j] = 0;
    }
  }
  food = createVector(int(random(0,cols)), int(random(0,rows)));
  head = createVector(int(random(0,cols)), int(random(0,rows)));
  dir = createVector(0,0);
  startTime = millis();
}

//used ChatGPT here, was messing up the part that formats and updates the time
function updateTimer() {
    if (gameStarted && !gameOver) {
        let elapsedTime = int((millis() - startTime) / 1000);
        let minutes = floor(elapsedTime / 60);
        let seconds = elapsedTime % 60;

        // still a little confused by this right here
        let formattedTime = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

        let timerDisplay = document.getElementById("timerDisplay");
        if (timerDisplay) {
            timerDisplay.innerText = formattedTime;
        }
    }
}

function draw(){
  background(228, 255, 133);
  displayBoard();
  update();
  board[food.x][food.y] = -1;
  if (gameOver == false){
    board[head.x][head.y] = length;
    updateTimer();
  } else {
    stopTimer();
    background('rgba(255, 255, 0, 0.5)');
    textAlign(CENTER, CENTER);
    textSize(75);
    textFont('HomeVideo');
    fill(255,0,0);
    text("GAME OVER", width/2, height/2);
  }
}

function update(){
  head.add(dir);

  if (!gameStarted && (dir.x !== 0 || dir.y !== 0)) {
    gameStarted = true;
    startTime = millis();
    updateFact();
  }

  if (dist(head.x, head.y, food.x, food.y) == 0){
    // food = createVector(int(random(0,cols)), int(random(0,rows)));
    generateFood();
    length += 1;
    updateLengthDisplay(length);
    updateFact();
  }

  if (head.x < 0 || head.x > cols-1 || head.y < 0 || head.y > rows-1){
    gameOver = true;
    print("WATCH WHERE YOU'RE GOING BRUH");
  } else if(board[head.x][head.y] > 1){
    gameOver = true;
    print("WOW, YOU JUST HIT YOURSELF");
    dir.set(0,0);
  }
  else{
    board[head.x][head.y] = 1 + length;
    removeTail();
  }
    
}

function generateFood(){
  while (true){
    food = createVector(int(random(0,cols)), int(random(0,rows)));    
    if (board[food.x][food.y] == 0){
      break;
  }
}
}

function removeTail(){
  for (let i=0; i<cols; i++){
    for (let j=0; j<rows; j++){
      if (board[i][j] > 0){ 
        board [i][j] -= 1;
      }
    }
  }
}

function displayBoard(){
  for (let i=0; i<cols; i++){
    for (let j=0; j<rows; j++){
      if (board[i][j] === 0){
        if((i+j) % 2 === 0){
          fill(180,223,2);
        } else {
          fill(156,200,0);
        }
      }
      else if(board[i][j] === -1){
        let wantIndex = (length - 1) % wants.length;
        image(wants[wantIndex], i * size, j * size, size, size);
        continue;
      }
      else{
        let faceIndex = (length - 1) % face.length;
        image(face[faceIndex], i * size, j * size, size, size);
        continue;
      }
      noStroke();
      rect(i*size,j*size, size, size);
      
      // textAlign(CENTER,CENTER);
      // fill(0);
      // textSize(10);
      // text(board[i][j], size/2 + i*size, size/2 + j*size);
    }
  }
}

function keyPressed(){
  if (!gameStarted) { 
        gameStarted = true;
        startTime = millis();
    }

  if (keyCode == LEFT_ARROW){
    dir = createVector(-1,0);
  } else if(keyCode == RIGHT_ARROW){
    dir = createVector(1,0);
  } else if(keyCode == UP_ARROW){
    dir = createVector(0,-1);
  } else if(keyCode == DOWN_ARROW){
    dir = createVector(0,1);
  }
}

// function windowResized() {
//   setup();
// }
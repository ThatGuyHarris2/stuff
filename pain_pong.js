var serial;          // variable to hold an instance of the serialport library
var portName = 'COM3'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data

//var sounds = []; // create array of sounds
// paddle set up 
var paddleX;
var paddleY;
// paddle size
var paddleW = 20;
var paddleH = 100;

// how fast it moves per frame
var paddleSpeed = 10;

// variables for 2nd paddle
var paddle2X;
var paddle2Y;

// paddle2 size?
var paddle2W = 20;
var paddle2H = 100;

// how fast it moves per frame
var paddle2Speed = 10;

// set up the ball
var ballX;
var ballY;
var ballD = 20;
var ballXSpeed;
var ballYSpeed;

// set player points
var score1 = 0;
var score2 = 0;

/* 
function preload() {
	sounds[0] = loadSound("assets/wilhem.wav")
	sounds[1] = loadSound("assets/pain.wav")
  sounds[2] = loadSound("assets/zombie.wav")
  sounds[3] = loadSound("assets/torture.wav")
  sounds[4] = loadSound("assets/stab.wav")
}
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  serial = new p5.SerialPort();
  serial.open('/dev/cu.usbmodem1411');
  serial.on('data', parseData);
  //serial.on('error', printError);
  serial.open(portName);  // open a serial port

  // set paddle position
  paddleX = 50;
  paddleY = height / 2;

  paddle2X = windowWidth - 50;
  paddle2Y = height / 2;

  // ball setup...
  ballX = width / 2;
  ballY = height / 2;
  ballXSpeed = -5;
  ballYSpeed = 5;

  // set up drawing properties
  fill(255);
  noStroke();
  rectMode(CENTER);

}

function draw() {

  background(0);

  // update the position
  ballX += ballXSpeed;
  ballY += ballYSpeed;

  // if ball hits top or bottom
  if (ballY > height || ballY < 0) {
    ballYSpeed *= -1;
  }

  // if the ball hits the paddle
  // is the ballY greater than the top
  // of the paddle
  if (ballY > paddleY - paddleH / 2) {

    // is the ball also not too low?
    if (ballY < paddleY + paddleH / 2) {

      // if ball is left enough to interact
      // w paddle
      if (ballX < 70) {

        ballXSpeed *= -1;
      }
    }
  } else if (ballX < 0) {
    score2++;
	 	serial.write('R');
   //sounds[random.lenght].play();
    
    //resets the ball position
    ballXSpeed *= -1;
    ballX = width / 2;
    ballY = height / 2;
  }

  // if the ball hits the paddle
  // is the ballY greater than the top
  // of the paddle
  if (ballY > paddle2Y - paddle2H / 2) {

    // is the ball also not too low?
    if (ballY < paddle2Y + paddle2H / 2) {

      // if ball is left enough to interact
      // w paddle
      if (ballX > paddle2X) {

        ballXSpeed *= -1;
      }
    } else if (ballX > width) {
      score1++;
			serial.write('L');


      //resets the ball position
      ballXSpeed *= -1;
      ballX = width / 2;
      ballY = height / 2;
    }
  }
  // w and s keys for player 1
  if (keyIsDown('87') && paddleY > paddleH / 2) {
    paddleY -= paddleSpeed;
  }
  // same for bottom screen
  if (keyIsDown('83') && paddleY < height) {
    paddleY += paddleSpeed;
  }

  // up and down for player 2
  if (keyIsDown(UP_ARROW) && paddle2Y > paddle2H / 2) {
    paddle2Y -= paddleSpeed;
  }
  // same for bottom screen
  if (keyIsDown(DOWN_ARROW) && paddle2Y < height) {
    paddle2Y += paddleSpeed;
  }

  // render the ball with var #'s'
  rect(ballX, ballY, ballD, ballD);

  //render the paddles with the #'s in variables
  rect(paddleX, paddleY, paddleW, paddleH);
  rect(paddle2X, paddle2Y, paddle2W, paddle2H);

  noStroke();
  textSize(50);
  textFont("Impact");
  text(score1, 200, 100);
  text(score2, width - 200, 100);


}

function parseData() {
  var data = serial.readLine();

}
// console.log(data);
function keyPressed() {
  console.log(keyCode);
}

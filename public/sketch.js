let socket = io();
let myColor = 'white';

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on('color', setColor);
socket.on('newPlayer', newPlayer);

function newPlayer(newPlayerColor){
  console.log(newPlayerColor);

  push();
  fill('purple');
  rectMode(CENTER);
  rect(width / 2 , height/2, width, 50);
  textAlign(CENTER);
  textSize(30);
  fill(newPlayerColor);
  text('New player joined:' + newPlayerColor, width/2, height/2)
  pop();
  }

function setColor(assignedColor){
  myColor = assignedColor;

}

function newConnection() {
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data) {
  push();
  fill(data.color);
  ellipse(data.x, data.y, 40);
  pop();
}

function preload(){
  // put preload code here
img = loadImage('assets/cruciverba.png')
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background("black");
  imageMode(CENTER);
  image(img, width/2, (height/2) + 50, 600, 600)

push();
fill('white');
textSize(100)
  text('WORD SEARCH', 100, 100)
  pop();

  push();
  fill('white');
  textSize(36)
    text('Creadive coding edition', 100, 150)
    pop();

  push();
  translate(0, height/2.3);
  textAlign(CENTER);
  textSize(30);
  fill(myColor);
  text('Welcome' + myColor, width/2, height/2);
  pop()
  // put setup code here
}





function mouseMoved() {
  push();
  noStroke();
  fill(myColor);
  ellipse(mouseX, mouseY, 10);
  pop();

  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  };

  socket.emit("mouse", message)
}

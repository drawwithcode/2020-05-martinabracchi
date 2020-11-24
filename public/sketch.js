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
  let img = ('assets/cruciverba.png');

}

function setup() {
  createCanvas(windowWidth,windowHeight)
background("black");
imageMode(CENTER)

text('CREATIVE CODING WORD SEARCH', 0, 0);
textSize(100)

  image(img, width/2, height/2, 1000, 1000  )

  push();
  textAlign(CENTER);
  textSize(30);
  fill(myColor);
  text('Welcome' + myColor, width/2, height/2);
  pop()
  // put setup code here
}





function mouseMoved() {
  push();
  fill(myColor);
  ellipse(mouseX, mouseY, 40);
  pop();

  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  };

  socket.emit("mouse", message)
}

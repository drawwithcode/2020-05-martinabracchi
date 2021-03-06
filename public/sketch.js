let socket = io();
let myColor = 'white';

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on('color', setColor);
socket.on('newPlayer', newPlayer);

function newPlayer(newPlayerColor){
  console.log(newPlayerColor);

  push();
  translate(0, height/2.1);
  fill('black');
  rectMode(CENTER);
  rect(width / 2 , height/2, width, 50);
  textAlign(CENTER);
  textFont(myFont);
  textSize(24);
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
  noStroke();
  fill(data.color);
  ellipse(data.x, data.y, 8);
  pop();
}

function preload(){
  // put preload code here
img = loadImage('assets/cruciverba.png')
myFont = loadFont('assets/NHaasGroteskTXPro-65Md.ttf')
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background("black");
  imageMode(CENTER);
  image(img, width/2, (height/2) + 50, 600, 600);
  frameRate(500)

push();
fill('white');
textSize(100)
  text('WORD SEARCH', 100, 100)
  textFont(myFont)
  pop();

  push();
  fill('white');
  textSize(36)
    text('Creadive coding edition', 100, 150)
    textFont(myFont)
    pop();

    push();
    fill('white');
    textSize(24);
    textFont(myFont);
      text('id      array class draw html index preload setup ', width/1.3, height/1.6, 100,600)
      pop();
      push();
      fill('white');
      textSize(24);
      textFont(myFont);
        text('js    body  code function style script sketch webgl', width/1.15, height/1.6, 100,600)
        pop();

  push();
  translate(0, height/2.3);
  textAlign(CENTER);
  textSize(24);
  textFont(myFont);
  fill(myColor);
  text('Welcome' + myColor, width/2, height/2);
  pop()
  // put setup code here
}





function mouseDragged() {
  push();
  noStroke();
  fill(myColor);
  ellipse(mouseX, mouseY, 8);
  pop();

  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  };

  socket.emit("mouse", message)
}

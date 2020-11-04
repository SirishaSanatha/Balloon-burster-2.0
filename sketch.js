

var bow , arrow,  bg, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var gameState=1;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  color_balloonImage=loadImage("colorb.png");
  cactusImage=loadImage("cactus.png");
  music=loadSound("music.mp3");
  heartImage=loadImage("heart.png");
}



function setup() {
  createCanvas(550, 550);
  music.loop();
  //creating background
  bg = createSprite(0,0,300,600);
  bg.addImage(backgroundImage);
  bg.scale = 2.8
  
  // creating bow to shoot arrow
  bow = createSprite(480,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 0  
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  colorB=new Group();
  arrowGroup= new Group();
  cactusGroup=new Group();
  heartB=new Group();
  life=5;
}

function draw() {
background(0);
  if(gameState===1){
  // moving ground
    bg.velocityX = -3 

   if (bg.x < 0){
     bg.x = bg.width/2;
  }
  
  //moving bow  
    bow.y = World.mouseY
   bow.x=520;
 
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
    
  }
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,5));
  
  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else if(select_balloon==4){
      pinkBalloon();
    }
    else
      colorBalloon();
  }
  if(frameCount%200===0){
  cactus();
}
    if(frameCount%500===0){
  heartBalloon();
}
    
  if (arrowGroup.isTouching(redB)) {
  redB.destroyEach();
  arrowGroup.destroyEach();
    score=score+1;
}


if (arrowGroup.isTouching(colorB)) {
  colorB.destroyEach();
  arrowGroup.destroyEach();
    score=score+10;
}



 if (arrowGroup.isTouching(greenB)) {
  greenB.destroyEach();
  arrowGroup.destroyEach();
  score=score+3;
}



 if (arrowGroup.isTouching(blueB)) {
  blueB.destroyEach();
  arrowGroup.destroyEach();
  score=score+2;
}



if (arrowGroup.isTouching(pinkB)) {
  pinkB.destroyEach();
  arrowGroup.destroyEach();
  score=score+1;
}
 //get an extra life by bursting heart balloon
    if (arrowGroup.isTouching(heartB)) {
      life=life+1;
      arrowGroup.destroyEach();
      heartB.destroyEach();
     }

  //else if it touches cactus score will be deducted by -1
  if (cactusGroup.isTouching(redB)) {
  redB.destroyEach();
    life=life-1;
    cactusGroup.setVelocityEach(-5,5)
}


if (cactusGroup.isTouching(colorB)) {
  colorB.destroyEach();
  life=life-1;
  cactusGroup.setVelocityEach(5,-5)
}


 if (cactusGroup.isTouching(greenB)) {
  greenB.destroyEach();
  life=life-1
   cactusGroup.setVelocityEach(-5,-5)
}



 if (cactusGroup.isTouching(blueB)) {
  blueB.destroyEach();
  life=life=1;
   cactusGroup.setVelocityEach(5,5)
}



if (cactusGroup.isTouching(pinkB)) {
  pinkB.destroyEach();

  life=life-1;
  cactusGroup.setVelocityEach(5,5)
}
     drawSprites();
  stroke("white");
  strokeWeight(2);
  textSize(25);
  fill("black")
    text("Score: "+ score, 30,40);
  textSize(20)
  fill("black")
  text("Press space key to burst balloons",130,520)
   text("LIVES: "+ life, 380,40);
if(life===0){
    gameState=0;
  }
    
}  
 else if(gameState===0) {
    if(life===0){
    background("black");
     textSize(40); 
    text("GAME OVER",250,250);
     music.stop();
  }
 }
   
 
  
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
 
 
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 180;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3+(score/50);
  blue.lifetime = 180;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3+(score/50);
  green.lifetime = 180;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3+(score/50);
  pink.lifetime = 180;
  pink.scale = 1
  pinkB.add(pink);
}
function colorBalloon() {
  var color = createSprite(0,Math.round(random(100, 470)), 10, 10);
 color.addImage(color_balloonImage);
  color.velocityX = 3+(score/50);
  color.lifetime = 80;
  color.scale = 0.1
  colorB.add(color);
}
function heartBalloon() {
  var heart = createSprite(0,Math.round(random(10, 500)), 10, 10);
 heart.addImage(heartImage);
  heart.velocityX = 3+(score/50);
  heart.lifetime = 100;
  heart.scale = 0.25
  heartB.add(heart);
}

function cactus() {
var cactus = createSprite(Math.round(random(25, 500)),Math.round(random(25, 500)),10,10);
 // cactus.debug=true;
  cactus.setCollider("rectangle",0,0,700,950)
 cactus.addImage(cactusImage);
  //cactus.velocityX = 3;
  cactus.lifetime = 100;
  cactus.scale = 0.07
  cactusGroup.add(cactus);
}
// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
   arrow.setCollider("rectangle",0,0,350,150);
  // arrow.debug=true;
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}

var zombie1, zombie1Img;
var zombie2, zombie2Img;
var bg, bgImg;
var zombies;
var soldier, soldierImg;
var bullet, bulletImg;
var bulletGroup;
var groupEnemigos;
var blood, bloodImg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
zombie1Img = loadImage("zombie1.png");
zombie2Img = loadImage("zombie2.png");
bgImg = loadImage("zombackround.png");
soldierImg = loadAnimation("soldier.gif");
bulletImg = loadImage("bullet.png");
bloodImg = loadAnimation("blood.gif");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(displayWidth/2, displayHeight/2-40, 50, 100);
  bg.addImage(bgImg);
  bg.scale = 1.73;
  groupEnemigos = createGroup();
  soldier = createSprite(displayWidth-1150,displayHeight-300,50,50);
  soldier.addAnimation("soldierImg",soldierImg);
  soldier.addAnimation("bloodImg", bloodImg);
  soldier.scale= 0.4;
  bulletGroup = new Group();
  groupEnemigos = new Group();
  soldier.setCollider("circle", 0,0,15);
  soldier.debug = false;
}

function draw() {
  drawSprites();
  if (gameState === PLAY) {
    
  
  
  enemigos();
  move();
  textSize(40);
  stroke(147, 33, 9);
  fill(147, 33, 9);
  text("score: " + score, displayWidth - 200, displayHeight / 2 - 300);

  if (keyWentDown("space")){
    bullet = createSprite(soldier.x+70,soldier.y-30,10,10);
    bullet.addImage(bulletImg);
    bullet.velocityX = 20;
    bullet.scale = 0.15;
    bulletGroup.add(bullet);
    soldier.depth = bulletGroup.depth;
    soldier.depth = soldier.depth +2;
    bulletGroup.setLifetimeEach(-40);
  } else if (keyWentUp("space")){
    soldier.addAnimation("soldierImg", soldierImg);

  }
 
  if (groupEnemigos.isTouching(bulletGroup)){
    for(var i = 0; i< groupEnemigos.length; i ++){
      if (groupEnemigos[i].isTouching(bulletGroup)){
        groupEnemigos[i].destroy();
        bulletGroup.destroyEach();
        score = score + 10;
      }
    }
    } if (groupEnemigos.isTouching(soldier)) {
      gameState = END
  }}
  else if(gameState === END){
        soldier.changeAnimation("bloodImg", bloodImg);
        soldier.scale = 0.8;
        soldier.velocityX = 0;
        groupEnemigos.setVelocityXEach(0);
        textSize(100);
        fill(147, 33, 9);
        text("YOU LOSE", 500,500);
        
      }
    }

function move () {
  if(keyDown("RIGHT_ARROW")){
    soldier.x = soldier.x +2;
  }
  if(keyDown("LEFT_ARROW")&& soldier.x >= 0){
    soldier.x = soldier.x-2;
  }
  if(keyDown("UP_ARROW")&& soldier.y >= 350){
    soldier.y = soldier.y -2;
  }
  if(keyDown("DOWN_ARROW")){
    soldier.y = soldier.y +2;
  }
}

function enemigos (){
  if (frameCount % 60 === 0){
    zombies = createSprite(random(1000, 1500), random(440,550), 30,30);
    zombies.scale = 0.35;
    zombies.velocityX = -1.5;
  var round = Math.round(random(1,2));
  switch(round) {
    case 1: zombies.addImage(zombie1Img);
    break; 
    case 2: zombies.addImage(zombie2Img);
    break;
    default: break

  }
  zombies.lifetime = 300;
  groupEnemigos.add(zombies)
  groupEnemigos.setLifetimeEach(-1);
  }
}
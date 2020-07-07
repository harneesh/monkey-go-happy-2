//Global Variables
var monkeyAnimation,banana,stone,ground,gameOver, restart,backGround;
var score = 0;

function preload(){
  
  monkey = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  
  stoneImage = loadImage("stone.png");
  
  groundImage = loadImage("ground.jpg");
  
  gameOverImage = loadImage("gameOver.png");
  
  restartImage = loadImage("restart.png");
  
  backGroundImage = loadImage("jungle.jpg");
  
}


function setup() {
  createCanvas(700,500);
  
  backGround = createSprite(400,100);
  backGround.addAnimation("backGround", backGroundImage);
  backGround.scale = 2;
  
  bananaGroup = createGroup();
  
  backGround.velocityX =  -(3 + 3*score/10);
  
  ground = createSprite(0,450,1500,20);
  ground.x = ground.width /2;
  ground.velocityX =  -(3 + 3*score/10);
  ground.visible = false;
  
  stoneGroup = createGroup();
  
  monkeyAnimation = createSprite(120,400,10,10);
  monkeyAnimation.addAnimation("running", monkey);
  monkeyAnimation.scale = 0.10;
  
  textSize(20);
  stroke("white");
  fill("white");
  
}


function draw() {
 background(0); 
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if (backGround.x < 0){
    backGround.x = backGround.width/2;
  }
  
  if (keyDown("space")) {
    monkeyAnimation.velocityY = -12;
  }
  //console.log(monkeyAnimation.y);
  
  if(monkeyAnimation.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  if(stoneGroup.isTouching(monkeyAnimation)) {
    monkeyAnimation.scale = 0.06;
  }
  
  monkeyAnimation.velocityY = monkeyAnimation.velocityY + 0.5
  
  monkeyAnimation.collide(ground);
  
  switch(score) {
    case 10:monkeyAnimation.scale = 0.12;
            break;
    case 20:monkeyAnimation.scale = 0.14;
            break;
    case 30:monkeyAnimation.scale = 0.16;
            break; 
    case 40:monkeyAnimation.scale = 0.18;
            break;         
  }
  
  spawnbanana();
  
  spawnObstacles();
  
  drawSprites();
  text("SURVIVAL TIME = 0" + score,100,80); 
}

function spawnbanana() {
  if (frameCount % 150 === 0) {
    banana = createSprite(800,220);
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.07;
    banana.velocityX =  -(3 + 3*score/10);
    bananaGroup.add(banana);
    banana.lifetime = 300;
  }
}

function spawnObstacles () {
  if (frameCount % 150 === 0) {
    var stone = createSprite(750,410);
    stone.addAnimation("stone", stoneImage);
    stone.scale = 0.2;
    stone.velocityX =  -(3 + 3*score/10);
    stone.lifetime = 300;
    stoneGroup.add(stone);
    
  }
}
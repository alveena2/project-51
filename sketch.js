var PLAY=1;
var END=0;

var gamestate=PLAY;

var canvas;
var background1,backgroundImg;
var kite,kiteImg;
var building1;
var building2;
var building3;
var building4;
var building5;
var building6;
var building7;

var gameOver,restart;
var gameOverImage,restartImage;

var buildingGroup;
var score=0;


function preload(){

    backgroundImg = loadImage("./assets/sky.jpg");
    kiteImg = loadImage("./assets/kite.png");

    building1 = loadImage("./assets/building1.png");
    building2 = loadImage("./assets/building2.png");
    building3 = loadImage("./assets/building3.png");
    building4 = loadImage("./assets/building4.png");
    building5 = loadImage("./assets/building5.png");
    building6 = loadImage("./assets/building6.png");
    building7 = loadImage("./assets/building7.png");

    gameOverImage = loadImage("./assets/game over.png");
    restartImage = loadImage("./assets/resetButton.png");

}


function setup(){
    canvas = createCanvas(windowWidth,windowHeight);

    kite = createSprite(700,150,20,20);
    kite.addImage(kiteImg);
    kite.scale=0.4;

    background1 = createSprite(displayWidth/2,displayHeight/2-50,20,20);
    background1.addImage(backgroundImg);
    background1.scale=1.7
    background1.x = background1.width/2;
    
    buildingGroup = new Group();

  gameOver=createSprite(width/2,height/2);
  gameOver.addImage("game over.png",gameOverImage);
  gameOver.scale=0.5;

  restart=createSprite(width/2,height/2-120);
  restart.addImage("resetButton.png",restartImage);
  restart.scale=0.5

  kite.setCollider("cirlce",0,0,40);
  kite.debug = true;

}


function draw(){
    background(0);
    text("score: "+score,510,50);

    if(gamestate===PLAY){

      gameOver.visible = false;
      restart.visible = false;
        console.log(frameCount);
        score=score+Math.round(getFrameRate()/80)
    
       background1.velocityX=-9

       if(keyDown("enter") && kite.y >= height-120){
        kite.velocity = -10;
       }

       kite.velocityY = kite.velocityY + 0.8

    if (background1.x < 0){
        background1.x = background1.width/2;
      }
    
      
 spawnBuildings();

 if(buildingGroup.isToucing(kite)){
  gamestate=END;
 }
}
else if(gamestate===END){
  background1.velocityX=0;
  gameOver.visible = true;
  restart.visible = true;
  buildingGroup.setLifetimeEach(-1);
  buildingGroup.setVelocityXEach(0);

  if(mousePressedOver(reset)){
    reset()
  }
}

function spawnBuildings(){
if(frameCount%80===0){
   var building=createSprite(600,height-80,20,20);
    building.velocityX=-3
    var number=Math.round(random(1,7));
    switch(number){
       
    case 1 :building.addImage(building1);
            break;
    case 2 :building.addImage(building2);
            break;
    case 3 :building.addImage(building3);
            break;   
    case 4 :building.addImage(building4);
            break;  
   case 5 :building.addImage(building5);
            break;
  case 6 :building.addImage(building6);
            break;  
 case 7 :building.addImage(building7);
            break;
      default : break;                        
    }
    building.scale=1.0
    building.lifetime=400;
    buildingGroup.add(building);

  }
}
drawSprites();
}

function reset() {
  gamestate=PLAY
  gameOver.visible=false;
  restart.visible=false;
  buildingGroup.destroyEach();
  score=0;
 } 

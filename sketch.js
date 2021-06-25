
var monkey , monkey_running , bg ;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup ;
var survialTime=0;
var score=0 ;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 bg=loadImage("forest.jpg")
}



function setup() {
  createCanvas(600,600)
  monkey=createSprite(50,300,30,40)
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(300,350,1200,20);
  ground.shapeColor="green";
  ground.velocityX=-5;
  FoodGroup=createGroup();
  obstaclesGroup=createGroup();
 
  ground.visible=false;
}


function draw() {
 background(bg);
  
   if(ground.x<0){
     
    ground.x=ground.width/2; 
     
     
   }
  if(keyDown(UP_ARROW)){
    
    monkey.velocityY=-5;
    
  }
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  
  }
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                 break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
   stroke("white");
  textSize(20);
  fill("black");
  
  text("Score: "+ score, 500,50);
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  survialTime=Math.ceil(frameCount/frameRate());
  fill("black");
  text("survialTime "+survialTime,100,50);
  
  
 spawnObstacles();
  
  spawnFoods () ;
  
  drawSprites() ;
}

function spawnFoods (){
  if(frameCount%80==0){
    banana=createSprite(600,250,40,10);
    banana.addImage("banana",bananaImage);
    banana.velocityX=-4;
    banana.scale=0.1;
    banana.y=random(100,300);
    monkey.depth=banana.depth+1;
    banana.lifetime=150;
    FoodGroup.add(banana);
  }
}

function spawnObstacles (){
   if(frameCount%300==0){
    obstacle=createSprite(600,320,40,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.1;
   //obstacle=random(100,300);
    monkey.depth=obstacle.depth+1;
    obstacle.lifetime=150;
    obstaclesGroup.add(obstacle);
  }
}




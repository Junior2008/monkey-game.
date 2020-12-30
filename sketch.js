
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var score

var bananaGroup;
var obstacleGroup;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 }

function setup() {
 // createCanvas(600,600);
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  //creating ground
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  //create Obstacles and banana group
  obstaclesGroup = new Group();
  bananaGroup = new Group();
  
  survivalTime = 0;
  
}

function draw() {
  background(255);
  
  if(ground.x>0){
    ground.x = ground.width/2;
  }
  
  //jump when space key is pressed
  if(keyDown("space")) {
     monkey.velocityY = -12;
  }
  
  //add gravity    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //stop monkey from falling down
  monkey.collide(ground);
  
  //spawn the bananas
  spawnBananas();
  
  //spawn the obstacles
  spawnObstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+ survivalTime, 100,50);
  
  
} 

  function spawnObstacles(){
  if (frameCount % 300 === 0){
   obstacle = createSprite(800,320,10,40);
   obstacle.addImage(obstacleImage); 
   obstacle.velocityX = -6;
   obstacle.scale=0.15; 
    
    
   //asign lifetime to the variable
   obstacle.lifetime = 300;
  
   //adding obstacle to the group
   obstaclesGroup.add(obstacle);
 }
  }
  
  function spawnBananas(){
 if (frameCount % 300 === 0){
   var banana = createSprite(800,165,10,20);
   banana.addImage(bananaImage);
   banana.velocityX = -6;
   
   banana.scale=0.15;
   
   //assign lifetime to the variable
   banana.lifetime = 200;
   
   //adding bananas to the group
   bananaGroup.add(banana);
   
  
   
  //adjust the depth
   banana.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
     }   
  }
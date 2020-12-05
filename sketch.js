
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var obstacleimage;
var foodImg;
var score;
var gameTime;
var END= 1;
var PLAY = 0;
var gameState = PLAY;
var monkeyend;
var backimage;
var bgmusic;
var jump;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  obstacleimage = loadImage("obstacle.png");
  foodImg = loadImage("banana.png");
  monkeyend = loadAnimation("sprite_0.png");
  backimage = loadImage("jungle.png");
  bgmusic = loadSound("junglemusic.mp3");
  jump = loadSound("jump.mp3");
}

function setup() {
  createCanvas(400, 400);
  
  back = createSprite(200,200,400,400);
  back.addImage(backimage);
  backimage.scale=0.4;
  back.velocityX=-1;
  
  monkey=createSprite(80,250,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  monkey.depth=10;
  
  fill(100);
  ground=createSprite(400,351,900,10);
  ground.visible=false;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
  gameTime = 0;
  
  bgmusic.loop();
  
}


function draw() {
  background(200);
  
  if(gameState===PLAY){
    
    spawnObstacles();
    spawnFood();   
    
    if(FoodGroup.isTouching(monkey)){
      score=score+10;
      FoodGroup.destroyEach();
    }
    
    if(back.x <0){
      back.x=200;  
      
    }
    
    if(keyDown("space")&& monkey.y >= 315) {
      monkey.velocityY = -17.5; 
      jump.play();
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.velocityY=monkey.velocityY+0.7;
    
    gameTime = gameTime + Math.round(getFrameRate()/60);
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END; 
    }
    
    back.velocityX=-1;
  }
  
  monkey.collide(ground);
  
  if(gameState===END){
    
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0); 
    
      back.velocityX=0;
    
      if(keyDown("R")){
         
        gameState=PLAY;
        score = 0;
        gameTime = 0;
      }     
    
    monkey.velocityY=0;
    
    monkey.changeAnimation(monkeyend);
  }
  
  drawSprites();
  
  fill("white");
  stroke("white");
  textSize(20);
  text("Score:"+ score, 50,50);
  
  fill("black");
  stroke("black");
  textSize(20);
  text("Survival Time: "+ gameTime, 190,50);
  
  if(gameState===END){
    
    fill("red");
    textSize(25);
    text("GAME OVER!", 130,120);
    
    fill("orange");
    textSize(25);
    text("Press R to restart the game",70,170);
    
    fill("yellow");
    textSize(25);
    text("Your score="+score,120,220);
    
    fill("#84F97B");
    textSize(25);
    text("Your survival time="+gameTime,80,260);
    
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){ 
    var obstacle=createSprite(400,320,10,10);  
    obstacle.addImage(obstacleimage);
    obstacle.velocityX=-(4 + gameTime/75);
    obstacle.lifetime=110; 
    obstacle.scale=0.1;
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
    
    obstacleGroup.add(obstacle);
  }  
}

function spawnFood(){
  if(frameCount % 80 === 0){
  var food=createSprite(400,200,10,10);
  food.addImage(foodImg);
  food.velocityX = -(4 + gameTime/75);
  food.scale=0.1;
  food.y=Math.round(random(120,200));
  food.depth=5;
  food.lifetime=150;
    
  FoodGroup.add(food);
  }  
}
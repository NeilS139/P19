//the game is about purple square trying to avoid other coloured squares, because other coloured squares are jealous of his abilities

var player, playerBullet, playerBulletGroup;
var bullet1, bullet2, bullet3, bullet4, bullets;
var edges;
var gameState="start", score=0;

function preload(){
  createCanvas(400,400);
}

function setup() {
  player = createSprite(200,100,50,50);
  player.shapeColor="purple";
  edges = createEdgeSprites();
  bullets = new Group();
}

function draw() {
  background(0,0,0);
  player.bounceOff(edges);

  //Displaying Scores
  textSize(15);
  fill("yellow");
  text("Score: "+score,15,30)
  if(gameState === "start")
  {
    player.x=200;
    player.y=100;
    textSize(30);
    fill("yellow");
    text("Press Space to Start", 60, 200);

    if(keyDown("space"))
    {
      gameState="play";
      frameCount = 0;
    }
  }


  if(gameState === "play")
  {
  bullets.displace(bullets);
  
  //Score
  score+=(round(5/10));
  
  //Movement
  if(keyDown(LEFT_ARROW) || keyDown("A"))
  {
    player.x-=15;
  }

  if(keyDown(RIGHT_ARROW) || keyDown("D"))
  {
    player.x+=15;
  }

  if(keyDown(UP_ARROW) || keyDown("W"))
  {
    player.y-=15;
  }

  if(keyDown(DOWN_ARROW) || keyDown("S"))
  {
    player.y+=15;
  }

  //Spawning the Bullets
  if(frameCount%60===0){
    spawnBulletG1();
  }

  if(score>250 && frameCount%70===0)
  {
    spawnBulletG2();
  }

  if(score>500 && frameCount%80===0)
  {
    spawnBulletG3();
  }

  if(score>1000 && frameCount%90===0)
  {
    spawnBulletG4();
  }

  //"Oh No, I died!"
  if(player.isTouching(bullets))
  {
    gameState = "end";
    bullets.destroyEach();
    player.velocityX=1;
    player.velocityY=-5;
  }
  }

  if(gameState === "end")
  {
    textSize(30);
    fill("yellow");
    text("Game Over",120,200);
    textSize(10);
    text("Space to Restart",160,220);
    player.velocityY+=0.5;
    
    if(keyDown("space"))
    {
      //"I want to try again"
      player.velocityX = 0;
      player.velocityY = 0;
      player.x = 200;
      player.y = 100;
      frameCount = 0;
      score = 0;
      gameState = "play";
    }
  }
  drawSprites();
}

function spawnBulletG1() 
{
  bullet1 = createSprite(Math.round(random(25,375)), 475,10,33);
  bullet1.velocityY=-10;
  bullet1.shapeColor="red";
  bullet1.lifetime=100;
  bullets.add(bullet1);
  
}

function spawnBulletG2() 
{
  bullet2 = createSprite(475, Math.round(random(25,375)),33,10);
  bullet2.velocityX=-15;
  bullet2.shapeColor="lime";
  bullet2.lifetime=80;
  bullets.add(bullet2);
}

function spawnBulletG3() 
{
  bullet3 = createSprite(Math.round(random(25,375)), -75,10,33);
  bullet3.velocityY=+10;
  bullet3.shapeColor="gold";
  bullet3.lifetime=100;
  bullets.add(bullet3);
}

function spawnBulletG4()
{
  bullet4 = createSprite(-75, Math.round(random(25,375)),33,10);
  bullet4.velocityX=+15;
  bullet4.shapeColor="aqua";
  bullet4.lifetime=80;
  bullets.add(bullet4);
  
}

var background,bacgroundImg;
var bird,birdImg;
var pillarImg1,pillarImg2;
var pillarGroup;
var gameState="start";

function preload(){
  backgroundImg=loadImage("background.png");
  birdImg=loadImage("bird.png");
  pillarImg1=loadImage("pipe1.png");
  pillarImg2=loadImage("pipe2.png");
  pillarImg3=loadImage("pipe3.png");
  pillarImg4=loadImage("pipe4.png");
  pillarImg5=loadImage("pipe5.png");
  pillarImg6=loadImage("pipe6.png");
}
function setup(){
  createCanvas(500,300)
  background=createSprite(250,150,10,10);
  background.addImage(backgroundImg);
  background.scale=3;
  background.velocityX=-4;

  bird=createSprite(100,100,20,20);
  bird.addImage(birdImg);
  bird.scale=0.20;
  bird.setCollider("circle",20,0,120)

  pillarGroup= new Group();
}
function draw(){
  drawSprites();

  if(gameState==="start"){
    fill("black")
    textSize(20);
    text("Press Space to start",170,150);
    fill("red");
    textSize(15);
    text("Few Pillars Are Smaller than Appear",150,250);
    background.velocityX=0;
    if(keyDown("space")){
      gameState="play";
    }
  }
  if(gameState==="play"){
  topPillars();
  bottomPillars();
  background.velocityX=-4
  if(background.x<100){
    background.x=350;
  }
  if(keyDown("space")){
    bird.velocityY=-6;
  }

  bird.velocityY=bird.velocityY+0.9;

  if(pillarGroup.isTouching(bird)||bird.y>280){
    gameState="end";
  }
  }
  if(gameState==="end"){
    background.velocityX=0;
    bird.velocityY=0;
    pillarGroup.setVelocityXEach(0);
    fill("red");
    textSize(30);
    text("Game Over",200,150);
    textSize(20);
    text("press R to restart",200,180);

    if(keyDown("r")){
      gameState="start"
      bird.x=100;
      bird.y=100;
      pillarGroup.destroyEach();
    }
  }

}
function topPillars(){
  if(frameCount%50===0){
  
   var pillar1=createSprite(520,20);
  pillar1.velocityX=-4;
  var rand1=Math.round(random(1,3))
  switch(rand1){
    case 1: pillar1.addImage(pillarImg2);
    break;
    case 2: pillar1.addImage(pillarImg4);
    break;
    case 3: pillar1.addImage(pillarImg6);
  }
  pillar1.scale=0.55;
  pillarGroup.add(pillar1)
  pillar1.setCollider("rectangle",0,0,80,200)
      
}

  }
function bottomPillars(){
  if(frameCount%60===0){
    var pillar2=createSprite(520,280);
    pillar2.velocityX=-4;
    var rand2=Math.round(random(1,3));
    switch(rand2){
      case 1: pillar2.addImage(pillarImg1);
      break;
      case 2: pillar2.addImage(pillarImg3);
      break;
      case 3 :pillar2.addImage(pillarImg5); 
    }
    pillar2.scale=0.55;
    pillarGroup.add(pillar2);
    pillar2.setCollider("rectangle",0,0,80,200)
  }
}
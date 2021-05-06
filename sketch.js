//Super Mario Run
var gameState=2;

var donkeykong,donkeyKongA;
var backI,back;
var gameNameI,gameName;
var groundI,ground,invisibleGround;
var cloudI,cloud,cloudG;
var coin,coinI,coinZ;

var mario,marioA,luigi,luigiA,sonic,sonicA;
var sound;

var score=0,Point=0;

function preload(){
  //animation
  donkeyKongA=loadAnimation(" d1.png"," d2.png"," d3.png"," d4.png"," d5.png"," d6.png"," d7.png"," d8.png"," d9.png"," d10.png"," d11.png"," d12.png"," d13.png"," d14.png"," d15.png");
  sonicA=loadAnimation("  s1.png","  s2.png","  s3.png","  s4.png","  s5.png","  s6.png","  s7.png","  s8.png");
  luigiA=loadAnimation("  l1.png","  l2.png","  l3.png","  l4.png","  l5.png","  l6.png","  l7.png","  l8.png");  
  marioA=loadAnimation(" m1.png"," m2.png"," m3.png"," m4.png"," m5.png");
  
  //sound
  sound=loadSound("sound.mp3");

  //Images
  backI=loadImage(" background.jpg");
  groundI=loadImage(" ground.jpg");
  cloudI=loadImage(" cloud.png");
  gameNameI=loadImage(" name.png");
  nextI=loadImage(" next.png");
  coinI=loadImage(" coin.png");
  bridgeI=loadImage(" bridge.png");
  restartI=loadImage(" restart.png");
}

function setup(){
  createCanvas(window.innerWidth,window.innerHeight); 
  sound.play();
 
  //Groups
  cloudG=createGroup();
  coinG=createGroup();
  bridgeG=createGroup();
  
  //background
  back=createSprite(90,60,800,800);
  back.addImage(backI);
  back.scale=1115;
  
  //name
  gameName=createSprite(window.innerWidth,window.innerHeight*0+240,40,40);
  gameName.addImage(gameNameI);
  gameName.scale=1;
  gameName.visible=false;
  
  //next button
  next=createSprite(window.innerWidth/2-20,window.innerHeight-150,20,20);
  next.addImage(nextI);
  next.scale=0.1;
  next.visible=false;
  
  //restart
  restart=createSprite(window.innerWidth/2-20,window.innerHeight-150,20,20);
  restart.addImage(restartI);
  restart.scale=0.19;
  restart.visible=false;

  //ground
  ground=createSprite(900,window.innerHeight-20,200000000,20);
  ground.addImage(groundI);
  ground.scale=0.8;
  ground.velocityX=0;  
  invisibleGround=createSprite(0,window.innerHeight-50,20000,10);
  invisibleGround.visible=false;
    
  //side image
  donkeykong=createSprite(window.innerWidth-80,window.innerHeight-100,40,40);
  donkeykong.addAnimation("playing_drum",donkeyKongA);
  donkeykong.scale=0.9;
  
  //sonic image
  sonic=createSprite(50,414,50,50);
  sonic.addAnimation("character1_sonic",sonicA);
  sonic.scale=0.9;
  
  //luigi image
  luigi=createSprite(150,395,50,50);
  luigi.addAnimation("character2_luigi",luigiA);
  luigi.scale=0.28;
  
  //mario image
  mario=createSprite(250,406,50,50);
  mario.addAnimation("character3_mario",marioA);
  mario.scale=2;
}

function draw(){
  background("white");
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Character Choose State
  if(gameState===-1){
    //text
    fill ("black");
    textSize(40);
    text("Choose Your Character!",window.innerWidth/2-250,window.innerHeight*0+150);
    back.visible=false;

    gameName.visible=true;
    gameName.x=window.innerWidth-170;
    gameName.y=window.innerHeight*0+80;
    gameName.scale=0.3;

    next.visible=true;
    next.scale=0.2;

    //character pos
    sonic.x=window.innerWidth*0+130;
    sonic.scale=1.4;

    luigi.x=window.innerWidth/2-20;
    luigi.scale=0.4;

    mario.x=window.innerWidth-200;
    mario.scale=3;
    
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Before Play State
  if(gameState===0){
    //gameName
    gameName.visible=true;
    gameName.x=window.innerWidth/2-10;
    gameName.y=window.innerHeight/2-30;
    gameName.scale=0.7;

    //visible
    back.visible=true;
    sonic.visible=false;
    mario.visible=false;
    luigi.visible=false;

    //play button
    next.visible=true;
    next.scale=0.2;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Play State
  if(gameState===1){
    
    gameName.visible=false;

    //scale
    sonic.scale=0.9;
    luigi.scale=0.28;
    mario.scale=2;
        
    //ground movement
    ground.velocityX=-4;
    if(ground.x<-5){
      ground.x=window.innerWidth+50;
    }
    /*if(frameCount%100===0){
      ground.velocityX=ground.velocityX-44;
    }*/
    
    //character jump
    //sonic
    if(keyDown("space")&&sonic.y>100) {
        sonic.y = sonic.y-50;
    }    
    //add gravity
    sonic.collide(invisibleGround)
    sonic.velocityY = sonic.velocityY + 2.8;
    //prevent fall
    if(sonic.y>invisibleGround.y){
      sonic.y=200;
    }
    
    //mario
    if(keyDown("space")&&mario.y>100) {
        mario.y = mario.y-50;
    }    
    //add gravity
    mario.collide(invisibleGround)
    mario.velocityY = mario.velocityY + 2.8;
    //prevent fall
    if(mario.y>invisibleGround.y){
      mario.y=200;
    }
    
    //luigi
    if(keyDown("space")&&luigi.y>100) {
        luigi.y = luigi.y-50;
    }    
    //add gravity
    luigi.collide(invisibleGround)
    luigi.velocityY = luigi.velocityY + 2.8;
    //prevent fall
    if(luigi.y>invisibleGround.y){
      luigi.y=200
    }

    //gameName
    gameName.visible=true;
    gameName.x=window.innerWidth-170;
    gameName.y=window.innerHeight*0+80;
    gameName.scale=0.3;

    
    
    //score
    if(frameCount%2===0){score++}  

    spawnClouds();
    spawnBridges();
    spawnCoins();
  }  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //End State
  if(gameState===2){
    //visible
    back.visible=false;
    mario.visible=false;
    sonic.visible=false;
    luigi.visible=false;

    //gameName
    gameName.visible=true;
    gameName.x=window.innerWidth-170;
    gameName.y=window.innerHeight*0+80;
    gameName.scale=0.3;

    restart.visible=true;

    textSize(40);
    fill("black");
    text("WELL PLAYED!",window.innerWidth/2-140,window.innerHeight/2-50);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  drawSprites();
  textSize(20);
  fill("black");
  text("SCORE: "+score,window.innerWidth/2-230,window.innerHeight*0+20);
  text("POINTS: "+Point,window.innerWidth/2+10,window.innerHeight*0+20);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Clouds
function spawnClouds(){
  if(frameCount%200===0){
    cloud=createSprite(window.innerWidth+50,200,40,40);
    cloud.y = Math.round(random(window.innerHeight*0+50,window.innerHeight*0+280));
    cloud.addImage(cloudI);
    cloud.velocityX=ground.velocityX;
    cloud.lifetime=500;
    cloud.scale=0.15;
    cloudG.add(cloud);

    gameName.depth=cloud.depth;
    cloud.depth=cloud.depth-1;
    mario.depth=cloud.depth;
    cloud.depth=cloud.depth-1;
    sonic.depth=cloud.depth;
    cloud.depth=cloud.depth-1;
    luigi.depth=cloud.depth;
    cloud.depth=cloud.depth-1;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Coins
function spawnCoins(){
  if(frameCount%20===0&&frameCount%100!=0){
    coin=createSprite(window.innerWidth+20,window.innerHeight/2+160,40,40);
    coin.addImage(coinI);
    coin.velocityX=ground.velocityX;
    coin.lifetime=500;
    coin.scale=0.08;
    coinG.add(coin);
    
    donkeykong.depth=coin.depth;
    coin.depth=coin.depth-1;
    mario.depth=coin.depth;
    coin.depth=coin.depth-1;
    sonic.depth=coin.depth;
    coin.depth=coin.depth-1;
    luigi.depth=coin.depth;
    coin.depth=coin.depth-1;

    //point increase
    if(sonic.isTouching(coin)||mario.isTouching(coin)||luigi.isTouching(coin)){
      coin.destroyEach();
      Point++;
    }
  }
  if(frameCount%20===0&&frameCount%100!=0){
    coinZ=createSprite(window.innerWidth+20,window.innerHeight/2+210,40,40);
    coinZ.addImage(coinI);
    coinZ.velocityX=ground.velocityX;
    coinZ.lifetime=500;
    coinZ.scale=0.08;
    coinG.add(coinZ);

    donkeykong.depth=coin.depth;
    coin.depth=coin.depth-1;
    mario.depth=coinZ.depth;
    coinZ.depth=coinZ.depth-1;
    luigi.depth=coinZ.depth;
    coinZ.depth=coinZ.depth-1;
    sonic.depth=coinZ.depth;
    coinZ.depth=coinZ.depth-1;

    //point increase
    if(sonic.isTouching(coinZ)||mario.isTouching(coinZ)||luigi.isTouching(coinZ)){
      coin.destroyEach();
      Point++;
    }
  } 
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Bridges
function spawnBridges(){
  if(frameCount%180===0&&frameCount%100!=0){
    bridge=createSprite(window.innerWidth+500,window.innerHeight/2+40,400,40);
    bridge.addImage(bridgeI);
    bridge.velocityX=ground.velocityX;
    bridge.lifetime=500;
    bridge.scale=0.4;
    
    bridgeIn=createSprite(window.innerWidth+500,window.innerHeight/2+40,800,200);
    bridgeIn.velocityX=ground.velocityX;
    bridgeIn.lifetime=500;
    //bridgeI.visible=false;
    bridgeIn.scale=0.4;
    bridgeIn.debug=true;

    //bridgeG.add(bridgeIn);
    bridgeG.add(bridgeIn);  

    if(bridgeG.isTouching(mario)){
      mario.velocityY=0;
    }
    bridgeG.collide(mario);
    sonic.collide(bridgeG);
    luigi.collide(bridgeG);
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Enemy
function spawnEnemy(){
  
}
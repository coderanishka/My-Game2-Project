


var fishR,fishL,trashR,trashL,shark;

var score = 0;
var lives = 5;
var FishLGroup,FishL2Group;
var FishRGroup,FishR2Group;
var gameState = "play"; 


function preload(){
  //ground images..
  grdImg1 = loadImage("assets/grd1.png");
  grdImg2 = loadImage("assets/grd2.png");
  grdImg3 = loadImage("assets/grd3.png");
  grdImg4 = loadImage("assets/grd4.png");
  grdImg5 = loadImage("assets/grd5.png");
  grdImg6 = loadImage("assets/grd6.png");
  grdImg7 = loadImage("assets/grd7.png");
  grdImg8 = loadImage("assets/grd8.png");

  weedImg1 = loadImage("assets/weed1.png");
  weedImg2 = loadImage("assets/weed2.png");
  weedImg6 = loadImage("assets/weed6.png");
  weedImg7 = loadImage("assets/weed7.png");

  rockImg  = loadImage("assets/rock.png");

  fishL1 = loadImage("assets/fish1L.png");
  fishL2 = loadImage("assets/fish2L.png");
  fishL3 = loadImage("assets/fish3L.png");
  fishL4 = loadImage("assets/fish4L.png");
  fishL5 = loadImage("assets/fish5L.png");
  fishL6 = loadImage("assets/fish6L.png");

  fishR1 = loadImage("assets/fish1R.png");
  fishR2 = loadImage("assets/fish2R.png");
  fishR3 = loadImage("assets/fish3R.png");
  fishR4 = loadImage("assets/fish4R.png");
  fishR5 = loadImage("assets/fish5R.png");
  sharkImg = loadImage("assets/shark.png");

  trash1Img = loadImage("assets/trash1.png");
  trash2Img = loadImage("assets/trash4.png");
  trash3Img = loadImage("assets/trash5.png");
  trash4Img = loadImage("assets/trash3.png");

  boatImg = loadImage("assets/boat.png");
  hookImg = loadImage("assets/hook.png");

}

function setup(){
  createCanvas(5000,2000);

 
  ground1 = createSprite(178,1950);
  ground1.addImage("ground1",grdImg1);
  ground2 = createSprite(690,1950);
  ground2.addImage("ground2",grdImg2);
  ground3 = createSprite(1200,1960);
  ground3.addImage("ground3",grdImg3);
  ground4 = createSprite(1710,1960);
  ground4.addImage("ground4",grdImg4);
  ground5 = createSprite(2220,1945);
  ground5.addImage("ground5",grdImg5);
  ground6 = createSprite(2725,1945);
  ground6.addImage("ground6",grdImg6);
  ground7 = createSprite(3237,1945);
  ground7.addImage("ground7",grdImg7);
  ground8 = createSprite(3745,1945);
  ground8.addImage("ground8",grdImg8);
  ground9 = createSprite(4252,1945);
  ground9.addImage("ground1",grdImg1);
  ground10 = createSprite(4750,1945);
  ground10.addImage("ground2",grdImg2); 
  ground1.scale = 4;
  ground2.scale = 4;
  ground3.scale = 4;
  ground4.scale = 4;
  ground5.scale = 4;
  ground6.scale = 4;
  ground7.scale = 4;
  ground8.scale = 4;
  ground9.scale = 4;
  ground10.scale = 4;
 



  weed1 = createSprite(370,1580);
  weed1.addImage(weedImg1);
  weed1.scale = 4;
  weed2 = createSprite(650,1590);
  weed2.addImage(weedImg2);
  weed2.scale = 4;
  weed3 = createSprite(3500,1580);
  weed3.addImage(weedImg7);
  weed3.scale = 4;
  weed4 = createSprite(3355,1580);
  weed4.addImage(weedImg6);
  weed4.scale = 4;

  rock = createSprite(1560,1680);
  rock.addImage(rockImg);
  rock.scale = 4;

  hook = createSprite(2825,250,100,100);
  hook.addImage(hookImg);
  hook.scale = 0.25;

  boat = createSprite(width/2+1000,190,200,200);
  boat.addImage(boatImg);
  boat.scale = 3;
 
// small fish
   FishLGroup = new Group();
   FishRGroup = new Group();
// big fish   
   FishL2Group = new Group();
   FishR2Group = new Group();
   SharkGroup = new Group();
// trash
   TrashLGroup = new Group();   
   TrashRGroup = new Group();   

}

function draw(){
  background(0,200,200);
  createEdgeSprites();

  strokeWeight(5);
  line(hook.x+40,30,hook.x+40,hook.y-90);
  line(0,500,5000,500);


  spawnFishLSmall();
  spawnFishLBig();
  spawnFishRSmall();
  spawnFishRBig();
  spawnShark();
  spawnTrashR();
  spawnTrashL();
  
  if (keyCode === DOWN_ARROW && hook.y < 1900){
    hook.y+=7;
  }

  if (keyCode === UP_ARROW && hook.y > 250){
    hook.y-=7;
  }

  if (hook.isTouching(FishL2Group)){
    FishL2Group.y = hook.y;
    FishL2Group.x = hook.x;
  }
  if (hook.isTouching(FishLGroup)){
    FishLGroup.y = hook.y;
    FishLGroup.x = hook.x;
  }
  if (hook.isTouching(FishR2Group)){
    FishR2Group.y = hook.y;
    FishR2Group.x = hook.x;
  }
  if (hook.isTouching(FishRGroup)){
    FishRGroup.y = hook.y;
    FishRGroup.x = hook.x;
  }
  if (hook.isTouching(TrashLGroup)){
    TrashLGroup.y = hook.y;
    TrashLGroup.x = hook.x;
  }
  if (hook.isTouching(TrashRGroup)){
    TrashRGroup.y = hook.y;
    TrashRGroup.x = hook.x;
  }

  drawSprites();

  fill(0);
  textSize(60);
  text("Score : "+ score, 20,90);
  
  
  
}

function explosion(FishLGroup, pTurtle) {
  score-=10;
  FishLGroup.remove();
 }
 
 function explosion1(shark, pTurtle) {
  score-=20; 
 }

 function explosion2(TrashLGroup, pTurtle) {
  score+=20;
  TrashLGroup.destroy();
 }


function spawnFishLSmall(){
 if (frameCount%150===0){
   fishL = createSprite(-20,random(500,1900));
   fishL.velocityX = 7;
   fishL.scale = random(0.5,2);
   fishL.lifetime = 1000;
   var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: fishL.addImage(fishL2);
              break;
      case 2: fishL.addImage(fishL3);
              break;
      case 3: fishL.addImage(fishL5);
              break;   
      default: break;
    }

   FishLGroup.add(fishL);
 }
}
function spawnFishLBig(){
  if (frameCount%200===0){
    fishLb = createSprite(-20,random(500,1900),random(10,30),random(10,30));
    fishLb.velocityX = 5;
    fishLb.scale = random(1.5,2);
    fishLb.lifetime = 1000;

    var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: fishLb.addImage(fishL1);
               break;
       case 2: fishLb.addImage(fishL4);
               break;
       case 3: fishLb.addImage(fishL6);
               break;   
       default: break;
     }
 
    FishL2Group.add(fishLb);
  }
 }
 

 function spawnFishRSmall(){
  if (frameCount%100===0){
    fishR = createSprite(5100,random(500,1900));
    fishR.velocityX = -7;
    fishR.scale = random(1,2);
    fishR.lifetime = 1000;

    var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: fishR.addImage(fishR2);
               break;
       case 2: fishR.addImage(fishR3);
               break;
       case 3: fishR.addImage(fishR5);
               break;   
       default: break;
     }
 
    FishRGroup.add(fishR);
  }
 }
 function spawnFishRBig(){
   if (frameCount%250===0){
     fishRb = createSprite(5100,random(500,1900));
     fishRb.velocityX = -5;
     fishRb.scale = random(1.5,2);
     fishRb.lifetime = 1000;

     var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: fishRb.addImage(fishR1);
                break;
        case 2: fishRb.addImage(fishR4);
                break;
      default: break;
      }
  
     FishR2Group.add(fishRb);
   }
  }
 
  function spawnShark(){
    if (frameCount%1000===0){
      shark = createSprite(5500,1500);
      shark.addImage(sharkImg);
      shark.scale = 3;
      shark.velocityX = -8;
      shark.lifetime = 1000;
      SharkGroup.add(shark);
    }
  }
 
 function spawnTrashL(){
  if (frameCount%60===0){
    trashL = createSprite(-10,random(500,1900));
    trashL.velocityX = 8;
    trashL.scale = 0.1;
    trashL.lifetime = 800;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: trashL.addImage(trash1Img);
      trashL.scale = 0.7;
              break;
      case 2: trashL.addImage(trash2Img);
      trashL.scale = 0.2
              break;
      case 3: trashL.addImage(trash3Img);
              break;   
      case 4: trashL.addImage(trash4Img);
      trashL.scale = 10;
              break;   
      default: break;
    }

    TrashLGroup.add(trashL);
  }
 }

 function spawnTrashR(){
  if (frameCount%100===0){
    trashR = createSprite(5100,random(500,1900));
    trashR.velocityX = -8;
    trashR.scale = 0.1;
    trashR.lifetime = 800;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: trashR.addImage(trash1Img);
      trashR.scale = 0.7;
              break;
      case 2: trashR.addImage(trash2Img);
      trashR.scale = 0.2
              break;
      case 3: trashR.addImage(trash3Img);
              break;   
      case 4: trashR.addImage(trash4Img);
      trashR.scale = 10;
              break;   
      default: break;
    }

    TrashRGroup.add(trashR);
  }
 }

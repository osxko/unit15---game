let player;
let walls, hazards, collectibles, movingPlatforms;
let score = 0;
let bgImage;
let runSprite, jumpSprite, slideSprite; 
let hazardCooldown = 0;

function preload (){
  bgImage = loadImage("background.png"); 
  runSprite = loadImage("imageRun.png"); 
  jumpSprite = loadImage("imageJump.png"); 
  slideSprite = loadImage("imageSlide.png"); 
  goldCoin = loadImage("goldCoin1.png");
  lavaBlock = loadImage("lava.png");
  wallsBlock = loadImage("lavaland.png");
  iceBlock = loadImage("iceBlock.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 25;
 
  player = new Sprite(100, 100, 10, 10);
  player.image = runSprite; 
  player.color = "red";
  player.scale = 0.05
  player.rotationLock = true;
  player.w = 20
  player.h = 25
 
  walls = new Group();
  walls.w = 50;
  walls.h = 50;
  walls.tile = "=";
  walls.collider = 'static';
  walls.image = wallsBlock;
  walls.image.scale = 0.398;


  hazards = new Group();
  hazards.w = 50;
  hazards.h = 10;
  hazards.tile = "H";
  hazards.collider = 'static';
  hazards.color = "orange"; // hazards
  hazards.image = lavaBlock;
  
  // Adjust the scale dynamically based on the image's original dimensions
  hazards.image.scale = hazards.w / lavaBlock.width; // Scale width
  hazards.image.scaleY = (hazards.h / 2) / lavaBlock.height; // Scale height to half of hazards.h

   //  (coins)
   collectibles = new Group();
   collectibles.w = 20;
   collectibles.h = 20;
   collectibles.tile = "C";
   collectibles.collider = 'none';
   collectibles.color = "yellow"; 
   collectibles.image = loadImage("goldCoin1.png");
 // end game
 collectiblesE = new Group();
 collectiblesE.w = 20;
 collectiblesE.h = 20;
 collectiblesE.tile = "E";
 collectiblesE.collider = 'none';
 collectiblesE.color = "Green";
 collectiblesE.image = loadImage("portal.png");
 collectiblesE.image.scale = 0.161;

  //  the blue ones
  movingPlatforms = new Group();
  movingPlatforms.w = 60;
  movingPlatforms.h = 6;
  movingPlatforms.tile = "M";
  movingPlatforms.collider = 'static';
  movingPlatforms.color = "blue"; 
  movingPlatforms.image = iceBlock;

movingPlatforms.image.scale = movingPlatforms.w / iceBlock.width; 
movingPlatforms.image.scaleY = movingPlatforms.h / iceBlock.height; 


 

  new Tiles(
    ["============",
     "=..........=",
     "=..........=",
     "=..===.....=",
     "====C...C..=", 
     "=..=====H=.=",
     "=......MMMM=",
     '=....MM....=',
     "=..M.......=",
     "=EM........=",
     "=HHHHHHH===="],
    50,
    50,
    walls.w,
    walls.h
  );
}

function draw() {
  if (bgImage) {
    background(bgImage);  // backg
  } else {
    background(0);  
  }
 
  // so the camera follows the player
  camera.zoom = 4;
  camera.x = player.x;
  camera.y = player.y;
 
  //  a d w 
  if (kb.pressing('w') && player.colliding(walls)) {
    player.vel.y = -5;
    player.image = jumpSprite; 
  }
  else if (kb.pressing('a') && player.colliding(movingPlatforms)){
    player.x -= 5;
    player.image = slideSprite;
    player.mirror.x = true;
  }
  else if (kb.pressing('d') && player.colliding(movingPlatforms)) {
    player.x += 5;
    player.image = slideSprite;
    player.mirror.x = false;
  }
  else if (kb.pressing('a') && !player.colliding(movingPlatforms)) {
    player.x -= 5;
    player.image = runSprite; 
    player.mirror.x = true;
  } 
  else if (kb.pressing('d') && !player.colliding(movingPlatforms)) {
    console.log("d");
    player.x += 5;
    player.image = runSprite;
    player.mirror.x = false;
  }
 
  // Jump  
  
  else{
  }
 
  //  hazards score
  if (player.collides(hazards)) {
    if (hazardCooldown <= 0) {
      player.color = "orange"; 
      score = max(0, score - 5); 
      hazardCooldown = 30; // cooldown for 30 frames
    }
  } else {
    player.color = "red"; 
  }
  if (hazardCooldown > 0) {
    hazardCooldown--;
  }
 
  // coll collectibles
  collectibles.forEach((c) => {
    if (player.overlapping(c)) {
      c.remove(); 
      score += 10; 
    }
  });
  collectiblesE.forEach((c) => {
    if (player.overlapping(c)) {
      c.remove(); 
      score += 10; 
      window.location.href = "game2.html"; // next level
    }
  });
 

  // Reset when not on 
if (!player.colliding(movingPlatforms)) {

  //player.addImage(runSprite); 
  
  }
 // score

 fill(255);
 textSize(20);
 // score
 text("Score: " + score, camera.x - width / 2 + 20, camera.y - height / 2 + 20);}// Reset when not on 

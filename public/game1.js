let player;
let walls, hazards, collectibles, movingPlatforms;
let score = 0;
let bgImage;
let runSprite, jumpSprite, slideSprite; 
 
 
function preload (){
  bgImage = loadImage("background.png"); 
  runSprite = loadImage("imageRun.png"); 
  jumpSprite = loadImage("imageJump.png"); 
  slideSprite = loadImage("imageSlide.png"); 
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
 
 
  hazards = new Group();
  hazards.w = 50;
  hazards.h = 10;
  hazards.tile = "H";
  hazards.collider = 'static';
  hazards.color = "orange"; //  hazards
 
  //  (coins)
  collectibles = new Group();
  collectibles.w = 20;
  collectibles.h = 20;
  collectibles.tile = "C";
  collectibles.collider = 'none';
  collectibles.color = "yellow"; 
// end game
  collectiblesE = new Group();
  collectiblesE.w = 20;
  collectiblesE.h = 20;
  collectiblesE.tile = "E";
  collectiblesE.collider = 'none';
  collectiblesE.color = "Green";
 
  //  the blue ones
  movingPlatforms = new Group();
  movingPlatforms.w = 60;
  movingPlatforms.h = 10;
  movingPlatforms.tile = "M";
  movingPlatforms.collider = 'static';
  movingPlatforms.color = "blue"; 
 
  new Tiles(
    ["==========",
     "=...CH...=",
     "=...===..=",
     "=..====..=",
     "=.MMMC...=",
     "=.EMMM..==",
     "=......===",
     '=.C...====',
     "==H=======",
     "=========="],
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
 
  //  hazards
  if (player.collides(hazards)) {
    player.color = "orange";
    score += -5; // Change color + score
  } else {
    player.color = "red"; 
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
  text("Score: " + score, windowWidth / 4, windowHeight / 4);
}
//fill(255);
// textSize(20);
// text("Score: " + score, camera.x - width / 4 + 20, camera.y - height / 4 + 20);
//}
var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zumbi, zumbiImg, zumbiGroup;
var bala=50, bulletImg, bullet, bulletGroup;
var score=0;
var vida1,vida2,vida3,vidaImg1,vidaImg2,vidaImg3;
var life=3;
var somPerder,somExplosao;



function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zumbiImg = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/bullet.png");
  vidaImg1 = loadImage("assets/heart_1.png");
  vidaImg2 = loadImage("assets/heart_2.png");
  vidaImg3 = loadImage("assets/heart_3.png");

  somPerder = loadSound("assets/lose.mp3");
  somExplosao = loadSound("assets/explosion.mp3");

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {
  
createCanvas(windowWidth,windowHeight-30);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

bulletGroup = new Group();

zumbiGroup = new Group();

vida1 = createSprite(1150,50);
  vida1.addImage(vidaImg1);
  vida1.scale=0.6;
  vida1.visible=false;
vida2 = createSprite(1213,50);
  vida2.addImage(vidaImg2);
  vida2.scale=0.6;
  vida2.visible=false;
vida3 = createSprite(1150,50);
  vida3.addImage(vidaImg3);
  vida3.scale=0.6; 

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false;
   player.setCollider("rectangle",0,0,300,300)
}


function draw() {
  background(0); 

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){

  bullet = createSprite(displayWidth-1150, player.y-24,20,20);
  bullet.addImage(bulletImg);
  bullet.scale=0.05;
  bullet.velocityX=8;
  bulletGroup.add(bullet);
  bala-=1;

  player.addImage(shooter_shooting)
 
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zumbiGroup.isTouching(bulletGroup)){
  for(var i =0; i<zumbiGroup.length; i++){
    if(zumbiGroup[i].isTouching(bulletGroup)){
      zumbiGroup[i].destroy();
      bulletGroup.destroyEach();
      score+= 5;
      somExplosao.play();
    }
  }

}

if(zumbiGroup.isTouching(player)){
  for(var i =0; i<zumbiGroup.length; i++){
    if(zumbiGroup[i].isTouching(player)){
      zumbiGroup[i].destroy();
      life-=1;
  }
}
}

if(life===3){
  vida3.visible=true;
  vida2.visible=false;
  vida1.visible=false;
}

if(life===2){
  vida3.visible=false;
  vida2.visible=true;
  vida1.visible=false;
}

if(life===1){
  vida3.visible=false;
  vida2.visible=false;
  vida1.visible=true;
}

if(life===0){
  vida3.visible=false;
  vida2.visible=false;
  vida1.visible=false;

  player.visible=false;
  fill("red");
  textSize(50);
  text("Fim de jogo!",windowWidth/2,windowHeight/2);
  //somPerder.play();
}


criarZumbi();

drawSprites();
fill("red");
textSize(25);
text("Pontuação: "+score,50,50);

if(life===0){
  vida3.visible=false;
  vida2.visible=false;
  vida1.visible=false;

  player.visible=false;
  fill("red");
  textSize(50);
  text("Fim de jogo!",windowWidth/2,windowHeight/2);

  zumbiGroup.setVelocityXEach(0);
}
}

function criarZumbi(){
  if(frameCount%60===0){
    zumbi = createSprite(random(1320,1400),random(80,700),40,40);
    zumbi.addImage(zumbiImg);
    zumbi.scale=0.2;
    zumbi.velocityX=-3;

    zumbiGroup.add(zumbi);

  }
}

var gamestate = 0;

function preload() {
    playerImg = loadImage("images/hero1-removebg-preview.png");
    groundImg = loadImage("images/groundImg.jpg");
    enemyImg = loadImage("images/ghost.png");
    backgroundImg = loadImage("images/bg-removebg-preview.png");
    startImg = loadImage("images/start.png");
    healthImg = loadImage("images/health-removebg-preview.png");
    attackImg = loadImage("images/playerattack-removebg-preview.png")
    enemyattackImg = loadImage("images/attack_enemy-removebg-preview (1).png")
    dedImg = loadImage("images/game over.png");
    blablaImg = loadImage("images/blabla.png");

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    enemyGroup = new Group();


    health = createSprite(-500, 50, 75, 30);
    health.addImage(healthImg);
    health.scale = 0.5;


    base = createSprite(windowWidth / 2, windowHeight - 50, windowWidth, 100);
    base.addImage(groundImg);
    base.debug = true;
   
    player = createSprite(100, windowHeight - 182, 200, 200);
    player.addImage("player", playerImg);
    player.scale = 1.2
    player.debug = true;
    player.setCollider("rectangle", -50, 0, 50, 100)

    enemy = createSprite(windowWidth - 100, windowHeight - 200, 200, 150);
    enemy.addImage(enemyImg)
    enemy.scale = 0.6
    enemy.debug = true;

}

function draw() {

    background(backgroundImg);
    base.x = player.x;

    ded = createSprite(player.x, windowHeight / 2, windowWidth, windowHeight / 2);
    ded.scale = 5;
    ded.addImage(dedImg);
    retry = createSprite(player.x + 580, 50, 50, 50);
    retry.scale = 0.6;
    retry.addImage(blablaImg);

    if (gamestate == 0) {

        retry.visible = false;
        ded.visible = false;

        if (keyIsDown(RIGHT_ARROW)) {
            player.x = player.x + 10;
            health.x = health.x + 10;
            //base.x =base.x - 2;

        }

        if (keyIsDown(LEFT_ARROW)) {
            player.x = player.x - 10;
            health.x = health.x - 10;
            //base.x = base.x + 2

        }
// if(base.x<windowWidth/8){
// base.x = player.x;
// }
        if (keyDown(UP_ARROW) && player.y > windowHeight - 200) {
            player.velocityY = -15;
        }

        player.velocityY = player.velocityY + 1.5;

        if (keyWentDown("space")) {
            attack();

        }
        if (keyWentUp("space")) {
            player.addImage("player", playerImg);
            player.scale = 1.2
        }

        camera.x = player.x;

        atk();

        if (player.isTouching(enemyGroup)) {
            gamestate = 1;
        }
    }
    if (gamestate == 1) {
        ded.visible = true;
        blablaImg.visible = true;
        if (mousePressedOver(retry)) {
            retry.visible = false;
            ded.visible = false;
            gamestate = 0;

        }
    }

    player.collide(base);

    drawSprites();

}

function attack() {
    player.addImage("player", attackImg);
    player.scale = 0.4;
}

function atk() {
    if (frameCount % 100 == 0) {
        enemyatk = createSprite(enemy.x - 50, enemy.y + 50, 50, 20)
        enemyGroup.add(enemyatk);
        enemyatk.addImage(enemyattackImg);
        enemyatk.scale = 0.7;
        enemyatk.debug = true;
        enemyatk.setCollider("rectangle", enemyatk.x - 1140, enemyatk.y - 470, enemyatk.width - 200, enemyatk.height - 120);
        enemyatk.velocityX = -25;
    }
}





function setup() {
    createCanvas(gameWidth, gameHeight);


    //    frameRate(5);

    // set up player/character
    player = createSprite(playerXStart, playerYStart);
    //    player.setCollider("rectangle", 0, 0, 64, 64);

    player.addAnimation("idle", idle_animation);
    player.addAnimation("run", run_animation);
    player.addAnimation("jump", jump_animation);

    player.addAnimation("idle_antivenom", idle_animation_a);
    player.addAnimation("run_antivenom", run_animation_a);
    player.addAnimation("jump_antivenom", jump_animation_a);

    player.addAnimation("idle_carnage", idle_animation_c);
    player.addAnimation("run_carnage", run_animation_c);
    player.addAnimation("jump_carnage", jump_animation_c);



    player.isJumping = false;
    player.isGrounded = false;
    player.livesLeft = 3;
    // player.debug = true;
    player.scale = 0.5;
    player.isAntivenom = "";

    // Antivenom animation


    player.currentSkin = "";
    /*
        if player gets Antivenom reward
        player.currentSkin = "_white";
    */

    // Declare groups 

    platforms = new Group();
    flyingrobots = new Group();
    ArmoredScientist = new Group();
    potions = new Group();
    labs = new Group();
    hearts = new Group();


    apartment = createSprite(width / 2, height);
    apartment.addImage(apartment_img);

    //    frameRate(30);
}

function spawnPotion() {
    var x = random(potionXMin, potionXMax);
    var y = random(potionYMin, potionYMax);
    var potion = createSprite(x, y);
    if (random(1) > 0.5) {
        potion.skin = "_antivenom";
        potion.addAnimation('default', potion_animation);
    } else {
        potion.skin = "_carnage";
        potion.addAnimation('default', potion_animation);
    }
    potion.velocity.x = -random(potionSpeed, potionSpeed * 2);
    //    potion.debug = true;
    potions.add(potion);
}

function build() {

    
    spawnPotion();


    // set up platform
    var startPlatform = createSprite(platformXStart, platformYStart);
    startPlatform.setCollider("rectangle", 0, 0, 512, 32);
    startPlatform.addAnimation("default", platform_animation);
    startPlatform.velocity.x = -speed;
    startPlatform.isStartPlatform = true;
    platforms.add(startPlatform);


    var y = platformYStart;
    for (var i = 0; i < numPlatforms; i++) {
        var x = 512 + 256 * i;
        var platform = createSprite(x, y);
        //        platform.debug = true;
        platform.addAnimation("default", platform_animation);
        platform.velocity.x = -speed;
        platforms.add(platform);

        // add scientist
        if (random(1) > 0.75) {
            var a = createSprite(x - 10, y - 32);
            a.setCollider("rectangle", 0, 0, 20, 10);
            //        ArmoredScientist.debug = true;
            a.addAnimation("default", ArmoredScientist_animation);
            a.velocity.x = -speed;
            ArmoredScientist.add(a);
        }

        // adjust y
        y += random(-platformYChange, platformYChange);
    }


    // set up scenery
    for (var i = 0; i < numflyingrobot; i++) {
        var x = random(0, width);
        var y = random(FlyingRobotYMin, FlyingRobotYMax);
        var FlyingRobot = createSprite(x, y);
        FlyingRobot.addAnimation("default", FlyingRobot_animation);
        FlyingRobot.velocity.x = -random(FlyingRobotSpeed, FlyingRobotSpeed * 2);
        flyingrobots.add(FlyingRobot);
    }



    //    for (var i = 0; i < numlab; i++) {
    //        var x = random(0, 640);
    //        var y = random(LabYMin, LabYMax);
    //        var Lab = createSprite(x, y);
    //        Lab.addImage("default", Lab_img);
    //        Lab.velocity.x = -LabSpeed - random(0, 0.1);
    //        labs.add(Lab);
    //    }



    // loop - structure in JavaScript that repeats code
    //    for (var i = 0; i < numArmoredScientist; i++) { // happens 3 times
    //        var x = random(width, width * 3);
    //        var y = random(ArmoredScientistYMin, ArmoredScientistYMax);
    //        var a = createSprite(x, y);
    //        a.setCollider("rectangle", 0, 0, 20, 10);
    ////        ArmoredScientist.debug = true;
    //        a.addAnimation("default", ArmoredScientist_animation);
    //        a.velocity.x = -speed;
    //        ArmoredScientist.add(a);
    //    }
}
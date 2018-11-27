/* assets */

// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;
var glider_sheet, glider_animation;

// platform
var platforms;
var start_platform_img, platform_img;

// scenery
var clouds, cloud_sheet, cloud_animation;
var trees, tree_img;

// obstacles
var arrows; // group
var arrow_sheet, arrow_animation;
var arrow_hit_sheet, arrow_hit_animation;

// rewards 
var hearts;
var heart_sheet, heart_animation;

var gliders;
var glider_sheet, glider_animation;

function preload() {
    idle_sheet = loadSpriteSheet("sprites/main_character/main_character_idle.png", 128, 128, 16);
    idle_animation = loadAnimation(idle_sheet);

    run_sheet = loadSpriteSheet("sprites/main_character/main_character_running.png", 128, 128, 6);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/main_character/main_character_jumping.png", 128, 128, 30);
    jump_animation = loadAnimation(jump_sheet);

    glider_sheet = loadSpriteSheet("sprites/main_character/main_character_glider.png", 128, 128, 8);
    glider_animation = loadAnimation(glider_sheet);
    glider_animation.frameDelay = 4;

    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/start_platform.png");

    cloud_sheet = loadSpriteSheet("sprites/scenery/cloud.png", 64, 32, 12);
    cloud_animation = loadAnimation(cloud_sheet);

    tree_img = loadImage("sprites/scenery/tree.png");

    arrow_sheet = loadSpriteSheet("sprites/obstacles/arrow.png", 32, 32, 3);
    arrow_animation = loadAnimation(arrow_sheet);

    arrow_hit_sheet = loadSpriteSheet("sprites/obstacles/arrow_hit.png", 32, 32, 5);
    arrow_hit_animation = loadAnimation(arrow_hit_sheet);

    glider_sheet = loadSpriteSheet("sprites/rewards/glider.png", 32, 32, 5);
    glider_animation = loadAnimation(glider_sheet);
}
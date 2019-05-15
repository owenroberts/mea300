/* graphic*/
var platformFiles = [
    "assets/platforms/level1.png", "assets/platforms/level2.png", "assets/platforms/level3.png"
];
const jump_files = [
	"assets/sfx/character/jump0.wav", "assets/sfx/character/jump1.wav", "assets/sfx/character/jump2.wav",
];

const cloud_files = [
	"assets/clouds/cloud00.png",
	"assets/clouds/cloud01.png",
	"assets/clouds/cloud02.png",
	"assets/clouds/cloud03.png"
];

/* audio */
const Hit_files = [
	"assets/sfx/character/Hit0.wav", "assets/sfx/character/Hit1.wav", "assets/sfx/character/Hit2.wav", "assets/sfx/character/Hit3.wav"
];

const pickup_files = [
	"assets/sfx/character/pickup0.wav", "assets/sfx/character/pickup1.wav", "assets/sfx/character/pickup2.wav",
];

const obstacle_files = [
	"assets/sfx/character/obstacle0.wav", "assets/sfx/character/obstacle1.wav", "assets/sfx/character/obstacle2.wav",
];

const powerup_files = [
    "assets/sfx/character/powerup0.wav", "assets/sfx/character/powerup1.wav", "assets/sfx/character/powerup2.wav", "assets/sfx/character/powerup3.wav",
];

const carhit_files = [
    "assets/sfx/character/carhit2.wav",
];

const die_files = [
	"assets/sfx/character/die1.wav", "assets/sfx/character/die2.wav",
];

const enter_files = [
    "assets/sfx/character/enter.wav",
];

function preload() {
     bg_music = loadSound("assets/sfx/character/bk.wav");
    for (let i = 0; i < jump_files.length; i++) {
        const jump_sound = loadSound(jump_files[i]);
        jump_sfx.push(jump_sound);
    }
    for (let i = 0; i < Hit_files.length; i++) {
        const Hit_sound = loadSound(Hit_files[i]);
        Hit_sfx.push(Hit_sound);
    }
    for (let i = 0; i < pickup_files.length; i++) {
        const pickup_sound = loadSound(pickup_files[i]);
        pickup_sfx.push(pickup_sound);
    }
    for (let i = 0; i < obstacle_files.length; i++) {
        const obstacle_sound = loadSound(obstacle_files[i]);
        obstacle_sfx.push(obstacle_sound);
    }

    for (let i = 0; i < powerup_files.length; i++) {
        const powerup_sound = loadSound(powerup_files[i]);
        powerup_sfx.push(powerup_sound);
    }
    for (let i = 0; i < carhit_files.length; i++) {
        const carhit_sound = loadSound(carhit_files[i]);
        carhit_sfx.push(carhit_sound);
    }
    for (let i = 0; i < die_files.length; i++) {
        const die_sound = loadSound(die_files[i]);
        die_sfx.push(die_sound);
    }
    for (let i = 0; i < enter_files.length; i++) {
        const enter_sound = loadSound(enter_files[i]);
        enter_sfx.push(enter_sound);
    }
    myFont = loadFont('fonts/VT323/VT323-Regular.ttf');
    dieFont = loadFont('fonts/Nosifer/Nosifer-Regular.ttf');

}

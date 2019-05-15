/* menu
0 intro screen
1 instruction
2 player dies
3 result
4 second level
5 thirdlevel
*/

/* gamestates
0 intro screen 
1 instructions 
2 game 
3 dies 
4 result
5 next level
*/

var coinCount = 0,
    lifeCount = 100,
    peopleCount = 0;
const SPEED = 6;
const w = 640;

var menus = [
    {
        titles: [
			"The Fire World"
		],
        buttons: [
            {
                text: "Play Game",
                state: 2,
                x: 150,
                y: 300
			},{
                text: "Story",
                state: 7,
                x: 300,
                y: 300
            },
            {
                text: "Instructions",
                state: 1,
                x: 450,
                y: 300
			}
		],
        bkg: "assets/background/background1.png"
	},
    {
        titles: [
			"instructions",
		],
        subtitles: [
            "press speace to jump",
			"Arrow right and left to move",
            "press X to shoot",
			"fire station is the end of the level",
            "Collect coins, pigs, hearts",
            "Avoid black bears, gray tabacos, fireflowers"
        ],
        buttons: [
            {
                text: "Play Game",
                state: 2,
                x: 320,
                y: 320
			}
            
		],
        bkg: "assets/background/bk2.png"
	},
    {
       
        buttons: [
            {
                text: "Start Next Level",
                state: 2,
                x: 200,
                y: 300
			}
		],
        bkg: "assets/background/background1.png"
	},
    {
         titles: [
			"You Died",
		],
        buttons: [
            {
                text: "see your result",
                state: 4,
                x: 300,
                y: 300,
                background: "bke_img"
			}
		],
        bkg: "assets/ending/end.png"
	},
    {
        bkg: ["assets/background/bkresult.png"],
        titles: [
			"Your result"
            
		],

        buttons: [
            {
                text: "try again",
                //enter_sfx[floor(random(0, enter_sfx.length))].play();
                state: 0,
                x: 300,
                y: 300

			}
		],

	},
    {
        bkg: ["assets/background/intro1.png"],
        buttons: [
            {
                text: "Next page",
                state: 8,
                x: 300,
                y: 300

			}
		],

    },
    {
        bkg: ["assets/background/intro.png"],
        buttons: [

            {
                text: "play game",
                state: 2,
                x: 300,
                y: 300

			}
		],

    }
];

var levelData = {
    0: {
        people: 4,
        coins: 4,
        fireflowers: 1,
        tabacos: 0,
        enemies: 3,
        health: 3,
        bosses: 1,
        puzzles: [
            {
                art: "puzzle1/pp/pp1.png",
                index: 0
            }

        ],
        platform: "assets/platforms/level1.png",
        speedMin: SPEED / 5,
        speedMax: SPEED,
        goalDistance: w * 3 // 0
    },
    1: {
        people: 3,
        coins: 3,
        tabacos: 1,
        fireflowers: 2,
        enemies: 4,
        health: 2,
        bosses: 0,
        puzzles: [
            {
                art: "puzzle1/pp/pp1.png",
                index: 0
            }

        ],
        platform: "assets/platforms/level2.png",
        speedMin: SPEED / 4,
        speedMax: SPEED * 1.5,
        goalDistance: w * 5
    },
    2: {
        people: 3,
        coins: 2,
        tabacos: 1,
        fireflowers: 3,
        enemies: 4,
        health: 2,
        bosses: 1,
        puzzles: [
            {
                art: "puzzle1/pp/pp1.png",
                index: 0
            }

        ],
        platform: "assets/platforms/level3.png",
        speedMin: SPEED / 4,
        speedMax: SPEED * 2,
        goalDistance: w * 7
    },
    3: {
        people: 2,
        coins: 2,
        tabacos: 2,
        fireflowers: 3,
        enemies: 5,
        health: 1,
        bosses: 2,
        puzzles: [
            {
                art: "puzzle1/pp/pp1.png",
                index: 0
            }

        ],
        platform: "assets/platforms/level3.png",
        speedMin: SPEED / 2,
        speedMax: SPEED * 2,
        goalDistance: w * 8

    }
};

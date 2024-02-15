/*
Max-Emilien Kluiwstra-Descalle
Mod Title:
Hours
4 New explosions and randomized: 3 points
Add time remaining on screen: 3 points
Cleaned up title screen to make it more gmae like: 3 points
New Scrolling Tile Sprite (added Meteors :3): 1 point
New Spaceship worth more points, new design, and faster(gl hitting it): 5 points (Made one of the intial ones go slower and move it for fun, it also gives less points)
Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship: 5 points

Sources: 
https://stackoverflow.com/questions/73127868/phaser-time-event-wont-loop
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/
https://labs.phaser.io/edit.html?src=src\game%20objects\particle%20emitter\add%20emit%20zone.js


*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

let timer;
let timeText;

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let keyFIRE, keyRESET, keyLEFT, keyRIGHT

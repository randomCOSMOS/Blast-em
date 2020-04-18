const gameSettings = {
    playerSpeed: 200,
    maxPowerups: 2,
    powerUpVel: 50,
}

const CONFIG = {
    width: 256,
    height: 272,
    physics:{
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Scene1, Scene2]
}

let game = new Phaser.Game(CONFIG);
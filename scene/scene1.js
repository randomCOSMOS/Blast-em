class Scene1 extends Phaser.Scene {
    constructor() {
        super('title');
    }

    preload() {
        this.load.image('background', "assets/background.png");
        this.load.spritesheet('ship', 'assets/ship.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('ship2', 'assets/ship2.png', {
            frameWidth: 32,
            frameHeight: 16
        });
        this.load.spritesheet('ship3', 'assets/ship3.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('explosion', 'assets/explosion.png',{
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create() {
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0)

        this.scene.start('main');
    }
}
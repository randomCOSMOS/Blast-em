class Scene2 extends Phaser.Scene {
    constructor() {
        super('main')
    }

    moveShip(ship, speed){
        ship.y += speed;

        if (ship.y > CONFIG.height){
            this.resetShip(ship);
        }
    }

    resetShip(ship){
        ship.y = 0;
        let randomX = Phaser.Math.Between(0, CONFIG.width);
        ship.x = randomX;
    }

    create() {
        this.background = this.add.tileSprite(0,0,CONFIG.width, CONFIG.height, 'background');
        this.background.setOrigin(0, 0);

        this.ship = this.add.sprite(CONFIG.width / 2 - 50, CONFIG.height / 2, 'ship');
        this.ship2 = this.add.sprite(CONFIG.width / 2, CONFIG.height / 2, 'ship2');
        this.ship3 = this.add.sprite(CONFIG.width / 2 + 50, CONFIG.height / 2, 'ship3');

        this.anims.create({
            key: 'ship1_anim',
            frames: this.anims.generateFrameNumbers('ship'),
            frameRate: 20,
            repeat: -1
        })
    }

    update(){
        this.moveShip(this.ship, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

        this.background.tilePositionY -= 0.5;
    }
}
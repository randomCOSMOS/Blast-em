class Scene2 extends Phaser.Scene {
    constructor() {
        super('main')
    }

    moveShip(ship, speed) {
        ship.y += speed;

        if (ship.y > CONFIG.height) {
            this.resetShip(ship);
        }
    }

    resetShip(ship) {
        ship.y = 0;
        let randomX = Phaser.Math.Between(0, CONFIG.width);
        ship.x = randomX;
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture('explosion');
        gameObject.play('explode');
    }

    shootBeam() {
        let beam = new Beam(this);
    }

    movePlayerManager() {
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        } else {
            this.player.setVelocityY(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.space)) {
            this.shootBeam();
        }
    }

    pickPowerUp(player, powerUp) {
        // powerUp.disableBody(true, true);
        powerUp.destroy();
    }

    hurtPlayer(player, enemy) {
        this.resetShip(enemy);
        player.x = CONFIG.width / 2 - 8;
        player.y = CONFIG.height - 64;
    }

    hitEnemy(projectile, enemy){
        projectile.destroy();
        this.resetShip(enemy);
    }

    create() {
        // background
        this.background = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'background');
        this.background.setOrigin(0, 0);

        // ships
        this.ship = this.add.sprite(CONFIG.width / 2 - 50, CONFIG.height / 2, 'ship');
        this.ship2 = this.add.sprite(CONFIG.width / 2, CONFIG.height / 2, 'ship2');
        this.ship3 = this.add.sprite(CONFIG.width / 2 + 50, CONFIG.height / 2, 'ship3');

        this.ship.play('ship1_anim');
        this.ship2.play('ship2_anim');
        this.ship3.play('ship3_anim');

        // enemies
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        // power-up
        this.powerUps = this.physics.add.group();

        let maxPower = 5;
        for (let i = 0; i < maxPower; i++) {
            let powerUp = this.powerUps.create(16, 16, 'power-up');
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

            if (Math.random() > 0.5) {
                powerUp.play('red');
            } else {
                powerUp.play('grey');
            }

            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        // player
        this.player = this.physics.add.sprite(CONFIG.width / 2, CONFIG.height - 64, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.play('thrust');

        // projectiles
        this.projectiles = this.add.group();

        // interaction
        this.ship.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on('gameobjectdown', this.destroyShip, this);

        // collision
        this.physics.add.collider(this.projectiles, this.powerUps, (projectile, powerUp) => {
            projectile.destroy();
        });

        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
    }

    update() {
        this.moveShip(this.ship, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

        this.background.tilePositionY -= 0.5;

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.movePlayerManager();

        this.projectiles.children.iterate((child) => {
            child ? child.update() : null;
        })
    }
}
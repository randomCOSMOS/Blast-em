class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        let x = scene.player.x;
        let y = scene.player.y;

        super(scene, x, y, 'beam');
        scene.projectiles.add(this);
        scene.add.existing(this);

        this.play('shoot');

        scene.physics.world.enableBody(this);
        this.body.velocity.y = -gameSettings.playerSpeed - 50;
    }

    update() {
        if (this.y < 0) {
            this.destroy();
        }
    }
}
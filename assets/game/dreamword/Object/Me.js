import Phaser from "phaser";
class Me extends Phaser.GameObjects.Sprite {
    cursors;
    cursorswasd;
    speed = 4;
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        scene.matter.add.gameObject(this);
        this.setVelocity(0, 0);
        this.setFrictionAir(0);
        this.setFriction(0);
        this.setBounce(1);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.cursorswasd = scene.input.keyboard.addKeys('W,S,A,D');
    }
    update() {
        this.setVelocity(0);
        if (this.cursors.left.isDown || this.cursorswasd.A.isDown) {
            this.setVelocityX(-this.speed);
        }
        else if (this.cursors.right.isDown || this.cursorswasd.D.isDown) {
            this.setVelocityX(this.speed);
        }
        if (this.cursors.up.isDown || this.cursorswasd.W.isDown) {
            this.setVelocityY(-this.speed);
        }
        else if (this.cursors.down.isDown || this.cursorswasd.S.isDown) {
            this.setVelocityY(this.speed);
        }
    }
}

export { Me };
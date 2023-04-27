import Phaser from "phaser";
class Car extends Phaser.GameObjects.Sprite {
    cursors;
    cursorswasd;
    speed = 6;
    constructor(scene) {
        super(scene);
        scene.matter.add.gameObject(this);
        this.setCircle(8);
        this.setVelocity(0, 0);
        this.setFrictionAir(0);
        this.setFriction(0);
        this.setBounce(0);
        this.setStatic(true);
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

export { Car };
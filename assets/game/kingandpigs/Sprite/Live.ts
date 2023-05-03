import Phaser from "phaser";
class Live extends Phaser.Physics.Arcade.Sprite {
    private isHeartHit: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture = 'livesAndCoinsSheet', frame: string | number | undefined = 1) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.setSize(12, 12);
    }
    update() {
        if (!this.isHeartHit) {
            this.anims.play({
                key: 'bigHeartIdle',
                repeat: -1
            }, true);
        }
    }
    getIsHeartHit() {
        return this.isHeartHit;
    }
    diamondCollected() {
        if (!this.isHeartHit) {
            this.isHeartHit = true;
            this.anims.play({
                key: 'bigHeartCollected',
                repeat: 0,
                hideOnComplete: true
            });
        }
    }
}

export default Live;
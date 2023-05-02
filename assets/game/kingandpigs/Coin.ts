import Phaser from "phaser";
class Coin extends Phaser.Physics.Arcade.Sprite {
    private isDiamonHit: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture = 'livesAndCoinsSheet', frame = 29);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false)
        this.setSize(12, 12)
    }
    update() {
        if (!this.isDiamonHit) {
            this.anims.play({
                key: 'bigDiamondIdle',
                repeat: -1
            }, true)
        }
    }
    getIsDiamonHit() {
        return this.isDiamonHit
    }
    diamondCollected() {
        if (!this.isDiamonHit) {
            this.isDiamonHit = true
            this.anims.play({
                key: 'bigDiamondCollected',
                repeat: 0,
                hideOnComplete: true
            })
        }
    }
}

export { Coin };
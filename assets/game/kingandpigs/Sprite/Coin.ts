import Phaser from "phaser";
class Coin extends Phaser.Physics.Arcade.Sprite {
    private isDiamonHit: boolean = false;
    isBigDiamon: boolean = true;
    constructor(scene: Phaser.Scene, isBigDiamon: boolean = true, x: number = 0, y: number = 0, frame: string | number | undefined = 29, height: number = 12, width: number = 12, texture: string | Phaser.Textures.Texture = 'livesAndCoinsSheet') {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.setSize(width, height);
        this.isBigDiamon = isBigDiamon;
    }
    update() {
        if (!this.isDiamonHit) {
            this.anims.play({
                key: this.isBigDiamon ? 'bigDiamondIdle' : 'smallDiamondIdle',
                repeat: -1
            }, true);
        }
    }
    getIsDiamonHit() {
        return this.isDiamonHit;
    }
    diamondCollected() {
        if (!this.isDiamonHit) {
            this.isDiamonHit = true;
            this.anims.play({
                key: this.isBigDiamon ? 'bigDiamondCollected' : 'smallDiamondCollected',
                repeat: 0,
                hideOnComplete: true
            });
        }
    }
}

export default Coin;
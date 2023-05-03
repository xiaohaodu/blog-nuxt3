import Phaser from "phaser";
class Live extends Phaser.Physics.Arcade.Sprite {
    private isHeartHit: boolean = false;
    isBigHeart: boolean = true;
    constructor(scene: Phaser.Scene, isBigHeart: boolean = true, x: number = 0, y: number = 0, frame: string | number | undefined = 11, height: number = 10, width: number = 10, texture: string | Phaser.Textures.Texture = 'livesAndCoinsSheet') {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.setSize(width, height);
        this.isBigHeart = isBigHeart;
    }
    update() {
        if (!this.isHeartHit) {
            this.anims.play({
                key: this.isBigHeart ? 'bigHeartIdle' : 'smallHeartIdle',
                repeat: -1
            }, true);
        }
    }
    heartHit() {
        if (!this.isHeartHit) {
            this.isHeartHit = true;
            this.anims.play({
                key: this.isBigHeart ? 'bigHeartHit' : 'smallHeartHit',
                repeat: 0,
                hideOnComplete: true
            });
        }
    }
}

export default Live;
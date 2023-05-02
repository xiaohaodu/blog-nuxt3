import Phaser from "phaser";
class Door extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x = 0, y = 0, texture = 'doorsheet', frame = 0);
        scene.physics.add.existing(this);
        this.setSize(48, 56);
        this.setOffset(24, 25);
        this.on('animationcomplete', (animation: Phaser.Animations.Animation) => {
            if (animation.key == 'doorOpening') {

            }
        });
    }
    open() {
        this.anims.play({
            key: 'doorOpening',
            repeat: 0
        }, true);
    }
    close() {
        this.anims.play({
            key: 'doorClosing',
            repeat: 0,
        }, true);
    }
}

export default Door;
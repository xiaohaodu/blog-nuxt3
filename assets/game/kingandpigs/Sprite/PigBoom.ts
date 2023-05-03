import Phaser from "phaser";
class PigBox extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture = 'pigboomsheet', frame: string | number | undefined = 0) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        this.setSize(18, 18);
    }
}
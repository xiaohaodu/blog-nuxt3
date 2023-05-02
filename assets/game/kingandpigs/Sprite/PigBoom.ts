import Phaser from "phaser";
class PigBox extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture = 'pigboomsheet', frame = 0);
        scene.physics.add.existing(this);
        this.setSize(18, 18);
    }
}
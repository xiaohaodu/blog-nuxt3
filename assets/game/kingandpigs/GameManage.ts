import Phaser from "phaser";
class GameManage extends Phaser.Physics.Arcade.Sprite {
    private lives: number = 3;
    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, texture: string | Phaser.Textures.Texture = 'livesAndCoinsSheet', frame: string | number | undefined = 0) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.setSize(96, 96);
    }
}

export default GameManage;
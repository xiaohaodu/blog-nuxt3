import Phaser from "phaser";
interface Cursorswasd {
    W?: Phaser.Input.Keyboard.Key,
    A?: Phaser.Input.Keyboard.Key,
    S?: Phaser.Input.Keyboard.Key,
    D?: Phaser.Input.Keyboard.Key
}
class King extends Phaser.Physics.Arcade.Sprite {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private cursorswasd?: Cursorswasd;
    private speed = 4!;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this)
        this.cursors = scene.input.keyboard?.createCursorKeys();
        this.cursorswasd = { ...scene.input.keyboard?.addKeys('W,S,A,D') };
    }
    update() {
        // this.setVelocity(0);
        if (this.cursors?.left.isDown || this.cursorswasd?.A?.isDown) {
            this.setVelocityX(-this.speed);
        }
        else if (this.cursors?.right.isDown || this.cursorswasd?.D?.isDown) {
            this.setVelocityX(this.speed);
        }
        if (this.cursors?.up.isDown || this.cursorswasd?.W?.isDown) {
            this.setVelocityY(-this.speed - 30);
        }
        else if (this.cursors?.down.isDown || this.cursorswasd?.S?.isDown) {
            this.setVelocityY(this.speed);
        }
    }
}

export { King };
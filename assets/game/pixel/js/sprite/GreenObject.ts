import Phaser from 'phaser';
interface Cursorswasd {
    W?: Phaser.Input.Keyboard.Key,
    A?: Phaser.Input.Keyboard.Key,
    S?: Phaser.Input.Keyboard.Key,
    D?: Phaser.Input.Keyboard.Key;
}
class GreenObject extends Phaser.Physics.Matter.Sprite {
    protected cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    protected cursorswasd?: Cursorswasd;
    protected speed = 4!;
    constructor(scene: Phaser.Scene, x: number, y: number, texture?: string | Phaser.Textures.Texture, frame?: string | number | undefined, options?: Phaser.Types.Physics.Matter.MatterBodyConfig | undefined) {
        super(scene.matter.world, x, y, texture = 'greenobject', frame, options = {
            shape: { width: 36, height: 36 },
            frictionAir: 0,
            friction: 0,
            frictionStatic: 0,
        });
        scene.add.existing(this);
        this.setVelocity(0, 0);
        this.setFrictionAir(0);
        this.setFriction(0);
        this.setBounce(1);
        this.cursors = scene.input.keyboard?.createCursorKeys();
        this.cursorswasd = { ...scene.input.keyboard?.addKeys('W,S,A,D') };
    }
    update() {
        this.setVelocity(0);
        if (this.cursors?.left.isDown || this.cursorswasd?.A?.isDown) {
            this.setVelocityX(-this.speed);
        }
        else if (this.cursors?.right.isDown || this.cursorswasd?.D?.isDown) {
            this.setVelocityX(this.speed);
        }
        if (this.cursors?.up.isDown || this.cursorswasd?.W?.isDown) {
            this.setVelocityY(-this.speed);
        }
        else if (this.cursors?.down.isDown || this.cursorswasd?.S?.isDown) {
            this.setVelocityY(this.speed);
        }
    }
}
export { GreenObject };
import Phaser from "phaser";
interface Cursorswasd {
    W?: Phaser.Input.Keyboard.Key,
    A?: Phaser.Input.Keyboard.Key,
    S?: Phaser.Input.Keyboard.Key,
    D?: Phaser.Input.Keyboard.Key;
}
class Pig extends Phaser.Physics.Arcade.Sprite {
    protected cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    protected cursorswasd?: Cursorswasd;
    protected speed: number = 70;
    protected isDead: boolean = false;
    protected typeTexture: { type: string; key: string; frame: number; height: number, width: number; offsetx: number, offsety: number; } = {
        type: 'pig',
        key: 'pigsheet',
        frame: 0,
        height: 18,
        width: 18,
        offsetx: 31,
        offsety: 23
    };
    static readonly typeTexture = {
        pig: {
            type: 'pig',
            key: 'pigsheet',
            frame: 0,
            width: 18,
            height: 18,
            offsetx: 31,
            offsety: 31
        },
        pigKing: {
            type: 'pigKing',
            key: 'pigkingsheet',
            frame: 0,
            width: 18,
            height: 20,
            offsetx: 31,
            offsety: 28
        },
        pigBox: {
            type: 'pigBox',
            key: 'pigboxsheet',
            frame: 5,
            width: 18,
            height: 26,
            offsetx: 31,
            offsety: 23
        },
        pigBoom: {
            type: 'pigBoom',
            key: 'pigboomsheet',
            frame: 4,
            width: 20,
            height: 18,
            offsetx: 31,
            offsety: 31
        }
    };
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture = 'pigsheet', frame: string | number | undefined = 0) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(18, 18);
        this.cursors = scene.input.keyboard?.createCursorKeys();
        this.cursorswasd = { ...scene.input.keyboard?.addKeys('W,S,A,D') };

        this.on('animationcomplete', (animation: Phaser.Animations.Animation) => {

        });
    }
    setType(type: 'pig' | 'pigKing' | 'pigBoom' | 'pigBox') {
        this.typeTexture = { ...Pig.typeTexture[type] };
        this.setTexture(this.typeTexture.key, this.typeTexture.frame);
        this.setSize(this.typeTexture.width, this.typeTexture.height);
        this.setOffset(this.typeTexture.offsetx, this.typeTexture.offsety);
    }
    update() {
        if (!this.isDead) {
            this.run();
            if (this.body?.blocked.left || this.body?.blocked.right) {
                this.speed = -this.speed;
            }
            if (this.speed > 0) {
                this.setFlipX(true);
            } else {
                this.setFlipX(false);
            }
            this.setVelocityX(this.speed);
        } else {
            this.setVelocity(0);
        }
    }
    idle() {
        this.anims.play({
            key: `${this.typeTexture.type}Idle`,
            repeat: -1
        }, true);
    }
    run() {
        this.anims.play({
            key: `${this.typeTexture.type}Run`,
            repeat: -1
        }, true);
    }
    getIsDead() {
        return this.isDead;
    }
    dead() {
        if (!this.isDead) {
            this.isDead = true;
            this.anims.play({
                key: `${this.typeTexture.type}Dead`,
                repeat: 0
            }, true);
        }
    }
}

export default Pig;
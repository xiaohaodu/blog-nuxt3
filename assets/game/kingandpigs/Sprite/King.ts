import Phaser from "phaser";
interface Cursorswasd {
    W?: Phaser.Input.Keyboard.Key,
    A?: Phaser.Input.Keyboard.Key,
    S?: Phaser.Input.Keyboard.Key,
    D?: Phaser.Input.Keyboard.Key;
}
class King extends Phaser.Physics.Arcade.Sprite {
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private cursorswasd?: Cursorswasd;
    private speed: number = 150;
    private isAttack: boolean = false;
    private rangeAttack: Phaser.GameObjects.Zone;
    private isDead: boolean = false;
    private isActive: boolean = false;
    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, texture: string | Phaser.Textures.Texture = 'kingsheet', frame: string | number | undefined = 0) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(20, 30);
        this.cursors = scene.input.keyboard?.createCursorKeys();
        this.cursorswasd = { ...scene.input.keyboard?.addKeys('W,S,A,D') };
        this.on('animationcomplete', (animation: Phaser.Animations.Animation) => {
            if (animation.key == 'kingAttack') {
                this.isAttack = false;
            }
            if (animation.key == 'kingDoorOut' || animation.key == 'kingDoorIn') {
                this.isActive = true;
            }
        });
        this.rangeAttack = scene.add.zone(this.x + 32, this.y, 16, 16);
        scene.physics.add.existing(this.rangeAttack);
        (this.rangeAttack.body! as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    }
    outDoor() {
        this.anims.play({
            key: 'kingDoorOut',
            repeat: 0
        }, true);
    }
    inDoor() {
        this.isActive = false;
        this.anims.play({
            key: 'kingDoorIn',
            repeat: 0
        }, true);
    }
    getRangeAttack() {
        return this.rangeAttack;
    }
    getIsAttack() {
        return this.isAttack;
    }
    getIsDead() {
        return this.isDead;
    }
    update() {
        this.setVelocityX(0);
        if (!this.isDead && this.isActive) {
            if (this.flipX) {
                this.rangeAttack.x = this.x - 32;
                this.rangeAttack.y = this.y;
            } else {
                this.rangeAttack.x = this.x + 32;
                this.rangeAttack.y = this.y;
            }

            if (this.cursors?.left.isDown || this.cursorswasd?.A?.isDown) {
                this.setFlipX(true);
                this.setVelocityX(-this.speed);
                this.run();
            }
            else if (this.cursors?.right.isDown || this.cursorswasd?.D?.isDown) {
                this.setFlipX(false);
                this.setVelocityX(this.speed);
                this.run();
            } else {
                this.idle();
            }

            if ((this.cursors?.up.isDown || this.cursorswasd?.W?.isDown) && (this.body! as Phaser.Physics.Arcade.Body).onFloor()) {
                this.setVelocityY(-this.speed);
            }
            else if (this.cursors?.down.isDown || this.cursorswasd?.S?.isDown) {
                this.setVelocityY(this.speed);
            }
            this.jump();
            this.attack();
        }
    }
    idle() {
        if (!this.isAttack) {
            this.anims.play({ key: 'kingIdle', repeat: -1 }, true);
        }
    }
    run() {
        if (!this.isAttack) {
            this.anims.play({ key: 'kingRun', repeat: -1 }, true);
        }
    }
    jump() {
        if (this.body!.velocity.y < 0) {
            this.setTexture('kingsheet', 11);
        }
        if (this.body!.velocity.y > 0) {
            this.setTexture('kingsheet', 12);
        }
    }
    dead() {
        if (!this.isDead) {
            this.isDead = true;
            this.anims.play({
                key: 'kingDead',
                repeat: 0
            });
        }
    }
    attack() {
        if (this.cursors?.space.isDown && (this.body! as Phaser.Physics.Arcade.Body).onFloor() && !this.isAttack) {
            this.isAttack = true;
            this.anims.play({
                key: 'kingAttack',
                repeat: 0
            }, true);

        }
    }
}

export default King;
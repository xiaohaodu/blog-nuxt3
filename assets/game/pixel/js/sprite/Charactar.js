import Phaser from 'phaser';

class green_characters extends Phaser.GameObjects.Sprite {
    isDead = false;
    isAttack = false;
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}
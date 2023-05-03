import Phaser from "phaser";
import { GreenObject } from '../sprite/GreenObject';
class Game extends Phaser.Scene {
    constructor() {
        super('gamescene');
    }
    protected greenObject!: GreenObject;
    create() {
        console.log('game start');
        const map = this.make.tilemap({ key: 'map' });
        const tilesheet = map.addTilesetImage('tilesheet', 'tilesheet', 64, 64);
        const bg = map.createLayer('bg', tilesheet!);
        const colliderLayer = map.createLayer('collider', tilesheet!)!;
        this.greenObject = map.createFromObjects('object', {
            name: 'green',
            classType: GreenObject,
            key: 'greenobject'
        })[0] as GreenObject;

        colliderLayer.setCollisionFromCollisionGroup(true, true);
        console.log(colliderLayer);

        this.matter.world.convertTilemapLayer(colliderLayer);
        this.matter.world.setBounds();
    }
    update() {
        this.greenObject.update();
    }
}

export { Game };
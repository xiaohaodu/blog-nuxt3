import Phaser from "phaser";
import { GreenObject } from '../sprite/GreenObject';
class Game extends Phaser.Scene {
    constructor() {
        super('gamescene');
    }
    greenObject;
    create() {
        console.log('game start');
        const map = this.make.tilemap({ key: 'map' });
        const tilesheet = map.addTilesetImage('tilesheet', 'tilesheet', 64, 64);
        const bg = map.createLayer('bg', tilesheet);
        const colliderLayer = map.createLayer('collider', tilesheet);
        this.greenObject = map.createFromObjects('object', {
            name: 'green',
            classType: GreenObject
        })[0];

        // this.colliderObjectLayer = this.map.getObjectLayer('colliderObject');
        // console.log(this.map, this.colliderObjectLayer);

        this.greenObject.setTexture('greenobject');
        // console.log(colliderLayer);
        // console.log(colliderLayer.body);
        colliderLayer.setCollisionFromCollisionGroup(true, true);
        this.matter.world.convertTilemapLayer(colliderLayer);
        this.matter.world.setBounds();
    }
    update() {
        this.greenObject.update();
    }
}

export { Game };
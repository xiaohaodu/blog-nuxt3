import Phaser from "phaser";
import { GreenObject } from '../sprite/GreenObject';
class Game extends Phaser.Scene {
    constructor() {
        super('gamescene');
    }
    greenObject;
    map;
    create() {
        console.log('game start');
        this.map = this.make.tilemap({ key: 'map' });
        this.tilesheet = this.map.addTilesetImage('tilesheet', 'tilesheet', 64, 64);
        this.bg = this.map.createLayer('bg', this.tilesheet);
        this.colliderLayer = this.map.createLayer('collider', this.tilesheet);
        this.greenObject = this.map.createFromObjects('object', {
            name: 'green',
            classType: GreenObject
        })[0];

        // this.colliderObjectLayer = this.map.getObjectLayer('colliderObject');
        // console.log(this.map, this.colliderObjectLayer);

        this.greenObject.setTexture('greenobject');
        this.greenObject.setSize(36, 36);
        this.colliderLayer.setCollisionFromCollisionGroup(true, true);
        this.matter.world.convertTilemapLayer(this.colliderLayer);
        this.matter.world.setBounds();
    }
    update() {
        this.greenObject.update();
    }
}

export { Game };
import Phaser from "phaser";
import { King } from "./King";

class GameStart extends Phaser.Scene {
    constructor() {
        super('GameStart');
    }
    private king!: King;
    create() {
        const map = this.make.tilemap({ key: 'MapFirst' })
        const tilesheet = map.addTilesetImage('Terrain(32x32)', 'Terrain', 32, 32)!;
        const bg = map.createLayer('bg', tilesheet!);
        const colliderLayer = map.createLayer('collider', tilesheet!)!;
        this.king = map.createFromObjects('object', {
            name: 'king',
            classType: King,
            key: 'KingIdle',
            frame: 1
        })[0] as King;
        colliderLayer.setCollisionFromCollisionGroup(true, false);
        this.physics.add.collider(this.king, colliderLayer)
    }
    update() {
        this.king.update();
    }
}

export { GameStart };
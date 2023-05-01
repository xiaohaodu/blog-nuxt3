import Phaser from "phaser";
import { King } from "./King";
import { Pig } from "./Pig";

class GameStart extends Phaser.Scene {
    constructor() {
        super('GameStart');
    }
    private king!: King;
    private pigs!: Pig[];
    create() {
        const map = this.make.tilemap({ key: 'MapFirst' })
        const tilesheet = map.addTilesetImage('Terrain(32x32)', 'Terrain', 32, 32)!;
        const bg = map.createLayer('bg', tilesheet!);
        const colliderLayer = map.createLayer('collider', tilesheet!)!;
        this.king = map.createFromObjects('object', {
            name: 'king',
            classType: King,
            key: 'kingsheet',
            frame: 1
        })[0] as King;
        this.pigs = map.createFromObjects('object', {
            name: 'pig',
            classType: Pig,
            key: 'pigsheet',
            frame: 1
        }) as Pig[]
        colliderLayer.setCollisionFromCollisionGroup(true, false);
        this.physics.add.collider(this.king, colliderLayer)
        this.pigs.forEach(pig => {
            this.physics.add.collider(pig, colliderLayer)
            this.physics.add.collider(pig, this.king)
        })
    }
    update() {
        this.king.update();
    }
}

export { GameStart };
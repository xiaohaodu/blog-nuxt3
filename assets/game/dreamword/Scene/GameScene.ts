import Phaser from "phaser";
import { Me } from '@/assets/game/dreamword/Object/Me';
import { Car } from '@/assets/game/dreamword/Object/Car';
//游戏运行层
class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }
    protected me!: Me;
    protected car!: Car;
    create() {
        const map = this.make.tilemap({ key: 'mapfantasy' });
        const tileSheet = map.addTilesetImage('sheet', 'mapspritesheet', 16, 16, 0, 1);
        // const tileSheet = map.addTilesetImage('sheet', 'mapsheet', 16, 16);
        const tileLayer = map.createLayer('word', tileSheet!)!;
        this.me = map.createFromObjects('object', { name: 'me', classType: Me, key: 'mapspritesheet', frame: 29 })[0] as Me;
        this.car = map.createFromObjects('object', { name: 'car', classType: Car, key: 'mapspritesheet', frame: 716 })[0] as Car;
        tileLayer.setCollisionFromCollisionGroup(true, true);

        console.log(tileLayer);

        // this.matter.world.convertTilemapLayer(tileLayer);
        this.matter.world.setBounds();
    }
    update() {
        this.me.update();
    }
}

export { GameScene };
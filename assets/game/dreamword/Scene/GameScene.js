import Phaser from "phaser";
import { Me } from '@/assets/game/dreamword/Object/Me';
import { Car } from '@/assets/game/dreamword/Object/Car';
//游戏运行层
class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }
    #me;
    #car;
    create() {
        const map = this.make.tilemap({ key: 'mapfantasy' });
        const tileSheet = map.addTilesetImage('sheet', 'mapspritesheet', 16, 16, 0, 1);
        const tileLayer = map.createLayer('word', tileSheet);
        this.#me = map.createFromObjects('object', { name: 'me', classType: Me })[0];
        this.#me.setTexture('mapspritesheet', 29);
        this.#car = map.createFromObjects('object', { name: 'car', classType: Car })[0];
        this.#car.setTexture('mapspritesheet', 716);
        tileLayer.setCollisionFromCollisionGroup(true, true);
        // console.log(tileLayer);
        // console.log(this.#me);
        //不知道为什么这里出错
        console.log(map);
        // this.matter.world.convertTilemapLayer(tileLayer);
        this.matter.world.setBounds();
    }
    update() {
        this.#me.update();
    }
}

export { GameScene };
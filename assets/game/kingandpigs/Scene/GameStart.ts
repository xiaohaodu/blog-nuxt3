import Phaser from "phaser";
import King from "../Sprite/King";
import Pig from "../Sprite/Pig";
import Coin from "../Sprite/Coin";
import Door from "../Sprite/Door";
import GameManage from "../GameManage";
import GameSceneBase from "./GameSceneBase";

class GameStart extends GameSceneBase {
    constructor() {
        super('GameStart');
    }
    create() {
        this.createMapBase('MapBegin', { tilesetName: 'Terrain(32x32)', key: 'Terrain', tileHeight: 32, tileWidth: 32 }, { layerID: 'collider' }, 'bg');
        this.createDoorAndKing();
    }
    update() {
        this.updateBase();
    }
}

export default GameStart;
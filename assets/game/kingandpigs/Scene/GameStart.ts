import GameSceneBase from "./GameSceneBase";

class GameStart extends GameSceneBase {
    constructor() {
        super('GameStart');
    }
    create() {
        this.createMapBase('MapBegin', { tilesetName: 'Terrain(32x32)', key: 'Terrain', tileHeight: 32, tileWidth: 32 }, { layerID: 'collider' }, 'bg');
        this.createDoorAndKing();
        this.createPig();
        this.createCoin();
        this.createManage();
        this.createStart();
    }
    update() {

        this.updateBase();
    }
}

export default GameStart;
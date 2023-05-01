import Phaser from "phaser";
//map
import MapFirst from '@/assets/game/kingandpigs/Map/first.json'

//mapimg
import Terrain from '@/assets/game/kingandpigs/Map/Terrain(32x32).png'

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
        this.load.on('progress', (value: number) => {
            console.log(value);
        });
        this.load.on('complete', () => {
            this.scene.start('GameStart');
        });

        //mapimg
        this.load.image('Terrain', Terrain)
        //map

        this.load.tilemapTiledJSON('MapFirst', MapFirst)

    }
    create() {

    }
}

export { BootScene };
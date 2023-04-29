import Phaser from "phaser";
import greenobject from '@/assets/game/pixel/resource/PNG/Default(64px)/Characters/green_character.png';
import map from '@/assets/game/pixel/resource/Tiled/sampleMap.json';
import map2 from '@/assets/game/pixel/resource/Tiled/colliderObject/sampleMap.json';
import tilesheet from '@/assets/game/pixel/resource/Tilesheet/tilesheet.png';
class Boot extends Phaser.Scene {
    constructor() {
        super('bootscene');
    }
    preload() {
        this.load.on('progress', (value: number) => {
            console.log(value);
        });
        this.load.on('complete', () => {
            this.scene.start('gamescene');
        });
        this.load.image('greenobject', greenobject);
        this.load.tilemapTiledJSON('map', map);
        this.load.tilemapTiledJSON('map2', map2);
        this.load.image('tilesheet', tilesheet);
    }
    create() {
        console.log('boot scene');
    }
}

export { Boot };
import Phaser from "phaser";
import mapsheet from '@/assets/game/dreamword/Tilemap/tileset_legacy.png';
import mapfantasy from '@/assets/game/dreamword/Tilemap/fantasy.json';
import mapinterior from '@/assets/game/dreamword/Tilemap/interior.json';
import mapplatformer from '@/assets/game/dreamword/Tilemap/platformer.json';
import mapurban from '@/assets/game/dreamword/Tilemap/urban.json';
//资源加载层
class BootScene extends Phaser.Scene {
    constructor() {
        super('boot');
    }
    preload() {
        this.load.on('progress', (value: number) => {
            console.log(value);
        });
        this.load.on('complete', () => {
            this.scene.start('game');
        });
        this.load.image('mapsheet', mapsheet);
        this.load.spritesheet('mapspritesheet', mapsheet, { frameWidth: 16, frameHeight: 16, spacing: 1 });
        this.load.tilemapTiledJSON('mapfantasy', mapfantasy);
        this.load.tilemapTiledJSON('mapinterior', mapinterior);
        this.load.tilemapTiledJSON('mapplatformer', mapplatformer);
        this.load.tilemapTiledJSON('mapurban', mapurban);
    }
    create() {
        // this.anims.create({
        //     key: 'walk',
        //     frames: this.anims.generateFrameNumbers('mapspritesheet', { frames: [0, 1, 2, 3] }),
        //     frameRate: 8,
        //     repeat: -1
        // });
    }
}

export { BootScene };
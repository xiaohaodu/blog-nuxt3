import Phaser from "phaser";
//map
import MapBegin from '@/assets/game/kingandpigs/MapSource/begin.json';

//mapimg
import Terrain from '@/assets/game/kingandpigs/MapSource/Terrain(32x32).png';

//aseprite json and source
import kingSpritesheet from '@/assets/game/kingandpigs/AsepriteSheet/02-KingHuman.png';
import kingSpritesheetJson from '@/assets/game/kingandpigs/AsepriteJson/02-KingHuman.json';

import pigSpritesheet from '@/assets/game/kingandpigs/AsepriteSheet/03-Pig.png';
import pigSpritesheetJson from '@/assets/game/kingandpigs/AsepriteJson/03-Pig.json';

import pigBoxSpritesheet from '@/assets/game/kingandpigs/AsepriteSheet/04-PigBox.png';
import pigBoxSpritesheetJson from '@/assets/game/kingandpigs/AsepriteJson/04-PigBox.json';


import pigBoomSpritesheet from '@/assets/game/kingandpigs/AsepriteSheet/05-PigBoom.png';
import pigBoomSpritesheetJson from '@/assets/game/kingandpigs/AsepriteJson/05-PigBoom.json';

import pigHideSpritesheet from '@/assets/game/kingandpigs/AsepriteJson/06-PigHide.json';
import kingPigSpritesheet from '@/assets/game/kingandpigs/AsepriteJson/07-KingPig.json';
import bombSpritesheet from '@/assets/game/kingandpigs/AsepriteJson/08-Bomb.json';
import boxSpritesheet from '@/assets/game/kingandpigs/AsepriteJson/09-Box.json';

import doorsheet from '@/assets/game/kingandpigs/AsepriteSheet/11-Door.png';
import doorsheetJson from '@/assets/game/kingandpigs/AsepriteJson/11-Door.json';

import livesAndCoinsSheet from '@/assets/game/kingandpigs/AsepriteSheet/12-Lives and Coins.png';
import livesAndCoinsSheetJson from '@/assets/game/kingandpigs/AsepriteJson/12-Lives and Coins.json';


class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
        this.load.on('progress', (value: number) => {
            console.log(value);
        });
        this.load.on('complete', () => {
            // this.scene.start('GameStart');
            this.scene.start('TestScene');
        });

        //mapimg
        this.load.image('Terrain', Terrain);
        //map
        this.load.tilemapTiledJSON('MapBegin', MapBegin);

        //aseprite
        this.load.aseprite('kingsheet', kingSpritesheet, kingSpritesheetJson);
        this.load.aseprite('pigsheet', pigSpritesheet, pigSpritesheetJson);
        this.load.aseprite('livesAndCoinsSheet', livesAndCoinsSheet, livesAndCoinsSheetJson);
        this.load.aseprite('doorsheet', doorsheet, doorsheetJson);
        this.load.aseprite('pigboxsheet', pigBoxSpritesheet, pigBoxSpritesheetJson);
        this.load.aseprite('pigboomsheet', pigBoomSpritesheet, pigBoomSpritesheetJson);
    }
    create() {
        this.anims.createFromAseprite('kingsheet');
        this.anims.createFromAseprite('pigsheet');
        this.anims.createFromAseprite('livesAndCoinsSheet');
        this.anims.createFromAseprite('doorsheet');
        this.anims.createFromAseprite('pigboxsheet');
        this.anims.createFromAseprite('pigboomsheet');
    }
}

export default BootScene;
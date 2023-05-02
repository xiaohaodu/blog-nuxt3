import Phaser from "phaser";
//map
import MapFirst from '@/assets/game/kingandpigs/Map/first.json'

//mapimg
import Terrain from '@/assets/game/kingandpigs/Map/Terrain(32x32).png'

//aseprite json and source
import kingSpritesheet from '@/assets/game/kingandpigs/AsepriteSheet/02-KingHuman.png'
import kingSpritesheetJson from '@/assets/game/kingandpigs/AsepriteJson/02-KingHuman.json'

import pigSpritesheet from '@/assets/game/kingandpigs/AsepriteSheet/03-Pig.png'
import pigSpritesheetJson from '@/assets/game/kingandpigs/AsepriteJson/03-Pig.json'

import pigBoxSpritesheet from '@/assets/game/kingandpigs/AsepriteJson/04-PigBox.json'
import pigBoomSpritesheet from '@/assets/game/kingandpigs/AsepriteJson/05-PigBoom.json'
import pigHideSpritesheet from '@/assets/game/kingandpigs/AsepriteJson/06-PigHide.json'
import kingPigSpritesheet from '@/assets/game/kingandpigs/AsepriteJson/07-KingPig.json'
import bombSpritesheet from '@/assets/game/kingandpigs/AsepriteJson/08-Bomb.json'
import boxSpritesheet from '@/assets/game/kingandpigs/AsepriteJson/09-Box.json'

import livesAndCoinsSheet from '@/assets/game/kingandpigs/AsepriteSheet/12-Lives and Coins.png'
import livesAndCoinsSheetJson from '@/assets/game/kingandpigs/AsepriteJson/12-Lives and Coins.json'

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

        //aseprite
        this.load.aseprite('kingsheet', kingSpritesheet, kingSpritesheetJson)
        this.load.aseprite('pigsheet', pigSpritesheet, pigSpritesheetJson)
        this.load.aseprite('livesAndCoinsSheet', livesAndCoinsSheet, livesAndCoinsSheetJson)
        console.log(this.textures);

    }
    create() {
        this.anims.createFromAseprite('kingsheet')
        this.anims.createFromAseprite('pigsheet')
        this.anims.createFromAseprite('livesAndCoinsSheet')
    }
}

export { BootScene };
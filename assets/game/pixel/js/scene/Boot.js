import Phaser from "phaser";
import green_characters from '@/assets/game/pixel/resource/PNG/Default(64px)/Characters/green_character.png';
class Boot extends Phaser.Scene {
    constructor() {
        super('boot-scene');
    }
    preload() {
        this.load.on('progress', (value) => {
            console.log(value);
        });
        this.load.on('complete', () => {
            this.scene.start('game-scene');
        });
        this.load.image('green_charactar', green_characters);
    }
    create() {
        console.log('boot scene');
    }
}

export { Boot };
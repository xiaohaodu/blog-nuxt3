import Phaser from "phaser";

class Game extends Phaser.Scene {
    constructor() {
        super('game-scene');
    }
    preload() {

    }
    create() {
        console.log('game start');
    }
}

export { Game };
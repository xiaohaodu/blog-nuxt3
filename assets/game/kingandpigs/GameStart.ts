import Phaser from "phaser";
import { King } from "./King";

class GameStart extends Phaser.Scene {
    constructor() {
        super('GameStart');
    }
    private king!: Phaser.Physics.Matter.Sprite;
    create() {
    }
    update() {
        this.king.update();
    }
}

export { GameStart };
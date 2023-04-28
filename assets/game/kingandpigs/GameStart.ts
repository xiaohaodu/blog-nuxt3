import Phaser from "phaser";
import { King } from "./King";

class GameStart extends Phaser.Scene {
    constructor() {
        super('GameStart');
    }
    private king!: Phaser.Physics.Matter.Sprite;
    create() {
        this.king = new King(this, 0, 0, 'KingIdle', 0);
        console.log(this.king);
    }
    update() {
        this.king.update();
    }
}

export { GameStart };
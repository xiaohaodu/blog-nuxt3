import Phaser from "phaser";
import GameManage from "../GameManage";
class TestScene extends Phaser.Scene {
    constructor() {
        super('TestScene');
    }
    private gameManage!: GameManage;
    create() {
        this.gameManage = new GameManage(this, 100, 100, 'livesAndCoinsSheet', 0);
    }
    update() {
        this.gameManage.update();
    }
}
export default TestScene;
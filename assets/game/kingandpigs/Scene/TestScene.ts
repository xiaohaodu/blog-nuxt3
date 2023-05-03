import Phaser from "phaser";
import GameManage from "../GameManage";
class TestScene extends Phaser.Scene {
    constructor() {
        super('TestScene');
    }
    create() {
        const gameManage = new GameManage(this, 100, 100, 'livesAndCoinsSheet', 0);
    }
}
export default TestScene;
import Phaser from "phaser";
import GameManage from "../GameManage";
class TestScene extends Phaser.Scene {
    constructor() {
        super('TestScene');
    }
    create() {
        const gameManage = new GameManage(this, 100, 100, 'livesAndCoinsSheet', 0);
        console.log(gameManage);
        const hh = this.add.sprite(300, 300, 'livesAndCoinsSheet', 0);
    }
}
export default TestScene;
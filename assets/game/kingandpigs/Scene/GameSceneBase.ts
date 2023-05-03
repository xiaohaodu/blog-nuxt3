import Phaser from "phaser";
import King from "../Sprite/King";
import Pig from "../Sprite/Pig";
import Coin from "../Sprite/Coin";
import Door from "../Sprite/Door";
import GameManage from "../GameManage";

class GameSceneBase extends Phaser.Scene {
    constructor(name: string) {
        super(name);
    }
    protected king!: King;
    protected initKingPosition = {
        x: 0,
        y: 0
    };
    protected pigs!: Pig[];
    protected coins!: Coin[];
    protected fromDoor!: Door;
    protected toDoor!: Door;
    protected gameManage!: GameManage;
    protected tipText!: Phaser.GameObjects.Text;
    createBase() {
        const map = this.make.tilemap({ key: 'MapBegin' });
        const tilesheet = map.addTilesetImage('Terrain(32x32)', 'Terrain', 32, 32)!;
        const bg = map.createLayer('bg', tilesheet!);
        const colliderLayer = map.createLayer('collider', tilesheet)!;
        const pigColliderLayer = map.createLayer('pigCollider', tilesheet)!;
        this.fromDoor = map.createFromObjects('object', {
            name: 'fromDoor',
            classType: Door,
            key: 'doorsheet',
            frame: 0
        })[0] as Door;
        this.toDoor = map.createFromObjects('object', {
            name: 'toDoor',
            classType: Door,
            key: 'doorsheet',
            frame: 0
        })[0] as Door;
        this.coins = map.createFromObjects('object', {
            name: 'coin',
            classType: Coin,
            key: 'livesAndCoinsSheet',
            frame: 29
        }) as Coin[];
        this.pigs = map.createFromObjects('object', {
            name: 'pig',
            classType: Pig,
            key: 'pigsheet',
            frame: 0
        }) as Pig[];
        this.king = map.createFromObjects('object', {
            name: 'king',
            classType: King,
            key: 'kingsheet',
            frame: 0
        })[0] as King;
        this.initKingPosition.x = this.king.x;
        this.initKingPosition.y = this.king.y;
        colliderLayer.setCollisionFromCollisionGroup(true, false);
        this.physics.add.collider(this.king, colliderLayer);
        this.physics.add.collider(this.pigs, colliderLayer);
        this.physics.add.collider(this.coins, colliderLayer);
        this.physics.add.collider(this.pigs, pigColliderLayer);
        (this.fromDoor.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        (this.toDoor.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        pigColliderLayer.setCollisionFromCollisionGroup(true, false);
        this.physics.add.overlap(this.king.getRangeAttack(), this.pigs, (rangeAttack, pig) => {
            const chackPig = pig as Pig;
            if (this.king.getIsAttack()) {
                chackPig.dead();
            }
        });
        this.physics.add.overlap(this.king, this.pigs, (king, pig) => {
            const chackKing = king as King;
            const chackPig = pig as Pig;
            if (!chackPig.getIsDead()) {
                this.gameManage.death() ? chackKing.dead() : this.king.setPosition(this.initKingPosition.x, this.initKingPosition.y);
            }
        });
        this.physics.add.overlap(this.king, this.coins, (king, coin) => {
            const chackCoin = coin as Coin;
            chackCoin.diamondCollected();
            this.gameManage.addCoins();
            const index = this.coins.findIndex(ele => ele === chackCoin);
            this.coins.splice(index, 1);
        });
        this.physics.add.overlap(this.king, this.toDoor, () => {
            const pass = !this.pigs.filter(pig => !pig.getIsDead()).length;
            if (this.king.cursors?.space.isDown && pass) {
                this.king.inDoor();
                this.toDoor.close();
            }
        });
        this.cameras.main.startFollow(this.king);
        this.fromDoor.open();
        this.king.outDoor();
        this.gameManage = new GameManage(this);
        this.tipText = this.add.text(35, 40, 'w a s d / ↑ ↓ ← →  控制king移动\nspace 控制国王攻击和进入下一关', { fontFamily: 'Arial', fontSize: 12, color: '#ffffff' }).setPosition(this.king.x, this.king.y - 50).setOrigin(0.5, 0.5);
    }
    updateBase() {
        this.tipText.setPosition(this.king.x, this.king.y - 50);
        this.king.update();
        this.pigs.forEach(pig => {
            pig.update();
        });
        this.coins.forEach(coin => {
            coin.update();
        });
        this.gameManage.update();
    }
}

export default GameSceneBase;
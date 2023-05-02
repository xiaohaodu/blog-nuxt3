import Phaser from "phaser";
import { King } from "./King";
import { Pig } from "./Pig";
import { Coin } from "./Coin";

class GameStart extends Phaser.Scene {
    constructor() {
        super('GameStart');
    }
    private king!: King;
    private pigs!: Pig[];
    private coins!: Coin[];
    create() {
        const map = this.make.tilemap({ key: 'MapFirst' })
        const tilesheet = map.addTilesetImage('Terrain(32x32)', 'Terrain', 32, 32)!;
        const bg = map.createLayer('bg', tilesheet!);
        const colliderLayer = map.createLayer('collider', tilesheet)!;
        const pigColliderLayer = map.createLayer('pigCollider', tilesheet)!;
        this.coins = map.createFromObjects('object', {
            name: 'coin',
            classType: Coin,
            key: 'livesAndCoinsSheet',
            frame: 29
        }) as Coin[]
        this.pigs = map.createFromObjects('object', {
            name: 'pig',
            classType: Pig,
            key: 'pigsheet',
            frame: 1
        }) as Pig[]
        this.king = map.createFromObjects('object', {
            name: 'king',
            classType: King,
            key: 'kingsheet',
            frame: 1
        })[0] as King;
        colliderLayer.setCollisionFromCollisionGroup(true, false);
        this.physics.add.collider(this.king, colliderLayer)
        this.physics.add.collider(this.pigs, colliderLayer)
        this.physics.add.collider(this.coins, colliderLayer)
        pigColliderLayer.setCollisionFromCollisionGroup(true, false)
        this.physics.add.collider(this.pigs, pigColliderLayer)
        this.physics.add.overlap(this.king.getRangeAttack(), this.pigs, (rangeAttack, pig) => {
            const chackPig = pig as Pig
            if (this.king.getIsAttack()) {
                chackPig.dead()
            }
        })
        this.physics.add.overlap(this.king, this.pigs, (king, pig) => {
            const chackKing = king as King
            const chackPig = pig as Pig
            if (!chackPig.getIsDead()) {
                chackKing.dead()
            }
        })
        this.physics.add.overlap(this.king, this.coins, (king, coin) => {
            const chackCoin = coin as Coin;
            chackCoin.diamondCollected()
        })
        this.cameras.main.startFollow(this.king)
    }
    update() {
        this.king.update();
        this.pigs.forEach(pig => {
            pig.update()
        })
        this.coins.forEach(coin => {
            coin.update()
        })
    }
}

export { GameStart };
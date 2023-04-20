import Phaser from "phaser";
import sky from '~/assets/game/platepixel/sky.png';
import ground from '~/assets/game/platepixel/platform.png';
import star from '~/assets/game/platepixel/star.png';
import bomb from '~/assets/game/platepixel/bomb.png';
import dude from '~/assets/game/platepixel/dude.png';
class playGame extends Phaser.Scene {
    constructor() {
        super('playGame');
    }

    player;
    platforms;
    stars;
    score = 0;
    scoreText;
    gameOver = false;
    bombs;
    cursors;

    preload() {
        //加载资源文件
        this.load.image('sky', sky);
        this.load.image('ground', ground);
        this.load.image('star', star);
        this.load.image('bomb', bomb);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    }
    create() {
        // 一个简单的图片作为背景 A simple background for our game
        this.add.image(400, 300, 'sky');

        // 添加一个静态组  The this.platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();

        // 添加地面  Here we create the ground.
        // 将地面放大成合适尺寸 Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // 在不同位置添加三条横条 Now let's create some ledges
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // 创建玩家(角色) The this.player and its settings
        this.player = this.physics.add.sprite(100, 450, 'dude');

        // 设置玩家反弹系数 this.player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // 将玩家的转身，走路以及停止设置动画 Our this.player animations, turning, walking left and walking right.
        // 向左走
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        //转身
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        //向右走
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // 由键盘控制方向 Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        // 产生12个星星每个之间空70像素 Some this.stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate((child) => {

            // 对于每个星星产生不同的反弹系数 Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.bombs = this.physics.add.group();

        // 添加分数 The this.score
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        // 两两(玩家与星星，玩家与炸弹)之间的碰撞 Collide the this.player and the this.stars with the this.platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        // 收集星星 Checks to see if the this.player overlaps with any of the this.stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        // 碰到炸弹
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    update() {
        if (this.gameOver) {
            return;
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
    collectStar(player, star) {
        star.disableBody(true, true);

        // 更新分数 Add and update the this.score
        this.score += 10;
        this.scoreText.setText('score: ' + this.score);

        if (this.stars.countActive(true) === 0) {
            // 收集一批星星 A new batch of this.stars to collect
            this.stars.children.iterate((child) => {

                child.enableBody(true, child.x, 0, true, true);

            });

            let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            //产生炸弹
            let bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }

    hitBomb(player, bomb) {
        this.physics.pause();

        this.player.setTint(0xff0000);

        this.player.anims.pay('turn');
        l;
        this.gameOver = true;
    }
}
export { playGame };
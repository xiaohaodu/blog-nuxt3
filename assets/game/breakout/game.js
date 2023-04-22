import Phaser from "phaser";
import assetsJson from '@/assets/game/breakout/breakout.json';
import assets from '@/assets/game/breakout/breakout.png';
class Game extends Phaser.Scene {
    bricks;
    paddle;
    ball;
    preload() {
        //利用地图集加载资源
        this.load.atlas('assets', assets, assetsJson);
    }

    create() {
        // 设置四周的反弹，除了底下(地面) Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);
        //  创建10*6格子  Create the this.bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'assets', frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
            frameQuantity: 10,
            gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        });
        this.ball = this.physics.add.image(400, 500, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
        //设置onthis.paddle变量，表示小球是否在托盘上
        this.ball.setData('onpaddle', true);

        this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();

        // 设置小球与砖头，小球与托盘的碰撞
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitpaddle, null, this);

        //  鼠标移动
        this.input.on('pointermove', (pointer) => {

            // 保持托盘在整个游戏内 Keep the this.paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

            //当小球在托盘上，托盘的移动带动小球的移动
            if (this.ball.getData('onpaddle')) {
                this.ball.x = this.paddle.x;
            }

        }, this);
        //  鼠标点击
        this.input.on('pointerup', (pointer) => {

            if (this.ball.getData('onpaddle'))//如果小球在托盘上
            {
                this.ball.setVelocity(-75, -300);//向左上角弹出
                this.ball.setData('onpaddle', false);
            }

        }, this);

    }
    update() {
        //当小球掉下去了，继续游戏 
        if (this.ball.y > 600) {
            this.resetball();
        }

    }
    //小球与砖头的碰撞
    hitBrick(ball, brick) {
        brick.disableBody(true, true);
        //当砖头没有了，进行新的一个级别
        if (this.bricks.countActive() === 0) {
            this.resetLevel();
        }

    }
    //得新开始
    resetball() {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 500);
        this.ball.setData('onpaddle', true);
    }
    //新的一个级别
    resetLevel() {
        this.resetball();
        this.bricks.children.each((brick) => {
            brick.enableBody(false, 0, 0, true, true);
        });
    }

    //小球与托盘的碰撞
    hitpaddle(ball, paddle) {
        //根据小球与托盘碰撞的位置，给反弹一个方向
        //定义一个距离
        let diff = 0;

        if (this.ball.x < this.paddle.x) {
            // 当小球在托盘的左边 this.ball is on the left-hand side of the this.paddle
            diff = this.paddle.x - this.ball.x;
            this.ball.setVelocityX(-10 * diff);
        }
        else if (this.ball.x > this.paddle.x) {
            // 当小球在托盘的右边 this.ball is on the right-hand side of the this.paddle
            diff = this.ball.x - this.paddle.x;
            this.ball.setVelocityX(10 * diff);
        }
        else {
            //  当小球在托盘的正中间 this.ball is perfectly in the middle
            //  产生一个随机的x的方向速度 Add a little random X to stop it bouncing straight up!
            this.ball.setVelocityX(2 + Math.random() * 8);
        }
    }
}
export { Game };
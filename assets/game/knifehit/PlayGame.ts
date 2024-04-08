import Phaser from 'phaser';

// 导入游戏所需图像资源
import target from '@/assets/game/knifehit/target.png';
import knife from '@/assets/game/knifehit/knife.png';

// 定义游戏配置选项接口
interface GameOptions {
  rotationSpeed: number; // 旋转速度（每帧转动角度）
  throwSpeed: number; // 刀飞出速度（每秒移动像素）
  minAngle: number; // 两把刀之间的最小角度约束
  rotationVariation: number; // 最大转动变化量（每帧上限）
  changeTime: number; // 下一帧速度变化间隔时间（毫秒）
  maxRotationSpeed: number; // 最大旋转速度
}

// 定义游戏场景类
class PlayGame extends Phaser.Scene {
  // 游戏配置选项实例
  gameOptions: GameOptions = {
    rotationSpeed: 3,
    throwSpeed: 150,
    minAngle: 15,
    rotationVariation: 2,
    changeTime: 2000,
    maxRotationSpeed: 6,
  };

  // 当前与新旋转速度
  currentRotationSpeed!: number;
  newRotationSpeed!: number;

  // 抛掷状态标志
  canThrow!: boolean;

  // 飞刀组与飞刀、圆木实例
  knifeGroup!: Phaser.GameObjects.Group;
  knife!: Phaser.GameObjects.Sprite;
  target!: Phaser.GameObjects.Sprite;

  constructor() {
    super('playGame');
  }

  // 预加载阶段，加载游戏资源
  preload(): void {
    this.load.image('target', target); // 加载圆木图像
    this.load.image('knife', knife); // 加载飞刀图像
  }

  // 创建阶段，初始化游戏对象与监听事件
  create(): void {
    // 初始化旋转速度
    this.currentRotationSpeed = this.gameOptions.rotationSpeed;
    this.newRotationSpeed = this.gameOptions.rotationSpeed;

    // 设置初始扔刀状态
    this.canThrow = true;

    // 创建飞刀组
    this.knifeGroup = this.add.group();

    // 添加刀和圆木
    this.knife = this.add.sprite(
      Number(this.game.config.width) / 2,
      (Number(this.game.config.height) / 5) * 4,
      'knife',
    );
    this.target = this.add.sprite(Number(this.game.config.width) / 2, 400, 'target');

    // 设置圆木深度
    this.target.setDepth(1);

    // 监听点击事件，触发飞刀抛掷
    this.input.on('pointerdown', this.throwKnife, this);

    // 创建定时器事件，用于改变旋转速度
    const timedEvent = this.time.addEvent({
      delay: this.gameOptions.changeTime,
      callback: this.changeSpeed,
      callbackScope: this,
      loop: true,
    });
  }

  // 改变旋转速度方法
  changeSpeed(): void {
    // 随机生成旋转方向（+1 或 -1）
    const sign = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;

    // 随机生成旋转变化量
    const variation = Phaser.Math.FloatBetween(
      -this.gameOptions.rotationVariation,
      this.gameOptions.rotationVariation,
    );

    // 计算新的旋转速度
    this.newRotationSpeed = (this.currentRotationSpeed + variation) * sign;

    // 限制旋转速度在最大/最小值之间
    this.newRotationSpeed = Phaser.Math.Clamp(
      this.newRotationSpeed,
      -this.gameOptions.maxRotationSpeed,
      this.gameOptions.maxRotationSpeed,
    );
  }

  // 抛掷飞刀方法
  throwKnife(): void {
    // 检查是否可以扔刀
    if (this.canThrow) {
      this.canThrow = false;

      // 创建飞刀抛掷补间动画
      this.tweens.add({
        targets: [this.knife],
        y: this.target.y + this.target.width / 2,
        duration: this.gameOptions.throwSpeed,
        callbackScope: this,
        onComplete: function (tween) {
          // 判断飞刀是否合法命中
          let legalHit = true;
          const children = this.knifeGroup.getChildren();

          for (let i = 0; i < children.length && legalHit; i++) {
            const angleDiff = Phaser.Math.Angle.ShortestBetween(
              this.target.angle,
              children[i].impactAngle,
            );
            if (Math.abs(angleDiff) < this.gameOptions.minAngle) {
              legalHit = false;
            }
          }

          if (legalHit) {
            this.canThrow = true;

            // 创建并添加飞刀到圆木上
            const knife = this.add.sprite(this.knife.x, this.knife.y, 'knife');
            knife.impactAngle = this.target.angle;
            this.knifeGroup.add(knife);

            // 重置飞刀位置
            this.knife.y = (this.game.config.height / 5) * 4;
          } else {
            // 添加飞刀掉落动画
            this.tweens.add({
              targets: [this.knife],
              y: this.game.config.height + this.knife.height,
              rotation: 5,
              duration: this.gameOptions.throwSpeed * 4,
              callbackScope: this,
              onComplete: function (tween: Phaser.Tweens.Tween) {
                this.scene.restart(); // 重新开始游戏
              },
            });
          }
        },
      });
    }
  }

  // 更新方法，处理每一帧的游戏逻辑
  update(time: number, delta: number): void {
    // 更新圆木旋转角度
    this.target.angle += this.currentRotationSpeed;

    // 更新已命中圆木的飞刀角度和位置
    const children = this.knifeGroup.getChildren() as Phaser.GameObjects.Sprite[];
    for (let i = 0; i < children.length; i++) {
      children[i].angle += this.currentRotationSpeed;
      const radians = Phaser.Math.DegToRad(children[i].angle + 90);
      children[i].x = this.target.x + (this.target.width / 2) * Math.cos(radians);
      children[i].y = this.target.y + (this.target.width / 2) * Math.sin(radians);
    }

    // 线性插值平滑过渡旋转速度
    this.currentRotationSpeed = Phaser.Math.Linear(
      this.currentRotationSpeed,
      this.newRotationSpeed,
      delta / 1000,
    );
  }
}

export { PlayGame };

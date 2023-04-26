import Phaser from "phaser";
//King
import KingAttack from '@/assets/game/kingandpigs/Sprites/01-King Human/Attack (78x58).png';
import KingDead from '@/assets/game/kingandpigs/Sprites/01-King Human/Dead (78x58).png';
import KingDoorIn from '@/assets/game/kingandpigs/Sprites/01-King Human/Door In (78x58).png';
import KingDoorOut from '@/assets/game/kingandpigs/Sprites/01-King Human/Door Out (78x58).png';
import KingFall from '@/assets/game/kingandpigs/Sprites/01-King Human/Fall (78x58).png';
import KingGround from '@/assets/game/kingandpigs/Sprites/01-King Human/Ground (78x58).png';
import KingHit from '@/assets/game/kingandpigs/Sprites/01-King Human/Hit (78x58).png';
import KingIdle from '@/assets/game/kingandpigs/Sprites/01-King Human/Idle (78x58).png';
import KingJump from '@/assets/game/kingandpigs/Sprites/01-King Human/Jump (78x58).png';
import KingRun from '@/assets/game/kingandpigs/Sprites/01-King Human/Run (78x58).png';


//KingPig
import KingPigAttack from '@/assets/game/kingandpigs/Sprites/02-King Pig/Attack (38x28).png';
import KingPigDead from '@/assets/game/kingandpigs/Sprites/02-King Pig/Dead (38x28).png';
import KingPigFall from '@/assets/game/kingandpigs/Sprites/02-King Pig/Fall (38x28).png';
import KingPigGround from '@/assets/game/kingandpigs/Sprites/02-King Pig/Ground (38x28).png';
import KingPigHit from '@/assets/game/kingandpigs/Sprites/02-King Pig/Hit (38x28).png';
import KingPigIdle from '@/assets/game/kingandpigs/Sprites/02-King Pig/Idle (38x28).png';
import KingPigJump from '@/assets/game/kingandpigs/Sprites/02-King Pig/Jump (38x28).png';
import KingPigRun from '@/assets/game/kingandpigs/Sprites/02-King Pig/Run (38x28).png';

//Pig
import PigAttack from '@/assets/game/kingandpigs/Sprites/03-Pig/Attack (34x28).png';
import PigDead from '@/assets/game/kingandpigs/Sprites/03-Pig/Dead (34x28).png';
import PigFall from '@/assets/game/kingandpigs/Sprites/03-Pig/Fall (34x28).png';
import PigGround from '@/assets/game/kingandpigs/Sprites/03-Pig/Ground (34x28).png';
import PigHit from '@/assets/game/kingandpigs/Sprites/03-Pig/Hit (34x28).png';
import PigIdle from '@/assets/game/kingandpigs/Sprites/03-Pig/Idle (34x28).png';
import PigJump from '@/assets/game/kingandpigs/Sprites/03-Pig/Jump (34x28).png';
import PigRun from '@/assets/game/kingandpigs/Sprites/03-Pig/Run (34x28).png';

//PigThrowingABox
import PigBoxIdle from '@/assets/game/kingandpigs/Sprites/04-Pig Throwing a Box/Idle (26x30).png';
import PigBoxPick from '@/assets/game/kingandpigs/Sprites/04-Pig Throwing a Box/Picking Box (26x30).png';
import PigBoxRun from '@/assets/game/kingandpigs/Sprites/04-Pig Throwing a Box/Run (26x30).png';
import PigBoxThrow from '@/assets/game/kingandpigs/Sprites/04-Pig Throwing a Box/Throwing Box (26x30).png';

//PigBomb
import PigBombIdle from '@/assets/game/kingandpigs/Sprites/05-Pig Thowing a Bomb/Idle (26x26).png';
import PigBombPick from '@/assets/game/kingandpigs/Sprites/05-Pig Thowing a Bomb/Picking Bomb (26x26).png';
import PigBombRun from '@/assets/game/kingandpigs/Sprites/05-Pig Thowing a Bomb/Run (26x26).png';
import PigBombThrow from '@/assets/game/kingandpigs/Sprites/05-Pig Thowing a Bomb/Throwing Boom (26x26).png';

//PigBoxHide
import PigBoxHideFall from '@/assets/game/kingandpigs/Sprites/06-Pig Hide in the Box/Fall (26x20).png';
import PigBoxHideGround from '@/assets/game/kingandpigs/Sprites/06-Pig Hide in the Box/Ground (26x20).png';
import PigBoxHideJump from '@/assets/game/kingandpigs/Sprites/06-Pig Hide in the Box/Jump (26x20).png';
import PigBoxHideJumpAnticipation from '@/assets/game/kingandpigs/Sprites/06-Pig Hide in the Box/Jump Anticipation (26x20).png';
import PigBoxHideLookOut from '@/assets/game/kingandpigs/Sprites/06-Pig Hide in the Box/Looking Out (26x20).png';

//PigMatch
import PigMatchCannon from '@/assets/game/kingandpigs/Sprites/07-Pig With a Match/lighting the Cannon (26x18).png';
import PigMatchLight from '@/assets/game/kingandpigs/Sprites/07-Pig With a Match/lighting the Match (26x18).png';
import PigMatchOn from '@/assets/game/kingandpigs/Sprites/07-Pig With a Match/Match On (26x18).png';

//Bomb
import BombOff from '@/assets/game/kingandpigs/Sprites/09-Bomb/Bomb Off.png';
import BombOn from '@/assets/game/kingandpigs/Sprites/09-Bomb/Bomb On (52x56).png';
import Boooooom from '@/assets/game/kingandpigs/Sprites/09-Bomb/Boooooom (52x56).png';

//Cannon
import CanonBall from '@/assets/game/kingandpigs/Sprites/10-Cannon/Cannon Ball.png';
import CanonIdle from '@/assets/game/kingandpigs/Sprites/10-Cannon/Idle.png';
import CanonShoot from '@/assets/game/kingandpigs/Sprites/10-Cannon/Shoot (44x28).png';

//Door
import DoorClosing from '@/assets/game/kingandpigs/Sprites/11-Door/Closiong (46x56).png';
import DoorIdle from '@/assets/game/kingandpigs/Sprites/11-Door/Idle.png';
import DoorOpening from '@/assets/game/kingandpigs/Sprites/11-Door/Opening (46x56).png';

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
        this.load.on('progress', (value: number) => {
            console.log(value);
        });
        this.load.on('complete', () => {
            this.scene.start('GameStart');
        });
        //King
        const kingConfig = { frameWidth: 78, frameHeight: 58 };
        this.load.spritesheet('KingAttack', KingAttack, kingConfig);
        this.load.spritesheet('KingDead', KingDead, kingConfig);
        this.load.spritesheet('KingDoorIn', KingDoorIn, kingConfig);
        this.load.spritesheet('KingDoorOut', KingDoorOut, kingConfig);
        this.load.spritesheet('KingFall', KingFall, kingConfig);
        this.load.spritesheet('KingGround', KingGround, kingConfig);
        this.load.spritesheet('KingHit', KingHit, kingConfig);
        this.load.spritesheet('KingIdle', KingIdle, kingConfig);
        this.load.spritesheet('KingJump', KingJump, kingConfig);
        this.load.spritesheet('KingRun', KingRun, kingConfig);
        //Pig
        const pigConfig = { frameWidth: 34, frameHeight: 28 };
        this.load.spritesheet('PigAttack', PigAttack, pigConfig);
        this.load.spritesheet('PigDead', PigDead, pigConfig);
        this.load.spritesheet('PigFall', PigFall, pigConfig);
        this.load.spritesheet('PigGround', PigGround, pigConfig);
        this.load.spritesheet('PigHit', PigHit, pigConfig);
        this.load.spritesheet('PigIdle', PigIdle, pigConfig);
        this.load.spritesheet('PigJump', PigJump, pigConfig);
        this.load.spritesheet('PigRun', PigRun, pigConfig);
        //KingPig
        const kingPigConfig = { frameWidth: 38, frameHeight: 28 };
        this.load.spritesheet('KingPigAttack', KingPigAttack, kingPigConfig);
        this.load.spritesheet('KingPigDead', KingPigDead, kingPigConfig);
        this.load.spritesheet('KingPigFall', KingPigFall, kingPigConfig);
        this.load.spritesheet('KingPigGround', KingPigGround, kingPigConfig);
        this.load.spritesheet('KingPigHit', KingPigHit, kingPigConfig);
        this.load.spritesheet('KingPigIdle', KingPigIdle, kingPigConfig);
        this.load.spritesheet('KingPigJump', KingPigJump, kingPigConfig);
        this.load.spritesheet('KingPigRun', KingPigRun, kingPigConfig);

        //PigThrowingABox
        const pigThrowBoxConfig = { frameWidth: 26, frameHeight: 30 };
        this.load.spritesheet('PigBoxIdle', PigBoxIdle, pigThrowBoxConfig);
        this.load.spritesheet('PigBoxPick', PigBoxPick, pigThrowBoxConfig);
        this.load.spritesheet('PigBoxRun', PigBoxRun, pigThrowBoxConfig);
        this.load.spritesheet('PigBoxThrow', PigBoxThrow, pigThrowBoxConfig);

        //PigBomb
        const PigBombConfig = { frameWidth: 26, frameHeight: 26 };
        this.load.spritesheet('PigBombIdle', PigBombIdle, PigBombConfig);
        this.load.spritesheet('PigBombPick', PigBombPick, PigBombConfig);
        this.load.spritesheet('PigBombRun', PigBombRun, PigBombConfig);
        this.load.spritesheet('PigBombThrow', PigBombThrow, PigBombConfig);

        //PigBoxHide
        const pigBoxHideConfig = { frameWidth: 26, frameHeight: 20 };
        this.load.spritesheet('PigBoxHideFall', PigBoxHideFall, pigBoxHideConfig);
        this.load.spritesheet('PigBoxHideGround', PigBoxHideGround, pigBoxHideConfig);
        this.load.spritesheet('PigBoxHideJump', PigBoxHideJump, pigBoxHideConfig);
        this.load.spritesheet('PigBoxHideJumpAnticipation', PigBoxHideJumpAnticipation, pigBoxHideConfig);
        this.load.spritesheet('PigBoxHideLookOut', PigBoxHideLookOut, pigBoxHideConfig);

        //PigMatch
        const pigMatchConfig = { frameWidth: 26, frameHeight: 18 };
        this.load.spritesheet('PigMatchCannon', PigMatchCannon, pigMatchConfig);
        this.load.spritesheet('PigMatchLight', PigMatchLight, pigMatchConfig);
        this.load.spritesheet('PigMatchOn', PigMatchOn, pigMatchConfig);

        //Bomb
        const bombConfig = { frameWidth: 52, frameHeight: 56 };
        this.load.spritesheet('BombOff', BombOff, bombConfig);
        this.load.spritesheet('BombOn', BombOn, bombConfig);
        this.load.spritesheet('Boooooom', Boooooom, bombConfig);

        //Cannon
        const cannonConfig = { frameWidth: 44, frameHeight: 28 };
        this.load.spritesheet('CanonBall', CanonBall, cannonConfig);
        this.load.spritesheet('CanonIdle', CanonIdle, cannonConfig);
        this.load.spritesheet('CanonShoot', CanonShoot, cannonConfig);

        //Door
        const doorConfig = { frameWidth: 46, frameHeight: 56 };
        this.load.spritesheet('DoorClosing', DoorClosing, doorConfig);
        this.load.spritesheet('DoorIdle', DoorIdle, doorConfig);
        this.load.spritesheet('DoorOpening', DoorOpening, doorConfig);
    }
    create() {
        this.anims.create({
            key: 'KingAttack',
            frames: this.anims.generateFrameNumbers('KingAttack'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'KingDead',
            frames: this.anims.generateFrameNumbers('KingDead'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'KingDoorIn',
            frames: this.anims.generateFrameNumbers('KingDoorOut'),
            frameRate: 8,
            repeat: -1
        });
    }
}

export { BootScene };
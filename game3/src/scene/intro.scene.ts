import { SceneController } from "../controller/scene.controller";
import Phaser from "phaser";
import CONFIG from "../config";
import Soldier from "../ui/character/soldier";

export class IntroScene extends SceneController {
  private player: any;

  private keyControl: any;

  private hold: Phaser.GameObjects.Sprite | null = null;
  private walk: Phaser.GameObjects.Sprite | null = null;
  private run: Phaser.GameObjects.Sprite | null = null;
  private attack: Phaser.GameObjects.Sprite | null = null;
  private dead: Phaser.GameObjects.Sprite | null = null;

  private atk: boolean = false;
  private flip: boolean = false;
  private runAction: boolean = false;

  private attack_key: Phaser.Input.Keyboard.Key | null = null;
  private run_key: Phaser.Input.Keyboard.Key | null = null;

  private background: any;

  constructor() {
    super("intro");
  }

  protected async create() {
    const { width, height } = CONFIG;
    //const { width, height } = this.cameras.main;
    // this.add.image(width / 2, height / 2, 'stage').setScale(1);
    this.background = this.add
      .tileSprite(0, 0, width as number, height as number, "stage")
      .setOrigin(0, 0)
      .setScale(1);

    // 캐릭터 애니메이션
    this.anims.create({
      key: "HOLD",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 7 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "WALK",
      frames: this.anims.generateFrameNumbers("player_walk", {
        start: 1,
        end: 7,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "RUN",
      frames: this.anims.generateFrameNumbers("player_run", {
        start: 1,
        end: 8,
      }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: "ATTACK",
      frames: this.anims.generateFrameNumbers("player_attack", {
        start: 1,
        end: 4,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "DEAD",
      frames: this.anims.generateFrameNumbers("player_dead", {
        start: 1,
        end: 4,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // 좀비 1 애니메이션
    this.anims.create({
      key: "zombie1_hold",
      frames: this.anims.generateFrameNumbers("zombie1", { start: 1, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie1_walk",
      frames: this.anims.generateFrameNumbers("zombie1_walk", {
        start: 1,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie1_run",
      frames: this.anims.generateFrameNumbers("zombie1_run", {
        start: 1,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie1_attack",
      frames: this.anims.generateFrameNumbers("zombie1_attack", {
        start: 1,
        end: 4,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie1_jump",
      frames: this.anims.generateFrameNumbers("zombie1_jump", {
        start: 1,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie1_dead",
      frames: this.anims.generateFrameNumbers("zombie1_dead", {
        start: 1,
        end: 5,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "zombie2_hold",
      frames: this.anims.generateFrameNumbers("zombie2", { start: 1, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie2_walk",
      frames: this.anims.generateFrameNumbers("zombie2_walk", {
        start: 1,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie2_run",
      frames: this.anims.generateFrameNumbers("zombie2_run", {
        start: 1,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie2_attack",
      frames: this.anims.generateFrameNumbers("zombie2_attack", {
        start: 1,
        end: 4,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie2_jump",
      frames: this.anims.generateFrameNumbers("zombie2_jump", {
        start: 1,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie2_dead",
      frames: this.anims.generateFrameNumbers("zombie2_dead", {
        start: 1,
        end: 5,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "zombie3_hold",
      frames: this.anims.generateFrameNumbers("zombie3", { start: 1, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie3_walk",
      frames: this.anims.generateFrameNumbers("zombie3_walk", {
        start: 1,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie3_run",
      frames: this.anims.generateFrameNumbers("zombie3_run", {
        start: 1,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie3_attack",
      frames: this.anims.generateFrameNumbers("zombie3_attack", {
        start: 1,
        end: 4,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie3_jump",
      frames: this.anims.generateFrameNumbers("zombie3_jump", {
        start: 1,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie3_dead",
      frames: this.anims.generateFrameNumbers("zombie3_dead", {
        start: 1,
        end: 5,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.add.sprite(300, 900, "zombie1").play("zombie1_hold");
    this.add.sprite(400, 900, "zombie1_walk").play("zombie1_walk");
    this.add.sprite(500, 900, "zombie1_run").play("zombie1_run");
    this.add.sprite(600, 900, "zombie1_attack").play("zombie1_attack");
    this.add.sprite(700, 900, "zombie1_jump").play("zombie1_jump");
    this.add.sprite(800, 900, "zombie1_dead").play("zombie1_dead");

    this.add.sprite(320, 940, "zombie2").play("zombie2_hold");
    this.add.sprite(400, 940, "zombie2_walk").play("zombie2_walk");
    this.add.sprite(500, 940, "zombie2_run").play("zombie2_run");
    this.add.sprite(600, 940, "zombie2_attack").play("zombie2_attack");
    this.add.sprite(700, 940, "zombie2_jump").play("zombie2_jump");
    this.add.sprite(800, 940, "zombie2_dead").play("zombie2_dead");

    this.add.sprite(300, 980, "zombie3").play("zombie3_hold");
    this.add.sprite(400, 980, "zombie3_walk").play("zombie3_walk");
    this.add.sprite(500, 980, "zombie3_run").play("zombie3_run");
    this.add.sprite(600, 980, "zombie3_attack").play("zombie3_attack");
    this.add.sprite(700, 980, "zombie3_jump").play("zombie3_jump");
    this.add.sprite(800, 980, "zombie3_dead").play("zombie3_dead");

    this.hold = this.add.sprite(300, 900, "player").play("HOLD");
    this.walk = this.add.sprite(300, 900, "player_walk").play("WALK");
    this.run = this.add.sprite(300, 900, "player_run").play("RUN");
    this.attack = this.add.sprite(300, 900, "player_attack").play("ATTACK");
    this.dead = this.add.sprite(300, 900, "player_dead").play("DEAD");

    this.hold.visible = true;
    this.walk.visible = false;
    this.run.visible = false;
    this.attack.visible = false;
    this.dead.visible = false;

    this.keyControl = this.input.keyboard.createCursorKeys();
    this.attack_key = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.CTRL
    );
    this.attack_key.on("down", () => {
      this.atk = true;
      this.attack!.x = this.walk!.x;

      if (this.flip) this.attack!.setFlip(this.flip, false);
      else this.attack!.setFlip(this.flip, false);

      this.hold!.visible = false;
      this.walk!.visible = false;
      this.attack!.visible = true;
      this.dead!.visible = false;
    });

    this.attack_key.on("up", () => {
      this.atk = false;
      this.attack!.x = this.walk!.x;

      this.hold!.visible = true;
      this.walk!.visible = false;
      this.attack!.visible = false;
      this.dead!.visible = false;
    });
    this.run_key = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
    this.run_key.on("down", () => {
      if (this.flip) this.run!.setFlip(this.flip, false);
      else this.run!.setFlip(this.flip, false);

      this.runAction = true;
      this.run!.visible = true;
      this.hold!.visible = false;
      this.walk!.visible = false;
    });
    this.run_key.on("up", () => {
      this.runAction = false;
      this.run!.visible = false;
      this.walk!.visible = true;
    });
    this.player = this.walk;
    this.cameras.main.startFollow(this.player);
  }

  protected preload() {
    this.assetLoad();
  }

  private assetLoad() {
    this.load.image("stage", "img/background/map/War2.png");
    // 캐릭터
    this.load.spritesheet("player", "img/character/Soldier/Idle.png", {
      frameWidth: 128,
      frameHeight: 128,
      startFrame: 1,
    });
    this.load.spritesheet("player_walk", "img/character/Soldier/Walk.png", {
      frameWidth: 128,
      frameHeight: 128,
      startFrame: 1,
    });
    this.load.spritesheet("player_run", "img/character/Soldier/Run.png", {
      frameWidth: 128,
      frameHeight: 128,
      startFrame: 1,
    });
    this.load.spritesheet("player_attack", "img/character/Soldier/Shot_2.png", {
      frameWidth: 128,
      frameHeight: 128,
      startFrame: 1,
    });
    this.load.spritesheet("player_dead", "img/character/Soldier/Dead.png", {
      frameWidth: 128,
      frameHeight: 128,
      startFrame: 1,
    });

    // 좀비 1
    this.load.spritesheet("zombie1", "img/enemy/ZombieMan/Idle.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet("zombie1_walk", "img/enemy/ZombieMan/Walk.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet("zombie1_run", "img/enemy/ZombieMan/Run.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet("zombie1_dead", "img/enemy/ZombieMan/Dead.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet(
      "zombie1_attack",
      "img/enemy/ZombieMan/Attack_1.png",
      {
        frameWidth: 96,
        frameHeight: 96,
        startFrame: 1,
      }
    );
    this.load.spritesheet("zombie1_jump", "img/enemy/ZombieMan/Jump.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    // 좀비 2
    this.load.spritesheet("zombie2", "img/enemy/ZombieWoman/Idle.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet("zombie2_walk", "img/enemy/ZombieWoman/Walk.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet("zombie2_run", "img/enemy/ZombieWoman/Run.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet("zombie2_dead", "img/enemy/ZombieWoman/Dead.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet(
      "zombie2_attack",
      "img/enemy/ZombieWoman/Attack_1.png",
      {
        frameWidth: 96,
        frameHeight: 96,
        startFrame: 1,
      }
    );
    this.load.spritesheet("zombie2_jump", "img/enemy/ZombieWoman/Jump.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    // 좀비 3
    this.load.spritesheet("zombie3", "img/enemy/WildZombie/Idle.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet("zombie3_walk", "img/enemy/WildZombie/Walk.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet("zombie3_run", "img/enemy/WildZombie/Run.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet("zombie3_dead", "img/enemy/WildZombie/Dead.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
    this.load.spritesheet(
      "zombie3_attack",
      "img/enemy/WildZombie/Attack_3.png",
      {
        frameWidth: 96,
        frameHeight: 96,
        startFrame: 1,
      }
    );
    this.load.spritesheet("zombie3_jump", "img/enemy/WildZombie/Jump.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 1,
    });
  }

  update(time: number, delta: number) {
    this.keyEvent();
    this.makeBackground();
  }

  /**
   * @description 무한 배경
   * @private
   */
  private makeBackground() {
    const { width, height } = CONFIG as { width: number; height: number };
    this.background.setX(this.player.x - width / 2);
    this.background.tilePositionX = this.player.x - width / 2;
  }

  private keyEvent() {
    if (this.keyControl.right.isDown && !this.atk) {
      this.flip = false;

      if (this.runAction) {
        this.walk!.x += 4;
        this.run!.x = this.walk!.x;
      } else {
        this.walk!.x += 2;
        this.walk!.visible = true;
      }
      this.hold!.setFlip(false, false);
      this.walk!.setFlip(false, false);
      this.hold!.visible = false;
    } else if (this.keyControl.left.isDown && !this.atk) {
      this.flip = true;

      if (this.runAction) {
        this.walk!.x -= 4;
        this.run!.x = this.walk!.x;
      } else {
        this.walk!.x -= 2;
        this.walk!.visible = true;
      }

      this.walk!.setFlip(true, false);
      this.hold!.setFlip(true, false);
      this.hold!.visible = false;
    } else if (!this.atk && !this.runAction) {
      this.walk!.visible = false;
      this.hold!.visible = true;
      this.hold!.x = this.walk!.x;
    }
  }
}

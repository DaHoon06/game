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

  constructor() {
    super("intro");
  }

  protected async create() {
    const { width, height } = CONFIG;
    //const { width, height } = this.cameras.main;
    // this.add.image(width / 2, height / 2, 'stage').setScale(1);
    this.add
      .tileSprite(0, 0, width as number, height as number, "stage")
      .setOrigin(0, 0)
      .setScale(1);

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

    this.hold = this.physics.add.sprite(300, 900, "player").play("HOLD");
    this.walk = this.physics.add.sprite(300, 900, "player_walk").play("WALK");
    this.run = this.physics.add.sprite(300, 900, "player_run").play("RUN");
    this.attack = this.physics.add
      .sprite(300, 800, "player_attack")
      .play("ATTACK");
    this.dead = this.physics.add.sprite(300, 900, "player_dead").play("DEAD");
    console.log(this.hold);
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

    //this.cameras.main.startFollow();
  }

  protected preload() {
    this.assetLoad();
  }

  private assetLoad() {
    this.load.image("stage", "img/background/map/War2.png");

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
  }

  update(time: number, delta: number) {
    this.keyEvent();
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

import Phaser from "phaser";

export class SceneController extends Phaser.Scene {
  protected player: any;
  constructor(protected sceneName: string) {
    super(sceneName);

    console.log("컨트롤러");
  }

  protected preload() {
    this.assetLoad();
  }

  protected create() {
    this.makeAnimation();
  }

  private makeAnimation() {
    this.anims.create({
      key: "HOLD",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 1, 2, 3, 4, 5, 6],
        start: 0,
        end: 6,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "WALK",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [19, 20, 21, 22, 23, 24, 25],
        start: 0,
        end: 6,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "RUN",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [38, 39, 40, 41, 42, 43, 44, 45],
        start: 0,
        end: 6,
      }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: "ATTACK",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [78, 79, 77, 76, 0],
        start: 0,
        end: 4,
      }),
      frameRate: 6,
      repeat: 0,
    });
    this.anims.create({
      key: "DEAD",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [148, 149, 150, 151],
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: 0,
    });
    this.anims.create({
      key: "EMOTION1",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107],
        start: 0,
        end: 12,
      }),
      frameRate: 4,
      repeat: 0,
    });
    //61 62 63

    // 좀비 1 애니메이션
    this.anims.create({
      key: "zombie1_hold",
      frames: this.anims.generateFrameNumbers("zombie1", { start: 0, end: 7 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie1_walk",
      frames: this.anims.generateFrameNumbers("zombie1_walk", {
        start: 0,
        end: 7,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie1_run",
      frames: this.anims.generateFrameNumbers("zombie1_run", {
        start: 0,
        end: 6,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie1_attack",
      frames: this.anims.generateFrameNumbers("zombie1_attack", {
        start: 0,
        end: 4,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie1_jump",
      frames: this.anims.generateFrameNumbers("zombie1_jump", {
        start: 0,
        end: 7,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie1_dead",
      frames: this.anims.generateFrameNumbers("zombie1_dead", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "zombie2_hold",
      frames: this.anims.generateFrameNumbers("zombie2", { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie2_walk",
      frames: this.anims.generateFrameNumbers("zombie2_walk", {
        start: 0,
        end: 6,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie2_run",
      frames: this.anims.generateFrameNumbers("zombie2_run", {
        start: 0,
        end: 6,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie2_attack",
      frames: this.anims.generateFrameNumbers("zombie2_attack", {
        start: 0,
        end: 3,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie2_jump",
      frames: this.anims.generateFrameNumbers("zombie2_jump", {
        start: 0,
        end: 5,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie2_dead",
      frames: this.anims.generateFrameNumbers("zombie2_dead", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "zombie3_hold",
      frames: this.anims.generateFrameNumbers("zombie3", { start: 0, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie3_walk",
      frames: this.anims.generateFrameNumbers("zombie3_walk", {
        start: 0,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie3_run",
      frames: this.anims.generateFrameNumbers("zombie3_run", {
        start: 0,
        end: 7,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie3_attack",
      frames: this.anims.generateFrameNumbers("zombie3_attack", {
        start: 0,
        end: 3,
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie3_jump",
      frames: this.anims.generateFrameNumbers("zombie3_jump", {
        start: 0,
        end: 5,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "zombie3_dead",
      frames: this.anims.generateFrameNumbers("zombie3_dead", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });
  }

  private assetLoad() {
    this.load.image("stage", "img/background/map/War2.png");
    this.load.image("bullet", "img/character/bullet.png");
    // 캐릭터
    this.load.spritesheet("player", "img/character/character.png", {
      frameWidth: 128,
      frameHeight: 128,
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
}

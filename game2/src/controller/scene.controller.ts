import Phaser, { GameObjects } from "phaser";
import { Target } from "../object/target";
import Gun from "../object/Gun";
import Bullet from "../object/Bullet";
import Score from "../object/score";
import Timer from "../object/Timer";

export class SceneController extends Phaser.Scene {
  private spaceBar: Phaser.Input.Keyboard.Key | null = null;
  private R: Phaser.Input.Keyboard.Key | null = null;
  private keyboard: Phaser.Input.Keyboard.Key | any = null;
  private pause: Phaser.Input.Keyboard.Key | null = null;
  private pauseText?: GameObjects.Text;
  private clear?: GameObjects.Text;
  private pauseBoolean: boolean = false;
  pauseBackground: any
  public target?: Target;
  public targets: any;
  private bullet?: any;
  public bullets?: any;
  public gameStart: boolean = false;
  private box: any;
  private score: any;
  private targetCount: number = 0;
  private minSpeed: number = 0;
  private maxSpeed: number = 0;
  private backImageKey: string = "";
  private targetImageKey: string = "";
  private nextScene: string = "";
  private gunInstance: any | null = null;
  private timer: any;
  private totalTime: number = 60;
  private targetTime: any;
  private temp: Array<{ flip: boolean; velocity: number }> | [] = [];

  protected constructor(
    protected sceneName: string,
    targetCount: number,
    minSpeed: number,
    maxSpeed: number,
    backImageKey: string,
    targetImageKey: string,
    nextScene: string
  ) {
    super(sceneName);
    this.targetCount = targetCount;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.backImageKey = backImageKey;
    this.targetImageKey = targetImageKey;
    this.nextScene = nextScene;
  }

  protected preload() {
    this.assetsLoad();
  }
  private assetsLoad = () => {
    this.load.image("GUN", "img/utils/Gun.png");
    this.load.image("BULLET", "img/utils/bullet.png");
    this.load.image("background-stage1", "img/background/back1.jpg");
    this.load.image("background-stage2", "img/background/back2.jpg");
    this.load.image("background-stage3", "img/background/back3.jpg");
    this.load.image("target1", "img/utils/target1.png");
    this.load.image("target2", "img/utils/target2.png");
    this.load.image("target3", "img/utils/target3.png");
    this.load.image("fire", "img/utils/shot3.png");
    this.load.audio("shot", "bgm/shot.mp3");
    this.load.audio("reload", "bgm/reload.mp3");
    this.load.audio("break", "bgm/break_target.mp3");
    this.load.audio("empty", "bgm/empty_bullet.mp3");
  };

  protected create() {
    this.gameStart = false;

    if (this.sceneName === "stage01") {
      this.data.set("score", 0);
      this.score = new Score(this, 100, 50, "0");
    } else {
      this.gameStart = true;
      this.makeTimer();
      this.makeKeyPressEvent();
      const { score }: any = this.scene.settings.data;
      this.data.set("score", score);
      this.score = new Score(this, 100, 50, this.data.get("score"));
    }
    this.cameras.main.setBounds(0, 0, 600, 800, false);
    const { width, height } = this.cameras.main;
    this.add.image(width / 2, height / 2, "background-stage1").setScale(1, 1.2);
    this.timer = new Timer(this, width - 200, 45, "60", {
      color: "black",
      stroke: "#cccccc",
      strokeThickness: 1,
      padding: {
        x: 2,
        y: 2,
      },
    });
    this.add.image(width / 2, height / 2, this.backImageKey).setScale(1, 1.2);

    /**
     * class Target
     * @description: target 클래스 생성
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    this.target = new Target(this, width, height, this.targetImageKey);
    this.bullet = new Bullet(this, width, height, "BULLET");
    this.gunInstance = new Gun(this, width, height, "GUN");
    this.box = this.target.rectangle;
    /**
     * Target.targetCreate()
     * @description: target 생성
     * @returns {Phaser.Physics.Arcade.Image}
     */
    this.targets = this.physics.add.group();
    this.bullets = this.bullet.totalBullets();

    for (let i = 0; i < this.targetCount; i++) {
      const target = this.target.targetCreate();
      this.targets.add(target);
      this.boxTest(i);
    }

    this.createPauseScreen(width, height);
    this.targetTime = this.time.addEvent({ delay: 2000 });
  }

  makeKeyPressEvent() {
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.R.on("down", () => {
      if (!this.pauseBoolean) this.gunInstance.reload(this.bullets);
    });
    this.spaceBar.on("down", () => {
      if (!this.pauseBoolean) this.gunInstance.attack(this.targets, this.bullets);
    });
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.pause.on("down", () => {
      this.pauseBoolean = !this.pauseBoolean;
      this.togglePauseScreen();
    });

    this.keyboard = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });
  }

  makeTimer() {
    this.totalTime = 60;
    this.time.addEvent({
      delay: 1000, // ms
      callback: () => {
        if (this.totalTime === 0) {
          this.clear = this.add
            .text(this.cameras.main.width / 2, this.cameras.main.height / 2, "CLEAR")
            .setOrigin(0.5)
            .setDepth(9999)
            .setStyle({
              fontSize: 50,
            })
            .setScrollFactor(0);
          this.pauseBackground.setVisible(true)
          this.time.paused = true
          setTimeout(() => {
            this.scene.stop(this.sceneName);
            this.scene.start(this.nextScene, { score: this.data.get("score") });
          }, 2000)
        } else if (this.totalTime > 0) {
          this.totalTime -= 1;
          this.timer!.updateTimer(this.totalTime);
        }
      },
      args: [],
      callbackScope: null,
      loop: false,
      repeat: -1,
      startAt: 60,
      timeScale: 1,
      paused: false,
    });
  }

  public async update(time: number, delta: number) {
    if (this.gameStart && !this.pauseBoolean) {
      await this.movePlayerManager();
      this.gunInstance.showReloadText();
      for (let i = 0; i <= this.targets.getChildren().length - 1; i++) {
        this.targets.getChildren()[i].flipX =
          this.targets.getChildren()[i].body.velocity.x <= 0;
      }

      if (this.gameStart) {
        if (this.targetTime.getProgress() === 1) {
          this.time.addEvent(this.targetTime);
          this.addTarget();
        }
        if (this.targets.getChildren().length === 11) {
          this.scene.start("game_over", { score: this.data.get("score") });
        }
      }
    }
  }

  private movePlayerManager() {
    if (this.keyboard.left.isDown) {
      this.gunInstance.gunMove("LEFT");
    } else if (this.keyboard.right.isDown) {
      this.gunInstance.gunMove("RIGHT");
    }
  }

  /**
   * @description: 정지 화면 스크린 만들기
   * @private
   */
  private createPauseScreen(width: number, height: number) {
    this.pauseText = this.add
      .text(this.cameras.main.width / 2, this.cameras.main.height / 2, "Pause")
      .setOrigin(0.5)
      .setDepth(9999)
      .setStyle({
        fontSize: 50,
        backgroundColor: "blue",
      })
      .setScrollFactor(0);
    this.pauseBackground = this.add.graphics({ x: 0, y: 0 })
      .fillStyle(0x000000, 0.3)
      .fillRect(0, 0, width, height)
      .setDepth(110)
      .setScrollFactor(0);
    this.pauseBackground.setVisible(false)
    this.pauseText.setVisible(false);
  }

  /**
   * @description: 정지 화면
   * @param isVisible
   */
  togglePauseScreen() {
    this.pauseBackground.setVisible(this.pauseBoolean)
    this.pauseText!.setVisible(this.pauseBoolean);
    this.targetTime.paused = this.pauseBoolean;
    this.time.paused = this.pauseBoolean;

    if (this.pauseBoolean) {
      for (let i = 0; i < this.targets.getChildren().length; i++) {
        this.temp[i] = {
          flip: this.targets.getChildren()[i].flipX,
          velocity: this.targets.getChildren()[i].body.velocity.x,
        };
        this.targets.getChildren()[i].setVelocityX(0);
      }
    } else {
      for (let i = 0; i < this.targets.getChildren().length; i++) {
        this.targets.getChildren()[i].flipX = this.temp[i].flip;
        this.targets.getChildren()[i].setVelocityX(this.temp[i].velocity);
      }
    }
  }

  public boxTest(index: number) {
    this.targets
      .getChildren()
      [index].setVelocityX(Phaser.Math.Between(this.minSpeed, this.maxSpeed));
    this.targets.getChildren()[index].setBounce(1, 1);
    this.targets.getChildren()[index].setCollideWorldBounds(true);
    this.targets.getChildren()[index].body.setBoundsRectangle(this.box);
  }

  public hitCheck(bullet: any) {
    this.physics.add.overlap(
      bullet,
      this.targets,
      this.hitTarget as ArcadePhysicsCallback,
      this.gunInstance.breakTargetBgm,
      this
    );
  }
  private hitTarget(
    _bullet: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    _target: Phaser.Types.Physics.Arcade.ImageWithStaticBody
  ) {
    (_target as Phaser.Physics.Arcade.Image).disableBody(true, true);
    // 사용한 총알 제거
    const particles = this.add.particles(_target.texture.key);
    particles.createEmitter({
      alpha: { start: 1, end: 0 },
      scale: { start: _target.scaleX, end: _target.scaleX },
      speed: 30,
      accelerationY: -50,
      angle: { min: -85, max: -95 },
      rotate: { min: -180, max: 180 },
      lifespan: { min: 500, max: 600 },
      blendMode: "ADD",
      frequency: 110,
      maxParticles: 1,
      x: _target.x,
      y: _target.y,
    });
    this.score.calculateScore(_target.getData("score"));
    _bullet.destroy(true);
    _target.destroy(true);
  }
  private addTarget() {
    const target = this.target!.targetCreate();
    this.targets.add(target);
    this.boxTest(this.targets.getChildren().length - 1);
  }
}

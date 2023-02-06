import Phaser from "phaser";
import HpBar from "../HpBar";

export default class Soldier extends Phaser.GameObjects.Sprite {
  private delay: number = 0;
  private key: any;

  private moveAction: boolean = false;
  private runAction: boolean = false;
  private attackAction: boolean = false;

  private hp: number= 100;

  public hpBar: Phaser.GameObjects.Graphics | null = null;
  public player: any;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: number | string
  ) {
    super(scene, x, y, texture, frame);
    this.player = this.makeCharacter(x, y, texture);
    this.player.play("HOLD");
    this.keyControl();

    //  Health
    this.draw();
  }

  public draw() {
    this.hpBar = new HpBar(this.scene, this.hp, this.player.x, this.player.y);
    this.scene.add.existing(this.hpBar);
  }

  private makeCharacter(x: number, y: number, texture: string) {
    return this.scene.physics.add
      .sprite(x, y, texture)
      .setBodySize(30, 0, true);
  }

  private attack() {
    const direct = this.player.flipX ? -1000 : 1000;
    const bullet = this.scene.physics.add
      .image(this.player.x, this.player.y + 15, "bullet")
      .setScale(0.1)
      .setAngle(90)
      .setVelocityX(direct);
    if (this.delay > 2) {
      this.delay = 0;
    }
    this.delay += 1;
    setTimeout(() => {
      bullet.destroy();
    }, 2000);
  }

  private keyControl() {
    this.key = this.scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      attack: Phaser.Input.Keyboard.KeyCodes.CTRL,
      run: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      emotion1: Phaser.Input.Keyboard.KeyCodes.ONE,
    });

    const { attack, run, emotion1, left, right } = this.key;

    attack.on("down", () => {
      this.attackAction = true;
      this.moveAction = false;

      this.player.play("ATTACK");
      this.attack();
    });
    attack.on("up", () => {
      this.attackAction = false;
      this.moveAction = true;
      this.player.play("HOLD");
    });
    run.on("down", () => {
      this.runAction = true;
      this.player.play("RUN");
    });
    run.on("up", () => {
      this.runAction = false;
      this.player.play("WALK");
    });

    left.on("down", () => {
      this.moveAction = true;
      this.player.play("WALK");
    });
    left.on("up", () => {
      this.moveAction = false;
      this.player.play("HOLD");
    });

    right.on("down", () => {
      this.moveAction = true;
      this.player.play("WALK");
      this.player.x += 2;
    });
    right.on("up", () => {
      this.moveAction = false;
      this.player.play("HOLD");
    });

    emotion1.on("down", () => {
      this.player.play("EMOTION1");
    });
  }

  private keyEvent() {
    if (this.key.right.isDown && this.moveAction) {
      this.player.setFlip(false);
      if (this.runAction) {
        this.player!.x += 4;
      } else {
        this.player!.x += 2;
      }
    } else if (this.key.left.isDown && this.moveAction) {
      this.player.setFlip(true);
      if (this.runAction) {
        this.player!.x -= 4;
      } else {
        this.player!.x -= 2;
      }
    } else if (!this.moveAction && !this.runAction && !this.attackAction) {
      this.player.play("HOLD");
    }
  }

  get getCharacter() {
    return this.player;
  }
}

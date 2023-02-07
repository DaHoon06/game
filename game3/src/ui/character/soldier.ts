import Phaser from "phaser";
import { SceneController } from "../../controller/scene.controller";

export default class Soldier extends Phaser.Physics.Arcade.Sprite {
  private delay: number = 0;
  private key: any;

  private moveAction: boolean = false;
  private runAction: boolean = false;
  private attackAction: boolean = false;
  private stamina: number = 200;

  public hpBar: Phaser.GameObjects.Graphics | null = null;
  public staminaBar: Phaser.GameObjects.Graphics | null = null;
  public player: any;

  constructor(
    scene: SceneController,
    x: number,
    y: number,
    texture: string,
    frame?: number | string
  ) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.player = this.makeCharacter(x, y, texture);
    this.player.play("HOLD");
    this.keyControl();
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

  private run() {
    this.stamina -= 1;
  }

  public get getStamina() {
    return this.stamina;
  }

  public set setStamina(stamina: number) {
    this.stamina = stamina;
  }

  public get running() {
    return this.runAction;
  }

  public get attk() {
    return this.attackAction;
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
      if (this.stamina > 35) {
        this.player.play("RUN");
        this.runAction = true;
      }
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
      if (this.runAction && this.stamina > 0) {
        this.player!.x += 4;
        this.run();
      } else {
        this.runAction = false;
        this.player!.x += 2;
      }
    } else if (this.key.left.isDown && this.moveAction) {
      this.player.setFlip(true);
      if (this.runAction && this.stamina > 0) {
        this.player!.x -= 4;
        this.run();
      } else {
        this.player!.x -= 2;
      }
    }
    // else if (!this.moveAction && !this.runAction && !this.attackAction) {
    //   this.player.play("HOLD");
    // }
  }

  get getCharacter() {
    return this.player;
  }
}

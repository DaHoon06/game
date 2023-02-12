import Phaser from "phaser";
import { Bullet } from "../weapon/bullet";

export default class Soldier extends Phaser.Physics.Arcade.Sprite {
  private key: any;

  // 움직임 옵션
  private moveAction: boolean = false;
  private runAction: boolean = false;
  private attackAction: boolean = false;

  private walkbgm: any;

  // 캐릭터 스텟
  private hp: number = 100;
  private stamina: number = 200;

  public player: Phaser.Physics.Arcade.Sprite;
  private controller: any;

  constructor(
    scene: any,
    x: number,
    y: number,
    texture: string,
    frame?: number | string
  ) {
    super(scene, x, y, texture, frame);
    this.controller = scene;
    this.player = this.makeCharacter(x, y, texture);
    this.player.play("HOLD");
    this.keyControl();
    this.walkBgm();
  }

  private makeCharacter(x: number, y: number, texture: string) {
    return this.scene.physics.add
      .sprite(x, y, texture)
      .setBodySize(30, 0, true);
  }

  private attack() {
    const bullet = new Bullet(
      this.controller,
      this.player.x,
      this.player.y,
      "bullet",
      this.player,
      2
    );

    const musicConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    const bgm = this.scene.sound.add("attack");
    bgm.play(musicConfig);

    this.controller.hitCheck(bullet.makeBullet());

    setTimeout(() => {
      bullet.destroy();
    }, 400);
  }

  private run() {
    this.player.play("RUN", true);
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
      emotion1: Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE,
    });

    const { attack, run, emotion1, left, right } = this.key;



    attack.on("down", () => {
      this.attackAction = true;
      this.player.play("ATTACK", false);
      this.attack();
    });
    attack.on("up", () => {
      this.attackAction = false;
      if (this.moveAction) this.player.play("WALK", true);
      else this.player.play("HOLD", true);
    });

    run.on("down", () => {
      this.moveAction = true;
      if (this.stamina > 15 && !this.attackAction) {
        this.runAction = true;
        this.player.play("RUN", true);
      }
    });
    run.on("up", () => {
      this.runAction = false;
      this.player.play("HOLD", true);
    });

    left.on("down", () => {
      this.walkbgm.start();
      this.moveAction = true;
      this.player.play("WALK", true);
    });
    left.on("up", () => {
      this.walkbgm.stop();
      this.moveAction = false;
      if (!this.moveAction) this.player.play("HOLD", true);
    });

    right.on("down", () => {
      this.moveAction = true;
      this.player.play("WALK", true);
      this.player.x += 2;
    });
    right.on("up", () => {
      this.moveAction = false;
      if (!this.moveAction) this.player.play("HOLD", true);
    });

    emotion1.on("down", () => {
      this.player.play("EMOTION1", true);
    });
  }

  private keyEvent() {
    if (this.key.run.isDown && this.stamina > 0 && this.runAction) {
      this.run();
    }

    if (this.key.run.isDown && this.stamina <= 0) {
      this.runAction = false;
      this.player.play("WALK", true);
    }

    if (this.key.right.isDown && !this.attackAction) {
      this.player.setFlip(false, false);
      if (this.runAction && this.stamina > 0) {
        this.player!.x += 4;
      } else {
        this.player.play("WALK", true);
        this.player!.x += 2;
      }
    } else if (this.key.left.isDown && !this.attackAction) {
      this.player.setFlip(true, false);

      if (this.runAction && this.stamina > 0) {
        this.player!.x -= 4;
      } else {
        this.player.play("WALK", true);
        this.player!.x -= 2;
      }
    }

    // else if (!this.moveAction && !this.runAction && !this.attackAction) {
    //   this.player.play("HOLD", true);
    // }
  }


  private walkBgm() {
    const musicConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.walkbgm = this.scene.sound.add("walk", musicConfig);
  }
  get getCharacter() {
    return this.player;
  }
}

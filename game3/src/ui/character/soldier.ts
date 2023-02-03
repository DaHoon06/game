import Phaser from "phaser";

export default class Soldier extends Phaser.GameObjects.Sprite {
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

  private keyControl: any;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: number | string
  ) {
    super(scene, x, y, texture, frame);

    this.hold!.visible = true;
    this.walk!.visible = false;
    this.run!.visible = false;
    this.attack!.visible = false;
    this.dead!.visible = false;

    this.keyControl = this.scene.input.keyboard.createCursorKeys();
    this.attack_key = this.scene.input.keyboard.addKey(
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
    this.run_key = this.scene.input.keyboard.addKey(
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
  }

  public keyEvent() {
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

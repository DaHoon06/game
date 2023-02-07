import Phaser from "phaser";
import { SceneController } from "../controller/scene.controller";
import CONFIG from "../config";

/**
 * @description: 체력 관련 class
 */
class HpBar extends Phaser.GameObjects.Graphics {
  public hpBar: Phaser.GameObjects.Graphics | null = null;
  public hp: number = 0;

  constructor(scene: SceneController) {
    super(scene);

    this.draw();
  }

  public draw() {
    const { width } = CONFIG as { width: number };
    this.fillStyle(0xffffff, 0).fillRect(0, 0, width, 100).setScrollFactor(0);
    this.hpBar = this.fillStyle(0x00ff00).fillRect(10, 50, 200, 16);
    this.scene.add.existing(this.hpBar);
  }
}

/**
 * @description: 스테미너 관련 class
 */
class StaminaBar extends Phaser.GameObjects.Graphics {
  public staminaBar: Phaser.GameObjects.Graphics | null = null;
  private stamina: number = 0;

  constructor(scene: SceneController) {
    super(scene);

    this.draw();
  }

  public draw() {
    const { width } = CONFIG as { width: number };
    this.fillStyle(0xffffff, 0).fillRect(0, 0, width, 100).setScrollFactor(0);
    this.staminaBar = this.fillStyle(0xff9900).fillRect(10, 70, 200, 16);
    this.scene.add.existing(this.staminaBar);
  }

  public reDrawStamina(stamina: number) {
    this.staminaBar!.clear();
    this.fillStyle(0xff9900).fillRect(10, 70, this.stamina, 16);
    this.stamina = stamina;
    if (this.stamina < 80) {
      this.staminaBar!.clear();
      this.fillStyle(0xff0000).fillRect(10, 70, this.stamina, 16);
    }
  }

  public incrementStamina(stamina: number) {
    let color = 0;
    this.stamina = stamina;

    if (this.stamina < 80) color = 0xff0000;
    else color = 0xff9900;

    if (stamina < 200) {
      this.stamina += 0.2;
      this.fillStyle(color).fillRect(10, 70, this.stamina, 16);
    }
    return this.stamina;
  }
}

export { HpBar, StaminaBar };

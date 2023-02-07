import Phaser from "phaser";

class HpBar extends Phaser.GameObjects.Graphics {
  private bar: Phaser.GameObjects.Graphics | any;
  public hp: number = 0;
  public x: number = 0;
  public y: number = 0;

  constructor(scene: any, hp: number, x: number, y: number) {
    super(scene);
    this.hp = hp;
    this.x = x;
    this.y = y;
    this.draw();
  }

  public draw() {
    const hp = this.fillStyle(0x00ff00).fillRect(this.x, 50, 200, 16);

    //  Health
    if (this.hp < 30) {
      this.fillStyle(0xff0000);
    } else {
      this.fillStyle(0x00ff00);
    }

    //var d = Math.floor(this.p * this.value);
    this.fillRect(-40, -30, 76, 12);

    this.scene.add.existing(hp);
  }
}

class StaminaBar extends Phaser.GameObjects.Graphics {
  public stamina: number = 0;

  constructor(scene: any, stamina: number, x: number, y: number) {
    super(scene);
    this.stamina = stamina;
    this.x = x;
    this.y = y;
    this.draw();
  }

  public draw() {
    const stamina = this.fillStyle(0xff9900).fillRect(this.x, 70, 200, 16);
    this.scene.add.existing(stamina);
  }
}

export { HpBar, StaminaBar };

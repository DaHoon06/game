import Phaser from "phaser";

export default class HpBar extends Phaser.GameObjects.Graphics {
  private bar: Phaser.GameObjects.Graphics | any;
  public hp: number = 0;
  public x: number = 0;
  public y: number = 0;

  constructor(scene: any, hp: number, x: number, y: number) {
    super(scene)
    this.hp = hp;
    this.x = x;
    this.y = y;

    this.draw();
  }

  private draw() {
    console.log(this.x, this.y)
    this.fillStyle(0x000000);
    this.fillRect(-42, -32, 80, 16);

    //  Health

    this.fillStyle(0xffffff);
    this.fillRect(-40, -30, 76, 12);

    if (this.hp < 30) {
      this.fillStyle(0xff0000);
    } else {
      this.fillStyle(0x00ff00);
    }

    //var d = Math.floor(this.p * this.value);

    this.fillRect(this.x + 2, this.y + 2, 10, 12);
  }
}

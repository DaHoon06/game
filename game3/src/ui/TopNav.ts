import * as Phaser from "phaser";
import CONFIG from "../config";
import { SceneController } from "../controller/scene.controller";
import Timer from "./Timer";

export default class TopNav extends Phaser.GameObjects.Graphics {
  public nav: Phaser.GameObjects.Graphics | null = null;

  private stamina: number = 0;

  private timer: any;

  constructor(scene: SceneController) {
    super(scene);
    const { width } = CONFIG as { width: number };
    this.nav = this.fillStyle(0xffffff, 0)
      .fillRect(0, 0, width, 100)
      .setScrollFactor(0);
    this.scene.add.existing(this.nav);

    const hp = this.fillStyle(0x00ff00).fillRect(10, 50, 200, 16);
    const stamina = this.fillStyle(0xff9900).fillRect(10, 70, 200, 16);
    // 메뉴 그리기
    this.scene.add.existing(stamina);
    this.scene.add.existing(hp);
    this.timer = new Timer(this.scene, 0, 45, "60", {
      color: "white",
      stroke: "#cccccc",
      strokeThickness: 1,
      padding: {
        x: 2,
        y: 2,
      },
    });
    this.scene.add.text(0, 0, "360").setScale(1, 1).setDepth(999);
  }

  public reDrawStamina(stamina: number) {
    this.clear();
    this.fillStyle(0xff9900).fillRect(10, 70, this.stamina, 16);
    this.stamina = stamina;
    if (this.stamina < 80) {
      this.clear();
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

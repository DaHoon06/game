import * as Phaser from "phaser";
import CONFIG from '../config';
import { SceneController } from "../controller/scene.controller";
import Timer from "./Timer";

export default class TopNav extends Phaser.GameObjects.Graphics {
  public nav: Phaser.GameObjects.Graphics | null = null;
  private timer: any;

  constructor(scene: SceneController) {
    super(scene);
    const { width } = CONFIG as { width: number}

    this.nav = this.fillStyle(0xffffff, 0).fillRect(0, 0, width, 100)
      .setScrollFactor(0);
    this.scene.add.existing(this.nav);

    const hp = this.fillStyle(0x00ff00)
      .fillRect(10, 50, 200, 16);
    const stamina = this.fillStyle(0xff9900).fillRect(10, 70, 200, 16);
    // 메뉴 그리기
    this.scene.add.existing(stamina)
    this.scene.add.existing(hp)

    this.timer = new Timer(this.scene, width - 200, 45, "60", {
      color: "black",
      stroke: "#cccccc",
      strokeThickness: 1,
      padding: {
        x: 2,
        y: 2,
      },
    });
    this.scene.add.text(0, 0, '360').setScale(1, 1).setDepth(999)
  }
}

import * as Phaser from "phaser";
import CONFIG from '../config';
import { SceneController } from "../controller/scene.controller";

export default class TopNav extends Phaser.GameObjects.Graphics {
  public nav: Phaser.GameObjects.Graphics | null = null;

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
  }
}

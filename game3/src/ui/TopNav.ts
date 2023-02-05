import * as Phaser from "phaser";
import CONFIG from '../config';
import { SceneController } from "../controller/scene.controller";

export default class TopNav extends Phaser.GameObjects.Graphics {
  public nav: Phaser.GameObjects.Graphics | null = null;

  constructor(scene: SceneController) {
    super(scene);
    const { width } = CONFIG as { width: number}

    this.nav = this.fillStyle(0x28288c)
      .fillRect(0, 0, width, 100)
      .setScrollFactor(0);

    // this.nav.fillStyle(0x000000);
    // this.nav.fillRect(this.x, this.y, 80, 16);
    //
    // //  Health
    // this.nav.fillStyle(0xffffff);
    // this.nav.fillRect(this.x + 2, this.y + 2, 76, 12);

    // 메뉴 그리기
    this.scene.add.existing(this.nav);
  }
}

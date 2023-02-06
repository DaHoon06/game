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



    // 메뉴 그리기
    this.scene.add.existing(this.nav);
  }
}

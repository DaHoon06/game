import * as Phaser from "phaser";
import CONFIG from '../config';
import { SceneController } from "../controller/scene.controller";

export default class TopNav extends Phaser.GameObjects.Graphics {
  constructor(scene: SceneController) {
    super(scene);
    const { width } = CONFIG as { width: number}
    this.fillStyle(0x28288c)
      .fillRect(0, 0, width, 100)
      .setDepth(999)
      .setScrollFactor(0);
  }
}

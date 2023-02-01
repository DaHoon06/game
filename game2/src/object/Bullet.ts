import Phaser from "phaser";
import { StageOneScene } from "../scene";
import { SceneController } from "../controller/scene.controller";

export default class Bullet extends Phaser.Physics.Arcade.Image {
  private bullet?: Phaser.Physics.Arcade.Image | null = null;
  private sceneController: SceneController;

  constructor(
    sceneController: SceneController,
    x: number,
    y: number,
    texture: string
  ) {
    super(sceneController, x, y, texture);
    this.sceneController = sceneController;
    this.bullet = sceneController.physics.add
      .image(x, y, texture)
      .setScale(0.3)
      .setVelocity(0, -100)
      .setBodySize(5, 5, true);
  }

  createBullet(x: number, y: number) {
    return (this.bullet = this.scene.physics.add
      .image(x, y, this.texture)
      .setScale(0.6)
      .setBodySize(10, 100, true)
      .setOrigin(1, 1));
  }
  ybchoCreateBullet(x: number, y: number) {
    return this.sceneController.physics.add
      .image(x, y, "BULLET")
      .setScale(0.3)
      .setVelocity(0, -1000)
      .setBodySize(5, 5, true);
  }
  removeBullet() {}

  totalBullets() {
    const bullets = this.scene.physics.add.group();
    bullets.add(this.createBullet(this.x - 10, this.y - 10));
    bullets.add(this.createBullet(this.x - 20, this.y - 10));
    bullets.add(this.createBullet(this.x - 30, this.y - 10));
    bullets.add(this.createBullet(this.x - 40, this.y - 10));
    bullets.add(this.createBullet(this.x - 50, this.y - 10));
    return bullets;
  }

  reload() {}
}

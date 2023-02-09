import { SceneController } from "../../controller/scene.controller";
import Soldier from "../character/soldier";
import Phaser from "phaser";

export class Bullet extends Phaser.Physics.Arcade.Image {
  private bullet: Phaser.Physics.Arcade.Image;
  private power: number = 2;

  constructor(
    scene: any,
    x: number,
    y: number,
    texture: string,
    player: Phaser.Physics.Arcade.Sprite,
    power: number
  ) {
    super(scene, x, y, texture);
    const direct = player.flipX ? -1000 : 1000;
    this.bullet = this.scene.physics.add
      .image(player.x, player.y + 15, texture)
      .setScale(0.1)
      .setAngle(90)
      .setBodySize(30, 30, true)
      .setVelocityX(direct);
  }

  makeBullet() {
    return this.bullet;
  }
}

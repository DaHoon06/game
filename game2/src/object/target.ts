import { SceneController } from "../controller/scene.controller";
import { StageOneController } from "../controller/stage/stageOne.controller";
import Phaser, { GameObjects } from "phaser";
import { StageOneScene } from "../scene";
export class Target extends Phaser.Physics.Arcade.Image {
  private sceneController: SceneController;
  private score: number[];
  constructor(
    sceneController: SceneController,
    x: number,
    y: number,
    texture: string
  ) {
    super(sceneController, x, y, texture);
    this.init();
    this.sceneController = sceneController;
    this.score = [5, 4, 3, 2, 1];
  }
  public rectangle: any;
  public graphics: any;
  private init() {
    const graphics = this.scene.add.graphics({
      lineStyle: { width: 1, color: 0x00ff00 },
      fillStyle: { color: 0xff0000 },
    });
    this.rectangle = new Phaser.Geom.Rectangle(0, 70, 600, 300);
    //graphics.strokeRectShape(this.rectangle);
  }

  public targetCreate() {
    const size = Number(Phaser.Math.FloatBetween(0.2, 0.6).toFixed(1));
    return this.sceneController.physics.add
      .image(
        this.rectangle.getRandomPoint().x,
        this.rectangle.getRandomPoint().y,
        this.texture
      )
      .setScale(size)
      .setData("score", this.score[size * 10 - 2]);
  }
}

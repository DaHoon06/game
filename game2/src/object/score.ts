import { GameObjects } from "phaser";
import { StageOneScene } from "../scene";
import { SceneController } from "../controller/scene.controller";

export default class Score extends GameObjects.Text {
  private sceneController: SceneController;
  constructor(
    scene: SceneController,
    x?: number,
    y?: number,
    text?: string,
    style?: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x!, y!, text!, style!);
    this.sceneController = scene;
    this.createScore();
  }

  private createScore() {
    this.sceneController.add
      .text(150, 50, "score : " + this.text)
      .setDepth(9999)
      .setOrigin(0.5)
      .setStyle({
        fontSize: 20,
        color: "red",
      })
      .setName("scoreText"); //this.score.calculateScore("text")
  }
  public calculateScore(score: number) {
    this.sceneController.data.set(
      "score",
      (this.sceneController.data.get("score") as number) + score
    );
    (
      this.sceneController.children.getByName(
        "scoreText"
      ) as Phaser.GameObjects.Text
    ).setText("score: " + (this.sceneController.data.get("score") as number));
  }
}

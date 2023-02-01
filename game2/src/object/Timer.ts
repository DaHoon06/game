import { GameObjects } from "phaser";
import { SceneController } from "../controller/scene.controller";

export default class Timer extends GameObjects.Text {
  private totalTime: number = 60;
  private timerLabel: any;

  constructor(
    scene: SceneController,
    x: number,
    y: number,
    texture: string,
    style: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, texture, style);
    this.createdTimer();
  }

  private createdTimer = (): void => {
    this.timerLabel = this.scene.add
      .text(this.x, this.y, `남은 시간 : ${this.totalTime}`, { ...this.style })
      .setScale(1, 1)
      .setDepth(9999);
  };

  public updateTimer = (time: number) => {
    this.timerLabel.setText("남은 시간 : " + time.toString().substr(0, 4));
  };
}

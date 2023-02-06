import { SceneController } from "../controller/scene.controller";

export default class Timer extends Phaser.GameObjects.Text {
  private totalTime: number = 240;
  private timerLabel: any;

  constructor(
    scene: any,
    x: number,
    y: number,
    texture: string,
    style: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, texture, style);
    this.createdTimer();
  }

  private createdTimer() {
    this.timerLabel = this.scene.add
      .text(this.x, this.y, `${this.totalTime}`, { ...this.style })
      .setScale(1, 1)
      .setDepth(9999);
  };

  public updateTimer(time: number) {
    this.timerLabel.setText(time.toString().substr(0, 4));
  };
}

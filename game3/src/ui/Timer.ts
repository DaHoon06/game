import { SceneController } from "../controller/scene.controller";

export default class Timer extends Phaser.GameObjects.Text {
  private totalTime: number = 240;
  private timerLabel: string;

  constructor(
    scene: SceneController,
    x: number,
    y: number,
    texture: string | string[],
    style: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, texture, style);

    this.timerLabel = "asdfasfkjsahfkjsdahkfjsd";

    this.createdTimer();
  }

  private createdTimer() {
    console.log(this.x, this.y);
    const test = this.scene.add.text(this.x, this.y, this.timerLabel, {
      ...this.style,
    });
    this.scene.add.existing(test);
  }

  // public updateTimer(time: number) {
  //   this.timerLabel.setText(time.toString().substr(0, 4));
  // }
}

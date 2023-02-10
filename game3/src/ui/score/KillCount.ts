import { IntroScene } from "../../scene/intro.scene";
import Phaser from "phaser";

export default class KillCount extends Phaser.GameObjects.Text {
  constructor(
    scene: IntroScene,
    x: number,
    y: number,
    text: string,
    style?: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, text, style!);

    this.createKillCount();
  }

  private createKillCount() {
    this.scene.add
      .text(this.x, this.y, `KILL: ` + this.text)
      .setOrigin(0.5)
      .setDepth(9999)
      .setStyle({
        fontSize: 30,
        color: "red",
      })
      .setFontStyle("bold")
      .setScrollFactor(0)
      .setName("killCountText");
  }

  public calculateScore() {
    this.data.set("killCount", (this.data.get("killCount") as number) + 1);

    (
      this.scene.children.getByName("killCountText") as Phaser.GameObjects.Text
    ).setText("KILL: " + (this.data.get("killCount") as number));
  }
}

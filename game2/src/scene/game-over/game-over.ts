import { SceneController } from "../../controller/scene.controller";
import Phaser from "phaser";
import Score from "../../object/score";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("game_over");
  }
  create() {
    const camera = this.cameras.main.setBounds(0, 0, 600, 800, true);
    const { width, height } = camera;
    const { score }: any = this.scene.settings.data;
    this.add
      .text(width / 2, height / 2 - 100, "점수 " + score + "점", {
        fontSize: "50px",
        color: "green",
        padding: { top: 15, bottom: 10 },
      })
      .setDepth(9999)
      .setOrigin(0.5);
    this.add
      .text(width / 2, height / 2, "GAME-OVER")
      .setDepth(9999)
      .setStyle({
        fontSize: 50,
        color: "red",
      })
      .setOrigin(0.5, 0.5);
    console.log("game-over");
    this.add
      .text(width / 2, height / 2 + 100, "다시하기", {
        fontSize: "50px",
        color: "green",
        backgroundColor: "#8aacc8",
        padding: { top: 15, bottom: 10 },
      })
      .setDepth(9999)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.stop("game_over");
        this.scene.start("intro");
      });
  }
}

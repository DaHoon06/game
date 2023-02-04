import { SceneController } from "../controller/scene.controller";
import CONFIG from "../config";
import Soldier from "../ui/character/soldier";
import Phaser from "phaser";
import TopNav from "../ui/TopNav";

export class IntroScene extends SceneController {
  private background: any;
  protected character: any;

  private test: Phaser.GameObjects.Graphics | null = null;

  constructor() {
    super("intro");
  }

  protected async create() {
    super.create();


    const { width, height } = CONFIG;
    this.background = this.add
      .tileSprite(0, 0, width as number, height as number, "stage")
      .setOrigin(0, 0)
      .setScale(1);

    this.test = new TopNav(this);
    this.character = new Soldier(this, 300, 900, "player");

    this.add.sprite(300, 900, "zombie1").play("zombie1_hold");
    this.add.sprite(400, 900, "zombie1_walk").play("zombie1_walk");
    this.add.sprite(500, 900, "zombie1_run").play("zombie1_run");
    this.add.sprite(600, 900, "zombie1_attack").play("zombie1_attack");
    this.add.sprite(700, 900, "zombie1_jump").play("zombie1_jump");
    this.add.sprite(800, 900, "zombie1_dead").play("zombie1_dead");

    this.add.sprite(320, 940, "zombie2").play("zombie2_hold");
    this.add.sprite(400, 940, "zombie2_walk").play("zombie2_walk");
    this.add.sprite(500, 940, "zombie2_run").play("zombie2_run");
    this.add.sprite(600, 940, "zombie2_attack").play("zombie2_attack");
    this.add.sprite(700, 940, "zombie2_jump").play("zombie2_jump");
    this.add.sprite(800, 940, "zombie2_dead").play("zombie2_dead");

    this.add.sprite(300, 980, "zombie3").play("zombie3_hold");
    this.add.sprite(400, 980, "zombie3_walk").play("zombie3_walk");
    this.add.sprite(500, 980, "zombie3_run").play("zombie3_run");
    this.add.sprite(600, 980, "zombie3_attack").play("zombie3_attack");
    this.add.sprite(700, 980, "zombie3_jump").play("zombie3_jump");
    this.add.sprite(800, 980, "zombie3_dead").play("zombie3_dead");

    this.cameras.main.startFollow(this.character.getCharacter);
  }

  update(time: number, delta: number) {
    this.character.keyEvent();
    this.makeBackground();
  }

  /**
   * @description 무한 배경
   * @private
   */
  private makeBackground() {
    const { width, height } = CONFIG as { width: number; height: number };
    this.background.setX(this.character.getCharacter.x - width / 2);
    this.background.tilePositionX = this.character.getCharacter.x - width / 2;
  }
}

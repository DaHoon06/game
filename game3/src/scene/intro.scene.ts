import { SceneController } from "../controller/scene.controller";
import CONFIG from "../config";
import Soldier from "../ui/character/soldier";

import { HpBar, StaminaBar } from "../ui/StatusBar";

export class IntroScene extends SceneController {
  private background: any;
  protected character: any;
  public staminaBar: any;
  public hpBar: any;
  private currentStamina: number = 0;

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

    this.staminaBar = new StaminaBar(this);
    this.hpBar = new HpBar(this);
    this.character = new Soldier(this, 300, 900, "player");

    this.cameras.main.startFollow(this.character.getCharacter);
  }

  update(time: number, delta: number) {
    this.character.keyEvent();

    this.currentStamina = this.character.getStamina;

    const runAction = this.character.running;
    const attackAction = this.character.attk;
    if (!attackAction) {
      if (this.currentStamina > 0 && runAction) {
        this.staminaBar.reDrawStamina(this.currentStamina);
      } else if (!runAction) {
        this.character.setStamina = this.staminaBar.incrementStamina(
          this.currentStamina
        );
      }
    }
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

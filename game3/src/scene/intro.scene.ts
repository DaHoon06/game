import { SceneController } from "../controller/scene.controller";
import CONFIG from "../config";
import Soldier from "../ui/character/soldier";
import Phaser from "phaser";

import { HpBar, StaminaBar } from "../ui/StatusBar";
import Enemy from "../ui/enemy/enemy";

export class IntroScene extends SceneController {
  private background: any;
  public staminaBar: any;
  public hpBar: any;

  private width: number = 0;
  private height: number = 0;

  private killCount: number = 0;

  protected character: any;
  private characterX: number = 0;
  private zombieCount: number = 0;
  private testLocation: any;

  constructor() {
    super("intro");
  }

  protected async create() {
    super.create();
    this.data.set("killCount", 0);
    const { width, height } = CONFIG as { width: number; height: number };
    this.width = width;
    this.height = height;

    this.background = this.add
      .tileSprite(0, 0, this.width, this.height, "stage")
      .setOrigin(0, 0)
      .setScale(1);

    this.staminaBar = new StaminaBar(this);
    this.hpBar = new HpBar(this);
    this.character = new Soldier(this, 300, 900, "player");
    this.cameras.main.startFollow(this.character.getCharacter);

    this.zombieGroup = this.physics.add.group();

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        const x = this.getRandomPosition(this.characterX);
        this.zombieGroup.add(
          new Enemy(this, x, 915, "zombie1", this.character, 2)
        );
        if (this.zombieCount > 5) {
          this.zombieGroup.add(
            new Enemy(this, x + 100, 915, "zombie2", this.character, 4)
          );
        }

        if (this.zombieCount > 10) {
          this.zombieGroup.add(
            new Enemy(this, x + 500, 915, "zombie3", this.character, 6)
          );
        }
        this.zombieCount++;
      },
      loop: true,
    });
    /**
     * @description 캐릭터와 좀비가 부딪혔을 때
     */
    this.physics.add.overlap(
      this.character.getCharacter,
      this.zombieGroup,
      this.zombieAttack as ArcadePhysicsCallback,
      this.zombieHold as ArcadePhysicsCallback,
      this
    );

    this.makeKillCount();
  }

  private makeKillCount() {
    this.add
      .text(960, 60, `KILL: ${this.killCount}`)
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

  getRandomPosition(x: number) {
    const random = Math.random() * Math.PI * 2;
    const _r =
      Math.sqrt(this.width * this.width + this.height * this.height) / 2;
    return x + _r * Math.cos(random) || 100;
  }

  public hitCheck(bullet: any) {
    this.physics.add.overlap(
      bullet,
      this.zombieGroup,
      this.hit as ArcadePhysicsCallback,
      () => {},
      this
    );
  }

  private hit(
    bullet: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    zombie: any
  ) {
    const { texture, zombie: zombieInstance } = zombie;
    const { key } = texture;

    const hp = zombieInstance.hp;
    if (hp === 0) {
      zombie.play(`${key}_dead`, true);
      this.calculateScore();
      setTimeout(() => {
        zombie.destroy();
      }, 900);
    } else {
      //TODO: 달리기 및 점프할 때 좀비 이동 속도 증가
      zombieInstance.hp -= 1;
      if (hp <= 1) {
        zombie.play(`${key}_jump`, true);
      } else {
        zombie.play(`${key}_run`, true);
      }
    }
    bullet.destroy();
    // setTimeout(() => {
    //   bullet.destroy();
    // }, 100);
  }

  private zombieAttack(charter: any, zombie: any) {
    const { texture, zombie: zombieInstance } = zombie;
    const { key } = texture;
    zombie.play(`${key}_attack`, true);
  }
  private zombieHold(charter: any, zombie: any) {
    const { texture, zombie: zombieInstance } = zombie;
    const { key } = texture;
  }

  public calculateScore() {
    this.data.set("killCount", (this.data.get("killCount") as number) + 1);
    (
      this.children.getByName("killCountText") as Phaser.GameObjects.Text
    ).setText("KILL: " + (this.data.get("killCount") as number));
  }

  update(time: number, delta: number) {
    this.character.keyEvent();
    this.characterAction();
    this.characterX = this.character.getCharacter.x - this.width / 2;
    this.testLocation = this.physics.closest(
      this.characterX,
      this.zombieGroup.getChildren()
    );
    this.makeInfinityBackground();
  }

  /**
   * @description: 캐릭터 동작
   */
  characterAction() {
    const runAction = this.character.running;
    const attackAction = this.character.attk;
    if (!attackAction) {
      if (this.character.getStamina > 0 && runAction) {
        this.staminaBar.reDrawStamina(this.character.getStamina);
      } else if (!runAction) {
        this.character.setStamina = this.staminaBar.incrementStamina(
          this.character.getStamina
        );
      }
    }
  }

  /**
   * @description 무한 배경
   * @private
   */
  private makeInfinityBackground() {
    this.background.setX(this.character.getCharacter.x - this.width / 2);
    this.background.tilePositionX =
      this.character.getCharacter.x - this.width / 2;
  }
}

import { SceneController } from "../controller/scene.controller";
import CONFIG from "../config";
import Soldier from "../ui/character/soldier";
import Phaser from "phaser";

import { HpBar, StaminaBar } from "../ui/StatusBar";
import Timer from "../ui/Timer";
import Enemy from "../ui/enemy/enemy";

export class IntroScene extends SceneController {
  private background: any;
  protected character: any;
  public staminaBar: any;
  public hpBar: any;

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

    this.zombieGroup = this.physics.add.group();

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        const x = this.getRandomPosition(this.character.x);
        this.zombieGroup.add(
          new Enemy(this, x, 915, "zombie1", this.character, 2)
        );
      },
      loop: true,
    });

    // for (let i = 0; i < 20; i++) {
    //   const createZombie = new Enemy(
    //     this,
    //     100 + 50,
    //     915,
    //     "zombie1",
    //     this.player,
    //     2
    //   );
    //   const mob = createZombie.createZombie(100 + 50 * i, 915, "zombie1");
    //
    //   if (i % 2 === 0) mob.play("zombie1_hold");
    //   else mob.play("zombie1_run");
    //
    //   this.zombieGroup.add(mob);
    // }

    /*setInterval(() => {
      var enemy = this.physics.add.sprite(
          this.character.x + 1200,  // Generate random x position
          920,  // Generate random y position
          'zombie1'
      ).play("zombie1_walk");

      enemy.flipX = true;
      enemy.setVelocity(-50, 0);
    }, 2000)

    var enemy = this.physics.add.sprite(
        this.character.x + 1200,  // Generate random x position
        920,  // Generate random y position
        'zombie1'
    ).play("zombie1_run");

    enemy.flipX = true;
    enemy.setVelocity(-200, 0);
    enemy.setBounce(0.2).setCollideWorldBounds(true);*/

    // var enemies = this.physics.add.group({
    //   key: "zombie1",
    //   frameQuantity: 10,
    //   collideWorldBounds: true,
    //   // setXY: { x: 500, y: 900, stepX: 50 },
    //   velocityX: 10,
    // });
    //
    // // var a = this.physics.add
    // //   .sprite(300, 900, "player")
    // //   .setBodySize(30, 0, true)
    // //   .setVelocity(30, 0)
    // //   .setCollideWorldBounds(true);
    // const test = enemies.getChildren()[0];
    // console.log(test);
    //
    // var enemy2 = enemies.create(this.character.x, 915, "zombie1");
    // enemy2.play("zombie1_walk").setBodySize(30, 0, true);

    // this.time.addEvent({
    //   delay: 100,
    //   callback: () => {
    //     this.physics.moveToObject(enemy2, this.character, 50);
    //   },
    //   loop: true,
    // });

    // var enemy = enemies.create(this.character.x + 200, 915, "zombie1");
    // enemy.flipX = true;
    // enemy.play("zombie1_walk").setBodySize(30, 0, true);

    // this.physics.add.collider(a, enemy);
    // this.physics.add.collider(this.character.getCharacter, enemy);
    // this.physics.add.collider(enemies, this.character);

    /*enemies.children.iterate((r) => {
      r.getData('zombie1').filpX = true
      console.log(r.getData('flip'))

    })*/
    /*for (let i = 0 ; i < 11 ; i++) {
      var e = enemies.create(400, 900, 'zombie1')
      e.flipX = true;
    }*/
    // enemy.playAnimation('zombie1_walk')
    // enemy.flipX = true;
    // enemy.setVelocity(-50, 0);
  }

  getRandomPosition(x: number) {
    const random = Math.random() * Math.PI * 2;
    const { width, height } = CONFIG as { width: number; height: number };
    const _r = Math.sqrt(width * width + height * height) / 2;
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
    zombie: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) {
    zombie.play("zombie1_dead", true);
    // const hp = this.zombieTest.hpCheck();
    // // HP 남았으면 달리기
    // if (hp <= 0) {
    //   zombie.play("zombie1_dead", true);
    //   setTimeout(() => {
    //     zombie.destroy();
    //   }, 1000);
    // } else {
    //   zombie.play("zombie1_walk", true);
    // }
    setTimeout(() => {
      zombie.destroy();
    }, 900);
    bullet.destroy();
  }

  update(time: number, delta: number) {
    this.character.keyEvent();
    this.characterAction();
    // this.physics.closest(this.player, this.zombieGroup.getChildren());
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
    const { width, height } = CONFIG as { width: number; height: number };
    this.background.setX(this.character.getCharacter.x - width / 2);
    this.background.tilePositionX = this.character.getCharacter.x - width / 2;
  }
}

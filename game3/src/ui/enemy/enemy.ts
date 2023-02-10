import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  static ZOMBIE_SPEED = 10;
  private hp: number = 2;
  private zombie: any;

  constructor(
    scene: any,
    x: number,
    y: number,
    texture: string,
    player: any,
    hp: number
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.hp = hp;

    scene.add.existing(this);
    this.zombie = scene.physics.add
      .existing(this)
      .setBodySize(30, 100, true)
      .setData("killCount", 1);
    this.zombie.play(`${texture}_hold`);

    const _closet = [];
    _closet.push(
      this.scene.time.addEvent({
        delay: 100,
        callback: () => {
          const test = scene.physics.moveToObject(this, scene.character, 10);
          if (test < -0.5) {
            this.zombie.setFlip(true);
          } else {
            this.zombie.setFlip(false);
          }
          this.zombie.play(`${texture}_walk`, true);
        },
      })
    );

    scene.events.on("update", (time: any, delta: any) => {
      this.update(time, delta);
    });
  }

  speedUp(amount: number) {
    // console.log(amount);
  }

  createZombie(x: number, y: number, texture: string) {
    return this.scene.physics.add
      .sprite(x, y, texture)
      .setBodySize(30, 100, true);
  }
}

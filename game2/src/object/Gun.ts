import * as Phaser from "phaser";
import { StageOneScene } from "../scene";
import Bullet from "./Bullet";
import { SceneController } from "../controller/scene.controller";
import {GameObjects} from "phaser";
import {Target} from "./target";
export default class Gun extends Phaser.Physics.Arcade.Image {
  private gun?: Phaser.Physics.Arcade.Image | null = null;
  private R: Phaser.Input.Keyboard.Key | null = null;
  private bulletCount: number = 5;
  private currentBulletCount: number = 0;
  private sceneController: SceneController;
  private reloadText: GameObjects.Text;

  constructor(scene: SceneController, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.sceneController = scene;
    this.gun = scene.physics.add
      .image(x / 2, y * (y / 8), texture)
      .setScale(0.8)
      .setBodySize(10, 100, true)
      .setCollideWorldBounds(true);

    this.R = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.reloadText = this.scene.add.text(this.x / 2,  this.y - 150, '"R" 키를 눌러 총알은 장전해 주세요.')
      .setDepth(99)
      .setAlign('center')
      .setOrigin(0.5)
      .setStyle({
        fontSize: 16,
        color: 'red',
        fontWeight: 400
      })
      .setStroke('#dedede',3);
  }

  private attack = (targets: any, bullets: any) => {
    this.bulletCount -= 1;
    if (this.bulletCount <= -1) this.emptyBullet();
    else {
      const particles = this.sceneController.add.particles('fire');
      particles.createEmitter({
        alpha: { start: 2, end: 1 },
        scale: { start: 0.5, end: 0.5 },
        //tint: { start: 0xff945e, end: 0xff945e },
        speed: 1,
        accelerationY: 0,
        // angle: { min: -85, max: -90 },
        // rotate: { min: 0, max: 180 },
        lifespan: { min: 500, max: 500 },
        blendMode: 'ADD',
        frequency: 50,
        maxParticles: 1,
        x: this.gun!.x - 2,
        y: this.gun!.y - 95
      });

      bullets.children.entries[this.currentBulletCount].disableBody(true, true)
      this.currentBulletCount += 1;
      this.shotBgm();
      const bulletInstance = new Bullet(
        this.sceneController,
        this.gun!.y,
        this.gun!.x,
        "BULLET"
      );
      const bullet = bulletInstance.ybchoCreateBullet(this.gun!.x, this.gun!.y)
      this.sceneController.hitCheck(bullet);
    }
  };

  private emptyBullet = () => {
    const musicConfig = {
      mute: false,
      volume: 0.7,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    const bgm = this.scene.sound.add("empty");
    bgm.play(musicConfig);
  };

  private breakTargetBgm = () => {
    const musicConfig = {
      mute: false,
      volume: 0.7,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    const bgm = this.scene.sound.add("break");
    bgm.play(musicConfig);
  };

  private reload = (bullets: any) => {
    if (this.R?.isDown && this.bulletCount <= 0) {
      this.reloadBgm();
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          bullets.children.entries[i].visible = true
        }
        this.currentBulletCount = 0;
        this.bulletCount = 5;
      }, 1000);
    }
  };

  showReloadText = () => {
    this.reloadText.visible = this.bulletCount <= 0;
  }

  private reloadBgm = () => {
    const musicConfig = {
      mute: false,
      volume: 0.7,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    const bgm = this.scene.sound.add("reload");
    bgm.play(musicConfig);
  };
  private shotBgm = () => {
    const musicConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    const bgm = this.scene.sound.add("shot");
    bgm.play(musicConfig);
  };

  private gunMove = (direction: string) => {
    switch (direction) {
      case "LEFT":
        this.gun!.x -= 10;
        break;
      case "RIGHT":
        this.gun!.x += 10;
        break;
      default:
        break;
    }
  };

}

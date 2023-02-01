import { StageOneController } from "../../controller/stage/stageOne.controller";

export class IntroScene extends StageOneController {
  private spaceBar: Phaser.Input.Keyboard.Key | null = null;
  private sceneName: string = "intro";
  constructor(scene: StageOneController) {
    super("intro"); // 식별자 설정 -> intro 로 설정
  }

  /**
   * @description: preload의 경우 해당 씬이 실행할 떄 필요한 assets 등 준비를 하는 곳
   * @protected
   */
  protected preload(): void {
    this.loadAssets();
  }

  /**
   * @description: 씬 생성에 필요한 것을 설정
   * @protected
   */
  protected create(): void {
    this.musicPlay();

    const { x, y, width, height } = this.cameras.main;
    const center = {
      x: x + width / 2,
      y: y + height / 2,
    };

    this.add.image(width / 2, height / 2, "background").setScale(1);
    this.add
      .image(center.x, height * (1 / 4), "logo")
      .setOrigin(0.5)
      .setDepth(998)
    this.add
      .text(center.x - 150, height / 2 + 250, "Press SpaceBar to Start")
      .setFill("#fdbd78")
      .setFontSize(24)
      .setStroke('#ffffff',10)
      .setDepth(999);
    // 게임 시작
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.spaceBar.on("down", this.keyPress);
  }

  /**
   * @description: 지속적인 업데이트가 일어나는 곳
   * @param time
   * @param delta
   */
  update(time: number, delta: number) {
    super.update(time, delta);
  }

  private loadAssets = () => {
    this.load.image("background", "img/background/back2.jpg");
    this.load.image("keyWording", "img/utils/key.gif");
    this.load.image("logo", "img/utils/logo.png");
    this.load.audio("introBgm", "bgm/intro2.mp3");
  };

  private musicPlay = () => {
    const musicConfig = {
      mute: false,
      volume: 0.7,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    const bgm = this.sound.add("introBgm");
    bgm.play(musicConfig);
  };

  private keyPress = () => {
    this.input.keyboard.on("keydown", this.gameStart);
  };

  private gameStart = () => {
    this.input.activePointer.isDown = false;
    this.scene.stop(this.sceneName);
    this.scene.start("stage01");
    this.sound.stopByKey("introBgm");
  };
}

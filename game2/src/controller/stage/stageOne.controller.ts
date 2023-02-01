import Phaser from "phaser";

export class StageOneController extends Phaser.Scene {
  /*constructor(protected sceneConfig: Phaser.Types.Scenes.SettingsConfig) {
    super(sceneConfig);
  }*/
  constructor(protected sceneConfig: string) {
    super(sceneConfig);
  }
}

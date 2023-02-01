import Phaser from "phaser";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import {IntroScene} from "./scene/intro.scene";


const width = 800;
const height = window.innerHeight;

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1920, // 화면 너비
  height: 800, // 회면
  parent: "game",
  scene: [
    // 장면 설정 - 화면에 필요한 씬들을 import (여러개를 import 했을 경우 첫번째 씬이 처음)
    IntroScene
  ],
  physics: {
    // 물리엔진
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
      debugShowBody: true,
      debugBodyColor: 0xff0000,
      debugShowStaticBody: true,
      debugShowVelocity: true,
      debugStaticBodyColor: 0x0000ff,
      debugVelocityColor: 0x00ff00,
    },
  },
  dom: {
    createContainer: true,
  },
  plugins: [
    {
      key: "rexUI",
      plugin: UIPlugin,
      mapping: "rexUI",
    },
  ],
  scale: {
    // 배율 설정
    mode: Phaser.Scale.FIT, // 자동 맞춤

    //autoCenter: Phaser.Scale.CENTER_BOTH, // 가로, 새로 둘 다 맞춤
    width, // 비율 설정용 너비 폭
    height, // 높이 설정용 높이 폭
  },
};

export default config;

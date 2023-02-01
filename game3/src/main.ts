import Phaser from 'phaser';
import {IntroScene} from "./scene/intro.scene";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    parent: 'game',
    scene: [
        IntroScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
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
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }
    ],
    scale: {
        mode: Phaser.Scale.FIT,
    },
};
export default new Phaser.Game(config);

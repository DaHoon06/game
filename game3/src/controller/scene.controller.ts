import Phaser from "phaser";

export class SceneController extends Phaser.Scene {
    constructor(protected sceneName: string) {
        super(sceneName);
    }

    protected preload() {

    }

}

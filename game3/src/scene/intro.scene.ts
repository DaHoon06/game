import {SceneController} from "../controller/scene.controller";
export class IntroScene extends SceneController {
    constructor() {
        super('intro');
        console.log('intro');
    }
    protected async create() {
    }
    protected preload() {
        super.preload();
        console.log('preload');
    }
    update(time: number, delta: number) {
    }
}

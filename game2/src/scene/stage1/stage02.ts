import { SceneController } from "../../controller/scene.controller";

export class Stage02Scene extends SceneController {
  constructor() {
    super("stage02", 2, 50, 200, "background-stage2", "target2", "stage03");
  }
}

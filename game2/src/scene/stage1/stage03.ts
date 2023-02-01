import { SceneController } from "../../controller/scene.controller";

export class Stage03Scene extends SceneController {
  constructor() {
    super("stage03", 3, 50, 300, "background-stage3", "target3", "game_over");
  }
}

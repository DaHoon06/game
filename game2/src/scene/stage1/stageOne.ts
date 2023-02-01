import { SceneController } from "../../controller/scene.controller";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import Label from "phaser3-rex-plugins/templates/ui/label/Label";

export class StageOneScene extends SceneController {
  public rexUI!: UIPlugin;
  private _zone?: Phaser.GameObjects.Zone;

  constructor() {
    super("stage01", 1, 50, 100, "background-stage1", "target1", "stage02");
  }

  protected preload() {
    super.preload();

    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });
  }

  protected create() {
    super.create();
    const dialog = this.dialog({
      x: 0,
      y: 0,
      width: 400,
      height: 200,
      title: '튜토리얼',
      content: `
     총을 방향키 좌 우로 움직여 타켓을 맞추는 게임 입니다.
      \n
     제한시간 내에 일정 타켓을 맞추지 못할 경우 패배하게 됩니다.
      \n\n 
     총알의 경우 5발이며, 다 총알을 다 소모했을 경우 "R" 키를 눌러 재장전할 수 있습니다.
     `,
      actions:[
        '시작'
      ],
      cb: () => {
        dialog.setVisible(false);
        this.gameStart = true;
        this.makeTimer();
        this.makeKeyPressEvent();
      }
    });
    Phaser.Display.Align.In.Center(dialog, this.zone)
  }

  public get zone() {
    if (this._zone) return this._zone;
    return this._zone = this.add.zone(this.game.canvas.width / 2, this.game.canvas.height / 2, this.game.canvas.width, this.game.canvas.height);
  }

  protected dialog({ x, y, width, height, title, content, actions, cb }: { x: number; y: number; width: number; height: number; title: string; content: string; actions: string[], cb?: (button: Label, groupName: string, index: number) => void }) {
    return this.rexUI.add.dialog({
      x,
      y,
      width,
      height,
      background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x242424),
      title: this.rexUI.add.label({
        background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x0e0e0e),
        text: this.add.text(0, 0, title, {
          fontSize: '1.4rem',
          padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5,
          },
          color: '#e2e2e2',
        }),
        space: {
          left: 10,
          right: 1,
          top: 10,
          bottom: 10
        }
      }),
      content: this.add.text(0, 0, content, {
        fontSize: '1.2rem',
        color: '#ffb568',
        wordWrap: { width: width - 40, useAdvancedWrap: true },
        padding: {
          top: 5,
          bottom: 5,
          left: 5,
          right: 5,
        }
      }),
      space: {
        title: 25,
        content: 25,
        action: 15,
        left: 20,
        right: 20,
        top: 10,
        bottom: 20,
      },
      align: {
        actions: 'center', // 'center'|'left'|'right'
      },
      expand: {
        content: false, // Content is a pure text object
      },
      actions: actions.map(message => this.createLabel(message, '1.8rem')),
    }).layout().popUp(3e2).on('button.click', (button: Label, groupName: string, index: number) => {
      if (cb) cb(button, groupName, index);
    });
  }

  protected createLabel(message: string, fontSize: string = '1.5rem', color: string = '#fafafa') {
    return this.rexUI.add.label({
      width: 40,
      height: 40,
      orientation: 'y',
      background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x444444),
      text: this.add.text(0, 0, message, { fontSize, color, padding: { top: 5, bottom: 5, left: 5, right: 5 } }),
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    })
  }
}

import Phaser from "phaser";

export default class ExpUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, mob) {
        const x = mob.x;
        const y = mob.y;

        super(scene, x, y, "exp-up");
        this.scale = 1.5;

        // mob 종류에 따라 경험치 상승량, 아이템 이미지를 다르게 설정하는 부분
        // m_exp : 경험치 상승량
        switch (mob.texture.key) {
            case 'bat':
                this.m_exp = 20;
                this.play("red");
                break;
            case 'bat2':
                this.m_exp = 40;
                this.play("gray");
                break;
            case 'eyeball':
                this.m_exp = 60;
                this.play("green");
                break;
            default:
                this.m_exp = 40;
                this.play("gray");
        }

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    }
}

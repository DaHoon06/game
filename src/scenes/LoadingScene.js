import Phaser from "phaser";
import bgImg from "../assets/images/background.png";
import explosionImg from "../assets/spritesheets/explosion.png";
import expUpImg from "../assets/spritesheets/power-up.png";
import catImg from "../assets/images/cat-rainbow.png";
import beamImg from "../assets/spritesheets/beam.png";
import fontPng from "../assets/font/font.png";
import fontXml from "../assets/font/font.xml";
import fireOgg from "../assets/sounds/fire.ogg";
import popOgg from "../assets/sounds/pop.ogg";
import pickOgg from "../assets/sounds/pickPowerUp.ogg";
import hurtOgg from "../assets/sounds/hurt.ogg";
import gameoverOgg from "../assets/sounds/gameover.ogg";
import bgmOgg from "../assets/sounds/lofi-bgm.ogg";
import pauseIn from "../assets/sounds/pauseIn.ogg";
import pauseOut from "../assets/sounds/pauseOut.ogg";
import hitMobOgg from "../assets/sounds/hitMob.ogg";
import batImg from "../assets/spritesheets/bat.png";
import batImg2 from "../assets/spritesheets/bat2.png";
import dogImg from "../assets/spritesheets/dog.png";
import eyeballImg from "../assets/spritesheets/eyeball.png";
import maple from '../assets/images/maple.png';
import soo1 from '../assets/images/soo1.png';

import expTest from '../assets/images/exp/exp-test.png';
import man from '../assets/images/user/man.png';


export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
        // bootGame : 이 scene의 identifier
    }

    preload() {
        this.load.image("background", bgImg);
        this.load.image("cat", catImg);
        this.load.spritesheet('man', man, {
            frameWidth: 64,
            frameHeight: 64,
        })

        this.load.spritesheet("bat", man, {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet('bat2', batImg2, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("dog", dogImg, {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("eyeball", eyeballImg, {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.spritesheet("explosion", explosionImg, {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.spritesheet("exp-up", expTest, {
            frameWidth: 16,
            frameHeight: 16,
        });


        this.load.spritesheet("beam", soo1, {
            frameWidth: 75,
            frameHeight: 75,
        });

        this.load.bitmapFont("pixelFont", fontPng, fontXml);
        this.load.audio("audio_beam", fireOgg);
        this.load.audio("audio_explosion", popOgg);
        this.load.audio("audio_pickup", pickOgg);
        this.load.audio("audio_hurt", hurtOgg);
        this.load.audio("audio_gameover", gameoverOgg);
        this.load.audio("music", bgmOgg);
        this.load.audio("pause_in", pauseIn);
        this.load.audio("pause_out", pauseOut);
        this.load.audio("hit_mob", hitMobOgg);
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("mainScene");
        this.anims.create({
            key: "bat_anim",
            frames: this.anims.generateFrameNumbers("bat", {
                start: 0,
                end: 3
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "bat_anim_down",
            frames: this.anims.generateFrameNumbers("bat", {
                start: 0,
                end: 3
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "bat_anim_right",
            frames: this.anims.generateFrameNumbers("bat", {
                start: 4,
                end: 7
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "bat_anim_left",
            frames: this.anims.generateFrameNumbers("bat", {
                start: 8,
                end: 11
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "bat_anim_up",
            frames: this.anims.generateFrameNumbers("bat", {
                start: 12,
                end: 14
            }),
            frameRate: 12,
            repeat: -1,
        });




        this.anims.create({
            key: 'bat2_anim',
            frames: this.anims.generateFrameNumbers('bat2'),
            frameRate: 12,
            repeat: -1,
        })
        this.anims.create({
            key: "dog_anim",
            frames: this.anims.generateFrameNumbers("dog"),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "eyeball_anim",
            frames: this.anims.generateFrameNumbers("eyeball"),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        });

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 0,
                end: 1,
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 2,
                end: 3,
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "green",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 3,
                end: 4,
            }),
            frameRate: 20,
            repeat: -1,
        });
    }
}

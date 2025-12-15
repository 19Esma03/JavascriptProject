// "Every great game begins with a single scene. Let's make this one unforgettable!"

import { GrWall1 } from './grwall1.js';

export class CommodeZoomScene extends Phaser.Scene {
    constructor() {
        super('CommodeZoomScene');
       this.imageIndex = 0;
        this.texturesList = ['k0', 'k1', 'k2', 'k2x'];
    }

    preload() {
        this.load.image('k0', '/assets/images/Commode_Zoom0.png');
        this.load.image('k1', '/assets/images/Commode_Zoom1.png');
        this.load.image('k2', '/assets/images/Commode_Zoom2.png');
        this.load.image('k2x', '/assets/images/Commode_Zoom2x.png');


        this.load.image('dArrow', '/assets/images/dArrow.jpg');
    }

    create() {
        const { width, height } = this.scale;

        const commode = this.add.image(
            width / 2,
            height / 2,
            this.texturesList[this.imageIndex]
        )
        .setOrigin(0.5)
        .setDisplaySize(600, 370)
        .setInteractive(); 

        commode.on('pointerdown', () => {
             this.imageIndex = (this.imageIndex + 1) % this.texturesList.length;
             commode.setTexture(this.texturesList[this.imageIndex]);
        });

        const Darrow =this.add.image(width/2 , height/1.1, 'dArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Darrow.on('pointerdown',( )=>{
             this.scene.start('GrWall1');
        });

    }

}


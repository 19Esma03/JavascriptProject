// "Every great game begins with a single scene. Let's make this one unforgettable!"
import { GrWall3 } from './grwall3.js';
export class DoorZoomScene extends Phaser.Scene {
    constructor() {
        super('DoorZoomScene');
    }

    init() {
        // Initialize scene
    }

    preload() {
        this.load.image('kapi', '/assets/images/Door_Zoom.png');
         this.load.image('dArrow', '/assets/images/dArrow.jpg');
    }

    create() {
       const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'kapi')
        .setOrigin(0.5)
        .setDisplaySize(width, height);



        const Darrow =this.add.image(width/2 , height/1.1, 'dArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Darrow.on('pointerdown',( )=>{
             this.scene.start('GrWall3');
        });

    }

}

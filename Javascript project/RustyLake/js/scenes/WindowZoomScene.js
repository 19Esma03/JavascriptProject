// "Every great game begins with a single scene. Let's make this one unforgettable!"
import { GrWall2 } from './grwall2.js';
export class WindowZoomScene extends Phaser.Scene {
    constructor() {
        super('WindowZoomScene');
    }

    init() {
        // Initialize scene
    }

   preload() {
        this.load.image('pencere', '/assets/images/window_zoom.png');
         this.load.image('dArrow', '/assets/images/dArrow.jpg');
    }

    create() {
       const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'pencere')
        .setOrigin(0.5)
        .setDisplaySize(width, height);



        const Darrow =this.add.image(width/2 , height/1.1, 'dArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Darrow.on('pointerdown',( )=>{
             this.scene.start('GrWall2');
        });

    }
}

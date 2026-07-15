import { GrWall3 } from './grwall3.js';
import { GrWall1 } from './grwall1.js';
import { inventory } from './inventory.js';
// "Every great game begins with a single scene. Let's make this one unforgettable!"


export class GrWall2 extends Phaser.Scene {
    constructor() {
        super('GrWall2');
    }

    init() {
       
    }

    preload() {
        this.load.image('wall2_duvar', '/assets/images/wall.png');
        this.load.image('wall2_masa', '/assets/images/desktop.png');
        this.load.image('wall2_pencere', '/assets/images/window.png');
        this.load.image('wall2_cizimler', '/assets/images/kids_drawings.png');
        this.load.image('wall2_kitaplik_yan', '/assets/images/lib_side.png');

        this.load.image('defter', '/assets/images/lArrow.jpg');

        this.load.image('lArrow', '/assets/images/lArrow.jpg');
        this.load.image('rArrow', '/assets/images/rArrow.jpg');
    }

    create() {
       const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'wall2_duvar')
        .setOrigin(0.5)
        .setDisplaySize(width, height);
       const Desktop = this.add.image(width * 0.6, height / 1.31, 'wall2_masa')
            .setOrigin(0.5)
            .setDisplaySize(150,220)
            .setInteractive(); 

       const Window =this.add.image(width * 0.34, height / 2, 'wall2_pencere')
            .setOrigin(0.5)
            .setDisplaySize(220,110)
            .setInteractive(); 
        
      
        const Draws =this.add.image(width * 0.78, height / 1.9, 'wall2_cizimler')
            .setOrigin(0.5)
            .setDisplaySize(100,120)
            .setInteractive(); 

        const Lib =this.add.image(width*0.045 , height / 1.43, 'wall2_kitaplik_yan')
            .setOrigin(0.5)
            .setDisplaySize(80,270)
            .setInteractive(); 
        const Rarrow =this.add.image(width*0.9 , height/2 , 'rArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        const Larrow = this.add.image(width*0.1 , height/2 , 'lArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();
       
       Desktop.on('pointerdown',( )=>{
            this.scene.start('DesktopZoomScene');
       });
       
       Draws.on('pointerdown',( )=>{
            this.scene.start('DrawingsZoomScene');
       });

       Window.on('pointerdown',( )=>{
            this.scene.start('WindowZoomScene');
       });

      Rarrow.on('pointerdown',( )=>{
             this.scene.start('GrWall3');
        });

        Larrow.on('pointerdown',( )=>{
             this.scene.start('GrWall1');
        });

        console.log("GrWall2 Sahnesi kuruldu. Tüm objeler ayri katmanlarda.");
        
    }

}

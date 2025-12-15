// "Every great game begins with a single scene. Let's make this one unforgettable!"
import { GrWall2 } from './grwall2.js';
import { GrWall4 } from './grwall4.js';
import {BedZoomScene} from './BedZoomScene.js';
import {LibraryZoomScene} from './LibraryZoomScene.js';
import {CommodeZoomScene} from './CommodeZoomScene.js';
import { inventory } from './inventory.js';


export class GrWall1 extends Phaser.Scene {
    constructor() {
        super('GrWall1');
    }

    init() {
        // Initialize scene
    }

    preload() {
        this.load.image('wall1_duvar', '/assets/images/wall.png');
        this.load.image('wall1_yatak', '/assets/images/bed_next.png');
        this.load.image('wall1_pencere', '/assets/images/window.png');
        this.load.image('wall1_komidin', '/assets/images/commode.png');
        this.load.image('wall1_kitaplik', '/assets/images/lib.png');

        this.load.image('ayicik', '/assets/images/Bear.png');

        this.load.image('lArrow', '/assets/images/lArrow.jpg');
        this.load.image('rArrow', '/assets/images/rArrow.jpg');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'wall1_duvar')
        .setOrigin(0.5)
        .setDisplaySize(width, height);
       const Bed = this.add.image(width * 0.14, height / 1.22, 'wall1_yatak')
            .setOrigin(0.5)
            .setDisplaySize(250,190)
            .setInteractive(); 

        
        const Window =this.add.image(width * 0.4, height / 2, 'wall1_pencere')
            .setOrigin(0.5)
            .setDisplaySize(220,110)
            .setInteractive(); 
        
        
        const Commode =this.add.image(width * 0.41, height / 1.22, 'wall1_komidin')
            .setOrigin(0.5)
            .setDisplaySize(100,170)
            .setInteractive(); 

        const Lib =this.add.image(width * 0.87, height / 1.38, 'wall1_kitaplik')
            .setOrigin(0.5)
            .setDisplaySize(150,270)
            .setInteractive(); 


        const Rarrow =this.add.image(width*0.9 , height/2 , 'rArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        const Larrow= this.add.image(width*0.1 , height/2 , 'lArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        const ayicik= this.add.image(width*0.1, height*0.8, 'ayicik')
            .setDisplaySize(90,100);
        if (inventory.ayicik) {
            ayicik.destroy();
        }

       Bed.on('pointerdown',( )=>{
            this.scene.start('BedZoomScene');
       });
       Commode.on('pointerdown',( )=>{
            this.scene.start('CommodeZoomScene');
       });
       Lib.on('pointerdown',( )=>{
            this.scene.start('LibraryZoomScene');
       });


        Rarrow.on('pointerdown',( )=>{
             this.scene.start('GrWall2');
        });

        Larrow.on('pointerdown',( )=>{
             this.scene.start('GrWall4');
        });

        console.log("GrWall1 Sahnesi kuruldu. Tüm objeler ayri katmanlarda.");
       
        this.scene.get('UIScene').scene.setVisible(true);
    }


}

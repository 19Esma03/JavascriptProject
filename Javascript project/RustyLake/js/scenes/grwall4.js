import { GrWall1 } from './grwall1.js';
import { GrWall3 } from './grwall3.js';

// "Every great game begins with a single scene. Let's make this one unforgettable!"


export class GrWall4 extends Phaser.Scene {
    constructor() {
        super('GrWall4');
    }

    init() {
        // Initialize scene
    }

    preload() {
        this.load.image('wall4_duvar', '/assets/images/wall.png');
        this.load.image('wall4_bed', '/assets/images/bed_side.png');
        this.load.image('wall4_paravan', '/assets/images/dressing_s.png');
        this.load.image('wall4_kiz', '/assets/images/dressing_s.png');

        this.load.image('lArrow', '/assets/images/lArrow.jpg');
        this.load.image('rArrow', '/assets/images/rArrow.jpg');
    }

    create() {
       const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'wall4_duvar')
        .setOrigin(0.5)
        .setDisplaySize(width, height);
       const Bed = this.add.image(width * 0.47, height / 3.9, 'wall4_bed')
            .setOrigin(0.5)
            .setDisplaySize(900,600)
            .setInteractive(); 

        const Dresser =this.add.image(width * 0.42 , height / 2.2, 'wall4_paravan')
            .setOrigin(0.5)
            .setDisplaySize(800,450)
            .setInteractive(); 

        const Rarrow =this.add.image(width*0.9 , height/2 , 'rArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        const Larrow = this.add.image(width*0.1 , height/2 , 'lArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Rarrow.on('pointerdown',( )=>{
             this.scene.start('GrWall1');
        });

        Larrow.on('pointerdown',( )=>{
             this.scene.start('GrWall3');
        });

        console.log("GrWall2 Sahnesi kuruldu. Tüm objeler ayri katmanlarda.");
    }

}

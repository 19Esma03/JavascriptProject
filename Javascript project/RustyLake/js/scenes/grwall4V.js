// "Every great game begins with a single scene. Let's make this one unforgettable!"
import {MomRoom} from './MomRoom.js';
export class GrWall4V extends Phaser.Scene {
    constructor() {
        super('GrWall4V');
    }

    init() {
        // Initialize scene
    }

    preload()  {
        this.load.image('wall_duvar', '/assets/images/wall.png');
        this.load.image('wall_kapi', '/assets/images/Open_Door.png');
        this.load.image('wall_paravan', '/assets/images/dressing.png');
        this.load.image('lArrow', '/assets/images/lArrow.jpg');
        this.load.image('rArrow', '/assets/images/rArrow.jpg');
    }

    create() {
         const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'wall_duvar')
        .setOrigin(0.5)
        .setDisplaySize(width, height);
       const Door = this.add.image(width * 0.48, height / 1.5, 'wall_kapi')
            .setOrigin(0.5)
            .setDisplaySize(250,280)
            .setInteractive();

        
        const Dresser =this.add.image(width * 0.82, height / 1.45, 'wall_paravan')
            .setOrigin(0.5)
            .setDisplaySize(150,280)
            .setInteractive(); 

        const Rarrow =this.add.image(width*0.9 , height/2 , 'rArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        const Larrow = this.add.image(width*0.1 , height/2 , 'lArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Door.on('pointerdown',( )=>{
            this.scene.start('MomRoom');
        });
       
       Dresser.on('pointerdown',( )=>{
            this.scene.start('DresserZoomScene');
       });
       

        Rarrow.on('pointerdown',( )=>{
             this.scene.start('GrWall4');
        });

        Larrow.on('pointerdown',( )=>{
             this.scene.start('GrWall2');
        });

        console.log("GrWall3 Sahnesi kuruldu. Tüm objeler ayri katmanlarda.");
       
    }

}

import { GrWall4 } from './grwall4.js';
import { GrWall2 } from './grwall2.js';

// "Every great game begins with a single scene. Let's make this one unforgettable!"


export class GrWall3 extends Phaser.Scene {
    constructor() {
        super('GrWall3');
    }

    init() {
        // Initialize scene
    }

    preload() {
        this.load.image('wall3_duvar', '/assets/images/wall.png');
        this.load.image('wall3_kapi', '/assets/images/door.png');
        this.load.image('wall3_paravan', '/assets/images/dressing.png');

        this.load.image('lArrow', '/assets/images/lArrow.jpg');
        this.load.image('rArrow', '/assets/images/rArrow.jpg');
    }

    create() {
       const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'wall3_duvar')
        .setOrigin(0.5)
        .setDisplaySize(width, height);
       const Desktop = this.add.image(width * 0.47, height / 1.95, 'wall3_kapi')
            .setOrigin(0.5)
            .setDisplaySize(850,400)
            .setInteractive(); // İhtiyaca göre ölçek ayarı

        // 3. Dolap (Ekranın yaklaşık %60'inde)
        const Draws =this.add.image(width * 0.47, height / 1.95, 'wall3_paravan')
            .setOrigin(0.5)
            .setDisplaySize(800,400)
            .setInteractive(); // İhtiyaca göre ölçek ayarı

ı

        const Rarrow =this.add.image(width*0.9 , height/2 , 'rArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        const Larrow = this.add.image(width*0.1 , height/2 , 'lArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Rarrow.on('pointerdown',( )=>{
             this.scene.start('GrWall4');
        });

        Larrow.on('pointerdown',( )=>{
             this.scene.start('GrWall2');
        });

        console.log("GrWall2 Sahnesi kuruldu. Tüm objeler ayri katmanlarda.");
    }

}

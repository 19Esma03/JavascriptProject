import { GrWall3 } from './grwall3.js';
import { GrWall1 } from './grwall1.js';
// "Every great game begins with a single scene. Let's make this one unforgettable!"


export class GrWall2 extends Phaser.Scene {
    constructor() {
        super('GrWall2');
    }

    init() {
        // Initialize scene
    }

    preload() {
        this.load.image('wall2_duvar', '/assets/images/wall.png');
        this.load.image('wall2_masa', '/assets/images/desktop.png');
        this.load.image('wall2_pencere', '/assets/images/window.png');
        this.load.image('wall2_cizimler', '/assets/images/kids_drawings.png');
        this.load.image('wall2_kitaplik_yan', '/assets/images/lib_side.png');

        this.load.image('lArrow', '/assets/images/lArrow.jpg');
        this.load.image('rArrow', '/assets/images/rArrow.jpg');
    }

    create() {
       const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'wall2_duvar')
        .setOrigin(0.5)
        .setDisplaySize(width, height);
       const Desktop = this.add.image(width * 0.48, height / 1.9, 'wall2_masa')
            .setOrigin(0.5)
            .setDisplaySize(800,400)
            .setInteractive(); // İhtiyaca göre ölçek ayarı

        // 2. Pencere (Ekranın yaklaşık %50'sinde - Ortada)
        const Window =this.add.image(width * 0.3, height / 2.5, 'wall2_pencere')
            .setOrigin(0.5)
            .setDisplaySize(600,300)
            .setInteractive(); // İhtiyaca göre ölçek ayarı
        
        // 3. Dolap (Ekranın yaklaşık %60'inde)
        const Draws =this.add.image(width * 0.55, height / 1.9, 'wall2_cizimler')
            .setOrigin(0.5)
            .setDisplaySize(700,400)
            .setInteractive(); // İhtiyaca göre ölçek ayarı

        const Lib =this.add.image(width * 0.36, height / 1.9, 'wall2_kitaplik_yan')
            .setOrigin(0.5)
            .setDisplaySize(600,400)
            .setInteractive(); // İhtiyaca göre ölçek ayarı

        const Rarrow =this.add.image(width*0.9 , height/2 , 'rArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        const Larrow = this.add.image(width*0.1 , height/2 , 'lArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Rarrow.on('pointerdown',( )=>{
             this.scene.start('GrWall3');
        });

        Larrow.on('pointerdown',( )=>{
             this.scene.start('GrWall1');
        });

        console.log("GrWall2 Sahnesi kuruldu. Tüm objeler ayri katmanlarda.");
    }

}

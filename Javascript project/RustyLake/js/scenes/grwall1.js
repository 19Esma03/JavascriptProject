// "Every great game begins with a single scene. Let's make this one unforgettable!"
import { GrWall2 } from './grwall2.js';
import { GrWall4 } from './grwall4.js';

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

        this.load.image('lArrow', '/assets/images/lArrow.jpg');
        this.load.image('rArrow', '/assets/images/rArrow.jpg');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'wall1_duvar')
        .setOrigin(0.5)
        .setDisplaySize(width, height);
       const Bed = this.add.image(width * 0.44, height / 2.1, 'wall1_yatak')
            .setOrigin(0.5)
            .setDisplaySize(850,450)
            .setInteractive(); // İhtiyaca göre ölçek ayarı

        // 2. Pencere (Ekranın yaklaşık %50'sinde - Ortada)
        const Window =this.add.image(width * 0.4, height / 2.5, 'wall1_pencere')
            .setOrigin(0.5)
            .setDisplaySize(600,300)
            .setInteractive(); // İhtiyaca göre ölçek ayarı
        
        // 3. Dolap (Ekranın yaklaşık %60'inde)
        const Commode =this.add.image(width * 0.5, height / 1.9, 'wall1_komidin')
            .setOrigin(0.5)
            .setDisplaySize(750,400)
            .setInteractive(); // İhtiyaca göre ölçek ayarı

        const Lib =this.add.image(width * 0.5, height / 1.9, 'wall1_kitaplik')
            .setOrigin(0.5)
            .setDisplaySize(750,400)
            .setInteractive(); // İhtiyaca göre ölçek ayarı


        // İsteğe bağlı olarak başlık ekleyebilirsiniz:
        this.add.text(width / 2, height * 0.1, 'ODAM', { 
            fontSize: '48px', 
            fill: '#000000'
        }).setOrigin(0.5);

        const Rarrow =this.add.image(width*0.9 , height/2 , 'rArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        const Larrow= this.add.image(width*0.1 , height/2 , 'lArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Rarrow.on('pointerdown',( )=>{
             this.scene.start('GrWall2');
        });

        Larrow.on('pointerdown',( )=>{
             this.scene.start('GrWall4');
        });

        console.log("GrWall1 Sahnesi kuruldu. Tüm objeler ayri katmanlarda.");

    }


}

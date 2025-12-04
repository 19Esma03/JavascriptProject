// "Every great game begins with a single scene. Let's make this one unforgettable!"
import { GrWall2 } from './grwall2.js';

export class GrWall1 extends Phaser.Scene {
    constructor() {
        super('GrWall1');
    }

    init() {
        // Initialize scene
    }

    preload() {
        this.load.image('wall1_duvar', '/assets/images/beyaz.jpg');
        this.load.image('wall1_yatak', '/assets/images/ytk_karsi.jpg');
        this.load.image('wall1_pencere', '/assets/images/pencere.jpg');
        this.load.image('wall1_komidin', '/assets/images/k_dolap.png');

        this.load.image('lArrow', '/assets/images/lArrow.jpg');
        this.load.image('rArrow', '/assets/images/rArrow.jpg');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'wall1_duvar')
        .setOrigin(0.5)
        .setDisplaySize(width, height);
       const Bed = this.add.image(width * 0.25, height / 1.5, 'wall1_yatak')
            .setOrigin(0.5)
            .setDisplaySize(250,200)
            .setInteractive(); // İhtiyaca göre ölçek ayarı

        // 2. Pencere (Ekranın yaklaşık %50'sinde - Ortada)
        const Window =this.add.image(width * 0.5, height / 3, 'wall1_pencere')
            .setOrigin(0.5)
            .setDisplaySize(100,130)
            .setInteractive(); // İhtiyaca göre ölçek ayarı
        
        // 3. Dolap (Ekranın yaklaşık %60'inde)
        const Commode =this.add.image(width * 0.7, height / 1.75, 'wall1_komidin')
            .setOrigin(0.5)
            .setDisplaySize(150,150)
            .setInteractive(); // İhtiyaca göre ölçek ayarı

        // İsteğe bağlı olarak başlık ekleyebilirsiniz:
        this.add.text(width / 2, height * 0.1, 'ODAM', { 
            fontSize: '48px', 
            fill: '#000000'
        }).setOrigin(0.5);

        this.add.image(width*0.9 , height/2 , 'rArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

         this.add.image(width*0.1 , height/2 , 'lArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        console.log("GrWall1 Sahnesi kuruldu. Tüm objeler ayri katmanlarda.");

    }

    HandleBedClick() {
        console.log("Yataga tiklandi. Yakinlaştirma sahnesine geciliyor...");
    // Yeni bir 'BedZoomScene' sahnesi oluşturun.
        this.scene.start('BedZoomScene');
    }

    HandleWindowClick() {
        // Buraya pencere yakınlaştırma sahnesini çağırın.
        console.log("Pencereye tiklandi. Disari bakiliyor...");
        this.scene.start('WindowZoomScene');
    }

    HandleDresserClick() {
        console.log("Komidine tiklandi. Yakinlaştirma sahnesine geciliyor...");
    //  Sahne geçişi, en basit yakınlaştırma yöntemidir.
        this.scene.start('DresserZoomScene');
    }

}

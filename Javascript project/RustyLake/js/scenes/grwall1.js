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
        this.add.image(width / 2, height / 2, 'wall1_duvar');
        const bed = this.add.image(width * 0.25, height * 0.65, 'wall1_yatak')
            .setInteractive()
            .setOrigin(0.5);
        bed.on('pointerdown', () => this.handleBedClick());
        const windowImg = this.add.image(width * 0.4, height * 0.3, 'wall1_pencere')
            .setInteractive()
            .setOrigin(0.5);
        windowImg.on('pointerdown', () => this.handleWindowClick());
        const dresser = this.add.image(width * 0.7, height * 0.65, 'wall1_komidin')
            .setInteractive()
            .setOrigin(0.5);
        dresser.on('pointerdown', () => this.handleDresserClick());

        this.add.image(50, height / 2, 'lArrow')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('GrWall4'));
            
        this.add.image(width - 50, height / 2, 'rArrow')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('GrWall2')); 

        console.log("GrWall1 Sahnesi kuruldu. Tüm objeler ayrı katmanlarda.");

    }

    HandleBedClick() {
        // Buraya yatak yakınlaştırma sahnesini çağırın veya bir ipucu metni gösterin.
        console.log("Yatağa tıklandı. Yatağın altında ne var?");
    }

    HandleWindowClick() {
        // Buraya pencere yakınlaştırma sahnesini çağırın.
        console.log("Pencereye tıklandı. Dışarı bakılıyor...");
    }

    HandleDresserClick() {
        // 💡 Hap Bilgi: Komidine tıklandığında, çekmece/üst kısım bulmacasına yakınlaştıran
        // yeni bir sahneye geçiş yapın. Bu, Rusty Lake'in temel mekaniğidir.
        this.scene.start('DresserZoomScene'); // İleride oluşturulacak sahne anahtarı
    }

}

// "Every great game begins with a single scene. Let's make this one unforgettable!"
import { inventory } from './inventory.js';
export class BedZoomScene extends Phaser.Scene {
    constructor() {
        super('BedZoomScene');
    }

    init() {
        // Initialize scene
    }

    preload() {
       this.load.image('yatak', '/assets/images/Bed_Zoom.png');
       this.load.image('dArrow', '/assets/images/dArrow.jpg');
       this.load.image('ayicik', '/assets/images/Bear.png');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'yatak')
        .setOrigin(0.5)
        .setDisplaySize(width, height);
        console.log("BedZoom");


        const Darrow =this.add.image(width/2 , height/1.1, 'dArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Darrow.on('pointerdown',( )=>{
             this.scene.start('GrWall1');
        });

        if (!inventory.ayicik) {
            const ayicik= this.add.image(width*0.5, height*0.8, 'ayicik')
                .setDisplaySize(150,200)
                .setInteractive();

            ayicik.on('pointerdown', () => {
             inventory.ayicik = true;
            ayicik.destroy();
            this.game.events.emit('updateInventory'); // Artık tüm sahnelerde bu standart
            });
         }
    }

}

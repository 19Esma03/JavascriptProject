// "Every great game begins with a single scene. Let's make this one unforgettable!"
import { inventory } from './inventory.js';
import { GrWall3 } from './grwall3.js';
export class DresserZoomScene extends Phaser.Scene {
    constructor() {
        super('DresserZoomScene');
    }

    init() {
        // Initialize scene
    }

    preload() {
        this.load.image('komidin', '/assets/images/Commode.png');
        this.load.image('dArrow', '/assets/images/dArrow.jpg');
        this.load.image('elbise', '/assets/images/blood.png');

    }

    create() {
       const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'komidin')
        .setOrigin(0.5)
        .setDisplaySize(width, height);



        const Darrow =this.add.image(width/2 , height/1.1, 'dArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Darrow.on('pointerdown',( )=>{
             this.scene.start('GrWall3');
        });

        if (!inventory.elbise) {
            const elbise = this.add.image(width*0.77, height*0.52, 'elbise')
                .setDisplaySize(90,150)
                .setInteractive();

            elbise.on('pointerdown', () => {
             inventory.elbise = true;
            elbise.destroy();
             this.game.events.emit('updateInventory'); // UI'ı tetikler
            });
        }

    }
}

import { GrWall1 } from './grwall1.js';
import { GrWall3 } from './grwall3.js';
import { inventory } from './inventory.js';
import {SlidingPuzzle} from './SlidingPuzzle.js';

export class GrWall4 extends Phaser.Scene {
    constructor() {
        super('GrWall4');
    }

    preload() {
        this.load.image('wall4_duvar', '/assets/images/wall.png');
        this.load.image('wall4_bed', '/assets/images/bed_side.png');
        this.load.image('wall4_paravan', '/assets/images/dressing_s.png');
        this.load.image('toka', '/assets/images/hair_clip.png');
        this.load.image('lArrow', '/assets/images/lArrow.jpg');
        this.load.image('rArrow', '/assets/images/rArrow.jpg');
        this.load.image('tablo', '/assets/images/frame.png'); // Buraya kendi tablo görselini koy
    }

    create() {
      
        const { width, height } = this.scale;

       
        this.add.image(width / 2, height / 2, 'wall4_duvar').setDisplaySize(width, height);

    
        const checkTablo = () => {
            const checklist = ['elbise', 'ayicik', 'toka'];
            const allFound = checklist.every(key => inventory[key]);
        };

        
        // 4. Toka Toplama
        if (!inventory.toka) {
            const tokaObj = this.add.image(width * 0.3, height *0.95, 'toka')
            .setDisplaySize(40, 30)
            .setInteractive();
            tokaObj.on('pointerdown', () => {
                inventory.toka = true;
                tokaObj.destroy();
                this.game.events.emit('updateInventory'); 
                checkTablo(); 
            });
        }

        this.add.image(width * 0.78, height / 1.23, 'wall4_bed')
        .setDisplaySize(340, 190)
        .setInteractive();

        this.add.image(width * 0.05, height / 1.4, 'wall4_paravan')
        .setDisplaySize(150, 280)
        .setInteractive();

        const Rarrow = this.add.image(width * 0.9, height / 2, 'rArrow').setDisplaySize(20, 20).setInteractive();
        const Larrow = this.add.image(width * 0.1, height / 2, 'lArrow').setDisplaySize(20, 20).setInteractive();

        Rarrow.on('pointerdown', () => 
        this.scene.start('GrWall1'));
        Larrow.on('pointerdown', () => 
        this.scene.start('GrWall3'));

        
        checkTablo();
        this.Tablo = this.add.image(width * 0.5, height * 0.5, 'tablo') 
            .setDisplaySize(200, 200)
            .setInteractive()
            .setVisible(false);
        
        this.Tablo.on('pointerdown', () => 
            this.scene.start('SlidingPuzzle'));
        
    }
    update()
    {
        if(inventory.topla == true)
        {
            this.Tablo.setVisible(true);
        }
    }
    
}
import { GrWall1 } from './grwall1.js';

export class MainMenu extends Phaser.Scene {

    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('menu_bg', '../assets/images/beyaz.jpg');
        this.load.image('play_btn', '../assets/images/play_btn.jpg');

    }

    create() {
        const { width, height } = this.scale;

        this.add.image(width / 2, height / 2, 'menu_bg')
        .setOrigin(0.5)
        .setDisplaySize(width, height);
        
       this.add.text(width / 2, height * 0.25, 'SALAM SALAM SALAM', { 
            fontSize: '52px', 
            fill: '#fff',
            fontFamily: 'Arial',
            shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, fill: true }
        }).setOrigin(0.5);
        const playButton = this.add.image(width / 2, height * 0.75, 'play_btn')
            .setInteractive()
            .setScale(1);

        playButton.on('pointerover', () => playButton.setTint(0xaaaaaa));
        playButton.on('pointerout', () => playButton.setTint(0xffffff));


       playButton.on('pointerdown', () => { 
            this.scene.start('GrWall1'); 
            this.scene.stop('MainMenu');
        });
    }

    
}

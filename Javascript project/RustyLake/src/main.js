import { MainMenu } from '../js/scenes/MainMenu.js'; 
import { GrWall1 } from '../js/scenes/grwall1.js';
import { GrWall2 } from '../js/scenes/grwall2.js';
import { GrWall3 } from '../js/scenes/grwall3.js';
import { GrWall4 } from '../js/scenes/grwall4.js';


const config = {
    type: Phaser.AUTO,
    width: 800, 
    height: 600, 
    parent: 'game-container', 
    
    
    scene: [MainMenu, GrWall1, GrWall2, GrWall3, GrWall4], 
    
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true 
};

// Oyunu Başlat
const game = new Phaser.Game(config);
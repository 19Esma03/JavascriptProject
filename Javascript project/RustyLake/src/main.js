import { MainMenu } from '../js/scenes/MainMenu.js'; 
import { GrWall1 } from '../js/scenes/grwall1.js';
import { GrWall2 } from '../js/scenes/grwall2.js';
import { GrWall3 } from '../js/scenes/grwall3.js';
import { GrWall4 } from '../js/scenes/grwall4.js';
import {BedZoomScene} from '/js/scenes/BedZoomScene.js';
import {LibraryZoomScene} from '/js/scenes/LibraryZoomScene.js';
import {CommodeZoomScene} from '/js/scenes/CommodeZoomScene.js';
import {DresserZoomScene} from '/js/scenes/DresserZoomScene.js';
import {DoorZoomScene} from '/js/scenes/DoorZoomScene.js';
import {DesktopZoomScene} from '/js/scenes/DesktopZoomScene.js';
import {DrawingsZoomScene} from '/js/scenes/DrawingsZoomScene.js';
import {WindowZoomScene} from '/js/scenes/WindowZoomScene.js';


const config = {
    type: Phaser.AUTO,
    width: 800, 
    height: 400, 
    parent: 'game-container', 
    
    
    scene: [MainMenu, GrWall1, GrWall2, GrWall3, GrWall4,BedZoomScene,LibraryZoomScene,CommodeZoomScene,DoorZoomScene,DesktopZoomScene,DresserZoomScene,DrawingsZoomScene,WindowZoomScene], 
    
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true 
};

// Oyunu Başlat
const game = new Phaser.Game(config);
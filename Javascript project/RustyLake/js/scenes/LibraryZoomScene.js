// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class LibraryZoomScene extends Phaser.Scene {
    constructor() {
        super('LibraryZoomScene');
    }

    init() {
        // Initialize scene
    }

    preload() {
       this.load.image('kitaplik', '/assets/images/Lib_Zoom.png');
       this.load.image('dArrow', '/assets/images/dArrow.jpg');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'kitaplik')
        .setOrigin(0.5)
        .setDisplaySize(width, height);

        const Darrow =this.add.image(width/2 , height/1.1, 'dArrow')
        .setOrigin(0.5)
        .setDisplaySize(20,20)
        .setInteractive();

        Darrow.on('pointerdown',( )=>{
             this.scene.start('GrWall1');
        });
    }

}

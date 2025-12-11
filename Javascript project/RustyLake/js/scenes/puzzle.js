export default class SlidingPuzzle extends Phaser.Scene {
    constructor() {
        super('SlidingPuzzle');
        this.rows = 3;
        this.cols = 3;
        this.pieces = [];
        this.emptySlot = { row: 2, col: 2 };
        this.isAnimating = false;
        this.puzzleSize = 0;
        this.startScale = 1;
    }

    preload() {
        this.load.image('background', 'assets/girlmom.png');
    }

    create() {
        const { width, height } = this.scale;

        if (!this.textures.exists('background')) {
            const graphics = this.make.graphics();
            graphics.fillStyle(0x4488aa);
            graphics.fillRect(0, 0, 600, 600);
            graphics.generateTexture('background', 600, 600);
            graphics.destroy();
        }

        const minSide = Math.min(width, height);
        this.puzzleSize = minSide * 0.8;
        
        this.tileSize = this.puzzleSize / this.cols;

        this.startX = (width - this.puzzleSize) / 2;
        this.startY = (height - this.puzzleSize) / 2;

        const sourceImage = this.textures.get('background').getSourceImage();
        const imgWidth = sourceImage.width;
        const imgHeight = sourceImage.height;

        this.textureScaleX = this.puzzleSize / imgWidth;
        this.textureScaleY = this.puzzleSize / imgHeight;
        
        this.startScale = this.puzzleSize / imgWidth;

        this.createPuzzle();
        
        this.time.delayedCall(500, () => {
            this.shufflePuzzle();
        });
    }

    createPuzzle() {
        const sourceImage = this.textures.get('background').getSourceImage();
        const originalTileW = sourceImage.width / this.cols;
        const originalTileH = sourceImage.height / this.rows;

        for (let r = 0; r < this.rows; r++) {
            this.pieces[r] = [];
            for (let c = 0; c < this.cols; c++) {
                if (r === this.rows - 1 && c === this.cols - 1) {
                    this.pieces[r][c] = null;
                    continue;
                }

                const x = this.startX + (c * this.tileSize) + (this.tileSize / 2);
                const y = this.startY + (r * this.tileSize) + (this.tileSize / 2);

                const piece = this.add.tileSprite(x, y, this.tileSize, this.tileSize, 'background');
                piece.setTileScale(this.textureScaleX, this.textureScaleY);
                piece.setTilePosition(c * originalTileW, r * originalTileH);
                
                piece.currentRow = r;
                piece.currentCol = c;
                piece.correctRow = r;
                piece.correctCol = c;

                piece.setInteractive();
                piece.on('pointerdown', () => this.movePiece(piece));

                piece.setScale(0.98);

                this.pieces[r][c] = piece;
            }
        }
    }

    movePiece(piece) {
        if (this.isAnimating) return;

        const distRow = Math.abs(piece.currentRow - this.emptySlot.row);
        const distCol = Math.abs(piece.currentCol - this.emptySlot.col);

        if (distRow + distCol === 1) {
            this.isAnimating = true;

            const targetX = this.startX + (this.emptySlot.col * this.tileSize) + (this.tileSize / 2);
            const targetY = this.startY + (this.emptySlot.row * this.tileSize) + (this.tileSize / 2);

            this.tweens.add({
                targets: piece,
                x: targetX,
                y: targetY,
                duration: 200,
                ease: 'Power2',
                onComplete: () => {
                    this.isAnimating = false;
                    this.checkWin();
                }
            });

            const oldRow = piece.currentRow;
            const oldCol = piece.currentCol;

            this.pieces[this.emptySlot.row][this.emptySlot.col] = piece;
            this.pieces[oldRow][oldCol] = null;

            piece.currentRow = this.emptySlot.row;
            piece.currentCol = this.emptySlot.col;

            this.emptySlot.row = oldRow;
            this.emptySlot.col = oldCol;
        }
    }

    shufflePuzzle() {
        let lastMovedPiece = null;

        for (let i = 0; i < 100; i++) {
            const neighbors = [];
            const r = this.emptySlot.row;
            const c = this.emptySlot.col;

            if (r > 0) neighbors.push(this.pieces[r - 1][c]);
            if (r < this.rows - 1) neighbors.push(this.pieces[r + 1][c]);
            if (c > 0) neighbors.push(this.pieces[r][c - 1]);
            if (c < this.cols - 1) neighbors.push(this.pieces[r][c + 1]);

            const validNeighbors = neighbors.filter(n => n !== lastMovedPiece && n !== null);
            
            if (validNeighbors.length > 0) {
                const randomPiece = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
                
                const tempR = randomPiece.currentRow;
                const tempC = randomPiece.currentCol;
                
                this.pieces[this.emptySlot.row][this.emptySlot.col] = randomPiece;
                this.pieces[tempR][tempC] = null;
                
                randomPiece.x = this.startX + (this.emptySlot.col * this.tileSize) + (this.tileSize / 2);
                randomPiece.y = this.startY + (this.emptySlot.row * this.tileSize) + (this.tileSize / 2);
                
                randomPiece.currentRow = this.emptySlot.row;
                randomPiece.currentCol = this.emptySlot.col;
                
                this.emptySlot.row = tempR;
                this.emptySlot.col = tempC;
                
                lastMovedPiece = randomPiece;
            }
        }
    }

    checkWin() {
        let isWin = true;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const piece = this.pieces[r][c];
                if (piece) {
                    if (piece.currentRow !== piece.correctRow || piece.currentCol !== piece.correctCol) {
                        isWin = false;
                        break;
                    }
                }
            }
        }

        if (isWin) {
            const {width, height} = this.scale;
            const dimmer = this.add.rectangle(width / 2, height / 2, width, height, 0x000000);
            dimmer.setAlpha(0);
            dimmer.setDepth(10);
            
            const fullImage = this.add.image(width / 2, height / 2, 'background');
            
            fullImage.setScale(this.startScale);
            fullImage.setDepth(11); 

            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    if (this.pieces[r][c]) {
                        this.pieces[r][c].setVisible(false);
                        this.pieces[r][c].disableInteractive();
                    }
                }
            }

            this.tweens.add({
                targets: dimmer,
                alpha: 0.85, 
                duration: 800
            });

            this.tweens.add({
                targets: fullImage,
                scale: this.startScale * 1.2,
                duration: 1500,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    this.showWinText(width, height);
                }
            });
        }
    }

    showWinText(width, height) {
        const text = this.add.text(width / 2, height / 2, 'REMEMBER\n\nNOT FALL AGAIN', { 
            fontSize: '50px', 
            fontFamily: 'Arial',
            color: '#332717',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4,
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 5, fill: true }
        }).setOrigin(0.5);
        
        text.setDepth(12); 
        text.setAlpha(0); 
        
        this.tweens.add({
            targets: text,
            alpha: 1,
            duration: 500
        });

        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => {
            this.scene.restart();
        });
    }
}
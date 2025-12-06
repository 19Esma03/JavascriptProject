
//GEMİNİ SLİDİNGPUZZLE ÖRNEK KOD     



export default class SlidingPuzzle extends Phaser.Scene {
    constructor() {
        super('SlidingPuzzle');
        this.rows = 3;
        this.cols = 3;
        this.size = 150; 
        this.pieces = []; 
        this.emptySlot = { row: 2, col: 2 }; 
        this.isAnimating = false; // EKLENDİ: Animasyon kilidi // ÇOKTA LAZIM DEĞİL BAK TEKRAR
    }

    preload() {
        this.load.image('background', 'assets/space.png');   // ANNE KIZ FOTO
    }

    create() {
        // Fallback doku oluşturucu (Resim yoksa çalışması için) //EK BACKGROUND EKLE
        if (!this.textures.exists('background')) {
            const graphics = this.make.graphics();
            graphics.fillStyle(0x4488aa); // PALETE GÖRE RENK SEÇ
            graphics.fillRect(0, 0, 450, 450); //???????
            
            // Karelerin belli olması için ızgara çizgileri çizelim //BOYUTLARII 800 500 ayarla
            graphics.lineStyle(4, 0x000000);
            for(let i=0; i<=3; i++) {
                graphics.moveTo(i*150, 0); graphics.lineTo(i*150, 450);
                graphics.moveTo(0, i*150); graphics.lineTo(450, i*150);
            }
            graphics.generateTexture('background', 450, 450);
            graphics.destroy();
        }

        this.createPuzzle();
        this.shufflePuzzle(); 
    }  

// YORUM SATIRI BAŞTAN TEKRAR YAZ


  /*  createPuzzle() {
        for (let r = 0; r < this.rows; r++) {
            this.pieces[r] = [];
            for (let c = 0; c < this.cols; c++) {
                
                if (r === this.rows - 1 && c === this.cols - 1) {
                    this.pieces[r][c] = null; 
                    continue;
                }

                const x = c * this.size + this.size / 2;
                const y = r * this.size + this.size / 2;

                // DEĞİŞİKLİK 1: TileSprite Kullanımı
                // TileSprite, resmi "kırpmak" yerine pencere gibi gösterir.
                // Etkileşim alanı sadece width/height (150x150) kadar olur.
                const piece = this.add.tileSprite(x, y, this.size, this.size, 'background');
                
                // Resmin içindeki konumu ayarlıyoruz (offset)
                piece.setTilePosition(c * this.size, r * this.size);
                
                piece.currentRow = r;
                piece.currentCol = c;
                piece.correctRow = r;
                piece.correctCol = c;

                piece.setInteractive();
                piece.on('pointerdown', () => this.movePiece(piece));

                // Görsel güzellik: Parçalar birbirine yapışık görünmesin diye azıcık küçültelim
                piece.setScale(0.98);

                this.pieces[r][c] = piece;
            }
        }
    }

    movePiece(piece) {
        // DEĞİŞİKLİK 2: Kilit Kontrolü
        if (this.isAnimating) return;

        const distRow = Math.abs(piece.currentRow - this.emptySlot.row);
        const distCol = Math.abs(piece.currentCol - this.emptySlot.col);

        if (distRow + distCol === 1) {
            
            this.isAnimating = true; // Kilidi kapat

            const targetX = this.emptySlot.col * this.size + this.size / 2;
            const targetY = this.emptySlot.row * this.size + this.size / 2;

            this.tweens.add({
                targets: piece,
                x: targetX,
                y: targetY,
                duration: 200,
                ease: 'Power2',
                onComplete: () => {
                    this.isAnimating = false; // Animasyon bitince kilidi aç
                    this.checkWin();
                }
            });

            // Mantıksal Swap
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
        // Karıştırma sırasında animasyon kilidi olmamalı, yoksa takılır.
        // Ama görsel güncellemeyi manuel yapacağız.
        let lastMovedPiece = null;

        for (let i = 0; i < 100; i++) {
            const neighbors = [];
            const r = this.emptySlot.row;
            const c = this.emptySlot.col;

            // Dizi sınırlarını (Boundaries) kontrol etmeliyiz
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
                
                // Anında görsel güncelleme (Tween yok)
                randomPiece.x = this.emptySlot.col * this.size + this.size / 2;
                randomPiece.y = this.emptySlot.row * this.size + this.size / 2;
                
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
            console.log("KAZANDINIZ!");
            // Basit bir kazandın yazısı ve yeniden başlatma butonu
            const text = this.add.text(225, 225, 'TEBRİKLER!\nTekrar Oyna', { 
                fontSize: '40px', 
                fill: '#0f0', 
                backgroundColor: '#000',
                align: 'center'
            }).setOrigin(0.5);
            
            text.setInteractive();
            text.on('pointerdown', () => this.scene.restart());
        }
    }
}
*/
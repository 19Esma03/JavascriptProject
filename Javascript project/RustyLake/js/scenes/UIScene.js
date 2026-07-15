import { inventory } from './inventory.js';

export class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
    }

    create() {
        this.scene.setVisible(false); // Başta gizli
        this.updateList();
        this.game.events.on('updateInventory', this.updateList, this);
        
        // Bu event gelince görünür yap
        this.game.events.on('showUI', () => { this.scene.setVisible(true); }, this);
    }

    updateList() {
        if (this.container) this.container.destroy();
        const { width, height } = this.scale;
        this.container = this.add.container(0, 0);

        const items = [
            { key: 'elbise', name: 'Kanlı Elbise' },
            { key: 'ayicik', name: 'Ayıcık' },
            { key: 'toka', name: 'Toka' }
        ];

        let collectedCount = 0;

        items.forEach((item, i) => {
            const y = 50 + i * 30;
            const text = this.add.text(width - 150, y, item.name, { fontSize: '18px', color: '#000' });
            this.container.add(text);

            if (inventory[item.key]) {
                collectedCount++;
                const line = this.add.line(0, 0, text.x, text.y + 10, text.x + 100, text.y + 10, 0xff0000).setOrigin(0);
                this.container.add(line);
            }
        });

      
        if (collectedCount === items.length) {
            this.showFinalTable();
            this.finalGroup.destroy();
        }
    }

    showFinalTable() {
        const { width, height } = this.scale;
        const finalGroup = this.add.container(0, 0);
        inventory.topla = true;
       
        const panel = this.add.rectangle(width/2, height/2, 400, 200, 0x000000, 0.8);
        const winText = this.add.text(width/2, height/2, "TEBRİKLER!\nHepsini buldun.", { 
            align: 'center', fontSize: '24px', color: '#fff' 
        }).setOrigin(0.5);

        finalGroup.add([panel, winText]);

       
        this.time.delayedCall(3000, () => {
            finalGroup.destroy();
            this.scene.setVisible(false); // Listeyi tamamen kapat
        });
    }
}
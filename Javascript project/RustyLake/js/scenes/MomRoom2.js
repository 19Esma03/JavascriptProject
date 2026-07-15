export class MomRoom2 extends Phaser.Scene {
  constructor() {
    super("MomRoom2");
  }

  init() {
    this.Noise = null; //Cızırtı sesi için obje
    this.Lullaby = null; //Ninni sesi için obje

    this.BaseNoiseVolume = 0.75; //Ses seviyesini ayarlamak için 

    this.NoteSequence = ["N1", "N2", "N3"]; //Notaların sırasını tutmak için dizi
    this.Progress = 0; //Bulmacadaki ilerleme bilgisini tutuyor.
    this.Solved = false; //Bulmacanın çözülüp çözülmediğinin bilgisini tutmak için

    this.MusicBoxZoomLayer = null;
    this.BedZoomLayer = null;
    this.WardrobeZoomLayer = null;
    this.BagZoomLayer = null;
    this.ClockZoomLayer = null;
    this.PaintZoomLayer = null;
    this.BedsideTableZoomLayer = null;
    this.CarpetZoomLayer = null;
    this.WindowZoomLayer = null;
    this.PaperZoomLayer = null;
    this.NoteFound = { N1:false, N2:false, N3:false };

  }

  preload() {
    //Sahnenin arkaplan resmini yüklüyoruz.
    this.load.image("MomsRoom2Image", "assets/images/MomsRoom2Image.png");
    this.load.image("BagWithNote", "assets/images/BagWithNote.png");
    this.load.image("BedsideTableZoomImage", "assets/images/BedsideTableZoomImage.png");
    this.load.image("BedZoomImage", "assets/images/BedZoomImage.png");    
    this.load.image("CarpetZoomImage", "assets/images/CarpetZoomImage.png");
    this.load.image("ClockWithNote", "assets/images/ClockWithNote.png");
    this.load.image("PaintWithNote", "assets/images/PaintWithNote.png");
    this.load.image("PaperZoomImage", "assets/images/PaperZoomImage.png");
    this.load.image("MusicBoxZoomImage", "assets/images/MusicBoxZoomImage.png");
    this.load.image("WardrobeZoomImage", "assets/images/WardrobeZoomImage.png");
    this.load.image("WindowZoomImage", "assets/images/WindowZoomImage.png");

    // Sesler dosyalarını yüklüyoruz.
    this.load.audio("Noise", "assets/images/noise.mp3");
    this.load.audio("Lullaby", "assets/images/lullaby.mp3");
  }

  
  
  create() {
    this.add.image(0, 0, "MomsRoom2Image").setOrigin(0, 0);

    this.StartNoise();

    const BagZone = this.add.zone(436.05, 387.10, 81.30, 45.50).setOrigin(0, 0); //Zone tanımlanırken origin bazlı koordinat aldığından sol üstten koordinatlayacak şekilde setledim.
    const WardrobeZone = this.add.zone(626.65, 218.30, 125.00, 215.85).setOrigin(0, 0);
    const CarpetZone = this.add.zone(354.95, 445.75, 236, 48.70).setOrigin(0, 0);
    const PaperZone = this.add.zone(578.50, 445.20, 30.45, 28.50).setOrigin(0, 0);
    const BedsideTableZone = this.add.zone(305.80, 338.75, 123.30, 90.70).setOrigin(0, 0);
    const MusicBoxZone = this.add.zone(373.05, 284.55, 46.75, 54.80).setOrigin(0, 0);
    const WindowZone = this.add.zone(279.20, 81.65, 272.80, 177.60).setOrigin(0, 0);
    const PaintZone = this.add.zone(77.60, 121.80, 179.35, 101.60).setOrigin(0, 0);
    const BedZone = this.add.zone(126.70, 320.85, 129.15, 129.15).setOrigin(0, 0);
    const ClockZone = this.add.zone(318.55, 298.40, 32.70, 40.40).setOrigin(0, 0);


    //Nesnelere tıklandığında zoomlama fonksiyonlarını çalıştıran kod kısmı
    BagZone.setInteractive({ cursor: "pointer" }); //Nesneyi tıklanabilir yaptığımız kısım.
    BagZone.on("pointerdown", () => this.OpenBagZoom());  //Nesne aktif hale geldiğinde OpenBagZoom fonksiyonunu çalıştıracak kod kısmı.
   
    WardrobeZone.setInteractive({ cursor: "pointer" });
    WardrobeZone.on("pointerdown", () => this.OpenWardrobeZoom());

    CarpetZone.setInteractive({ cursor: "pointer" });
    CarpetZone.on("pointerdown", () => this.OpenCarpetZoom());
   
    PaperZone.setInteractive({ cursor: "pointer" });
    PaperZone.on("pointerdown", () => this.OpenPaperZoom());
   
    BedsideTableZone.setInteractive({ cursor: "pointer" });
    BedsideTableZone.on("pointerdown", () => this.OpenBedsideTableZoom());
   
    MusicBoxZone.setInteractive({ cursor: "pointer" });
    MusicBoxZone.on("pointerdown", () => this.OpenMusicBoxZoom());
   
    WindowZone.setInteractive({ cursor: "pointer" });
    WindowZone.on("pointerdown", () => this.OpenWindowZoom());
   
    PaintZone.setInteractive({ cursor: "pointer" });
    PaintZone.on("pointerdown", () => this.OpenPaintZoom());
   
    BedZone.setInteractive({ cursor: "pointer" });
    BedZone.on("pointerdown", () => this.OpenBedZoom());

    ClockZone.setInteractive({ cursor: "pointer" });
    ClockZone.on("pointerdown", () => this.OpenClockZoom());
  }

OpenBedZoom() {
if (this.BedZoomLayer) return;

const w = this.scale.width;   
const h = this.scale.height; 

const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
CloseZone.on("pointerdown", () => this.CloseBedZoom()); 

const Bed = this.add.image(0, 0, "BedZoomImage").setOrigin(0, 0).setDepth(1000);

const BedZone = this.add.zone(298.05, 104.95, 292.95, 310.00).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
BedZone.on("pointerdown", (pointer, localX, localY, event) => {event.stopPropagation();});

this.BedZoomLayer = this.add.container(0, 0, [CloseZone, Bed, BedZone]);
}

//Zoom'dan çıkma fonksiyonu
CloseBedZoom() {  
  if (!this.BedZoomLayer) return; 
  this.BedZoomLayer.destroy(true);
  this.BedZoomLayer = null;
}


OpenBedsideTableZoom() {
  if (this.BedsideTableZoomLayer) return;
  
  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.CloseBedsideTableZoom());

  const BedsideTable = this.add.image(0, 0, "BedsideTableZoomImage").setOrigin(0, 0).setDepth(1000);

  const BedsideTableZone = this.add.zone(113.90, 52.60, 531.95, 388.70).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  BedsideTableZone.on("pointerdown", (pointer, localX, localY, event) => { event.stopPropagation(); });

  this.BedsideTableZoomLayer = this.add.container(0, 0, [CloseZone, BedsideTable, BedsideTableZone]);
}

CloseBedsideTableZoom() {
  if (!this.BedsideTableZoomLayer) return;
  this.BedsideTableZoomLayer.destroy(true);
  this.BedsideTableZoomLayer = null;
}


OpenCarpetZoom() {
  if (this.CarpetZoomLayer) return;
  
  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.CloseCarpetZoom());

  const Carpet = this.add.image(0, 0, "CarpetZoomImage").setOrigin(0, 0).setDepth(1000);

  const CarpetZone = this.add.zone(17.45, 207.85, 766.45, 127.95).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  CarpetZone.on("pointerdown", (pointer, localX, localY, event) => { event.stopPropagation(); });

  this.CarpetZoomLayer = this.add.container(0, 0, [CloseZone, Carpet, CarpetZone]);
}

CloseCarpetZoom() {
  if (!this.CarpetZoomLayer) return;
  this.CarpetZoomLayer.destroy(true);
  this.CarpetZoomLayer = null;
}


OpenWindowZoom() {
  if (this.WindowZoomLayer) return;
  
  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.CloseWindowZoom());

  const Window = this.add.image(0, 0, "WindowZoomImage").setOrigin(0, 0).setDepth(1000);

  const WindowZone = this.add.zone(91.65, 48.40, 623.00, 404.50).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  WindowZone.on("pointerdown", (pointer, localX, localY, event) => { event.stopPropagation(); });

  this.WindowZoomLayer = this.add.container(0, 0, [CloseZone, Window, WindowZone]);
}

CloseWindowZoom() {
  if (!this.WindowZoomLayer) return;
  this.WindowZoomLayer.destroy(true);
  this.WindowZoomLayer = null;
}


OpenWardrobeZoom() {
  if (this.WardrobeZoomLayer) return;
  
  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.CloseWardrobeZoom());

  const Wardrobe = this.add.image(0, 0, "WardrobeZoomImage").setOrigin(0, 0).setDepth(1000);

  const WardrobeZone = this.add.zone(360.00, 73.05, 172.00, 309.90).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  WardrobeZone.on("pointerdown", (pointer, localX, localY, event) => { event.stopPropagation(); });

  this.WardrobeZoomLayer = this.add.container(0, 0, [CloseZone, Wardrobe, WardrobeZone]);
}

CloseWardrobeZoom() {
  if (!this.WardrobeZoomLayer) return;
  this.WardrobeZoomLayer.destroy(true);
  this.WardrobeZoomLayer = null;
}


OpenMusicBoxZoom() {
  if (this.MusicBoxZoomLayer) return;
  
  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.CloseMusicBoxZoom());

  const MusicBox = this.add.image(0, 0, "MusicBoxZoomImage").setOrigin(0, 0).setDepth(1000);

  const MusicBoxZone = this.add.zone(245.65, 82.00, 301.90, 355.50).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  MusicBoxZone.on("pointerdown", (pointer, localX, localY, event) => { event.stopPropagation(); });

  this.MusicBoxZoomLayer = this.add.container(0, 0, [CloseZone, MusicBox, MusicBoxZone]);
}

CloseMusicBoxZoom() {
  if (!this.MusicBoxZoomLayer) return;
  this.MusicBoxZoomLayer.destroy(true);
  this.MusicBoxZoomLayer = null;
}


OpenPaperZoom() {
  if (this.PaperZoomLayer) return;

  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.ClosePaperZoom());

  const Paper = this.add.image(0, 0, "PaperZoomImage").setOrigin(0, 0).setDepth(1000);

  const PaperZone = this.add.zone(272.05, 26.95, 267.95, 365.00).setOrigin(0, 0).setDepth(1001).setInteractive();
  PaperZone.on("pointerdown", (pointer, localX, localY, event) => { event.stopPropagation(); });

  this.PaperZoomLayer = this.add.container(0, 0, [CloseZone, Paper, PaperZone]);

}

ClosePaperZoom() {
  if (!this.PaperZoomLayer) return;
  this.PaperZoomLayer.destroy(true);
  this.PaperZoomLayer = null;
}


OpenBagZoom() {
  if (this.BagZoomLayer) return;

  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.CloseBagZoom());

  const Bag = this.add.image(0, 0, "BagWithNote").setOrigin(0, 0).setDepth(1000);

  const BagZone = this.add.zone(189.95, 50.75, 458.50, 406.65).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  BagZone.on("pointerdown", (pointer, localX, localY, event) => { event.stopPropagation(); });

  let BagNoteZone = null;

  if (!this.NoteFound.N1) {
    BagNoteZone = this.add.zone(373.95, 337.50, 82.60, 78.95).setOrigin(0, 0).setDepth(1002).setInteractive({ cursor: "pointer" });
    BagNoteZone.on("pointerdown", (pointer, localX, localY, event) => {
      event.stopPropagation();
      this.OnNoteFound(["N1"]);
      if (this.Progress > 0 && this.NoteSequence[this.Progress - 1] === "N1") {
        this.NoteFound.N1 = true;
        BagNoteZone.disableInteractive();
      }
    });
  }

  this.BagZoomLayer = this.add.container(0, 0, [CloseZone, Bag, BagZone, BagNoteZone].filter(Boolean));
}

CloseBagZoom() {
  if (!this.BagZoomLayer) return;
  this.BagZoomLayer.destroy(true);
  this.BagZoomLayer = null;
}



OpenClockZoom() {
  if (this.ClockZoomLayer) return;

  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.CloseClockZoom());

  const Clock = this.add.image(0, 0, "ClockWithNote").setOrigin(0, 0).setDepth(1000);

  const ClockZone = this.add.zone(258.40, 81.60, 273.40, 348.20).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  ClockZone.on("pointerdown", (pointer, localX, localY, event) => { event.stopPropagation(); });

  let ClockNoteZone = null;

  if (!this.NoteFound.N2) {
    ClockNoteZone = this.add.zone(366.00, 199.00, 49.80, 49.80).setOrigin(0, 0).setDepth(1002).setInteractive({ cursor: "pointer" });
    ClockNoteZone.on("pointerdown", (pointer, localX, localY, event) => {
      event.stopPropagation();
      this.OnNoteFound(["N2"]);
      if (this.Progress > 0 && this.NoteSequence[this.Progress - 1] === "N2") {
        this.NoteFound.N2 = true;
        ClockNoteZone.disableInteractive();
      }
    });
  }

  this.ClockZoomLayer = this.add.container(0, 0, [CloseZone, Clock, ClockZone, ClockNoteZone].filter(Boolean));
}

CloseClockZoom() {
  if (!this.ClockZoomLayer) return;
  this.ClockZoomLayer.destroy(true);
  this.ClockZoomLayer = null;
}


OpenPaintZoom() {
  if (this.PaintZoomLayer) return;

  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.ClosePaintZoom());

  const Paint = this.add.image(0, 0, "PaintWithNote").setOrigin(0, 0).setDepth(1000);

  const PaintZone = this.add.zone(154.50, 111.45, 503.55, 285.25).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  PaintZone.on("pointerdown", (pointer, localX, localY, event) => { event.stopPropagation(); });

  let PaintNoteZone = null;

  if (!this.NoteFound.N3) {
    PaintNoteZone = this.add.zone(378.00, 191.00, 40.80, 40.80).setOrigin(0, 0).setDepth(1002).setInteractive({ cursor: "pointer" });
    PaintNoteZone.on("pointerdown", (pointer, localX, localY, event) => {
      event.stopPropagation();
      this.OnNoteFound(["N3"]);
      if (this.Progress > 0 && this.NoteSequence[this.Progress - 1] === "N3") {
        this.NoteFound.N3 = true;
        PaintNoteZone.disableInteractive();
      }
    });
  }

  this.PaintZoomLayer = this.add.container(0, 0, [CloseZone, Paint, PaintZone, PaintNoteZone].filter(Boolean));
}

ClosePaintZoom() {
  if (!this.PaintZoomLayer) return;
  this.PaintZoomLayer.destroy(true);
  this.PaintZoomLayer = null;
}

//Cızırtı ses dosyasını başlatacak fonksiyon
StartNoise() {
    if (this.Noise && this.Noise.isPlaying) return; //Fonksiyonun tekrar tekrar cağırılması durumunda ses dosyasının üst üste çalışmasını engellemek için önlem

    this.Noise = this.sound.add("Noise", { loop: true, volume: this.BaseNoiseVolume }); //Ses dosyasının belirlenen ayarlarda çalmaya başlamasını sağlıyor.
    this.Noise.play();
}


//Oyuncunun ilerleyişine göre ses seviyesini azaltan fonksiyon
SetNoiseVolumeByProgress() {
    if (!this.Noise) return;

    //Baslangıç ses seviyesine göre her ilerlemede oransal ses azaltma hesaplamaları
    const total = this.NoteSequence.length;
    const t = this.Progress / total;
    const v = this.BaseNoiseVolume * (1 - t);

    this.Noise.setVolume(v);
}

//Bulmacayı başa sarıyor.
ResetNotesProgress() {
    this.Progress = 0; //İlerlemeyi sıfırlıyor.
    this.NoteFound = { N1:false, N2:false, N3:false };
    this.SetNoiseVolumeToBase(); //Ses seviyesini başlangıç değerine çekiyor.
}

//Ses seviyesini başalangıç değerine çekiyor.
SetNoiseVolumeToBase() {
    if (!this.Noise) return;
    this.Noise.setVolume(this.BaseNoiseVolume);
}

//Notalara basıldığında doğru olup olmadığının kontrol eden fonksiyon
OnNoteFound(tokens) {
    if (this.Solved) return; //Bulmaca çözülmüş mü diye kontrol ediyor.

    for (let k = 0; k < tokens.length; k++) {
      //Beklenen değer expected değişkenine atanıyor.
      const expected = this.NoteSequence[this.Progress];
      //Seçilmiş değer got değişkenine atanıyor.
      const got = tokens[k];
      //Eşit değillerse bulmaca ilerlemesi sıfırlanıyor.
      if (got !== expected) {
        this.ResetNotesProgress();
        return;
      }

      //Eşitse bu kısma giriyor. İlerleme arttırılıyor. Ses seviyesi ayarlanıyor.
      this.Progress++;
      this.SetNoiseVolumeByProgress();

      //Eğer ilerleme istenen değerleri tutan dizinin uzunluğundan büyükse bulmacayı bitirecek fonksiyon çağırılıyor.
      if (this.Progress >= this.NoteSequence.length) {
        this.FinishMusicPuzzle();
        return;
      }
    }
}

FinishMusicPuzzle() {
    this.Solved = true; //Bulmaca çözüldü olarak değiştiriliyor.

    //Noise ses dosyası hala çalıyorsa dosyayı kapatıyor.
    if (this.Noise) {
      this.Noise.stop();
    }
    //Finalde Lullaby ses dosyası çalınıyor.
    this.Lullaby = this.sound.add("Lullaby", { loop: true, volume: 0.75 });
    this.Lullaby.play();
    }

}

export class MomRoom extends Phaser.Scene {
  constructor() {
    super("MomRoom");
  }

  init() {  //Sahne başladığında bulmacanın başlangıç değerlerini ayarlamak için
  this.PaperZoomLayer = null; 
  this.PaperInputs = null; 
  this.PaperPuzzle = {values: ["", "", ""], solved: false};
  this.PaperAnswers = ["8", "2", "4"];
}

  preload() {
    // Resimleri yüklüyoruz.
    this.load.image("MomsRoomImage", "assets/MomsRoomImage.png");//(key,dosya_yolu) parametreler
    this.load.image("BagZoomImage", "assets/BagZoomImage.png");
    this.load.image("BedsideTableZoomImage", "assets/BedsideTableZoomImage.png");
    this.load.image("BedZoomImage", "assets/BedZoomImage.png");    
    this.load.image("CarpetZoomImage", "assets/CarpetZoomImage.png");
    this.load.image("ClockZoomImage", "assets/ClockZoomImage.png");
    this.load.image("PaintZoomImage", "assets/PaintZoomImage.png");
    this.load.image("PaperZoomImage", "assets/PaperZoomImage.png");
    this.load.image("MusicBoxZoomImage", "assets/MusicBoxZoomImage.png");
    this.load.image("WardrobeZoomImage", "assets/WardrobeZoomImage.png");
    this.load.image("WindowZoomImage", "assets/WindowZoomImage.png");
  }

  create() {
    // Arka plan resmini sahneye ekliyoruz.
    const bg = this.add.image(0, 0, "MomsRoomImage").setOrigin(0,0);  

   //Nesneler için tıklama alanları olan zone'lar olusturuyoruz.
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
  if (this.BedZoomLayer) return; //Birden fazla tıklama durumlarında ekstra katman açılmasını engellemek için
  
  //Ekranın width ve height değerlerini alma ve değişkene atama kısmı
  const w = this.scale.width;   
  const h = this.scale.height; 

  //Tüm ekranı kaplayan bir zone tanımlıyoruz.Yatak alanı için ayrı bir zone ve üst üste binen bu zonelarda derinlik önceliklendirmesi yapıyoruz.
  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.CloseBedZoom()); 

  //Nesnenin zoomlanmış hali olan resmi sahneye ekliyoruz.
  const Bed = this.add.image(0, 0, "BedZoomImage").setOrigin(0, 0).setDepth(1000);

  //Yatak nesnesinin olduğu alan
  const BedZone = this.add.zone(298.05, 104.95, 292.95, 310.00).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });

  //Yatak nesnesine tıklansa bile zonelar üst üste olduğundan bir alt zone'a geçmesini engelliyoruz.
  BedZone.on("pointerdown", (pointer, localX, localY, event) => {event.stopPropagation();});

  //Yatak için tanımlanan zone'u ve background olarak tanımlanan zone'u tek bir container'da tutuyoruz.
  this.BedZoomLayer = this.add.container(0, 0, [CloseZone, Bed, BedZone]);
 }

//Zoom'dan çıkma fonksiyonu
CloseBedZoom() {  
  if (!this.BedZoomLayer) return; 
  this.BedZoomLayer.destroy(true);
  this.BedZoomLayer = null;
}


OpenClockZoom() {
  if (this.ClockZoomLayer) return;

  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.CloseClockZoom());

  const Clock = this.add.image(0, 0, "ClockZoomImage").setOrigin(0, 0).setDepth(1000);

  const ClockZone = this.add.zone(258.40, 81.60, 273.40, 348.20).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  ClockZone.on("pointerdown", (pointer, localX, localY, event) => {event.stopPropagation();});

  this.ClockZoomLayer = this.add.container(0, 0, [CloseZone, Clock, ClockZone]);
}

CloseClockZoom() {
  if (!this.ClockZoomLayer) return;
  this.ClockZoomLayer.destroy(true);
  this.ClockZoomLayer = null;
}


OpenBagZoom() {
  if (this.BagZoomLayer) return;

  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.CloseBagZoom());

  const Bag = this.add.image(0, 0, "BagZoomImage").setOrigin(0, 0).setDepth(1000);

  const BagZone = this.add.zone(189.95, 50.75, 458.50, 406.65).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  BagZone.on("pointerdown", (pointer, localX, localY, event) => {event.stopPropagation();});

  this.BagZoomLayer = this.add.container(0, 0, [CloseZone, Bag, BagZone]);
}

CloseBagZoom() {
  if (!this.BagZoomLayer) return;
  this.BagZoomLayer.destroy(true);
  this.BagZoomLayer = null;
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


OpenPaintZoom() {
  if (this.PaintZoomLayer) return;
  
  const w = this.scale.width;
  const h = this.scale.height;

  const CloseZone = this.add.zone(0, 0, w, h).setOrigin(0, 0).setDepth(999).setInteractive();
  CloseZone.on("pointerdown", () => this.ClosePaintZoom());

  const Paint = this.add.image(0, 0, "PaintZoomImage").setOrigin(0, 0).setDepth(1000);

  const PaintZone = this.add.zone(154.50, 111.45, 503.55, 285.25).setOrigin(0, 0).setDepth(1001).setInteractive({ cursor: "pointer" });
  PaintZone.on("pointerdown", (pointer, localX, localY, event) => { event.stopPropagation(); });

  this.PaintZoomLayer = this.add.container(0, 0, [CloseZone, Paint, PaintZone]);
}

ClosePaintZoom() {
  if (!this.PaintZoomLayer) return;
  this.PaintZoomLayer.destroy(true);
  this.PaintZoomLayer = null;
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

  //Kağıdın üzerinde ınput kutucukları oluşturmak için CreatePaperInput fonksiyonu çağırılıyor.Oluşan kutucuklar PaperInputs dizisine pushlanıyor.
  this.PaperInputs = [];
  this.PaperInputs.push(this.CreatePaperInput(318.00, 233.95, 0));
  this.PaperInputs.push(this.CreatePaperInput(392.00, 233.95, 1));
  this.PaperInputs.push(this.CreatePaperInput(466.00, 233.95, 2));
}

ClosePaperZoom() {
  if (!this.PaperZoomLayer) return;

  if (this.PaperInputs) {  //Her kağıdın açılma sahnesinin kapanışında input değerleri sıfırlanıyor.
    this.PaperInputs.forEach(d => d.destroy());
    this.PaperInputs = null;
  }

  this.PaperZoomLayer.destroy(true);
  this.PaperZoomLayer = null;
}

//Kağıt üzerinde input kutuları oluşturma fonksiyonu
CreatePaperInput(x, y, index) {
  
  //Input kutuları oluşturup bu kutuların sayısal en fazla iki basamaklı değerler almaları için atamalar yapıyoruz.
  const el = document.createElement("input");
  el.type = "text";
  el.inputMode = "numeric";
  el.maxLength = 2;
  
  //Input kutularının tasarımsal özelliklerini belirliyoruz.
  el.style.width = "32px";
  el.style.height = "32px";
  el.style.fontSize = "18px";
  el.style.textAlign = "center";
  el.style.borderRadius = "8px";
  el.style.border = "2px solid #222";
  el.style.background = "rgba(235, 228, 205, 0.95)";

  //Input kutusuna girilen değer, girdileri tuttuğumuz dizinin ilgili indeksine eleman olarak alınır.
  el.value = this.PaperPuzzle.values[index] ?? "";
  
  //Kullanıcı rakam dışında bir şey girmeye çalışınca siler.
  el.addEventListener("input", () => {
    el.value = el.value.replace(/[^0-9]/g, "");
  });
  
  //Kullanıcı ilgili input kutusundan başka bir yere odak kaydırırsa input kutusu içerisine girilen değeri kontrol etmek için.
  el.addEventListener("blur", () => {
    this.ValidatePaperField(index, el.value);
  });
  
  //Kullanıcı odak kaydırmak yerine enter'a basmayı da tercih edebilir.O durumda da blur'un çalışması için.
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") el.blur();
  });
  //Inputları alacağımız DOM'u ekliyoruz.
  return this.add.dom(x, y, el).setDepth(2000);
}

ValidatePaperField(index, value) { //Kullanıcı girdilerinin doğruluğunu kontrol ediyor.

  //Boşlukları trimliyor.Input tamamen boşsa kaydetmiyor.
  const v = (value ?? "").trim();
  if (v.length === 0) {
    this.PaperPuzzle.values[index] = "";
    return;
  }
  //Girdi indexteki doğru değerle eşleşiyorsa kaydediliyor.Bulmaca çözülmüş mü diye kontrol ediliyor.
  if (v === this.PaperAnswers[index]) {
    this.PaperPuzzle.values[index] = v;
    this.CheckPaperSolved();
    return;
  }

  //En az bir doğru değerin girildiği ve sıradaki değerin yanlış girildiği durumlarda bütün değerleri sıfırlar.
  const AnyCorrectAlready = this.PaperPuzzle.values.some(x => x !== "");
  if (AnyCorrectAlready) {
    this.ResetPaperAll();
    return;
  }

  //Hiç doğru değer yoksa ve girilen değer yanlışsa girilen değeri tutmaması için ve ekrandan da silmek için
  this.PaperPuzzle.values[index] = "";
  if (this.PaperInputs && this.PaperInputs[index] && this.PaperInputs[index].node) {
    this.PaperInputs[index].node.value = "";
  }
}

//Hafızadaki ve ekrandaki görselde yer alan bütün değerleri sıfırlar.
ResetPaperAll() {
  this.PaperPuzzle.values = this.PaperPuzzle.values.map(() => "");
  this.PaperPuzzle.solved = false;

  if (this.PaperInputs) {
    this.PaperInputs.forEach(d => {
      if (d && d.node) d.node.value = "";
    });
  }
}

//Bulmacanın çözülüp çözülmediğini kontrol eden fonksiyon.
CheckPaperSolved() {
  if (this.PaperPuzzle.solved) return; //Bulmaca daha önceden çözülmüş mü diye kontrol eder.

  const ok = this.PaperPuzzle.values.every((x, i) => x === this.PaperAnswers[i]); //Dizideki değerlerin hepsinin doğruluğu kontrol edilir.
  if (!ok) return;

  this.PaperPuzzle.solved = true;
  //Birinci sahnedeki bulmaca tamamlandı. İkinci sahneye geçiliyor.
  this.scene.start("MomRoom2");
}

}
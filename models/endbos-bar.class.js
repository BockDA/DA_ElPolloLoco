class EndbossBar extends DrawableObject {

  IMAGES_ENDBOSSBAR = [
    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',


  ]


  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_ENDBOSSBAR);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setEndboosBar(5);

  }


  setEndboosBar(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_ENDBOSSBAR[this.resolveImageIndex(percentage)];
    this.img = this.imageCache[path];
    //this.loadImage(path);
  }


  resolveImageIndex(percentage) {
    if (this.percentage >= 5) {
      return 5;
    } else if (percentage == 4) {
      return 4;
    } else if (percentage == 3) {
      return 3;
    } else if (percentage == 2) {
      return 2;
    } else if (percentage == 1) {
      return 1;
    } else if (percentage == 0) {
      return 0;
    }

  }

}

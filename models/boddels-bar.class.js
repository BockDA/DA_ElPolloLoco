class Boodle extends DrawableObject {

    IMAGES_BOOTLE = [

        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ]


    boodleNumber = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOOTLE);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setBootle(0);


    }


    setBootle(boodleNumber) {
        this.boodleNumber = boodleNumber;
        console.log("Bootle Status erweitern ", boodleNumber);
        let path = this.IMAGES_BOOTLE[this.resolveImageIndex(boodleNumber)];
        this.img = this.imageCache[path];

    }


    resolveImageIndex(percentage) {
        if (this.percentage == 100) {
            return 5;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 20) {
            return 1;
        } else if (percentage >= 0) {
            return 0;
        }
    }

}
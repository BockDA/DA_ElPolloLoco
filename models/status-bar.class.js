<<<<<<< HEAD
class StatusBar extends DrawableObject {
=======
class StatusBar extends DrawableObjects {

>>>>>>> d45d7e22fd3798550dc9d7352cc87094853b12df

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
<<<<<<< HEAD
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ]

=======
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'

    ]


>>>>>>> d45d7e22fd3798550dc9d7352cc87094853b12df
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);

    }


<<<<<<< HEAD

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(percentage)];
=======
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
>>>>>>> d45d7e22fd3798550dc9d7352cc87094853b12df
        this.img = this.imageCache[path];
    }


<<<<<<< HEAD
    resolveImageIndex(percentage) {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
=======
    //StatusBar Bild auswählen
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4
>>>>>>> d45d7e22fd3798550dc9d7352cc87094853b12df
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
<<<<<<< HEAD
        } else if (this.percentage >= 0) {
            return 0;
        }
    }

}
=======
        } else if (this.percentage > 0) {
            return 0;
        }

    }





}
>>>>>>> d45d7e22fd3798550dc9d7352cc87094853b12df

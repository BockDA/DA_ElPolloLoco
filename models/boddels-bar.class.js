
class BoodleBar extends DrawableObject {

    IMAGES_BOOTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ]

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOOTLE);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setBootle(0);
    }

    /**
     *game data for the status bar bootle
     * @param {string} percentage -percentage 0-100
     */
    setBootle(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOOTLE[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    /**
     *from evaluation of the percentage of what is passed by the game
     * @param {string} percentage
     * @returns - depending on what percentage e.g. 20 is then picture 1
     */
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

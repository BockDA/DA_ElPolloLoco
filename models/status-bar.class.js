
class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ]

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);

    }

    /**
     *game data for the status bar status charater
     * @param {string} percentage -percentage 0-100
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    /**
     *from evaluation of the percentage of what is passed by the game
     * @param {string} percentage
     * @returns - depending on what percentage e.g. 20 is then picture 1
     */
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

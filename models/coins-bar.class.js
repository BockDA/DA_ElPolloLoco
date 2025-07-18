class CoinsBar extends DrawableObject {

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 10;
        this.y = 40;
        this.width = 200;
        this.height = 50;
        this.setCoins(0);
    }

    /**
     *game data for the status bar coins
     * @param {*} percentage -percentage 0-100
     */
    setCoins(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex(percentage)];
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

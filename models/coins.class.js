class Coins extends MovableObject {
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    offset = {
        top: 50,
        left: 30,
        right: 60,
        bottom: 100
    }

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 100 + Math.random() * 1400;
        this.y = 100 + Math.random() * 50;
        this.loadImages(this.IMAGES_COINS);
        this.animateCoins();
    }

    /**
     *animating the coins
     */
    animateCoins() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_COINS.length;
            let path = this.IMAGES_COINS[i]
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 250);
    }
}

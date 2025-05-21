class CoinsCollectible extends MovableObject {


    IMAGES_COINS = [
        'img/8_coin/coin_1.png'
    ]


    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 100 + Math.random() * 2500;
        this.y = 30 + Math.random() * 100;
        this, this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 1;
            if (this.x <= 10) {
                this.x = 2000 + Math.random() * 800;
            }

        }, 1000 / 60);

    }

}
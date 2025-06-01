class CoinsCollectible extends MovableObject {


    IMAGES_COINS = [
        'img/8_coin/coin_1.png'
    ]


    offset = {
        top: 50,
        left: 30,
        right: 60,
        bottom: 100
    }

    speed = 0.02;


    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 100 + Math.random() * 2500;
        this.y = 30 + Math.random() * 100;
        this.animate();
    }



    animate() {
        setInterval(() => {
            this.x -= 1;
            if (this.x <= 10) {
                this.x = 2000 + Math.random() * 800;
            }
        }, 1000 / 60);

    }



    coinsCollected() {
        console.log("Verschiebe Coins ", this.y);
        this.x = 400;
        this.y = 400;

    }



}





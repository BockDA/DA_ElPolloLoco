class Bootle extends MovableObject {

    height = 100;
    width = 80;
    y = 330;
    x = 300;
    bootleBar = new BoodleBar();

    offset = {
        top: 20,
        left: 25,
        right: 50,
        bottom: 30
    }


    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png"
    ]

    constructor(x) {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.animateBootle();
    }

    //Flaschen schwenken
    animateBootle() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_BOTTLE.length;
            let path = this.IMAGES_BOTTLE[i]
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 500);
    }

};

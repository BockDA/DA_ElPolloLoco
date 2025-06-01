class ChickenSmall extends MovableObject {

    y = 380;
    height = 40;
    width = 40;
    dead = false;
    speed = 1.5;
    setIntervalId;




    IMAGES_WALKING_SMALL = [
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png'


    ];


    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
    ]


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }



    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING_SMALL);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 600 + Math.random() * 800;
        this.speed += Math.random() * 0.4;
        this.animate();
    }


    animate() {
        this.moveLeft();
        setInterval(() => {
            if (!this.dead) {
                let i = this.currentImage % this.IMAGES_WALKING_SMALL.length;
                let path = this.IMAGES_WALKING_SMALL[i]
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 200);
    }


    moveLeft() {
        this.setIntervalId = setInterval(() => {
            this.x -= this.speed;
            //  if (this.x <= 0) {
            //    this.x = 720;
            // }
        }, 1000 / 60);
    }


    //wenn getroffen nach unten abtauchen
    deadCollision() {
        this.playAnmimation(this.IMAGES_DEAD);
        //setInterval(() => {
        //  this.y += this.speed;
        // }, 100 / 60);

        this.dead = true;
        clearInterval(this.setIntervalId);
    }

}
class Chicken extends MovableObject {

    y = 360;
    height = 60;
    width = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    ];


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    dead = false;


    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 600 + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.4;
        this.animate();
    }


    animate() {
        this.moveLeft();
        setInterval(() => {
            if (!this.dead) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i]
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 200);
    }




    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            //  if (this.x <= 0) {
            //    this.x = 720;
            // }

        }, 1000 / 100);
    }



    deadCollision() {
        console.log("Chicken coolisosn Animation aufrufen");

        if (this.dead) {
            this.playAnmimation(this.IMAGES_DEAD);
            setInterval(() => {
                this.y += this.speed;
            }, 100 / 60);
        }
        this.dead = false;


    }


}
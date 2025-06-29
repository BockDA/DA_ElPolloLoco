class Chicken extends MovableObject {

    y = 360;
    height = 60;
    width = 80;
    dead = false;
    speed = 1;
    intervalId;
    soundDead = '/audio/chicken.mp3';

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    ];


    constructor(world) {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.world = world;
        this.sound = new Sound();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        const delay = 500 + Math.random() * 0.4;
        this.x = 600 + Math.random() * 1000;
        this.speed += Math.random() * 0.4;
        this.animate();
    }




    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.dead) return;
            this.playAnmimation(this.IMAGES_WALKING);
            // let i = this.currentImage % this.IMAGES_WALKING.length;
            //let path = this.IMAGES_WALKING[i]
            //this.img = this.imageCache[path];
            //this.currentImage++;
        }, 50);
    }

    moveLeft() {
        this.intervalId = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);

    }


    deadCollision() {
        clearInterval(this.intervalId);
        this.playAnmimation(this.IMAGES_DEAD);
        this.sound.soundPlay(this.soundDead, 1, false);
    }

}

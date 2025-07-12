class Chicken extends MovableObject {

    y = 360;
    x = 300;
    height = 60;
    width = 80;
    dead = false;
    speed = 1;
    intervalId;
    soundDead = 'audio/chicken.mp3';

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
        bottom: 5
    }

    constructor(world, x) {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.world = world;
        this.sound = new Sound();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.x + 100 * Math.random() * 50;
        this.speed += Math.random() * 0.2;
        this.animate();
    }




    /**
     *start the animation and let the chicken run to the left
     */
    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.dead) return;
            this.playAnimation(this.IMAGES_WALKING);
        }, 60);
    }

    /**
     *move smallchicken to the left
     */
    moveLeft() {
        this.intervalId = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    /**
     *dive down at collision
     */
    deadCollision() {
        const images = this.IMAGES_DEAD;
        let frame = 0;
        const speed = 150; // ms pro Frame
        const totalFrames = images.length;
        const animationInterval = setInterval(() => {
            if (frame < totalFrames) {
                const path = images[frame];
                this.img = this.imageCache[path];
                frame++;
            } else {
                clearInterval(animationInterval); // Animation vorbei
                clearInterval(this.intervalId);   // z. B. GameLoop stoppen
            }
        }, speed);
        this.sound.soundPlay(this.soundDead, 1, false);
    }
}

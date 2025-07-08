class ChickenSmall extends MovableObject {

    y = 380;
    x = 400;//800
    height = 40;
    width = 40;
    dead = false;
    speed = 0.2;
    IntervalIdSmall
    soundDead = 'audio/smallchicken.mp3';



    IMAGES_WALKING_SMALL = [
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png'
    ];


    IMAGES_DEAD_SMALL = [
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
        this.sound = new Sound();
        this.loadImages(this.IMAGES_WALKING_SMALL);
        this.loadImages(this.IMAGES_DEAD_SMALL);
        this.x + Math.random() * 2800;
        this.speed += Math.random() * 0.3;
        this.animate();

    }

    /**
     *start the animation and let the small chicken run to the left
     */
    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.dead) return;
            this.playAnimation(this.IMAGES_WALKING_SMALL);
        }, 50);
    }

    /**
     *move smallchicken to the left
     */
    moveLeft() {
        this.IntervalIdSmall = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    /**
     *dive down at collision
     */
    deadCollision() {
        const images = this.IMAGES_DEAD_SMALL;
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
                clearInterval(this.IntervalIdSmall);   // z. B. GameLoop stoppen
            }
        }, speed);
        this.sound.soundPlay(this.soundDead, 1, false);
    }
}

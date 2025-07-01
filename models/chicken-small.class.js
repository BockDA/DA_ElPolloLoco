class ChickenSmall extends MovableObject {

    y = 380;
    height = 40;
    width = 40;
    dead = false;
    speed = 1.5;
    setIntervalId;
    soundDead = '/audio/smallchicken.mp3';



    IMAGES_WALKING_SMALL = [
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png'
    ];


    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
    ]


    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.sound = new Sound();
        this.loadImages(this.IMAGES_WALKING_SMALL);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 600 + Math.random() * 1200;
        this.speed += Math.random() * 0.4;
        this.animate();

    }

    /**
     *start the animation and let the small chicken run to the left
     */
    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.dead) return;
            this.playAnmimation(this.IMAGES_WALKING_SMALL, 2);
        }, 50);
    }

    /**
     *move smallchicken to the left
     */
    moveLeft() {
        this.IntervalId = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    /**
     *dive down at collision
     */
    deadCollision() {
        clearInterval(this.IntervalId);
        this.playAnmimation(this.IMAGES_DEAD);
        this.sound.soundPlay(this.soundDead, 1, false);
    }
}

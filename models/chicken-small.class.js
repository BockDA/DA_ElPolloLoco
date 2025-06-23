class ChickenSmall extends MovableObject {

    y = 380;
    height = 40;
    width = 40;
    dead = false;
    speed = 1.5;
    setIntervalId;
    soundWalking = '/audio/smallchicken.mp3';



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
        this.sound = new Sound();
        this.loadImages(this.IMAGES_WALKING_SMALL);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 600 + Math.random() * 800;
        this.speed += Math.random() * 0.4;
        this.animate();
        this.soundChick();
    }


    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.dead) return;
            this.playAnmimation(this.IMAGES_WALKING_SMALL, 2);

        }, 100);



    }

    //Cickensmall gagager
    soundChick() {
        setInterval(() => {
            this.sound.soundPlay(this.soundWalking, 0.5, false);
        }, 6000)
    }



    moveLeft() {
        this.IntervalId = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }


    //wenn getroffen nach unten abtauchen
    deadCollision() {
        clearInterval(this.IntervalId);
        this.playAnmimation(this.IMAGES_DEAD);
    }




}

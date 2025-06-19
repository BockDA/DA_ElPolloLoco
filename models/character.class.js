class Character extends MovableObject {

    height = 250;
    y = 180;
    speed = 15;
    world; // was macht das
    sleep = false;
    soundSleep = new Audio('./audio/snoring.mp3')
    soundWalking = new Audio('./audio/walking.mp3')
    charSound = new Sound();



    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]


    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]



    offset = {
        top: 85,
        left: 20,
        right: 40,
        bottom: 85
    }


    constructor(keyboard) {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.keyboard = keyboard;
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.startAnimation();
        this.animate();
    }



    startAnimation() {
        setInterval(() => {
            this.sleep = true
        }, 5000);
    }


    animate() {
        setInterval(() => {
            if (this.sleep) {
                this.playAnmimation(this.IMAGES_LONG_IDLE);
                this.sound(true);

            } else {
                this.playAnmimation(this.IMAGES_IDLE);
                this.sound(false);
            }

            if (this.isDead()) {
                console.log("Bin Tod");
                this.playAnmimation(this.IMAGES_DEAD);
                this.y += 5;


            } else if (this.isHurt()) {
                //console.log("Is Hurt Variable")
                //this.y += 200;
                this.playAnmimation(this.IMAGES_HURT);


            } else if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.sleep = false;
                this.otherDirection = false;



            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.sleep = false;
                this.otherDirection = true;

            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.sleep = false;
                this.jump();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 30);
    }


    jump() {
        this.speedY = 30;
        this.playAnmimation(this.IMAGES_JUMPING);
    }


    sleep() {
        this.playAnmimation(this.IMAGES_LONG_IDLE);
    }


    sound(flag, pfad) {
        if (!mute && flag) {
            this.soundSleep.volume = 0.5;
            this.soundSleep.play();
        } else {
            this.soundSleep.pause();
        }
    }


    soundTest() {
        this.charSound.soundPlay(1, 2, 3, true);
    }


}

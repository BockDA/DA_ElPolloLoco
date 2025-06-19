class Endboss extends MovableObject {
    x = 2500;
    y = 60;
    height = 400;
    width = 250;
    speed = 0.06;
    world;
    start = false;




    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]



    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'

    ]



    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();

    }


    animate() {
        setInterval(() => {
            console.log("Durclauf");

            if (!this.start) {
                this.playAnmimation(this.IMAGES_ALERT, 1);
            } else {
                this.playAnmimation(this.IMAGES_WALKING, 1)
                this.moveLeft();
            }

        }, 200);
    }


    moveLeft() {
        this.intervallLeft = this.intervalId = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }



    //Endbos greift an
    animateAttack() {
        console.log("Endboss grift an");
        const intervalId = setInterval(() => {
            this.playAnmimation(this.IMAGES_ATTACK);
        }, 100);
        setTimeout(() => {
            clearInterval(intervalId);
        }, 2000);

    }


    hurtEndboss() {
        const intervalId = setInterval(() => {
            this.playAnmimation(this.IMAGES_HURT);
        }, 100);
        setTimeout(() => {
            clearInterval(intervalId);
        }, 2000);
    }



    //Endboss ist tot
    deadEndboss() {
        setInterval(() => {
            this.playAnmimation(this.IMAGES_DEAD);
            this.y += 2;
        }, 100 / 10);
    }







}

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


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        //this.startAnimat();
        this.animate();
    }


    /*   startAnimat() {
           setInterval(() => {
               this.playAnmimation(this.IMAGES_ALERT);
           }, 200);

       }
   */

    animate() {
        console.log("Jetz gehts los", this.start);
        setInterval(() => {
            if (!this.start) {
                this.playAnmimation(this.IMAGES_ALERT);
            } else {

                this.playAnmimation(this.IMAGES_WALKING)
                this.moveLeft();
            }
        }, 200);
    }



    moveLeft() {


        this.intervalId = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }




    animateAttack() {
        console.log("Endboss grift an");
        setInterval(() => {
        }, 200);
    }




}

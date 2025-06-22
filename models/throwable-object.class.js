class ThrowableObject extends MovableObject {

    IMAGES_TROW = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ]


    IMAGES_ARISE = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]

    height = 100;
    width = 50;
    groundlevel = 300;
    direktion = true;
    speedY = 20;
    acceleration = 1.5;
    test = 100;
    soundArise = '/audio/bottlearise.mp3';
    soundBottleTrow = '/audio/bottlethrow.mp3';




    constructor(x, y, CharDirection, world) {
        super();
        this.sound = new Sound();
        this.CharDirektion = CharDirection;
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_TROW);
        this.loadImages(this.IMAGES_ARISE);
        this.x = x;
        this.y = y;
        this.world = world;
        this.groundlevel = 300;
        this.StartTrow();
        this.trow();
    }



    //werfen
    trow() {
        this.applyGravity(this.acceleration);
        this.trowIntervalId = setInterval(() => {
            this.playAnmimation(this.IMAGES_TROW, 10);
            this.x += this.direktion ? -6 : +6;
            if (this.y < this.groundlevel) {
                this.sound.soundPlay(this.soundBottleTrow, 1, true)
            };

            if (this.y >= this.groundlevel) {
                this.sound.stopSound(this.soundBottleTrow);
                this.Bootlearise();
                clearInterval(this.trowIntervalId);
            }

        }, 20);


    }


    //Richtung püfen
    StartTrow() {
        this.direktion = this.CharDirektion;
        this.x += this.CharDirektion ? -100 : 0;

    }


    //aufkommen
    Bootlearise() {
        this.test = setInterval(() => {
            this.playAnmimation(this.IMAGES_ARISE);
        }, 20);
        setTimeout(() => {
            clearInterval(this.test);
            this.test = null;
            this.y = 800;
        }, 100);
        this.sound.soundPlay(this.soundArise, 1, false);


    }
}

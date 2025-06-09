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



    constructor(x, y) {
        super();

        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_TROW);
        this.loadImages(this.IMAGES_ARISE);
        this.x = x;
        this.y = y;

        this.groundlevel = 430;
        this.StartTrow();
        this.trow();

    }


    //werfen
    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            //this.playAnmimation(this.IMAGES_TROW);
            this.x += 8;

        }, 20);

        console.log("Flasche gemschissen");

    }


    //Richtung püfen
    StartTrow() {
        console.log("Richtung ");






    }





    /*    
     trow() {
         this.speedY = 30;
         this.applyGravity();
         // Vorheriges Intervall stoppen, wenn vorhanden
         if (this.trowIntervalId) {
             clearInterval(this.trowIntervalId);
             this.trowIntervalId = null;
         }
         // Neues Intervall starten
         this.trowIntervalId = setInterval(() => {
             this.playAnmimation(this.IMAGES_TROW)
             this.x += 8;
     
         }, 20);
     
     
         // Nach 1,5 Sekunden stoppen
         setTimeout(() => {
             clearInterval(this.trowIntervalId);
             this.trowIntervalId = null;
             console.log("Intervall gestoppt");
         }, 1150);
     
     
     }
     
    */

    //aufkommen
    Bootlearise() {
        setInterval(() => {
            this.playAnmimation(this.IMAGES_ARISE);
        }, 20);
    }

}


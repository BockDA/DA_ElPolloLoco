class Bootle extends MovableObject {

    height = 100;
    width = 80;
    y = 330;
    x = 300;





    offset = {
        top: 20,
        left: 25,
        right: 50,
        bottom: 30
    }


    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ]


    constructor(x) {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = x //300 + Math.random() * 800;
    }



    bottleCollected1() {
        console.log("Verschiebe Flasche ", this.y);
        this.x = 400;
        this.y = 400;
    }






};
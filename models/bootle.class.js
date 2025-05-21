class BootleCollectible extends MovableObject {
    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 300 + Math.random() * 1200;
        this.y = 300;

    }




    zeichnen() {
        console.log("Zeichen mich");
        this.x += 100;


    }


};
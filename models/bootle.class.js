class BootleCollectible extends MovableObject {

    height = 100;
    width = 80;
    y = 330;
    x = 300;



    constructor(x) {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');

        this.x = x //300 + Math.random() * 800;


    }



};
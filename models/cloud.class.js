class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;

    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        this.x = 0 + Math.random() * 2300;
        this.animate();
    }

    /**
     *draws the clouds and lets them wander
     */
    animate() {
        setInterval(() => {
            this.x -= 0.15;
            if (this.x <= 0) {
                this.x = 2500;
            }
        }, 1000 / 60);
    }
}

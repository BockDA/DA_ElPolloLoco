class MovableObject extends DrawableObjects {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;



    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 180;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speed = 30;
    }



    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }



    hit() {
        this.energy -= 5;
        console.log("Energie ", this.energy);
        if (this.energy <= 0) {
            //this.energy = 100;
        } else {
            this.lastHit = new Date().getTime();
        }
    }



    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed <= 1;

    }


    isDead() {
        return this.energy == 0;

    }

}
<<<<<<< HEAD
class MovableObject extends DrawableObject {
=======
class MovableObject extends DrawableObjects {
>>>>>>> d45d7e22fd3798550dc9d7352cc87094853b12df
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }




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

<<<<<<< HEAD




    playAnmimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImage++;
    }



=======
>>>>>>> d45d7e22fd3798550dc9d7352cc87094853b12df
    moveRight() {
        this.x += this.speed;
        this.playAnmimation(this.IMAGES_WALKING);
    }

    moveLeft() {
        this.x -= this.speed;
<<<<<<< HEAD
        this.playAnmimation(this.IMAGES_WALKING);
    }


=======
    }


    jump() {
        this.speed = 30;
    }
>>>>>>> d45d7e22fd3798550dc9d7352cc87094853b12df



    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }



    hit() {

        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }



    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
<<<<<<< HEAD
        return timepassed < 0.5;
=======
        return timepassed <= 1;

>>>>>>> d45d7e22fd3798550dc9d7352cc87094853b12df
    }


    isDead() {
        return this.energy == 0;
    }

}
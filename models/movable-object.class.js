class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collisonRight = false;
    world;



    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    /**
     *simulate gravity
     * @param {*} acceleration
     */
    applyGravity(acceleration) {
        acceleration = acceleration || this.acceleration
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);


    }

    /**
     *check when the character is down
     * @returns
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }


    /**
     * Plays the animation based on the provided array of images.
     * @param {*} images -Array of image paths for the animation
     * @param {*} speed
     */
    playAnimation(images, speed) {
        if (!images || images.length === 0) return;
        speed = speed || 5;
        if (!this.animationFrameCounter) this.animationFrameCounter = 0;
        this.animationFrameCounter++;
        if (this.animationFrameCounter % speed === 0) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    /**
     *Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     *Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
        this.playAnimation(this.IMAGES_WALKING);
    }





    /**
     *collision from side with an enemy
     * @param {*} mo -chicken, small chicken
     * @returns
     */
    getCollisionSide(mo, buffer) {
        const isBootle = mo instanceof Bootle;
        if (!isBootle && mo.dead) return false;
        if (this.y >= 180) {
            return (
                this.x + this.width - buffer > mo.x + buffer &&
                this.y + this.height > mo.y &&
                this.x < mo.x + mo.width &&
                this.y < mo.y + mo.height)
        }
    }


    /**collision with an enemy from above */
    getcollisionBottom(mo, buffer) {
        console.log(this.speedY);


        if (this.speedY < -5 && this.speedY > -20) {
            console.log("springe nach untzen");
            return (
                this.x + this.width - buffer > mo.x + buffer &&
                this.x < mo.x + mo.width &&
                this.y + this.height - this.offset.top <= mo.y



                //   this.y + this.height + this.offset.top - 30 < 250 //mo.y - mo.height + 50

            )
        }
    }


    /**
     *collision with coins
     * @param {*} mo
     * @returns
     */
    getCollisionCoins(mo) {

        return
    }

    /**
     *
     * @param {collision with coins} bottleTrow
     * @param {string} enemies
     * @param {string} endboss
     * @returns
     */
    getCollisionBottle(bottleTrow, enemies, endboss) {
        if (this.isColliding(bottleTrow, endboss)) {
            return 1;
        }
    }

    /**
     * auxiliary function for collision with bottle
     */
    isColliding(a, b) {
        return a.x + a.width > b.x &&
            a.x < b.x + b.width &&
            a.y + a.height > b.y &&
            a.y < b.y + b.height;
    }


    /**
     *collision with final boss
     * @param {string} endboss
     * @returns
     */
    getCollisionEndboss(endboss) {
        const cx = this.x, cy = this.y, cw = this.width, ch = this.height;
        const ex = endboss.x, ey = endboss.y, ew = endboss.width, eh = endboss.height;
        const h = cx + cw > ex && cx < ex + ew;
        const v = cy + ch > ey && cy < ey + eh;
        if (h && v) {
            const cMid = cx + cw / 2;
            const eMid = ex + ew / 2;
            return cMid !== eMid;
        }
        return false;
    }




    /**
     *If the final boss gets stuck, pause for 0.5 seconds
     * @returns
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 100;
        return timepassed < 1;
    }


    /**
     *if character is dead then energy to zero
     * @returns
     */
    isDead() {
        return this.energy == 0;
    }

}

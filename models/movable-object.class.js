class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collisonRight = false;
    world;

    c1;
    c2;
    c3;
    c4;
    m1;
    m2;
    m3;
    m4;

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
     * Help function for collision points
     * @param {String},object for coordinates opponent
     */
    referencePoint(mo) {
        this.c1 = this.x + this.offset.left;
        this.c2 = this.x + (this.width - this.offset.right);
        this.c3 = this.y + this.offset.top;
        this.c4 = this.y + this.height
        this.m1 = mo.x;
        this.m2 = mo.x + mo.width;
        this.m3 = mo.y;
        this.m4 = mo.y + (mo.height - mo.offset.bottom);
    }

    /**
     *collision from side with an enemy
     * @param {*} mo -chicken, small chicken
     * @returns
     */
    getCollisionSide(mo, buffer) {
        const isBootle = mo instanceof Bootle;
        if (!isBootle && mo.dead) return false;
        this.referencePoint(mo);
        if (this.c3 >= 180) {
            return (
                this.c1 < this.m2 + buffer &&
                this.c2 > this.m1 - buffer &&
                this.c3 < this.m4 &&
                this.c4 > this.m3
            )
        }
    }

    /**collision with an enemy from above */
    getcollisionBottom(mo, buffer) {
        if (this.speedY < -5 && this.speedY > -25) {
            this.referencePoint(mo);
            return (
                this.c1 < this.m2 - buffer &&
                this.c2 > this.m1 + buffer &&
                this.c3 > 90 &&
                this.c4 > 90
            )
        }
    }

    /**
     *collision with coins
     * @param {*} mo
     * @returns
     */
    getCollisionCoins(mo, buffer) {
        this.referencePoint(mo);
        return (
            this.c1 < this.m2 - buffer &&
            this.c2 > this.m1 + buffer &&
            this.c3 < this.m4
        )
    }

    /**
     *Check collision with bootle and endboss
     * @param {collision with coins} bottleTrow
     * @param {string} enemies
     * @param {string} endboss
     * @returns
     */
    getCollisionBottle(bottleTrow, endboss) {
        this.referencePoint(endboss);
        return (
            bottleTrow.x + bottleTrow.width > this.m1 &&
            bottleTrow.x < this.m2
        )
    }

    /**
     *collision with final boss
     * @param {string} endboss
     * @returns
     */
    getCollisionEndboss(endboss) {
        this.referencePoint(endboss);
        return (
            this.c2 > this.m1 &&
            this.c1 < this.m2
        )
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

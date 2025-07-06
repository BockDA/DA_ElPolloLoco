class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;//0
    acceleration = 2.5//2.5
    energy = 100;
    lastHit = 0;
    collisonRight = false;



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
            return this.y < 290
        } else {
            return this.y < 180;
        }
    }


    /**
     * Plays the animation based on the provided array of images.
     * @param {*} images -Array of image paths for the animation
     * @param {*} speed
     */
    playAnmimation(images, speed) {
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
        this.playAnmimation(this.IMAGES_WALKING);
    }

    /**
     *Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
        this.playAnmimation(this.IMAGES_WALKING);
    }


    /**
     *collision from side with an enemy
     * @param {*} enemy -chicken, small chicken
     * @returns
     */
    getCollisionSide(enemy) {
        const isBootle = enemy instanceof Bootle;
        if (!isBootle && enemy.dead) return false;
        return (
            this.x + this.width > enemy.x + this.offset.left &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height
        );
    }


    /**collision with an enemy from above */
    getcollisionBottom(enemy) {
        const characterBottom = this.y + this.height;
        const enemyTop = enemy.y;
        const verticalOverlap =
            characterBottom >= enemyTop &&
            characterBottom <= enemyTop + enemy.offset.top;
        const horizontalOverlap =
            this.x + this.width > enemy.x + enemy.offset.left &&    // 10px Spielraum links
            this.x < enemy.x + enemy.width + enemy.offset.right;     // 10px Spielraum rechts
        return verticalOverlap && horizontalOverlap;
    }

    /**
     *collision with coins
     * @param {*} mo
     * @returns
     */
    getCollisionCoins(mo) {
        const thisLeft = this.x + this.offset.left + 10;
        const thisRight = this.x + this.width - this.offset.right;
        const thisTop = this.y + this.offset.top;
        const thisBottom = this.y + this.height - this.offset.bottom;
        const moLeft = mo.x + mo.offset.left + 10;
        const moRight = mo.x + mo.width - mo.offset.right;
        const moTop = mo.y + mo.offset.top;
        const moBottom = mo.y + mo.height - mo.offset.bottom;
        const horizontalOverlap = thisRight > moLeft && thisLeft < moRight;
        const verticalOverlap = thisBottom > moTop && thisTop < moBottom;
        return horizontalOverlap && verticalOverlap;
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
     *When boss collides with enemy, play injured animation
     */
    hit() {
        const Timenow = Date.now();
        if (Timenow - this.lastHit < 100) {
            return;
        }
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
            this.isDead();
        }
        this.lastHit = Timenow;
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

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


    applyGravity(acceleration) {
        acceleration = acceleration || this.acceleration
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }



    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 290
        } else {
            return this.y < 180;
        }
    }



    playAnmimation(images, speed) {
        //if (!this.dead)
        speed = speed || 5;
        if (!this.animationFrameCounter) this.animationFrameCounter = 0;
        this.animationFrameCounter++;
        if (this.animationFrameCounter % speed === 0) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            //}
        }
    }

    moveRight() {
        this.x += this.speed;
        this.playAnmimation(this.IMAGES_WALKING);
    }

    moveLeft() {
        this.x -= this.speed;
        this.playAnmimation(this.IMAGES_WALKING);
    }


    getCollisionSide(enemy) {
        const isBootle = enemy instanceof Bootle;
        if (!isBootle && enemy.dead) return false;

        return (
            this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height
        );
    }



    getcollisionBottom(enemy) {
        const characterBottom = this.y + this.height;
        const enemyTop = enemy.y;
        const verticalOverlap =
            characterBottom >= enemyTop &&
            characterBottom <= enemyTop + 40; // bis zu 15px tief im Gegner erlaubt
        const horizontalOverlap =
            this.x + this.width > enemy.x - 10 &&    // 10px Spielraum links
            this.x < enemy.x + enemy.width + 10;     // 10px Spielraum rechts
        return verticalOverlap && horizontalOverlap;
    }


    getCollisionCoins(mo) {
        const buffer = 5;
        const a_left = this.x + this.offset.left - buffer;
        const a_right = this.x + this.width - this.offset.right + buffer;
        const a_top = this.y + this.offset.top - buffer;
        const a_bottom = this.y + this.height - this.offset.bottom + buffer;
        const b_left = mo.x + mo.offset.left - buffer;
        const b_right = mo.x + mo.width - mo.offset.right + buffer;
        const b_top = mo.y + mo.offset.top - buffer;
        const b_bottom = mo.y + mo.height - mo.offset.bottom + buffer;
        return (
            a_right > b_left &&
            a_bottom > b_top &&
            a_left < b_right &&
            a_top < b_bottom
        );


    }


    getCollisionBottle(bottleTrow, enemies, endboss) {
        let colliEndboss = this.isColliding(bottleTrow, endboss);
        let colliEnemies = this.isColliding(bottleTrow, enemies);
        if (colliEndboss) {
            return 1
        }
        if (colliEnemies) {
            return 2
        }
    }

    //Hilfstestversion
    isColliding(obj1, obj2) {
        return obj1.x + obj1.width > obj2.x &&
            obj1.x < obj2.x + obj2.width &&
            obj1.y + obj1.height > obj2.y &&
            obj1.y < obj2.y + obj2.height;
    }


    getCollisionEndboss(endboss) {
        const charRight = this.x + this.width;
        const charLeft = this.x;
        const charTop = this.y;
        const charBottom = this.y + this.height;

        const bossRight = endboss.x + endboss.width;
        const bossLeft = endboss.x;
        const bossTop = endboss.y;
        const bossBottom = endboss.y + endboss.height;

        const horizontalOverlap = charRight > bossLeft && charLeft < bossRight;
        const verticalOverlap = charBottom > bossTop && charTop < bossBottom;

        if (horizontalOverlap && verticalOverlap) {
            const charCenter = this.x + this.width / 2;
            const bossCenter = endboss.x + endboss.width / 2;

            if (charCenter < bossCenter || charCenter > bossCenter) {
                return true;
            }
        }
        return false;
    }





    hit() {
        const now = Date.now();
        // Wenn letzter Hit vorhanden und noch nicht 2 Sekunden vergangen sind → Sperre
        if (now - this.lastHit < 100) {
            return;
        }
        // Nun ausführen und Timestamp updaten
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
            this.isDead();
        }
        this.lastHit = now;
    }



    //Charater ist verletzt
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 500;
        return timepassed < 1;
    }


    //Charatuer ist tot
    isDead() {
        return this.energy == 0;
    }

}

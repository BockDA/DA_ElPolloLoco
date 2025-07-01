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
        const b = 5, box = o => ({
            l: o.x + o.offset.left - b,
            r: o.x + o.width - o.offset.right + b,
            t: o.y + o.offset.top - b,
            b: o.y + o.height - o.offset.bottom + b
        });
        const a = box(this), m = box(mo);
        return a.r > m.l && a.l < m.r && a.b > m.t && a.t < m.b;
    }




    getCollisionBottle(bottleTrow, enemies, endboss) {
        if (this.isColliding(bottleTrow, endboss)) return 1;
        if (this.isColliding(bottleTrow, enemies)) return 2;
    }


    isColliding(a, b) {
        return a.x + a.width > b.x &&
            a.x < b.x + b.width &&
            a.y + a.height > b.y &&
            a.y < b.y + b.height;
    }


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

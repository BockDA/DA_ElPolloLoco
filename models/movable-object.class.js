class MovableObject extends DrawableObject {
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



    playAnmimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImage++;
    }



    moveRight() {
        this.x += this.speed;
        this.playAnmimation(this.IMAGES_WALKING);
    }

    moveLeft() {
        this.x -= this.speed;
        this.playAnmimation(this.IMAGES_WALKING);
    }



    //collision erkennen
    isColliding(enemy) {
        const isCollision =
            this.x + this.width > enemy.x &&
            this.y + this.height > enemy.y &&
            this.x < enemy.x &&
            this.y < enemy.y + enemy.height;


        const bottomCollision = false;
        return isCollision && !bottomCollision;
    }

    //collision von oben
    isCollidingButtom(enemy) {
        return false;
    }



    getCollisionSide(enemy) {
        let r1 = this;
        let r2 = enemy;

        const dx = r1.x + r1.width / 2 - (r2.x + r2.width / 2);
        const dy = r1.y + r1.height / 2 - (r2.y + r2.height / 2);
        const width = (r1.width + r2.width) / 2;
        const height = (r1.height + r2.height) / 2;

        const crossWidth = width * dy;
        const crossHeight = height * dx;

        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                if (crossWidth > -crossHeight) {
                    console.log("Kollision: unten");
                } else {
                    console.log("Kollision: links");
                }
            } else {
                if (crossWidth > -crossHeight) {
                    console.log("Kollision: rechts");
                } else {
                    console.log("Kollision: oben");
                }
            }
        }
    }









    //Zusammenstoss noch Collision
    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }



    //Charater ist verletzt
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }



    //Charatuer ist tot
    isDead() {
        return this.energy == 0;
    }



    dead() {
        console.log("Zeichene Bild");

        // thid.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    }


}
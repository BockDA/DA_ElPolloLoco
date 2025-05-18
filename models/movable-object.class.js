class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collisonRight = false;




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



    getCollisionSide(enemy) {


        let r1 = this;
        let r2 = enemy;

        const dx = (r1.x + r1.width / 2) - (r2.x + r2.width / 2);
        const dy = (r1.y + r1.height / 2) - (r2.y + r2.height / 2);
        const overlapX = (r1.width + r2.width) / 2 - Math.abs(dx);
        const overlapY = (r1.height + r2.height) / 2 - Math.abs(dy);

        // Nur wenn überhaupt Kollision
        if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
                this.collisonRight = false;
                // horizontale Kollision
                if (dx > 0) {
                    console.log("Kollision: links");
                    return false;
                } else {
                    this.collisonRight = true;
                    console.log("Kollision: rechts! ", this.collisonRight);
                    return true;

                }
            } else {


                // vertikale Kollision → jetzt prüfen wir die genaue Richtung
                const r1Bottom = r1.y + r1.height;
                const r2Top = r2.y;

                if (r1Bottom <= r2Top + 10) {
                    // r1 trifft mit Unterkante auf Oberkante von r2
                    console.log("Kollision: unten");
                    return false
                } else {


                    console.log("Kollision: oben ", this.collisonRight);
                    if (!this.collisonRight) {
                        this.collisonRight = true;
                        this.collisionTop(enemy);
                    }

                }
            }
        }

    }


    collisionLeft() {
        console.log("Collison LEFT");
    }


    collisionTop(enemy) {
        enemy.dead = true;
        enemy.deadCollision();
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
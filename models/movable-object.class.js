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
        const isBootle = enemy instanceof Bootle;
        if (!isBootle && enemy.dead) return false;
        return (
            this.x + this.width > enemy.x &&
            this.y + this.height > enemy.y &&
            this.x < enemy.x &&
            this.y < enemy.y + enemy.height &&
            this.y - this.height == -70
        )

    }


    getcollisionBottom(enemy) {

        const tolerance = 50;
        const minX = this.x - tolerance;
        const maxX = this.x + tolerance;
        return (
            (enemy.x >= minX && enemy.x <= maxX) && this.y < 30);

    }


    getCollisionCoins(coins) {
        const tolerance = 50;
        return (
            this.y <= coins.y + coins.height && this.x + 20 >= coins.x
        );
    }



    hit() {
        const now = Date.now();
        // Wenn letzter Hit vorhanden und noch nicht 2 Sekunden vergangen sind → Sperre
        if (now - this.lastHit < 1000) {
            return;
        }
        // Nun ausführen und Timestamp updaten
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
            console.log("Keine Energie mehr übrig!");
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



    dead() {
        console.log("Zeichne Bild");

        // thid.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    }

    /*
        createBootle() {
        console.log("F gedrüxckt");
        let newbottle = new BootleCollectible(this.character.x + 200);
        this.bootlecollectible.push(newbottle);
        }
    */


}
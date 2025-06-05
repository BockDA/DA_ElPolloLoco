class World {

    character = new Character();
    chicken = new Chicken();


    level = level1;
    endboss = level1.endboss[0];
    enemies = level1.enemies;
    clouds = level1.clouds;
    coins = level1.coins;
    bootle = level1.bootle;
    bootleColli = new Bootle();
    backroundObjects = level1.backroundObjects;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    statusBar = new StatusBar();
    coinsBar = new CoinsBar();
    bootleBar = new BoodleBar();

    throwableObjects = [new ThrowableObject()];

    bottleScore = 0;
    coinsScore = 0;




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.createNewBootle();

    }

    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisionsRight();
            this.checkCollisionBottom();
            this.checkCollisionCoins();
            this.checkThrowObjects();
            this.checkCollisonBootle();
            this.checkCharaterPos();
        }, 100);
    }





    //Collision mit Chicken von rechts
    checkCollisionsRight() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.getCollisionSide(enemy)) {  //ist true oder false
                //console.log(("Kollision rechts"));
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);

            }

        });
    }


    //Collision mit Chicken von oben
    checkCollisionBottom() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.getcollisionBottom(enemy)) {
                //console.log("Kollison von Oben");
                enemy.dead = true;
                enemy.deadCollision();
            }
        });
    }




    //Collision mit Münze
    checkCollisionCoins() {
        this.level.coins.forEach((coins) => {
            if (this.character.getCollisionCoins(coins)) {
                this.coinsCollected(coins);
                // this.coinsScoreWrite();

            }
        });
    }


    //Kollision mit Flasche
    checkCollisonBootle() {
        this.level.bootle.forEach((bootle) => {
            if (this.character.getCollisionSide(bootle)) {
                this.bottleCollected(bootle);
                this.bottleScoreWrite(true);

            };

        });
    }


    //wenn Charater an bestimmter Position dann losgehen
    checkCharaterPos() {
        if (this.character.x > 2350 && this.keyboard.RIGHT) {
            this.endboss.start = true;

        }
    }




    //Flaschen beu Kollisoon verschieben und 
    bottleCollected(bootle) {
        bootle.y = 0;
        bootle.x = 0;
    }


    //Anzahl der Bottle schreiben
    bottleScoreWrite(value) {
        if (value) {
            this.bottleScore++
        } else {
            this.bottleScore--
        }
        this.bootleBar.setBootle(this.bottleScore);
    }


    coinsCollected(coins) {
        // console.log("Verschiebe Coins ", this.y);
        coins.x = 0;
        coins.y = 0;
        this.coinsScoreWrite();

    }


    //Anzahl der Coins schreiben
    coinsScoreWrite() {
        this.coinsScore++;
        this.coinsBar.setCoins(this.coinsScore);
    }




    //werfe Flasche
    checkThrowObjects() {
        if (this.keyboard.D && this.bottleScore > 0) {
            //console.log("Werfe Flasche ", this.keyboard.D);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleScoreWrite(false)
        }
    }


    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addToMap(this.endboss);


        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bootle);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bootleBar);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => {
            this.draw();
        });
    }


    addObjectsToMap(objekts) {
        objekts.forEach(o => [
            this.addToMap(o)
        ]);
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    //Erzeuege neue Flasche 
    createNewBootle() {
        let i = 0;
        let u = 0;
        setInterval(() => {
            i++
            u += 200;
            if (i < level1.maxBottle) {
                let newbottle = new Bootle(u + (Math.random() * 250));
                this.bootle.push(newbottle);
            }

        }, 100);
    }




}

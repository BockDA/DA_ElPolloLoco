class World {
    character = new Character();
    chicken = new Chicken();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    coinscollectible = level1.coinscollectible;
    bootlecollectible = level1.bootlecollectible;
    backroundObjects = level1.backroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [new ThrowableObject()];
    coins = new Coins();
    bootle = new Boodle();


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
            this.checkThrowObjects();
            this.checkCollisions();

            //sammlen bootle
            //sammeln coins
        }, 100);
    }





    //prüfen auf Collision
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.getCollisionSide(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }

        });
    }



    checkThrowObjects() {
        if (this.keyboard.D) {
            console.log("Werfe Flasche ", this.keyboard.D);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }





    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.coinscollectible);
        this.addObjectsToMap(this.bootlecollectible);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coins);
        this.addToMap(this.bootle);
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



    createNewBootle(index) {
        console.log("Zählr");
        setInterval(() => {
            console.log("index =10");
            console.log("F gedrüxckt");
            let newbottle = new BootleCollectible(this.character.x + 700);
            this.bootlecollectible.push(newbottle);
        }, 2000);
    }


}

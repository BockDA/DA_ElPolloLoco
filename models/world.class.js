class World {
    character = new Character(world);
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
    endbossBar = new EndbossBar();
    throwableObjects = [new ThrowableObject()];
    bottleScore = 0;
    coinsScore = 0;
    endboosScore = 5;
    gameOn = true;
    soundBottleCollect = 'audio/bottlecollect.mp3';
    soundEndOffGame = 'audio/game_over.mp3';
    soundWinGame = 'audio/gamewin.mp3'
    soundCoinsCollect = 'audio/coinCollect.mp3';



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.sound = new Sound();
        this.draw();
        this.setWorld();
        this.run();
        this.createNewBootle();

    }

    /**
     *start world
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     *start various functions that run in the interval, e.g. check collisions
     * @returns
     */
    run() {
        if (!this.gameOn) return;
        this.intervalId = setInterval(() => {
            this.checkCollisionsRight();
            this.checkCollisionBottom();
            this.checkCollisionCoins();
            this.checkThrowObjects();
            this.checkCollisonBootle();
            this.checkCollisonBottleTrow();
            this.checkCharaterPos();
            this.checkCollisonEndboss();
        }, 70);

    }

    /**
     *collision with chicken right check in interval of run
     */
    checkCollisionsRight() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.getCollisionSide(enemy)) {  //ist true oder false
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     *collision with chicken check from above in the interval of run
     */
    checkCollisionBottom() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.getcollisionBottom(enemy)) {
                enemy.dead = true;
                enemy.deadCollision();
            }
        });
    }

    /**
     *collision with coin check in interval of run
     */
    checkCollisionCoins() {
        this.level.coins.forEach((coins) => {
            if (this.character.getCollisionCoins(coins)) {
                this.coinsCollected(coins);
                this.coinsScoreWrite();
                this.sound.soundPlay(this.soundCoinsCollect, 1, false);
            }
        });
    }


    /**
     *collision with bottle check in interval of run
     */
    checkCollisonBootle() {
        this.level.bootle.forEach((bootle) => {
            if (this.character.getCollisionSide(bootle)) {
                this.bottleCollected(bootle);
                this.bottleScoreWrite(true);
            };
        });
    }

    /**
     *Check collision with thrown bottle in interval of run
     */
    checkCollisonBottleTrow() {
        if (this.bottleTrow) {
            let colli = this.throwableObjects[0].getCollisionBottle(this.bottleTrow, this.level.enemies, this.endboss);
            if (colli == 1) {
                this.endboss.start = true;
                this.endboss.hurtEndboss();
                this.bottleTrow = false;
                this.endbossScoreWrite();
            }
            if (colli == 2) {
            }
            if (this.endboosScore == 0) this.endBossNoLive();
        }
    }

    /**
     *Reduce the Enboss's life when hit with a bottle
     */
    endbossScoreWrite() {
        this.endboosScore--
        this.endbossBar.setEndboosBar(this.endboosScore);
    }

    /**
     *if no life left from final boss game won
     */
    endBossNoLive() {
        this.bottleTrow = false
        this.endboss.start = false;
        this.clearAllInterval();
        this.endboss.deadEndboss();
        setTimeout(() => {
            this.gameWon();
        }, 2000);
    }

    /**
     *if character is at a certain position then he should go
     */
    checkCharaterPos() {
        if (this.character.x > 2250 && this.keyboard.RIGHT) {
            this.endboss.animateAttack();
            this.endboss.start = true;
        }
    }

    /**
     * If collision with final boss is game lost
     */
    checkCollisonEndboss() {
        if (this.character.getCollisionEndboss(this.endboss)) {
            let count = 0;
            setInterval(() => {
                if (count <= 10) {
                    this.character.playAnmimation(this.character.IMAGES_DEAD);
                    this.character.y += 5;
                    count++;
                } else {
                    this.endOfGame();
                }
            }, 100);
        }
    }

    /**
     *Make bottles disappear when colliding with the final boss (when he leaves)
     * @param {string} bootle
     */
    bottleCollected(bootle) {
        this.sound.soundPlay(this.soundBottleCollect, 1, false);
        bootle.y = 800;
    }

    /**
     *write the number of bottles collected
     * @param {string} value
     */
    bottleScoreWrite(value) {
        if (value) {
            this.bottleScore++
        } else {
            this.bottleScore--
        }
        this.bootleBar.setBootle(this.bottleScore);
    }

    /**
     *write the number of coins collected
     */
    coinsScoreWrite() {
        this.coinsScore++;
        this.coinsBar.setCoins(this.coinsScore);
    }

    /**
     *when coins are collected they disappear
     * @param {string} coins
     */
    coinsCollected(coins) {
        coins.y = 800;
    }

    /**
     *throw bottle
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottleScore > 0) {
            this.bottleTrow = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection, this);
            this.throwableObjects.push(this.bottleTrow);
            this.bottleScoreWrite(false);
        }
    }

    /**
     *draw the object in the game
     * @returns
     */
    draw() {
        if (!this.gameOn) return;
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
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    /**
     * add objects to the map
     * @param {string} objekts 
     */
    addObjectsToMap(objekts) {
        objekts.forEach(o => [
            this.addToMap(o)
        ]);
    }

    /**
     * add object
     * @param {string} mo - Objekt z.b. chicken,smallchicken 
     */
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

    /**
     * rotate object when changing direction
     * @param {string} mo -  Objekt z.b. chicken,smallchicken 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * rotate object back
     * @param {string} mo - Objekt z.b. chicken,smallchicken 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     *create new bottle
     */
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

    /**
     * game end
     */
    endOfGame() {
        this.sound.soundPlay(this.soundEndOffGame, 1, false);
        this.gameOn = false;
        this.cleanup();
        this.endPictureWrite('img/You won, you lost/Game Over.png')
        document.getElementById('refreshtBtn').style.display = 'flex';
    }

    /**
     * game was won by character
     */
    gameWon() {
        this.sound.soundPlay(this.soundWinGame, 1, false);
        this.gameOn = false;
        this.cleanup();
        this.endPictureWrite('img/You won, you lost/You Win A.png');
        document.getElementById('refreshtBtn').style.display = 'flex';
    }

    /**
     * final image character either won or lost
     * @param {string} picture - picture which was handed over, won or lost
     */
    endPictureWrite(picture) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const img = new Image();
        img.src = picture;
        img.onload = () => {
            this.ctx.drawImage(img, 20, 20, this.canvas.width - 2 * 20, this.canvas.height - 2 * 20);
        };
    }

    /**
     * call stop all intervals and call delete array
     */
    cleanup() {
        this.clearAllInterval();
        this.arraysClear();
    }

    /**
     * all intervals that have been started are run through in a loop
     */
    clearAllInterval() {
        for (let i = 0; i < 99999; i++) window.clearInterval(i);
        song.pause();
    }

    /**
     * empty the required array
     */
    arraysClear() {
        this.character = [];
        this.level = [];
        this.endboss = [];
        this.enemies = [];
        this.clouds = [];
        this.coins = [];
        this.bootle = [];
        this.backroundObjects = [];
        this.newbottle = [];
    }
}

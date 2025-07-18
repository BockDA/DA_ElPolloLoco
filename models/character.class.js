class Character extends MovableObject {
    width = 135;
    height = 250;
    y = 180;

    speed = 15;
    world;
    sleep = false;
    isJumpingAnimation = false;
    hitStatus = false;
    soundSleep = 'audio/snoring.mp3';
    soundWalking = 'audio/walkingChar.mp3';
    soundJump = 'audio/jump.mp3';
    soundHurt = 'audio/hurt.mp3';


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]


    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]


    offset = {
        top: 100,
        left: 30,//10,
        right: 60,//50,
        bottom: 105,//105
    }

    constructor(keyboard, world) {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.keyboard = keyboard;
        this.world = world;
        this.sound = new Sound();
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.startAnimation();
        this.animate();
    }

    /**
     *animation for sleep check everything 5 sec
     */
    startAnimation() {
        setInterval(() => {
            if (this.y < 180 && !this.hitStatus && !this.jump) return
            this.sleep = true
        }, 5000);
    }

    /**
     *the animation of the character
     */
    animate() {
        setInterval(() => {
            this.sleeping();
            this.dead();
            this.hurt();
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING, 6)
                this.isJumpingAnimation = true;
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) this.moveRightKey();
            if (this.world.keyboard.LEFT && this.x > 0) this.moveLeftKey();
            if (this.world.keyboard.SPACE && this.energy > 0) this.spaceKey();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 20);
    }

    /**
     * call sleep animation
     */
    sleeping() {
        if (this.sleep && !this.isJumpingAnimation) {
            this.playAnimation(this.IMAGES_LONG_IDLE, 10);
            this.sound.soundPlay(this.soundSleep, 0.5, false);
        } else {
            this.playAnimation(this.IMAGES_IDLE, 10);
            this.sound.stopSound(this.soundSleep);
        }
    }

    /**
     * if character is dead then call the animation
     */
    dead() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD, 10);
            this.y += 5;
            setTimeout(() => {
                this.world.endOfGame();
            }, 3000);
        }
    }

    /**
     * if character is injured or has had a collision call this function
     */
    hurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT, 10);
            this.sound.soundPlay(this.soundHurt, 1, false);
        }
    }


    /**
       *When boss collides with enemy, play injured animation
       */
    hit() {
        this.sleep = false;
        const Timenow = Date.now();
        if (Timenow - this.lastHit < 100) {
            return;
        }
        this.energy -= 2;
        if (this.energy <= 0) {
            this.energy = 0;
            this.isDead();
        }
        this.lastHit = Timenow;
    }


    /**
     * move right with the arrow key pressed
     */
    moveRightKey() {
        this.sleep = false;
        this.moveRight();
        this.otherDirection = false;
        this.sound.soundPlay(this.soundWalking, 1, false);
    }


    /**
     * move left with the arrow key pressed
     */
    moveLeftKey() {
        this.moveLeft();
        this.sleep = false;
        this.otherDirection = true;
        this.sound.soundPlay(this.soundWalking, 1, false);
    }


    /**
     * jump with the space key pressed
     */
    spaceKey() {
        this.sleep = false;
        if (this.isAboveGround()) return
        this.speedY = 30;
        this.currentImage = 0;
        this.isJumpingAnimation = false;
        this.sound.soundPlay(this.soundJump, 1, false);
    }


}

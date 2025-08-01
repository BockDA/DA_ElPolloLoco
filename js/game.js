let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let startImage = new Image();
startImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';
let song = new Audio('./audio/startmusic.mp3')
let music = false;
let mute = "on";
let startTime = 0;
let maxTimeTrow = 200;
let maxTimeJump = 50;


/**
 *function to check if a Resize device is being used
 */
function checkResize() {
    const querformat = window.innerWidth > window.innerHeight;
    if (querformat) {
        document.getElementById("rotateDisplay").style.display = "none";
    } else {
        document.getElementById("rotateDisplay").style.display = "flex";
    }
}


/**
 *checks whether the screen is mobile or desktop and starts the function for evaluation
 */
window.addEventListener('resize', () => {
    checkResize();
});


/**
 *start function that is called in the index.html
 */
function init() {
    mute = localStorage.getItem('mute');
    muteIconWrite(mute);
    initLevel();
    canvas = document.getElementById('canvas');
    document.getElementById('startBtn').style.display = 'flex';
    document.getElementById('infoBtn').style.display = 'flex';
    document.getElementById('navigation').style.display = 'none';
    playBtnChange('block');
    ctx = canvas.getContext('2d');
    if (this.world instanceof World) {
        this.world.cleanup();
        this.world = null;
    }
    drawStartPicture();
}

/**
 *starts the game
 */
function startGame() {
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('infoBtn').style.display = 'none';
    document.getElementById('navigation').style.display = 'flex';
    playBtnChange('none');
    initLevel();
    this.world = new World(canvas, keyboard);
    playMusik();
}

/**
 * show or hide game button
 * @param {string} flag - flex or none
 */
function playBtnChange(flag) {
    const touchDevide = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!touchDevide) {
        document.querySelectorAll('.gameBtn').forEach(btn => {
            btn.style.display = flag;
        })
    }
}

/**
 *draw the start screen in canvas
 */
function drawStartPicture() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
}

/**
 *checks if the mute button has been pressed and writes the value to localstorage, and removes the focus from the mute button
 */
function muteMusik() {
    mute = (mute === "on") ? "off" : "on";
    localStorage.setItem('mute', mute);
    muteIconWrite(mute);
    document.activeElement.blur();
}

/**
 *changes the mute icon depending on the state
 * @param {string} mute -either on or off
 */
function muteIconWrite(mute) {
    if (mute == "off") {
        document.getElementById('musicPlayImg').src = 'img/icons/volume-off.png';
    } else {
        document.getElementById('musicPlayImg').src = 'img/icons/volume-on.png';
    }
}

/**
 *plays the music when mute is on
 */
function playMusik() {
    setInterval(() => {
        if (mute == "on") {
            song.play();
            song.volume = 0.05;
        } else {
            song.pause();
        }
    }, 100);
}

/**
 *restarts the game
 */
function refreshGame() {
    if (this.world) {
        this.world.gameOn = false;
        this.world.cleanup();
    }
    init();
}


/**
 *checking keyboard input
 */
window.addEventListener('keydown', (event) => {
    const keyTime = Date.now();
    if (event.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (event.key == ' ') {
        if (keyTime - startTime >= maxTimeJump) {
            keyboard.SPACE = true;
            startTime = keyTime;
        }
    }
    if (event.key == 'd') {
        if (keyTime - startTime >= maxTimeTrow) {
            keyboard.D = true;
            startTime = keyTime;
        }
    }
});

/**
 *checking keyboard input
 */
window.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (event.key == ' ') {
        keyboard.SPACE = false;
    }
    if (event.key == 'd') {
        keyboard.D = false;
    }
});

/**
 *Check inputs on touch
 */
window.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    touchElement = element?.closest('[id]');
    if (!touchElement) return;
    switch (touchElement.id) {
        case 'touchRight': keyboard.RIGHT = true; break;
        case 'touchLeft': keyboard.LEFT = true; break;
        case 'touchJump': keyboard.SPACE = true; break;
        case 'touchThrow': keyboard.D = true; break;
    }
});

/**
 *Check inputs on touch
 */
window.addEventListener('touchend', () => {
    if (!touchElement) return;
    switch (touchElement.id) {
        case 'touchRight': keyboard.RIGHT = false; break;
        case 'touchLeft': keyboard.LEFT = false; break;
        case 'touchJump': keyboard.SPACE = false; break;
        case 'touchThrow': keyboard.D = false; break;
    }
});

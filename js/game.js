let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let startImage = new Image();
startImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';
let song = new Audio('./audio/startmusic.mp3')
let music = false;
let mute = "on";

/**
 *function to check if a mobile device is being used
 */


function checkMobil() {
    const touch = hasTouch = navigator.maxTouchPoints > 1;
    const mobil = /Mobi|Android|iPhone|iPad|iPod|Tablet|PlayBook|Silk|Kindle|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const querformat = window.innerWidth > window.innerHeight;
    if (mobil) {
        console.log("Mobile Version");
        document.body.classList.add('mobilVersion');
        if (querformat) {
            document.getElementById("rotateDisplay").style.display = "none";
        } else {
            document.getElementById("rotateDisplay").style.display = "flex";
        }

    } else {
        console.log("Desktop  Version");
        document.body.classList.remove('mobilVersion');
        document.getElementById("rotateDisplay").style.display = "none";
    }

    if (touch) {
        console.log("Label rot");

        document.querySelectorAll("label").forEach(label => {
            label.classList.add("touch_Version");
        });
    }
}



/**
 *checks whether the screen is mobile or desktop and starts the function for evaluation
 */
window.addEventListener('resize', () => {
    checkMobil();
});

/**
 *start function that is called in the index.html
 */
function init() {
    checkMobil();
    mute = localStorage.getItem('mute');
    muteIconWrite(mute);
    initLevel();
    canvas = document.getElementById('canvas');
    document.getElementById('refreshtBtn').style.display = 'none';
    document.getElementById('startBtn').style.display = 'flex';
    document.getElementById('impressumBtn').style.display = 'flex';
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
    document.getElementById('impressumBtn').style.display = 'none';
    initLevel();
    this.world = new World(canvas, keyboard);
    playMusik();
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
        document.getElementById('musicPlay').src = './img/icons/volume-off.png';
    } else {
        document.getElementById('musicPlay').src = './img/icons/volume-on.png';
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
    if (event.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (event.key == ' ') {
        keyboard.SPACE = true;
    }
    if (event.key == 'd') {
        keyboard.D = true;
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

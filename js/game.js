let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let startImage = new Image();
startImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';
let song = new Audio('./audio/startmusic.mp3')
let music = false;
let mute = "on";




function init() {
    mute = localStorage.getItem('mute');
    muteIconWrite(mute);
    initLevel();
    canvas = document.getElementById('canvas');
    document.getElementById('refreshtBtn').style.display = 'none';
    document.getElementById('startBtn').style.display = 'flex';
    ctx = canvas.getContext('2d');

    if (this.world instanceof World) {
        this.world.cleanup();
        this.world = null;
    }
    drawStartPicture();
}


function startGame() {
    document.getElementById('startBtn').style.display = 'none';
    initLevel();
    this.world = new World(canvas, keyboard);
    playMusik();
}


function drawStartPicture() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
}



function muteMusik() {
    mute = (mute === "on") ? "off" : "on";
    localStorage.setItem('mute', mute);
    muteIconWrite(mute);
    document.activeElement.blur();

}


function muteIconWrite(mute) {
    if (mute == "off") {
        document.getElementById('musicPlay').src = './img/icons/volume-off.png';
    } else {
        document.getElementById('musicPlay').src = './img/icons/volume-on.png';
    }
}



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


function refreshGame() {
    //this.world.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.world) {
        this.world.gameOn = false;
        this.world.cleanup();
    }

    init();

}

window.addEventListener('keydown', (event) => {

    if (event.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (event.key == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (event.key == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (event.key == ' ') {
        keyboard.SPACE = true;
    }

    if (event.key == 'd') {
        keyboard.D = true;
    }

    if (event.key == 'f') {
        keyboard.F = true;
    }

});


window.addEventListener('keyup', (event) => {

    if (event.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (event.key == 'ArrowUp') {
        keyboard.UP = false;
    }
    if (event.key == 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (event.key == ' ') {
        keyboard.SPACE = false;
    }
    if (event.key == 'd') {
        keyboard.D = false;
    }

    if (event.key == 'f') {
        keyboard.F = false;
    }


});

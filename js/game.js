let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let startImage = new Image();
startImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';
let song = new Audio('./audio/startmusic.mp3')
let music = false;
let mute = true;


function init() {

    initLevel();

    canvas = document.getElementById('canvas');
    document.getElementById('refreshtBtn').style.display = 'none';
    document.getElementById('startBtn').style.display = 'flex';
    ctx = canvas.getContext('2d');

    if (this.world instanceof World) {
        console.log("World vorhanden");
        this.world.cleanup();
        console.log("World löschen");
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

    if (!mute) {
        document.getElementById('musicPlay').src = './img/icons/volume-off.png';
        mute = true;

    } else {
        mute = false;
        document.getElementById('musicPlay').src = './img/icons/volume-on.png';
    }
}


function playMusik() {
    setInterval(() => {

        if (!mute) {
            song.play();
            song.volume = 0.05;
            //song.loop();

        } else {

            song.pause();
        }

    }, 100);
}


function refreshGame() {
    this.gameOn = false;
    this.world.cleanup();
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

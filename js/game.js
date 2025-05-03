let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    console.log("Starte");

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);


    console.log("My charater ist ", world.character);

}


window.addEventListener('keydown', (event) => {
    console.log(event);

    if (event.key == 39) {
        keyboard.RIGHT = true;
    }
    if (event.key == 37) {
        keyboard.LEFT = true;
    }
    if (event.key == 38) {
        keyboard.UP = true;
    }
    if (event.key == 40) {
        keyboard.DOWN = true;
    }
    if (event.key == 32) {
        keyboard.SPACE = true;
    }

});


window.addEventListener('keyup', (event) => {
    console.log(event);

    if (event.key == 39) {
        keyboard.RIGHT = false;
    }
    if (event.key == 37) {
        keyboard.LEFT = false;
    }
    if (event.key == 38) {
        keyboard.UP = false;
    }
    if (event.key == 40) {
        keyboard.DOWN = falseue;
    }
    if (event.key == 32) {
        keyboard.SPACE = false;
    }

});


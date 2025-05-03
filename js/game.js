let canvas;

let world;



function init() {
    console.log("Starte");

    canvas = document.getElementById('canvas');
    world = new World(canvas);


    console.log("My charater ist ", world.character);


}


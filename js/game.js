let canvas;
let ctx;
let charcter = new Image();


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    charcter.src = "../img/2_character_pepe/2_walk/W-21.png"

    setTimeout(function () {
        ctx.drawImage(charcter, 20, 20, 50, 150);

    }, 1000);

}


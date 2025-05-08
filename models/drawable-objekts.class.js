class DrawableObjects {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    //Bilder in ein  Objekt laden 
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            //  img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });

    }


    //Bild aus Array holen    
    loadImage(path) {
        this.img = new Image();  //Hier wird ein HTML Image Element erstellen
        this.img.src = path;
    }


    //Zeichne Bild auf Canavas Fläche 
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    //Rahmen zeichnen 
    drawFrame(ctx) {
        if (this instanceof Chicken || this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

}
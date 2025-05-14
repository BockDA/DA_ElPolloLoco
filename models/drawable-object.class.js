class DrawableObject {
    x = 120;
    y = 280;

    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;



    //Bider in ein Object laden
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;

    }



    //Bild aus Array holöen    
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();//Hier wird ein HTML Image Element erstellen
            img.src = path;
            this.imageCache[path] = img;
        });

    }


    //Zeichne Bild auf Canvas Fläche 
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }



    //Rahmen zeichnen
    drawFrame(ctx) {
        if (this instanceof Chicken || this instanceof Character || this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();


            /*Roter Rahmen
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x - 10, this.y - 10, this.width + 20, this.height + 20);
            ctx.stroke();
            */

        }
    }












}
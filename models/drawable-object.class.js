class DrawableObject {
    x = 120;
    y = 280;

    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     *Load picture into an object
     * @param {string} path - directory where the image is located
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     *load image from array
     * @param {string} arr -embedded array
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     *draw picture on canvas
     * @param {string} ctx - canvas element
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     *framework for developers
     * @param {*} ctx- canvas element
     */
    drawFrame(ctx) {
        if (this instanceof Chicken || this instanceof ChickenSmall || this instanceof Character || this instanceof Coins || this instanceof Bootle || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            // ctx.rect(this.x + 20, this.y + 20, this.width - 40, this.height - 40);
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }
}

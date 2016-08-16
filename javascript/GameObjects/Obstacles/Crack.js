class Crack extends GameObject {
    constructor(position, dimensions) {
        super(position, dimensions);
        this.image = images["crack"];
    }

    update() {
        super.update();
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
    }

}
Crack.SIZE = 90;

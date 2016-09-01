class DewDrop extends GameObject {
    constructor(position, dimensions) {
        super(position, dimensions);
        //this.image = images["crack"];
        this.calculateCollisionBounds();
    }

    update(timePassed) {
        super.update(timePassed);
    }

    draw() {
        ctx.drawImage(images["dewdrop"], this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
    }

    calculateCollisionBounds() {
        var position = this.position;
        var dimensions = this.dimensions;
        this.bounds = {
            center: new Vector2D(
                Math.addDec(position.x, Math.divideDec(dimensions.x, 2)),
                Math.subtractDec(Math.addDec(position.y, dimensions.y), Math.divideDec(dimensions.x, 2))
            ),
            radius: Math.divideDec(dimensions.x, 2)
        };
    }

}
DewDrop.SIZE = 42;

class Crack extends GameObject {
    constructor(position, dimensions) {
        super(position, dimensions);
        //this.image = images["crack"];
        this.calculateCollisionBounds();
        this.reached = false;
    }

    update(timePassed) {
        super.update(timePassed);
    }

    draw() {
        ctx.drawImage(images["crack"], this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
        /*ctx.beginPath();
    	ctx.arc(this.bounds.center.x, this.bounds.center.y, this.bounds.radius, 0, 2*Math.PI, false);
    	ctx.fill();*/
    }

    calculateCollisionBounds() {
        var offset = 27;
        var position = this.position.AddVector(new Vector2D(offset, offset));
        var dimensions = this.dimensions.SubtractVector(new Vector2D(offset * 2, offset * 2));
        this.bounds = {
            center: new Vector2D(
                Math.addDec(position.x, Math.divideDec(dimensions.x, 2)),
                Math.subtractDec(Math.addDec(position.y, dimensions.y), Math.divideDec(dimensions.x, 2))
            ),
            radius: Math.divideDec(dimensions.x, 2)
        };
    }

}
Crack.SIZE = 90;

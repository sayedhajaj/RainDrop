class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    AddVector(vector2) {
        return new Vector2D(Math.addDec(this.x, vector2.x), Math.addDec(this.y, vector2.y));
    }

    Multiply(scalar) {
        return new Vector2D(Math.multDec(this.x, scalar), Math.multDec(this.y, scalar));
    }

    SubtractVector(vector2) {
        return new Vector2D(Math.subtractDec(this.x, vector2.x), Math.subtractDec(this.y, vector2.y));
    }

    Length() {
        return Math.hypot(this.x, this.y);
    }

    Normalize() {
    	var length = this.Length();
        return new Vector2D(Math.divideDec(this.x, length), Math.divideDec(this.y, length));
    }

    DotProduct(vector2) {
    	return Math.addDec(Math.multDec(this.x, vector2.x), Math.multDec(this.y, vector2.y));
    }

    to3D() {
        return new Vector3D(this.x, this.y, 1);
    }

}

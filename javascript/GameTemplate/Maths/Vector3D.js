class Vector3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    AddVector(vector2) {
        return new Vector3D(Math.addDec(this.x, vector2.x), Math.addDec(this.y, vector2.y), Math.addDec(this.z, vector2.z));
    }

    Multiply(scalar) {
        return new Vector3D(Math.multDec(this.x, scalar), Math.multDec(this.y, scalar), Math.multDec(this.z, scalar));
    }

    SubtractVector(vector2) {
        return new Vector3D(Math.subtractDec(this.x, vector2.x), Math.subtractDec(this.y, vector2.y), Math.subtractDec(this.z, vector2.z));
    }

    Length() {
        return Math.hypot(this.x, this.y, this.z);
    }

    Normalize() {
    	var length = this.Length();
        return new Vector3D(Math.divideDec(this.x, length), Math.divideDec(this.y, length), Math.divideDec(this.z, length));
    }

    DotProduct(vector2) {
        return Math.addDec(Math.addDec(Math.multDec(this.x, vector2.x), Math.multDec(this.y, vector2.y)), Math.multDec(this.z, vector2.z));
    }

    to2D() {
        return new Vector2D(this.x, this.y);
    }

}

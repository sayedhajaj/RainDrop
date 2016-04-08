function Vector(a, b){
    this.a = a;
    this.b = b;
}

Vector.prototype.AddVector = function (vector2) {
    return new Vector(this.a+vector2.a, this.b+vector2.b);
};

Vector.prototype.Multiply = function(scalar) {
    return new Vector(this.a*scalar, this.b*scalar);
};

Vector.prototype.SubtractVector = function (vector2) {
    return new Vector(this.a-vector2.a, this.b-vector2.b);
};

Vector.prototype.Length = function () {
    return Math.hypot(this.a, this.b);
};

Vector.prototype.Normalize = function (){
	var length = this.Length();
	this.a/=length;
	this.b/=length;
};

Vector.prototype.DotProduct = function(vector2) {
	return this.a*vector2.a + this.b*vector2.b;
}
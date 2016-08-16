function GameObject(position, dimensions){
    this.position = position;
    this.dimensions = dimensions;
    this.velocity = new Vector2D(0, 0);
    this.transform = Matrix3D.Identity();
};

GameObject.prototype.update = function(timePassed){
    this.position = this.position.AddVector(this.velocity);
};

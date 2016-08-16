function Raindrop(x, y, imgNum, height){
    this.position = new Vector2D(x, y);
    this.height = 10;
    this.angle=0;
    this.angleSpeed = 0;
    this.image = images["player"];
    this.dimensions = new Vector2D(this.image.width, this.image.height)
}

Raindrop.prototype.update = function(){
    if(this.angleSpeed<0) if(this.angle>-45+this.angleSpeed) this.angle+=this.angleSpeed;
    if(this.angleSpeed>0) if(this.angle<45-this.angleSpeed) this.angle+=this.angleSpeed;
};


Raindrop.prototype.draw = function(){
    ctx.save();
	ctx.translate(this.position.a, this.position.b);
	ctx.rotate(this.angle * Math.PI/180);
    ctx.drawImage(this.image, -this.dimensions.x/2, -this.dimensions.y/2, this.dimensions.x, this.dimensions.y);
	ctx.restore();


};

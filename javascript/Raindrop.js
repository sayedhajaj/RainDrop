function Raindrop(x, y, imgNum, height){
    this.position = new Vector(x, y);
    this.height = 10;
    this.angle=0;
    this.angleSpeed = 2;
    this.image = new Image();
    this.image.src = "images/tearImage"+(imgNum||0)+".png";
    this.image.onload = console.log(this.image.width+", "+this.image.height);
    this.dimensions = new Vector(this.image.width, this.image.height)
}

Raindrop.prototype.update = function(){
    if(this.angleSpeed<0) if(this.angle>-45+this.angleSpeed) this.angle+=this.angleSpeed;
    if(this.angleSpeed>0) if(this.angle<45-this.angleSpeed) this.angle+=this.angleSpeed;
};


Raindrop.prototype.draw = function(){
    ctx.save();
	ctx.translate(this.position.a, this.position.b);
	ctx.rotate(this.angle * Math.PI/180);
    ctx.drawImage(this.image, -this.dimensions.a/2, -this.dimensions.b/2, this.dimensions.a, this.dimensions.b);
	ctx.restore();


};

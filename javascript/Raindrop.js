function Raindrop(x, y, imgNum, height){
    this.position = new Vector(x, y);
    this.height = 10;
    this.angle=0;
    this.image = new Image();
    this.image.src = "images/tearImage"+(imgNum||0)+".png";
    this.image.onload = console.log(this.image.width+", "+this.image.height);
    this.dimensions = new Vector()
}

Raindrop.prototype.update = function(){

};


Raindrop.prototype.draw = function(){
    ctx.save();
	//ctx.translate(this.position.a, this.position.b);
	//ctx.rotate(this.angle * Math.PI/180);
    //ctx.scale(0.2, 0.2);
    ctx.drawImage(this.image, this.position.a, this.position.b);
	ctx.restore();


};

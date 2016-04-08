function Background(imgpath){
	this.image = new Image();
	this.image.src = imgpath;
	this.position = new Vector(0, 0);
	this.velocity = new Vector(0, 0);
}

Background.prototype.update = function(){
	this.position = this.position.AddVector(this.velocity);
};

Background.prototype.draw = function(){
	ctx.drawImage(this.image, this.position.a, this.position.b);
}

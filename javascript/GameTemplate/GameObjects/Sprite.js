function Sprite(position, dimensions){
    GameObject.call(this, position, dimensions);
    this.states = [];
    this.animations = [];
    this.currentAnimation = "";
    this.facingRight = true;
    this.sideOn = true;
    this.tempCanvas = document.createElement('canvas');
    this.tempCtx = this.tempCanvas.getContext("2d");
}

Sprite.prototype = new GameObject();

Sprite.prototype.update = function(timePassed){
    GameObject.prototype.update.call(this, timePassed);
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    var newState = this.states[0].update(this, timePassed, args);
    if(newState) {
        this.states.unshift(newState);
        this.states[0].enter(this);
    }
    this.animations[this.currentAnimation].update(timePassed);
    if(this.velocity.x<0) this.facingRight = false;
    if(this.velocity.x>0) this.facingRight = true;

};

Sprite.prototype.setAnimation = function(animation){
    if(this.currentAnimation == animation) return;
    this.currentAnimation = animation;
    this.animations[this.currentAnimation].init();
};

Sprite.prototype.draw = function(){
    var imageToDraw = this.animations[this.currentAnimation].getImage();
    if(!this.facingRight && this.sideOn) imageToDraw = imageToDraw.flipImageDataHorizontally();
    this.tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
    this.tempCtx.putImageData(imageToDraw, 0, 0);
    this.transform.contextTransform(ctx);
    ctx.drawImage(this.tempCanvas, this.position.x, this.position.y);
    this.transform.getInverse().contextTransform(ctx);
};

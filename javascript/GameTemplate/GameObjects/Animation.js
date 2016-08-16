function Animation(timeDelay){
    this.timeDelay = timeDelay;
    this.animationFrames = [];
    this.init();
}

Animation.prototype.init = function(){
    this.frameIndex = 0;
    this.playedOnce = false;
    this.animationTime = 0;
    this.totalTime = 0;
};

Animation.prototype.addFrame = function(image){
    this.animationFrames.push(image);
    this.animationTime += this.timeDelay;
}

Animation.prototype.update = function(timePassed){
    this.totalTime += timePassed;
    if(this.frameIndex >= this.animationFrames.length-1) {
        this.totalTime = 0;
        this.frameIndex = 0;
        this.playedOnce = true;
    }

    if(this.totalTime >= (this.frameIndex+1) * this.timeDelay) this.frameIndex++;
};

Animation.prototype.getImage = function(){
    return this.animationFrames[this.frameIndex];
};


Animation.prototype.getReversedAnimation = function(){
    var anim = new Animation(this.timeDelay);
    for (frame of this.animationFrames.slice().reverse()) {
        anim.addFrame(frame);
    }
    return anim;
}

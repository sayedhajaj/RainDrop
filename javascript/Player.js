function Player(x, y, imgNum){
    Raindrop.call(this, x, y, imgNum);
}
Player.prototype = new Raindrop();

Player.prototype.leftInput = function () {
    if(this.angle<88) this.angle+=2;
};

Player.prototype.rightInput = function () {
    if(this.angle>-88) this.angle-=2;
};

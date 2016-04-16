function Player(x, y, imgNum){
    Raindrop.call(this, x, y, imgNum);
}
Player.prototype = new Raindrop();

Player.prototype.leftInput = function () {
    this.angleSpeed=1;
};

Player.prototype.rightInput = function () {
    this.angleSpeed=-1;
};

Player.prototype.stopInput = function() {
    this.angleSpeed=0;
};

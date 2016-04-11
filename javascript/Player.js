function Player(x, y, imgNum){
    Raindrop.call(this, x, y, imgNum);
}
Player.prototype = new Raindrop();

Player.prototype.leftInput = function () {
    this.angleSpeed=2;
};

Player.prototype.rightInput = function () {
    this.angleSpeed=-2;
};

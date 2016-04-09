function Level(x, y, imgNum){
    GamePage.call(this);
    this.score = 0;
    this.pause = false;
    this.highScore = getHighScore(this);
}
Level.prototype = new GamePage();

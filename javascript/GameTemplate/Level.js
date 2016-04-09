function Level(x, y, imgNum){
    GamePage.call(this);
    this.score = 0;
    this.pause = false;
    this.highScore = this.getHighScore();
}
Level.prototype = new GamePage();

Level.prototype.saveHighScore = function(){
	localStorage.setItem(gameTitle+this.constructor.name + "highScore", this.score);
}

Level.prototype.getHighScore = function() {
	if (localStorage.getItem(gameTitle+this.constructor.name + "highScore")){
		return localStorage.getItem(gameTitle+this.constructor.name + "highScore");
	}
	return 0;
}

Level.prototype.deleteHighScore = function(){
	if (localStorage.getItem(gameTitle+this.constructor.name + "highScore")){
		localStorage.removeItem(gameTitle+this.constructor.name + "highScore");
	}
}

var player, background, gameObjectBag;

function MainGame(){
    Level.call(this);
}
MainGame.prototype = new Level();

MainGame.prototype.init = function(){
    highScore = this.getHighScore();
    gameObjectBag = [];
    player = new Player(canvas.width/4, canvas.height/4, 0);
    ctx.fillStyle=this.bgColor;
    background = new Background("images/tempBg.jpg");
};

MainGame.prototype.update = function(){
    player.update();
}

MainGame.prototype.draw = function(){
    ctx.fillStyle = this.bgColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	background.draw();

	ctx.save();

	ctx.fillStyle="#fff";
	ctx.font="bold 30px helvetica";
	ctx.fillText("High Score: "+ Math.max(this.score, this.highScore), 10, 70);
	ctx.fillText("Score: "+ this.score, 10, 30);

	player.draw();

	ctx.restore();
}

MainGame.prototype.handleKeyInput = function(evt, keyup){
	if(keyup){
		if (keystate[f]) {
			if(!fullScreen){
				setFullScreen();
			} else if(fullScreen) {
				resize();
			}
		}
		if (keystate[space]) {
			location.reload();
		}
        if (keystate[p]) gpm.setPage(1);
		if(keystate[left]) player.leftInput();
		if(keystate[right]) player.rightInput();


	} else {
        if(keystate[right] || keystate[left]) player.stopInput();
	}

};

MainGame.prototype.handleMouseClick = function(x, y){

};

MainGame.prototype.handleMouseDown = function(x, y){
    x <= canvas.width/2 ? player.leftInput() : player.rightInput();
};

MainGame.prototype.handleMouseUp = function(x, y){
    player.stopInput();
};

//MainGame.prototype.handleMouseMove = function(x, y) { MainGame.prototype.handleMouseDown(x, y); };
MainGame.prototype.handleTouchClick = function(x, y) { MainGame.prototype.handleMouseDown(x, y); };
MainGame.prototype.handleTouchMove = function(x, y) { MainGame.prototype.handleMouseDown(x, y); };

MainGame.prototype.handleDeviceOrientation = function(x, y, z){
        console.log(x);
        x < 0 ? player.leftInput() : player.rightInput();
};

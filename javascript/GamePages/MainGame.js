var player, background, highScore, gameObjectBag;

function MainGame(){
    Level.call(this);
}
MainGame.prototype = new Level();

MainGame.prototype.init = function(){
    highScore = getHighScore();
    gameObjectBag = [];
    player = new Player(canvas.width/4, canvas.height/4, 0);
    ctx.fillStyle=bgColor;
    background = new Background("images/tempBg.jpg");
};

MainGame.prototype.update = function(){
    player.update();
}

MainGame.prototype.draw = function(){
    ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	background.draw();

	ctx.save();

	ctx.fillStyle="#fff";
	ctx.font="bold 30px helvetica";
	ctx.fillText("High Score: "+ Math.max(score, highScore), 10, 70);
	ctx.fillText("Score: "+ score, 10, 30);

	player.draw();

	ctx.restore();
}

MainGame.prototype.handleKeyInput = function(evt, keyup){
	if(keyup){
		if (keystate[p]) pause= !pause;
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
		if(keystate[left]) player.leftInput();
		if(keystate[right]) player.rightInput();


	} else {

	}

}

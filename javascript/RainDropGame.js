var player, background, highScore, gameObjectBag;

function init(){
	this.pause=false;
	this.bgColor="#fff";
	gameTitle = "RainDrop";
	score = 0;
	highScore = getHighScore();
	gameObjectBag = [];
	player = new Player(canvas.width/4, canvas.height/4, 0);
	ctx.fillStyle=bgColor;
	background = new Background("images/tempBg.jpg");
	play();
}


function update(){
	player.update();
}

function handleKeyInput(evt, keyup){
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

function draw(){
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

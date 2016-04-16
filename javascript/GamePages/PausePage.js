function PausePage(){
    GamePage.call(this);
}
PausePage.prototype = new GamePage();

PausePage.prototype.handleKeyInput = function(evt, keyup){
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

        if(keystate[p]) gpm.setPage(gpm.lastPage);


	} else {

	}
}

PausePage.prototype.draw = function(){
    gpm.lastPage.draw();
    ctx.fillStyle="#00f";
	ctx.font="bold 25px helvetica";
    ctx.textAlign = 'center';
	ctx.fillText("This game is paused,", canvas.width/2, canvas.height/3);
    ctx.fillText("press P to play", canvas.width/2, canvas.height/12*5);
    ctx.textAlign = 'left';
}

function MenuPage(){
    GamePage.call(this);
}
MenuPage.prototype = new GamePage();

MenuPage.prototype.handleKeyInput = function(evt, keyup){
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

        if(keystate[enter]) lm.setLevel(0);


	} else {

	}
}

MenuPage.prototype.handleMouseClick = function(x, y){ lm.setLevel(0);};
MenuPage.prototype.handleTouchMove = function(x, y){handleMouseClick(x, y);};

MenuPage.prototype.draw = function(){
    background.draw();
}

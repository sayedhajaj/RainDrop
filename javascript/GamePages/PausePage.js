class PausePage extends GamePage {
    constructor() {
        super();
        this.restartButton = new Button(
            images["replay-button"], new Vector2D(40, 170), new Vector2D(90, 90), function(){lm.setLevelFromStart(0);}
        );
        this.homeButton = new Button(
            images["home-button"], new Vector2D(40, 275), new Vector2D(90, 90), function(){gpm.setPage(0);}
        );
        this.playButton = new Button(
            images["play-button"], new Vector2D(170, 180), new Vector2D(150, 170), function(){gpm.setPage(gpm.lastPage);}
        );
    }

    handleKeyInput(keyup) {
        if(keyup){
    		if (keystate[f]) requestFullScreen();

            if(keystate[p]) gpm.setPage(gpm.lastPage);


    	} else {

    	}
    }

    draw() {
        gpm.lastPage.draw();
        /*ctx.fillStyle="#00f";
        ctx.font="bold 25px helvetica";
        ctx.textAlign = 'center';
        ctx.fillText("This game is paused,", canvas.width/2, canvas.height/3);
        ctx.fillText("press to play", canvas.width/2, canvas.height/12*5);
        ctx.textAlign = 'left';*/

        ctx.drawImage(images["white_translucent_box"], 10, 150, 340, 230);
        this.restartButton.draw();
        this.homeButton.draw();
        this.playButton.draw();
    }

    handleMouseClick(x, y) {
        this.restartButton.handleClick(x, y);
        this.homeButton.handleClick(x, y);
        this.playButton.handleClick(x, y);
    }

    handleTouchMove(x, y) {
        this.handleMouseClick(x, y);
    }

    handleTouchStart(x, y){
        this.handleMouseMove(x, y);
    }

    handleTouchEnd(x, y) {
        this.handleMouseClick(x, y);
    }

    handleMouseMove(x, y) {
        this.restartButton.handleMouseOver(x, y);
        this.homeButton.handleMouseOver(x, y);
        this.playButton.handleMouseOver(x, y);
    }
}

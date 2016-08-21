class GameOverPage extends GamePage {

    constructor(){
        super();
        this.restartButton = new Button(
            images["replay-button"], new Vector2D(30, 250), new Vector2D(100, 100), function(){lm.setLevelFromStart(0);}
        );
        this.homeButton = new Button(
            images["home-button"], new Vector2D(200, 250), new Vector2D(100, 100), function(){gpm.setPage(0);}
        );

    }

    draw() {
        mainGame.draw();
        ctx.drawImage(images["white_translucent_box"], 10, 150, 340, 220);
        ctx.drawImage(images["gameovertext"], 30, 200, 310, 41);
        this.restartButton.draw();
        this.homeButton.draw();

    }

    handleKeyInput(keyup) {
        if(keyup){
            if (keystate[f])
    			requestFullScreen();

            if(keystate[enter])
                this.restartButton.click();

        } else {

        }
    }

    handleMouseClick(x, y) {
        this.restartButton.handleClick(x, y);
        this.homeButton.handleClick(x, y);
    }

    handleTouchStart(x, y) {
        this.handleMouseMove(x, y);
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
    }

}

class GameOverPage extends GamePage {

    constructor(){
        super();
        /*this.restartButton = new Button(
            images["replay-button"], new Vector2D(40, 180), new Vector2D(90, 90), function(){lm.setLevelFromStart(0);}
        );
        this.homeButton = new Button(
            images["home-button"], new Vector2D(40, 275), new Vector2D(90, 90), function(){gpm.setPage(0);}
        );
        this.highScore = mainGame.getHighScore();*/
        this.restartButton = new Button(
            images["replay-button"], new Vector2D(40, 270), new Vector2D(75, 75), function(){lm.setLevelFromStart(0);}
        );
        this.homeButton = new Button(
            images["home-button"], new Vector2D(40, 180), new Vector2D(75, 75), function(){gpm.setPage(0);}
        );

    }

    draw() {
        mainGame.draw();
        /*ctx.drawImage(images["white_translucent_box"], 10, 120, 340, 260);
        ctx.drawImage(images["gameovertext"], 30, 130, 310, 41);*/
        ctx.drawImage(images["white_translucent_box"], 10, 150, 340, 220);
        //ctx.drawImage(images["gameovertext"], 25, 180, 310, 41);
        ctx.font = "37px junegull";
        ctx.fillStyle = "grey";
        ctx.textAlign = "left";
        ctx.fillText("GAME OVER", 130, 205);

        this.restartButton.draw();
        this.homeButton.draw();
        /*var numbers = getNumberImages(mainGame.score);
        for (var i = 0; i < numbers.length; i++) {
            ctx.drawImage(numbers[i], 195 + (i*50), 200, 45, 45);
        }*/

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

    handleTouchEnd(x, y) {
        this.handleMouseClick(x, y);
    }

    handleMouseMove(x, y) {
        this.restartButton.handleMouseOver(x, y);
        this.homeButton.handleMouseOver(x, y);
    }

}

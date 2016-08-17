class GameOverPage extends GamePage {

    constructor(){
        super();
    }

    draw() {
        mainGame.draw();
        ctx.drawImage(images["white_translucent_box"], 10, 150, 340, 220);
        ctx.drawImage(images["gameovertext"], 30, 200, 310, 41);
        ctx.drawImage(images["replay-button"], 30, 250, 100, 100);
        ctx.drawImage(images["home-button"], 200, 250, 100, 100);

    }

    handleKeyInput(keyup) {
        if(keyup){
            if (keystate[f]) {
    			requestFullScreen();
    		}

            if(keystate[enter]) lm.setLevelFromStart(0);


        } else {

        }
    }

    handleMouseClick(x, y) {
        lm.setLevelFromStart(0);
    }

    handleTouchMove(x, y) {
        this.handleMouseClick(x, y);
    }

}

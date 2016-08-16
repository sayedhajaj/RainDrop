class GameOverPage extends GamePage {

    constructor(){
        super();
    }

    draw() {
        ctx.drawImage(images["gameovertext"], 40, 200, 275, 100);
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

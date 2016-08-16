class HomePage extends GamePage {

    constructor(){
        super();
    }

    draw() {
        ctx.drawImage(images["background"], 0, 0, 360, 480);
        //ctx.drawImage(images["condensation"], 0, 0, 360, 480);
        ctx.drawImage(images["highScore"], 10, 10, 110, 15);
        ctx.drawImage(images["dewdropstext"], 225, 10, 120, 15);
        ctx.drawImage(images["logo"], 5, 140, 350, 79);
        ctx.drawImage(images["player"], 185, 140, 36, 54);
        ctx.drawImage(images["tapToPlay"], 70, 250, 230, 29);
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

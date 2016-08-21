class HomePage extends GamePage {

    constructor(){
        super();
    }

    update(delta) {
    }

    draw() {
        ctx.drawImage(images["background"], 0, 0, 360, 480);
        ctx.drawImage(images["highScore"], 10, 10, 110, 15);
        ctx.drawImage(images["dewdrop"], 330, 5, 25, 25);
        ctx.drawImage(images["logo"], 5, 140, 350, 79);
        ctx.drawImage(images["player"], 185, 140, 36, 54);
        ctx.drawImage(images["tapToPlay"], 70, 250, 230, 29);
        var numbers = getNumberImages(mainGame.highScore);
        for (var i = 0; i < numbers.length; i++) {
            ctx.drawImage(numbers[i], 125 + (i*15), 10, 15, 15);
        }
        numbers = getNumberImages(getDewDrops());
        for (var i = numbers.length -1; i >= 0; i--) {
            ctx.drawImage(numbers[i], 325 - ((numbers.length-i)*15), 10, 15, 15);
        }
    }

    handleKeyInput(keyup) {
        if(keyup){
            if (keystate[f])
                requestFullScreen();

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

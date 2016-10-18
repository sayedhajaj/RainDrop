class HomePage extends GamePage {

    constructor(){
        super();
    }

    update(delta) {
    }

    draw() {
        ctx.drawImage(images["background"], 0, 0, 360, 480);

        ctx.font = "20px junegull";
        ctx.fillStyle = "grey";
        ctx.textAlign = "left";
        ctx.fillText("HI-SCORE: " + mainGame.highScore, 10, 30);
        //ctx.drawImage(images["highScore"], 10, 10, 110, 15);
        ctx.drawImage(images["dewdrop"], 330, 10, 25, 25);
        ctx.drawImage(images["logo"], 5, 140, 347, 90);
        ctx.drawImage(images["player"], 186, 158, 30, 45);
        ctx.drawImage(images["tapToPlay"], 70, 250, 229, 34);
        /*var numbers = getNumberImages(mainGame.highScore);
        for (var i = 0; i < numbers.length; i++) {
            ctx.drawImage(numbers[i], 125 + (i*15), 10, 15, 15);
        }
        numbers = getNumberImages(getDewDrops());
        for (var i = numbers.length -1; i >= 0; i--) {
            ctx.drawImage(numbers[i], 325 - ((numbers.length-i)*15), 10, 15, 15);
        }*/
        ctx.font = "22px junegull";
        ctx.fillStyle = "grey";
        ctx.textAlign = "left";
        //ctx.fillText(mainGame.highScore, 125, 25);
        ctx.fillText(getDewDrops(), 310, 30);
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

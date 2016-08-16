class PausePage extends GamePage {
    constructor() {
        super();
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
        ctx.fillStyle="#00f";
        ctx.font="bold 25px helvetica";
        ctx.textAlign = 'center';
        ctx.fillText("This game is paused,", canvas.width/2, canvas.height/3);
        ctx.fillText("press to play", canvas.width/2, canvas.height/12*5);
        ctx.textAlign = 'left';

    }
}

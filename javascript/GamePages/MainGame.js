var player, background;
var playerBoundPos, playerBoundSize;

class MainGame extends Level {
    constructor() {
        super();
        this.pauseButton = new Button(
            images["pause-button"], new Vector2D(325, 10), new Vector2D(26, 31), function(){gpm.setPage(1);}
        );
    }

    init() {
        camera.reset();
        this.bgColor = "lightblue";
        this.highScore = this.getHighScore();
        this.obstacleSpawner = new ObstacleSpawner();
        this.obstacleSpawner.init();
        this.coinSpawner = new CoinSpawner();
        this.coinSpawner.init();
        player = new Player(
            new Vector2D(175, 160),
            new Vector2D(36, 54)
        );
        ctx.fillStyle=this.bgColor;

    }

    cameraScroll() {
        camera.velocity = player.velocity.Multiply(-1);
    }

    update(delta) {
        this.obstacleSpawner.update(delta);
        this.coinSpawner.update(delta);
        player.update(delta);
        if (player.collide(this.obstacleSpawner.gameObjects)) player.setGameOver();
        var collisionIndex = this.coinSpawner.collide(player);
        if (collisionIndex > -1) player.collectDewDrop(this.coinSpawner, collisionIndex);

        this.score = Math.floor(player.distance/(canvas.height/2));
        this.cameraScroll();
        camera.update();
    }

    draw() {
        ctx.fillStyle = this.bgColor;
    	ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images["glass"], 0,0, 360, 480);
        ctx.drawImage(images["background"], 0, (camera.position.y%480), 360, 480);
        ctx.drawImage(images["background"], 0, (camera.position.y%480)+480, 360, 480);


        //ctx.drawImage(images["pause-button"], )

        ctx.fillStyle = "#000";
        ctx.fillRect(-36 + camera.position.x, (camera.position.y%480), 36, 480);
        ctx.fillRect(360*2 + camera.position.x, (camera.position.y%480), 36, 480);
        ctx.fillRect(-36 + camera.position.x, (camera.position.y%480)+480, 36, 480);
        ctx.fillRect(360*2 + camera.position.x, (camera.position.y%480)+480, 36, 480);


    	ctx.save();

        camera.transformContext();
        this.obstacleSpawner.draw();
        this.coinSpawner.draw();

    	player.draw();
        camera.resetContextTransform();
        ctx.drawImage(images["highScore"], 10, 10, 110, 15);
        var numbers = getNumberImages(Math.max(mainGame.highScore, this.score));
        for (var i = 0; i < numbers.length; i++) {
            ctx.drawImage(numbers[i], 125 + (i*15), 10, 15, 15);
        }
        numbers = getNumberImages( this.score);
        for (var i = 0; i < numbers.length; i++) {
            ctx.drawImage(numbers[i], 125 + (i*15), 30, 15, 15);
        }

        this.pauseButton.draw();

        /*ctx.fillStyle="#fff";
    	ctx.font="bold 30px helvetica";
    	ctx.fillText("High Score: "+ Math.max(this.score, this.highScore), 10, 70);
    	ctx.fillText("Score: "+ this.score, 10, 30);*/

    	ctx.restore();
    }

    handleKeyInput(keyup) {
        if(keyup){
            if (keystate[f])
                requestFullScreen();

            if (keystate[p]) gpm.setPage(1);
            player.handleKeyInput(true);

    	} else {

    	}
    }

    handleMouseClick(x, y) {
        this.pauseButton.handleClick(x, y);
        if(!this.pauseButton.selected) player.changeDirection();
    }

    handleTouchStart(x, y) {
        this.pauseButton.handleMouseOver(x, y);
    }

    handleTouchMove(x, y) {
        this.pauseButton.handleMouseOver(x, y);
    }

    handleTouchEnd(x, y) {
        this.handleMouseClick(x, y);
    }

    handleMouseMove(x, y) {
        this.handleTouchMove(x, y);
    }
}


/*
MainGame.prototype.handleMouseClick = function(x, y){

};

MainGame.prototype.handleMouseDown = function(x, y){
    x <= canvas.width/2 ? player.leftInput() : player.rightInput();
};

MainGame.prototype.handleMouseUp = function(x, y){
    player.stopInput();
};

//MainGame.prototype.handleMouseMove = function(x, y) { MainGame.prototype.handleMouseDown(x, y); };
MainGame.prototype.handleTouchClick = function(x, y) { MainGame.prototype.handleMouseDown(x, y); };
MainGame.prototype.handleTouchMove = function(x, y) { MainGame.prototype.handleMouseDown(x, y); };

MainGame.prototype.handleDeviceOrientation = function(x, y, z){
        x < 0 ? player.leftInput() : player.rightInput();
};
*/

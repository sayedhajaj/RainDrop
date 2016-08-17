var player, background, obstacleSpawner;
var playerBoundPos, playerBoundSize;

class MainGame extends Level {
    constructor() {
        super();
    }

    init() {
        camera.reset();
        this.bgColor = "lightblue";
        this.highScore = this.getHighScore();
        obstacleSpawner = new ObstacleSpawner();
        obstacleSpawner.init();
        player = new Player(
            new Vector2D(185, 200),
            new Vector2D(36, 54)
        );
        ctx.fillStyle=this.bgColor;

    }

    cameraScroll() {
        camera.velocity = player.velocity.Multiply(-1);
    }

    update(delta) {
        obstacleSpawner.update();
        player.update(delta);
        for (var obstacle of obstacleSpawner.gameObjects) {
            if (player.collide(obstacle)) {
                player.setGameOver();
            }
        }
        this.score = Math.floor(player.distance/(canvas.height/2));
        this.cameraScroll();
        camera.update();
    }

    draw() {
        ctx.fillStyle = this.bgColor;
    	ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images["background"], 0, (camera.position.y%480), 360, 480);
        ctx.drawImage(images["background"], 0, (camera.position.y%480)+480, 360, 480);

        ctx.drawImage(images["glass"], 0,0, 360, 480);

        //ctx.drawImage(images["pause-button"], )

        ctx.fillStyle = "#000";
        ctx.fillRect(-36 + camera.position.x, (camera.position.y%480), 36, 480);
        ctx.fillRect(360*2 + camera.position.x, (camera.position.y%480), 36, 480);
        ctx.fillRect(-36 + camera.position.x, (camera.position.y%480)+480, 36, 480);
        ctx.fillRect(360*2 + camera.position.x, (camera.position.y%480)+480, 36, 480);


    	ctx.save();

        camera.transformContext();
        obstacleSpawner.draw();

    	player.draw();
        camera.resetContextTransform();
        ctx.drawImage(images["highScore"], 10, 10, 110, 15);
        var numbers = getNumberImages(Math.max(mainGame.getHighScore(), this.score));
        for (var i = 0; i < numbers.length; i++) {
            ctx.drawImage(numbers[i], 125 + (i*15), 10, 15, 15);
        }

        /*ctx.fillStyle="#fff";
    	ctx.font="bold 30px helvetica";
    	ctx.fillText("High Score: "+ Math.max(this.score, this.highScore), 10, 70);
    	ctx.fillText("Score: "+ this.score, 10, 30);*/

    	ctx.restore();
    }

    handleKeyInput(keyup) {
        if(keyup){
    		if (keystate[f]) {
    			requestFullScreen();
    		}
            if (keystate[p]) gpm.setPage(1);
            player.handleKeyInput(true);

    	} else {

    	}
    }

    handleMouseClick(x, y) {
        player.changeDirection();
    }

    handleTouchStart(x, y) {
        player.changeDirection();
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

var canvas, ctx, gameTitle;
var defaultWidth, defaultHeight, keystate, up=38, down=40, left=37, right=39, p=80, f=70, space=32, enter=13;
var fullScreen;
var heightScale, widthScale;
var gpm, lm;

function main(){
	canvas=document.getElementById("gameCanvas");
	ctx=canvas.getContext("2d");
	window.addEventListener("resize", function(){if (window.innerWidth < defaultWidth || window.innerHeight < defaultHeight) setFullScreen();});

	gpm = new GamePageManager();
	lm = new LevelManager();

	keystate = {};
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
		gpm.handleKeyInput(evt, true);
	});
	document.addEventListener("keyup", function(evt) {
		gpm.handleKeyInput(evt, false);
		delete keystate[evt.keyCode];
	});

	this.defaultWidth=canvas.width;
	this.defaultHeight=canvas.height;
	widthScale = 1;
	heightScale = 1;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) setFullScreen();
	init();
}

function play(){
	var animFrame = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	null;

	if (animFrame !== null) {
		var recursiveAnim = function() {
			gameLoop();
			animFrame(recursiveAnim);
		};
		animFrame(recursiveAnim);
	} else {
		setInterval(gameLoop, 1000/fps);
	}
}

var gameLoop = function(){
	if (gpm.currentPage instanceof Level && !gpm.currentPage.pause) {
		if(gpm.currentPage) gpm.currentPage.update();
	}
	if(gpm.currentPage) gpm.currentPage.draw();

}

function setFullScreen() {
	if ((window.innerWidth/canvas.width)<(window.innerHeight/canvas.height)) {
		canvas.height*=window.innerWidth/canvas.width
		canvas.width=window.innerWidth
	} else {
		canvas.width*=window.innerHeight/canvas.height
		canvas.height=window.innerHeight
	}
	widthScale = canvas.width/defaultWidth;
	heightScale = canvas.height/defaultHeight;
	ctx.scale(widthScale, heightScale);

	ctx.fillStyle=bgColor;
	fullScreen=true;
}

function resize() {
	canvas.width=defaultWidth;
	canvas.height=defaultHeight;

	widthScale = 1;
	heightScale = 1;

	ctx.fillStyle=bgColor;
	fullScreen=false;
}

function create2DArray(sizes){
	var array = new Array(sizes[0]);
	for(var i=0; i < sizes[0]; i++)	array[i] = (new Array(sizes[1]));
	return array;
}

function toRadians(degrees){
	return  degrees * Math.PI / 180;
}

function toDegrees(radians){
	return radians * 180 / Math.PI;
}

function saveHighScore(gamePage){
	console.log((gamePage || gpm.currentPage).score);
	localStorage.setItem(gameTitle+(gamePage || gpm.currentPage).constructor.name + "highScore", (gamePage || gpm.currentPage).score);
}

function getHighScore(gamePage) {
	if (localStorage.getItem(gameTitle+(gamePage || gpm.currentPage).constructor.name + "highScore")){
		return localStorage.getItem(gameTitle+(gamePage || gpm.currentPage).constructor.name + "highScore");
	}
	return 0;
}

function deleteHighScore(gamePage){
	if (localStorage.getItem(gameTitle+(gamePage || gpm.currentPage).constructor.name + "highScore")){
		localStorage.removeItem(gameTitle+(gamePage || gpm.currentPage).constructor.name + "highScore");
	}

}

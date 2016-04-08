var canvas, ctx, pause, gameTitle;
var defaultWidth, defaultHeight, keystate, up=38, down=40, left=37, right=39, p=80, f=70, space=32;
var bgColor, fullScreen, score, highScore;
var heightScale, widthScale;

function main(){
	canvas=document.getElementById("gameCanvas");
	ctx=canvas.getContext("2d");
	window.addEventListener("resize", function(){if (window.innerWidth < defaultWidth || window.innerHeight < defaultHeight) setFullScreen();});

	keystate = {};
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
		handleKeyInput(evt, true);
	});
	document.addEventListener("keyup", function(evt) {
		handleKeyInput(evt, false);
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
	if (!pause) {
		update();
	}
	draw();
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

function saveHighScore(){
	localStorage.setItem(gameTitle + "highScore", score)
}

function getHighScore() {
	if (localStorage.getItem(gameTitle + "highScore")) return localStorage.getItem(gameTitle + "highScore");
	return 0;
}

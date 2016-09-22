var canvas, ctx, gameTitle;
var defaultWidth, defaultHeight;
var keystate, mouseStart, mouseEnd, mouseTraveled;
var up=38, down=40, left=37, right=39, p=80, f=70, space=32, enter=13;
var fullScreen;
var heightScale, widthScale;
var gpm, lm;
var isPhone;
var fps=30, camera;


function main(gameName){
    isPhone = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    gameTitle = gameName;
    canvas = document.getElementById(gameTitle);
    canvas.focus();
    ctx = canvas.getContext("2d");
    keystate = {};

    defaultWidth = canvas.width;
	defaultHeight = canvas.height;
	widthScale = 1;
	heightScale = 1;
    fullScreen = isPhone;

    gpm = new GamePageManager();
    lm = new LevelManager();
    camera = new Camera();

    window.onresize = function(){resizeCanvas();};
    document.onwebkitfullscreenchange = resizeCanvas();
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
		gpm.handleKeyInput(true);
	});
	document.addEventListener("keyup", function(evt) {
		gpm.handleKeyInput(false);
		delete keystate[evt.keyCode];
	});

	canvas.addEventListener('mousedown', function(evt){
		var x = evt.offsetX;
		var y = evt.offsetY;
        if(!mouseTraveled) mouseTraveled = new Vector2D(0, 0);
        mouseStart = new Vector2D(x, y);
		gpm.handleMouseDown(x, y);
	});

	canvas.addEventListener('mouseup', function(evt){
		var x = Math.round(Math.divideDec(evt.offsetX, widthScale));
		var y = Math.round(Math.divideDec(evt.offsetY, heightScale));
        mouseEnd = new Vector2D(x, y);
        mouseTraveled = mouseEnd.SubtractVector(mouseStart);
		gpm.handleMouseUp(x, y);
	});
	canvas.addEventListener('click', function(evt){
		var x = Math.round(Math.divideDec(evt.offsetX, widthScale));
		var y = Math.round(Math.divideDec(evt.offsetY, heightScale));
		gpm.handleMouseClick(x, y);
	});

	canvas.addEventListener('mousemove', function(evt){
		var x = Math.round(Math.divideDec(evt.offsetX, widthScale));
		var y = Math.round(Math.divideDec(evt.offsetY, heightScale));
		gpm.handleMouseMove(x, y);
	});

	canvas.addEventListener('touchstart', function(evt){
		var touch = evt.touches[0];
        var rect = evt.target.getBoundingClientRect();
        var x = Math.round(Math.divideDec(touch.pageX - rect.left, widthScale));
		var y = Math.round(Math.divideDec(touch.pageY - rect.top, heightScale));
        mouseStart = new Vector2D(x, y);
		gpm.handleTouchStart(x, y);
	});

    canvas.addEventListener('touchend', function(evt){
		var touch = evt.changedTouches[0];
        var rect = evt.target.getBoundingClientRect();
        var x = Math.round(Math.divideDec(touch.pageX - rect.left, widthScale));
		var y = Math.round(Math.divideDec(touch.pageY - rect.top, heightScale));
        mouseEnd = new Vector2D(x, y);
        mouseTraveled = mouseEnd.SubtractVector(mouseStart);
		gpm.handleTouchEnd(x, y);
	});

	canvas.addEventListener('touchmove', function(evt){
		var touch = evt.touches[0];
        var rect = evt.target.getBoundingClientRect();
        var x = Math.round(Math.divideDec(touch.pageX - rect.left, widthScale));
		var y = Math.round(Math.divideDec(touch.pageY - rect.top, heightScale));
        mouseEnd = new Vector2D(x, y);
        mouseTraveled = mouseEnd.SubtractVector(mouseStart);
		evt.preventDefault();
		gpm.handleTouchMove(x, y);
	});

	window.addEventListener('deviceorientation', function(evt){
		gpm.handleDeviceOrientation(evt.gamma, evt.beta, evt.alpha);
	});

    window.addEventListener('devicemotion', function(evt){
        gpm.handleDeviceMotion(
            evt.acceleration.x, evt.acceleration.y, evt.acceleration.z,
            evt.rotationRate.alpha, evt.rotationRate.beta, evt.rotationRate.gamma,
            evt.interval
        );
    });

	canvas.ondragstart = function(e) {
	    if (e && e.preventDefault) { e.preventDefault(); }
	    if (e && e.stopPropagation) { e.stopPropagation(); }
	    return false;
	};

	canvas.onselectstart = function(e) {
	    if (e && e.preventDefault) { e.preventDefault(); }
	    if (e && e.stopPropagation) { e.stopPropagation(); }
	    return false;
	};

    canvas.ondblclick = function() {
        requestFullScreen();
    };

	document.body.ontouchstart = function(e) {
	    if (e && e.preventDefault) { e.preventDefault(); }
	    if (e && e.stopPropagation) { e.stopPropagation(); }
	    return false;
	};

	document.body.ontouchmove = function(e) {
	    if (e && e.preventDefault) { e.preventDefault(); }
	    if (e && e.stopPropagation) { e.stopPropagation(); }
	    return false;
	};
    init();
    play();
}


function create2DArray(sizes){
	var array = new Array(sizes[0]);
	for(var i=0; i < sizes[0]; i++)	array[i] = (new Array(sizes[1]));
	return array;
}

function toRadians(degrees){
	return Math.divideDec(Math.multDec(degrees, Math.PI), 180);
}

function toDegrees(radians){
	return Math.divideDec(Math.divideDec(radians, 180), Math.PI);
}

function randomInRange(min, max) {
    return min + Math.random() * (max - min);
}

function resizeCanvas(){
    if(fullScreen){
        widthScale = window.innerWidth/defaultWidth;
        heightScale = window.innerHeight/defaultHeight;
        if (widthScale < heightScale) {
            canvas.style.height = defaultHeight * widthScale + "px";
            canvas.style.width = window.innerWidth + "px";
            heightScale = widthScale;
        } else if (widthScale > heightScale){
            canvas.style.width = defaultWidth * heightScale + "px";
            canvas.style.height = window.innerHeight + "px";
            widthScale = heightScale;
        } else {
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
        }
    } else {
        canvas.width=defaultWidth;
        canvas.height=defaultHeight;
        widthScale = 1;
        heightScale = 1;
    }
}

function play(){
    var animFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;
    var now = then = Date.now();
    var delta = 0;
    var gameLoop = function(){
        then = now;
        now = Date.now();
        delta = now - then;
        //console.log(Math.floor(1000/delta));
        var currentPage = gpm.currentPage;
        if(currentPage) currentPage.update(delta);
        if(currentPage) currentPage.draw();
    }
    if (animFrame !== null) {
        var recursiveAnim = function() {
            gameLoop();
            animFrame(recursiveAnim);
        };
        animFrame(recursiveAnim);
    } else {
        setInterval(gameLoop, 1000/fps);
    }
};


function requestFullScreen(){
    if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) exitFullScreen();
    else {
        if(canvas.requestFullscreen) canvas.requestFullscreen();
        else if(canvas.mozRequestFullScreen) canvas.mozRequestFullScreen();
        else if(canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
        else if(canvas.msRequestFullscreen) canvas.msRequestFullscreen();
    }
    fullScreen = true;
}


function exitFullScreen(){
    if(document.exitFullscreen) document.exitFullscreen();
    else if(document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if(document.msExitFullscreen) document.msExitFullscreen();
    fullScreen = false;
}
function loadImages(onFinished, sources){
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function(){
            if (++loadedImages >= numImages) {
                onFinished();
            }
        };
        images[src].src = sources[src];
    }
    return images;
}

Image.prototype.getSubImage = function(x, y, width, height){
    var imageCanvas = document.createElement('canvas');
    imageCanvas.width = this.width;
    imageCanvas.height = this.height;
    var imageCtx = imageCanvas.getContext("2d");
    imageCtx.drawImage(this, 0, 0);
    return imageCtx.getImageData(x, y, width, height);
};

ImageData.prototype.makeTransparent = function(r, g, b){
    var imageData = this.data;
    for (var i = 0; i < imageData.length; i+= 4) {
        if(imageData[i] === r && imageData[i+1] === g && imageData[i+2] === b){
            imageData[i+3] = 0;
        }
    }
    return this;
};

ImageData.prototype.resizeImageData = function(dimensions){
    var imageCanvas = document.createElement('canvas');
    imageCanvas.width = this.width;
    imageCanvas.height = this.height;
    var imageCtx = imageCanvas.getContext("2d");
    imageCtx.putImageData(this, 0, 0);
    var destCanvas = document.createElement('canvas');
    destCanvas.width = dimensions.x;
    destCanvas.height = dimensions.y;
    destCtx = destCanvas.getContext("2d");
    destCtx.scale(dimensions.x/this.width, dimensions.y/this.height);
    destCtx.drawImage(imageCanvas, 0, 0);
    return destCtx.getImageData(0, 0, dimensions.x, dimensions.y);
};

ImageData.prototype.flipImageDataHorizontally = function(){
    var imageCanvas = document.createElement('canvas');
    imageCanvas.width = this.width;
    imageCanvas.height = this.height;
    var imageCtx = imageCanvas.getContext("2d");
    imageCtx.putImageData(this, 0, 0);
    var destCanvas = document.createElement('canvas');
    destCanvas.width = this.width;
    destCanvas.height = this.height;
    destCtx = destCanvas.getContext("2d");
    destCtx.scale(-1, 1);
    destCtx.drawImage(imageCanvas, -this.width, 0);
    return destCtx.getImageData(0, 0, this.width, this.height);
};


function isLandscape(){
    return (screen.width > screen.height);
}


Math.multDec = function ( a, b ) {
    var atens = Math.pow(10,String(a).length - String(a).indexOf('.') - 1);
    var btens = Math.pow(10,String(b).length - String(b).indexOf('.') - 1);
    var result = (a * atens) * (b * btens) / (atens * btens);
    return result;
}

Math.divideDec = function ( a, b ) {
    return Math.multDec(a, 100/(b*100));
}

Math.subtractDec = function ( a, b ) {
    return Math.addDec(a, -b);
}

Math.addDec = function ( a, b ) {
    var atens = Math.pow(10,String(a).length - String(a).indexOf('.') - 1);
    var btens = Math.pow(10,String(b).length - String(b).indexOf('.') - 1);
    var resultTens = Math.max(atens, btens);
    return Math.round((a + b) * resultTens) / resultTens;
}


Array.prototype.shuffle = function() {
    var i = 0, j = 0, temp = null;

    for (i = this.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
};

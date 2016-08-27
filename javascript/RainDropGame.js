var sources = {
    "player": "images/Avatar.png",
    "background": "images/background/background_glass.png",
    "glass": "images/background/Background-Glass.png",
    "crack": "images/craCk.png",

    "highScore": "images/text/Highscore.png",
    "dewdropstext": "images/text/new_dew_drops_text.png",
    "gameovertext": "images/text/Game-Over.png",

    "tapToPlay": "images/text/Tap-to-play.png",
    "logo": "images/Deluge-Logo-2.png",
    "dewdrop": "images/Dew-Drop.png",
    "pause-button": "images/buttons/pause_button.png",
    "play-button": "images/buttons/play_button.png",
    "replay-button": "images/buttons/replay_icon.png",
    "home-button": "images/buttons/Home-icon.png",

    "white_translucent_box": "images/white_translucent_box.png",

    "0": "images/text/numbers/0.png",
    "1": "images/text/numbers/1.png",
    "2": "images/text/numbers/2.png",
    "3": "images/text/numbers/3.png",
    "4": "images/text/numbers/4.png",
    "5": "images/text/numbers/5.png",
    "6": "images/text/numbers/6.png",
    "7": "images/text/numbers/7.png",
    "8": "images/text/numbers/8.png",
    "9": "images/text/numbers/9.png"
};
var images = loadImages(function(){main("raindrop");}, sources);

var homePage, mainGame, gameOverPage, pausePage;

function init(){
    ctx.mozImageSmoothingEnabled = true;
    ctx.msImageSmoothingEnabled = true;
    ctx.imageSmoothingEnabled = true;
	homePage = new HomePage();
	mainGame = new MainGame();
	pausePage = new PausePage();
    gameOverPage = new GameOverPage();
	mainGame.init();
	lm.addLevel(mainGame);
	gpm.addPage(homePage);
	gpm.addPage(pausePage);
	gpm.setPageFromStart(homePage);
	play();
}


function getNumberImages(num) {
    var numString = num.toString();
    var resultImages = [];
    for (var i = 0; i < numString.length; i++) {
        resultImages.push(images[numString[i]]);
    }
    return resultImages;
}

function addDewDrops(num) {
	localStorage.setItem(gameTitle + "dewdrops", getDewDrops()+num);
}

function getDewDrops()  {
	if (localStorage.getItem(gameTitle + "dewdrops")){
		return localStorage.getItem(gameTitle + "dewdrops");
	}
	return 0;
}

function removeDewDrops(num) {
	localStorage.setItem(gameTitle + "dewdrops", getDewDrops()-num);
}

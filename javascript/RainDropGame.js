var sources = {
    "player": "images/Avatar.png",
    "background": "images/background/new_background_glass.png",
    "condensation": "images/background/Background-Condensation.png",
    "crack": "images/craCk.png",
    "highScore": "images/text/Highscore.png",
    "dewdropstext": "images/text/new_dew_drops_text.png",
    "gameovertext": "images/text/Game-Over.png",
    "tapToPlay": "images/text/Tap-to-play.png",
    "logo": "images/Deluge-Logo-2.png"
};
var images = loadImages(function(){main("raindrop");}, sources);

var homePage, mainGame, gameOverPage, pausePage;

function init(){
    ctx.mozImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
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
    //lm.setLevel(0);
	play();
}

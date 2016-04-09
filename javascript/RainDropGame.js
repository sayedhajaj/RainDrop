var mainGame, menuPage;

function init(){
	this.pause=false;
	this.bgColor="#fff";
	gameTitle = "RainDrop";
	score = 0;
	menuPage = new MenuPage();
	mainGame = new MainGame();
	mainGame.init();
	lm.addLevel(mainGame);
	gpm.setPageFromStart(menuPage);
	play();
}

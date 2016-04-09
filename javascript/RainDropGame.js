var mainGame, menuPage;

function init(){
	gameTitle = "RainDrop";
	menuPage = new MenuPage();
	mainGame = new MainGame();
	mainGame.init();
	lm.addLevel(mainGame);
	gpm.setPageFromStart(menuPage);
	play();
}

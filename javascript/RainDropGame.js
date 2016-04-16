var mainGame, menuPage;

function init(){
	gameTitle = "RainDrop";
	menuPage = new MenuPage();
	mainGame = new MainGame();
	pausePage = new PausePage();
	mainGame.init();
	lm.addLevel(mainGame);
	gpm.addPage(menuPage);
	gpm.addPage(pausePage);
	gpm.setPageFromStart(menuPage);
	play();
}

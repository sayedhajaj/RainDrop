function GamePageManager(){
    this.gamePages = [];
    this.currentPage = null;
    this.lastPage = null;
}

GamePageManager.prototype.handleKeyInput = function(evt, keyup){
    if(this.currentPage) this.currentPage.handleKeyInput(evt, keyup);
};

GamePageManager.prototype.handleMouseClick = function(x, y){
    if(this.currentPage) this.currentPage.handleMouseClick(x, y);
};

GamePageManager.prototype.handleMouseMove = function(x, y){
    if(this.currentPage) this.currentPage.handleMouseMove(x, y);
};

GamePageManager.prototype.handleTouchClick = function(x, y){
    if(this.currentPage) this.currentPage.handleTouchClick(x, y);
};

GamePageManager.prototype.handleTouchMove = function(x, y){
    if(this.currentPage) this.currentPage.handleTouchMove(x, y);
};

GamePageManager.prototype.addPage = function (gamePage) {
    this.gamePages.push(gamePage);
};

GamePageManager.prototype.setPage = function(gamePage) {
    this.lastPage = this.currentPage;
    if(!isNaN(gamePage)) this.currentPage = this.gamePages[gamePage];
    else this.currentPage = gamePage;
};

GamePageManager.prototype.setPageFromStart = function(gamePage) {
    this.lastPage = this.currentPage;
    if(!isNaN(gamePage)) this.currentPage = this.gamePages[gamePage];
    else this.currentPage = gamePage;
    this.currentPage.init();
};

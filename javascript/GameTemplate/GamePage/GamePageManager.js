function GamePageManager(){
    this.gamePages = [];
    this.currentPage = null;
    this.lastPage = null;
}

GamePageManager.prototype.handleKeyInput = function(keyup){
    if(this.currentPage) this.currentPage.handleKeyInput(keyup);
};

GamePageManager.prototype.handleMouseDown = function(x, y){
    if(this.currentPage) this.currentPage.handleMouseDown(x, y);
};

GamePageManager.prototype.handleMouseUp = function(x, y){
    if(this.currentPage) this.currentPage.handleMouseUp(x, y);
};

GamePageManager.prototype.handleMouseClick = function(x, y){
    if(this.currentPage) this.currentPage.handleMouseClick(x, y);
};

GamePageManager.prototype.handleMouseMove = function(x, y){
    if(this.currentPage) this.currentPage.handleMouseMove(x, y);
};

GamePageManager.prototype.handleTouchStart = function(x, y){
    if(this.currentPage) this.currentPage.handleTouchStart(x, y);
};

GamePageManager.prototype.handleTouchEnd = function(x, y){
    if(this.currentPage) this.currentPage.handleTouchEnd(x, y);
};

GamePageManager.prototype.handleTouchMove = function(x, y){
    if(this.currentPage) this.currentPage.handleTouchMove(x, y);
};

GamePageManager.prototype.handleDeviceOrientation = function(x, y, z){
    if(this.currentPage) {
        if(isLandscape()){
            this.currentPage.handleDeviceOrientation(y, x, z);
        } else {
            this.currentPage.handleDeviceOrientation(x, y, z);
        }
    }
};

GamePageManager.prototype.handleDeviceMotion = function(x, y, z, ralpha, rbeta, rgamma, interval){
    if(this.currentPage) {
        if(isLandscape()){
            var xVal = y;
            var yVal = x;
        } else {
            var xVal = x;
            var yVal = y;
        }
        this.currentPage.handleDeviceMotion(xVal, yVal, z, ralpha, rbeta, rgamma, interval);
    }
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

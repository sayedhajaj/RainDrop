function LevelManager(){
    this.levels = [];
    this.currentLevel = [];
}


LevelManager.prototype.addLevel = function (level) {
    this.levels.push(level);
};

LevelManager.prototype.setLevel = function(level) {
    if(!isNaN(level)) this.currentPage = this.levels[level];
    else this.currentPage = level;
    gpm.setPage(this.currentPage);
};

LevelManager.prototype.setLevelFromStart = function(level) {
    if(!isNaN(level)) this.currentPage = this.levels[level];
    else this.currentPage = level;
    gpm.setPageFromStart(this.currentPage);
};

class CrazyState {

    constructor() {
        this.timeElapsed = 0;
        this.maxTime = 1500;
    }

    enter(player) {
        player.speed = player.defaultSpeed + 2;
    }

    update(player, timePassed, args) {
        this.timeElapsed += timePassed;
        if(this.timeElapsed >= this.maxTime) return new PlayerState();
        return null;
    }

    handleKeyInput(player, keyup) {
        if(keyup){
            if(keystate[up] || keystate[down] || keystate[left] || keystate[right] || keystate[space]) {
                player.changeDirection();
                return this;
            }
        } else {

        }
        return null;
    }

}

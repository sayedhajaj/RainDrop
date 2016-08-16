class PlayerState {

    enter(player) {

    }

    update(player, timePassed, args) {

    }

    handleKeyInput(player, keyup) {
        if(keyup){
            if(keystate[up] || keystate[down] || keystate[left] || keystate[right] || keystate[space]) {
                player.changeDirection();
            }
        } else {
            
        }
        return null;
    }

}

class PlayerState {

    enter(player) {
        player.speed = player.defaultSpeed;
    }

    update(player, timePassed, args) {

    }

    handleKeyInput(player, keyup) {
        if(keyup){
            if(keystate[up] || keystate[down] || keystate[left] || keystate[right] || keystate[space]) {
                player.changeDirection();
                player.defaultSpeed = player.speed;
                //return new CrazyState();
            }
        } else {

        }
        return null;
    }

}

class CoinSpawner {
    constructor() {
        this.coinBag = {
            positions: [],
            refill: function() {
                this.positions = [];
                for (var i = 0; i < (canvas.width)*2-DewDrop.SIZE; i+=DewDrop.SIZE)
                    this.positions.push(Math.floor(randomInRange(i, i+DewDrop.SIZE)));
                this.positions.shuffle();
            },
            getPosition: function() {
                return this.positions.shift();
            }
        };
        this.coins = [];
    }

    init() {
        this.coins = [];
        this.coinBag.refill();
        for (var i = canvas.height * 1.5; i <= 4*canvas.height; i+= (canvas.height / 2) * Math.round(randomInRange(4, 5))) {
            this.spawnCoin(i);
        }
    }

    spawnCoin(height) {
        this.coins.push(new DewDrop(
            new Vector2D(this.coinBag.getPosition(), height),
            new Vector2D(DewDrop.SIZE, DewDrop.SIZE)
        ));
    }

    update(delta) {
        if (this.coinBag.positions.length == 0) this.coinBag.refill();
        var lastPos = this.coins[this.coins.length - 1].position;
        lastPos = lastPos.AddVector(camera.position);
        if(Math.abs(lastPos.y) < (canvas.height / 2) * Math.round(randomInRange(4, 5))) {
            lastPos = lastPos.SubtractVector(camera.position);
            this.spawnCoin(lastPos.y + (canvas.height / 2) * Math.round(randomInRange(4, 5)));
        }
        var firstcoin = this.coins[0];
        if (firstcoin.position.y < -firstcoin.dimensions.y) this.coins.shift();
        for (var coin of this.coins) {
            coin.update(delta);
        }
    }

    collide(player) {
        var boundCenter = player.transform.transform(player.bounds.center.to3D());
        for (var i = 0; i < this.coins.length; i++) {
            var coin = this.coins[i];
            if (coin.bounds.center.y > player.position.y + player.dimensions.y) break;
            if(coin.bounds.center.SubtractVector(boundCenter).Length() <= coin.bounds.radius + player.bounds.radius)
                return i;
        }
        return -1;
    }

    draw() {
        for (var coin of this.coins) {
            coin.draw();
        }
    }
}

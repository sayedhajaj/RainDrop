class ObstacleSpawner {
    constructor() {
        this.gameObjectBag = {
            positions: [],
            refill: function() {
                this.positions = [];
                for (var i = 0; i < (canvas.width)*2-Crack.SIZE; i+=Crack.SIZE) {
                    for (var j = 1; j < 2 + Math.round(Math.abs(315-i)/Crack.SIZE); j++)
                        this.positions.push(Math.floor(randomInRange(i, i+Crack.SIZE)));
                }
                this.positions.shuffle();
            },
            getPosition: function() {
                return this.positions.shift();
            }
        };
        this.gameObjects = [];
    }

    init() {

        this.gameObjects = [];
        this.gameObjectBag.refill();
        for (var i = canvas.height; i <= 2*canvas.height; i+= canvas.height/2) {
            this.spawnObstacle(i);
        }
    }

    spawnObstacle(height) {
        this.gameObjects.push(new Crack(
            new Vector2D(this.gameObjectBag.getPosition(), height),
            new Vector2D(Crack.SIZE, Crack.SIZE)
        ));
    }

    update() {
        if (this.gameObjectBag.positions.length == 0) this.gameObjectBag.refill();
        var lastPos = this.gameObjects[this.gameObjects.length - 1].position;
        lastPos = lastPos.AddVector(camera.position);
        if(Math.abs(lastPos.y) < canvas.height / 2) {
            lastPos = lastPos.SubtractVector(camera.position);
            this.spawnObstacle(lastPos.y + canvas.height/2);
        }
        var firstObject = this.gameObjects[0];
        if (firstObject.position.y < -firstObject.dimensions.y) this.gameObjects.shift();
        for (var obstacle of this.gameObjects) {
            obstacle.update();
        }
    }

    draw() {
        for (var obstacle of this.gameObjects) {
            obstacle.draw();
        }
    }
}

class Player extends Sprite {
    constructor(position, dimensions) {
        super(position, dimensions);
        this.sideOn = false;
        this.distance = 0;
        this.angle = -45;
        this.maxAngle = 45;
        this.turnSpeed = 5;
        this.speed = 3;
        this.maxSpeed = 5;
        this.calculateMatrix();
        this.calculateCollisionBounds();
        this.animations = (function(){
            var animList = [];
            var anim;
        	anim = new Animation(150);
            var frame = images["player"].getSubImage(0, 0, 606, 908);
            frame = frame.resizeImageData(dimensions);
    		anim.addFrame(frame);
            animList["idle"] = anim;
            return animList;
        })();

    this.currentAnimation = "idle";
    this.states.unshift(new PlayerState());
    this.states[0].enter(this);
    }

    collide(obstacles) {
        /*var vertices = [];
        vertices.push(this.transform.transform(this.position.AddVector(this.dimensions).to3D()));
        vertices.push(this.transform.transform(this.position.AddVector(new Vector2D(Math.divideDec(this.dimensions.x, 2), 0)).to3D()));
        vertices.push(this.transform.transform(this.position.AddVector(new Vector2D(0, this.dimensions.y)).to3D()));
        function contains(p1, p2, d){
            return (p1 <= p2+d && p1 >= p2);
        }*/
        var boundCenter = this.transform.transform(this.bounds.center.to3D());
        for (var obstacle of obstacles) {
            if(obstacle.bounds.center.SubtractVector(boundCenter).Length() <= obstacle.bounds.radius + this.bounds.radius)
                return true;
            /*for (var verticy of vertices) {
                if(
                    contains(verticy.x, obstacle.position.x, obstacle.dimensions.x) &&
                    contains(verticy.y, obstacle.position.y, obstacle.dimensions.y)
                ) return true;
            }*/

        }
        return false;
    }

    setGameOver() {
        if (mainGame.score > mainGame.getHighScore()) mainGame.saveHighScore();
        gpm.setPageFromStart(gameOverPage);
    }

    handleKeyInput(keyup) {
        var newState = this.states[0].handleKeyInput(this, keyup);
        if(newState) {
            this.states.unshift(newState);
            this.states[0].enter(this);
        }
    }

    update(timePassed) {
        var topMiddle = this.transform.transform(
            this.position.AddVector(new Vector2D(Math.divideDec(this.dimensions.x, 2), this.dimensions.y)).to3D()
        );
        //topMiddle = this.position.AddVector(new Vector2D(Math.divideDec(this.dimensions.x, 2), this.dimensions.y));
        this.velocity.x = -Math.floor(Math.multDec(this.speed, Math.sin(toRadians(this.angle))));
        this.velocity.y = Math.floor(Math.multDec(this.speed, Math.cos(toRadians(this.angle))));
        if (topMiddle.x >= canvas.width*2) this.velocity.x = Math.min(0, this.velocity.x);
        if (topMiddle.x <= 0) this.velocity.x = Math.max(0, this.velocity.x);
        //if (topMiddle.x >= canvas.width*2) this.setGameOver();
        //if (topMiddle.x <= 0) this.setGameOver();
        super.update(timePassed);
        this.distance += this.velocity.y;
        if(this.velocity.Length() != 0) this.calculateMatrix();
        if(Math.abs(this.angle+this.turnSpeed) <= this.maxAngle) {
            this.angle += this.turnSpeed;
            this.calculateMatrix();
        }
        this.calculateCollisionBounds();
    }
/*
    draw() {
        var tempCanv = document.createElement('canvas');
        var tempCtx = tempCanv.getContext("2d");
        var imageToDraw = this.animations[this.currentAnimation].getImage();
        tempCtx.putImageData(imageToDraw, 0, 0);
        ctx.translate(this.position.x+this.dimensions.x/2, this.position.y+this.dimensions.y/2);
        ctx.rotate(toRadians(this.angle));
        ctx.translate(-(this.position.x+this.dimensions.x/2), -(this.position.y+this.dimensions.y/2));

        ctx.drawImage(tempCanv, this.position.x, this.position.y);
        ctx.restore();
    }
*/

    calculateMatrix() {
        var origin = this.position.AddVector(this.dimensions.Multiply(0.5));
        var lastTransform = this.transform;
        var translation = Matrix3D.translation(origin.Multiply(-1));
        this.transform = translation;
        //this.transform = Matrix3D.Multiply(Matrix3D.scale(new Vector2D(1.5, 1.5)), this.transform);
        this.transform = Matrix3D.Multiply(Matrix3D.rotation(this.angle), this.transform);
        this.transform = Matrix3D.Multiply(translation.getInverse(), this.transform);
        //this.transform = Matrix3D.Multiply(Matrix3D.rotation(-this.angle), this.transform);
        if(this.transform.getDeterminant() == 0) return lastTransform;
        return this.transform;
    }

    calculateCollisionBounds() {
        var position = this.position;
        var dimensions = this.dimensions;
        this.bounds = {
            center: new Vector2D(
                Math.addDec(position.x, Math.divideDec(dimensions.x, 2)),
                Math.subtractDec(Math.addDec(position.y, dimensions.y), Math.divideDec(dimensions.x, 2))
            ),
            radius: Math.divideDec(dimensions.x, 2)
        };
    }

    changeDirection() {
        this.turnSpeed *= -1;
    }
}

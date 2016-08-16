class Player extends Sprite {
    constructor(position, dimensions) {
        super(position, dimensions);
        this.sideOn = false;
        this.distance = 0;
        this.angle = -45;
        this.maxAngle = 45;
        this.turnSpeed = 5;
        this.speed = 3;
        this.calculateMatrix();
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

    collide(obstacle) {
        var vertices = [];
        /*vertices.push(this.transform.transform(this.position.to3D()));
        vertices.push(this.transform.transform(this.position.AddVector(this.dimensions).to3D()));
        vertices.push(this.transform.transform(this.position.AddVector(new Vector2D(this.dimensions.x, 0)).to3D()));
        vertices.push(this.transform.transform(this.position.AddVector(new Vector2D(0, this.dimensions.y)).to3D()));*/
        vertices.push(this.transform.transform(this.position.AddVector(this.dimensions).to3D()));
        vertices.push(this.transform.transform(this.position.AddVector(new Vector2D(Math.divideDec(this.dimensions.x, 2), 0)).to3D()));
        vertices.push(this.transform.transform(this.position.AddVector(new Vector2D(0, this.dimensions.y)).to3D()));
        function contains(p1, p2, d){
            return (p1 <= p2+d && p1 >= p2);
        }
        for (var verticy of vertices) {
            if(
                contains(verticy.x, obstacle.position.x, obstacle.dimensions.x) &&
                contains(verticy.y, obstacle.position.y, obstacle.dimensions.y)
            ) return true;
        }
        return false;
    }

    setGameOver() {
        gpm.setPage(gameOverPage);
    }

    handleKeyInput(keyup) {
        var newState = this.states[0].handleKeyInput(this, keyup);
        if(newState) {
            this.states.unshift(newState);
            this.states[0].enter(this);
        }
    }

    update(timePassed) {
        this.velocity.x = -Math.floor(Math.multDec(this.speed, Math.sin(toRadians(this.angle))));
        this.velocity.y = Math.floor(Math.multDec(this.speed, Math.cos(toRadians(this.angle))));
        if (this.position.x + this.dimensions.x > canvas.width) this.velocity.x = Math.min(0, this.velocity.x);
        if (this.position.x < 20) this.velocity.x = Math.max(0, this.velocity.x);
        super.update(timePassed);
        this.distance += this.velocity.y;
        if(this.velocity.Length() != 0) this.calculateMatrix();
        if(Math.abs(this.angle+this.turnSpeed) <= this.maxAngle) {
            this.angle += this.turnSpeed;
            this.calculateMatrix();
        }
    }

    calculateMatrix() {
        var origin = this.position.AddVector(this.dimensions.Multiply(0.5));
        var lastTransform = this.transform;
        this.transform = Matrix3D.translation(origin.Multiply(-1));
        //this.transform = Matrix3D.Multiply(Matrix3D.scale(new Vector2D(1.5, 1.5)), this.transform);
        this.transform = Matrix3D.Multiply(Matrix3D.rotation(this.angle), this.transform);
        this.transform = Matrix3D.Multiply(Matrix3D.translation(origin.Multiply(1)), this.transform);
        //this.transform = Matrix3D.Multiply(Matrix3D.rotation(-this.angle), this.transform);
        if(this.transform.getDeterminant() == 0) return lastTransform;
        return this.transform;
    }

    changeDirection() {
        this.turnSpeed *= -1;
    }
}

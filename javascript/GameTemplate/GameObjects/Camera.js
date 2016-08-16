function Camera() {
    this.position = new Vector2D(0, 0);
    this.velocity = new Vector2D(0, 0);
    this.enabled = true;
    this.transform = Matrix3D.Identity();

    this.update = function() {
        if(this.enabled) {
            this.position = this.position.AddVector(this.velocity);
            if(this.velocity.Length() != 0) this.setTransforms();
        }
    };

    this.transformContext = function() {
        this.transform.setContextTransform(ctx);
    }

    this.resetContextTransform = function() {
        Matrix3D.Identity().setContextTransform(ctx);
    }

    this.reset = function() {
        this.position = new Vector2D(0, 0);
        this.velocity = new Vector2D(0, 0);
        this.setTransforms();
    };

    this.setTransforms = function() {
        if(!this.enabled) return;
        this.transform = Matrix3D.translation(new Vector2D(this.position.x, this.position.y));
    }

}

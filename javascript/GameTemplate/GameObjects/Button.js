class Button {
    constructor(image, position, dimensions, action) {
        this.image = image;
        this.position = position;
        this.dimensions = dimensions
        this.action = action;
        this.selected = false;
    }

    draw() {
        if(!this.selected) ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
        else ctx.drawImage(this.image, this.position.x+1, this.position.y+1, this.dimensions.x-2, this.dimensions.y-2);
    }

    handleClick(x, y) {
        if((x <= this.position.x+this.dimensions.x && this.position.x <= x) && (y <= this.position.y+this.dimensions.y && this.position.y <= y))
            this.click();
    }

    handleMouseOver(x, y) {
        this.selected = ((x <= this.position.x+this.dimensions.x && this.position.x <= x) && (y <= this.position.y+this.dimensions.y && this.position.y <= y))
    }

    click() {
        this.action();
    }
}

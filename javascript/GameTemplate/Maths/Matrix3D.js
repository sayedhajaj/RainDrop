class Matrix3D extends Matrix2D {

	constructor() {
		super();
        this.elements = create2DArray([3, 3]);
        this.setRow(new Vector3D(0, 0, 0), 0);
        this.setRow(new Vector3D(0, 0, 0), 1);
        this.setRow(new Vector3D(0, 0, 0), 2);
    }

	copy() {
		var result = new Matrix3D();
		result.setRows(this.getRows());
		return result;
	}

	getCoFactorMatrix() {
		var result = new Matrix3D();
        var row, col;
        for (var y = 0; y < this.elements.length; y++) {
            row = this.getRow(y);
            for (var x = 0; x < this.elements[y].length; x++) {
                result.elements[y][x] = this.getCoFactor(y, x);
            }
        }
        return result;
	}

	getCoFactor(row, col) {

		var startRow = row == 0 ? 1 : 0;
		var endRow = row == 2 ? 1 : 2;
		var startCol = col == 0 ? 1 : 0;
		var endCol = col == 2 ? 1 : 2;
		var remainingMatrix = new Matrix2D();
		remainingMatrix.elements[0][0] = this.elements[startRow][startCol];
		remainingMatrix.elements[0][1] = this.elements[startRow][endCol];
		remainingMatrix.elements[1][0] = this.elements[endRow][startCol];
		remainingMatrix.elements[1][1] = this.elements[endRow][endCol];
		var det = remainingMatrix.getDeterminant();
		if((row+col)%2 == 1) det *= -1;
		return det;
	}

	transpose() {
		var result = this.copy();
		result.setColumn(this.getRow(0), 0);
		result.setColumn(this.getRow(1), 1);
		result.setColumn(this.getRow(2), 2);
		return result;
	}

	getInverse() {
		var det = this.getDeterminant();
		return this.getCoFactorMatrix().transpose().multiply(1 / det);
	}

	getDeterminant() {
		var col = 0;
		var det = 0;
		for (var col = 0; col < 3; col++) {
			if(col == 1) det = Math.subtractDec(det, Math.multDec(this.elements[0][col], this.getCoFactor(0, col)));
			else det = Math.addDec(det, Math.multDec(this.elements[0][col], this.getCoFactor(0, col)));
		}
		return det;
	}

    setDiagonal(value) {
        this.elements[0][0] = value;
        this.elements[1][1] = value;
        this.elements[2][2] = value;
        return this;
    }

    getRow(row) {
        return new Vector3D(this.elements[row][0], this.elements[row][1], this.elements[row][2]);
    }

    getColumn(col) {
        return new Vector3D(this.elements[0][col], this.elements[1][col], this.elements[2][col]);
    }

    setRow(row, pos) {
        this.elements[pos][0] = row.x;
        this.elements[pos][1] = row.y;
        this.elements[pos][2] = row.z;
        return this;
    }

    setColumn(col, pos) {
        this.elements[0][pos] = col.x;
        this.elements[1][pos] = col.y;
        this.elements[2][pos] = col.z;
        return this;
    }

	transform(vector) {
		var result = new Vector3D(0, 0, 0);
		var rows = this.getRows();
		result.x = rows[0].DotProduct(vector);
		result.y = rows[1].DotProduct(vector);
		result.z = rows[2].DotProduct(vector);
		return result;
	}

	getTransformElements() {
		var elms = this.elements;
		return [elms[0][0], elms[1][0], elms[0][1], elms[1][1], elms[0][2], elms[1][2]];
	}

	setContextTransform(ctx) {
		var elms = this.getTransformElements();
		ctx.setTransform(elms[0], elms[1], elms[2], elms[3], elms[4], elms[5]);
	}

	contextTransform(ctx) {
		var elms = this.getTransformElements();
		ctx.transform(elms[0], elms[1], elms[2], elms[3], elms[4], elms[5]);
	}

    static Identity() {
        return new Matrix3D().setDiagonal(1);
    }

    static Add(left, right) {
        var result = new Matrix3D();
        var rows = result.getRows();
        for (var i = 0; i < rows.length; i++) {
            result.setRow(left.getRow(i).AddVector(right.getRow(i)), i);
        }
        return result;
    }

    static Subtract(left, right) {
        var result = new Matrix3D();
        var rows = result.getRows();
        for (var i = 0; i < rows.length; i++) {
            result.setRow(left.getRow(i).SubtractVector(right.getRow(i)), i);
        }
        return result;
    }

    static Multiply(left, right) {
        var result = new Matrix3D();
        var row, col;
        for (var y = 0; y < left.elements.length; y++) {
            row = left.getRow(y);
            for (var x = 0; x < left.elements[y].length; x++) {
                col = right.getColumn(x);
                result.elements[y][x] = row.DotProduct(col);
            }
        }
        return result;
    }

    static Divide(left, right) {
        return Matrix3D.Multiply(left, right.getInverse());
    }

	static translation(vector) {
		var result = Matrix3D.Identity();
		result.elements[0][2] = vector.x;
		result.elements[1][2] = vector.y;
		return result
	}

	static scale(vector) {
		var result = Matrix3D.Identity();
		result.elements[0][0] = vector.x;
		result.elements[1][1] = vector.y;
		return result
	}

	static rotation(angle) {
		var result = Matrix3D.Identity();
		var angleRads = toRadians(angle);
		var angleCos = Math.cos(angleRads);
		var angleSin = Math.sin(angleRads);
		result.elements[0][0] = angleCos;
		result.elements[1][1] = angleCos;
		result.elements[0][1] = -angleSin;
		result.elements[1][0] = angleSin;
		return result;
	}

}

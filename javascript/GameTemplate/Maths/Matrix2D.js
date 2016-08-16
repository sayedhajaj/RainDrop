class Matrix2D {

    constructor() {
        this.elements = create2DArray([2, 2]);
        this.setRow(new Vector2D(0, 0), 0);
        this.setRow(new Vector2D(0, 0), 1);
    }

    copy() {
        var result = new Matrix2D();
        result.setRows(this.getRows());
        return result;
    }

    invert() {
        var result = this.copy();
        var temp = result.elements[0][0];
        result.elements[0][0] = result.elements[1][1];
        result.elements[1][1] = temp;
        temp = result.elements[0][1] * -1;
        result.elements[0][1] = result.elements[1][0] *-1;
        result.elements[1][0] = temp;
        return result;
    }

    transpose() {
        var result = this.copy();
        result.setColumn(this.getRow(0), 0);
        result.setColumn(this.getRow(1), 1);
        return result;
    }

    setDiagonal(value) {
        this.elements[0][0] = value;
        this.elements[1][1] = value;
        return this;
    }

    getRow(row) {
        return new Vector2D(this.elements[row][0], this.elements[row][1]);
    }

    getColumn(col) {
        return new Vector2D(this.elements[0][col], this.elements[1][col]);
    }

    getRows() {
        var rows = [];
        for (var i = 0; i < this.elements.length; i++) {
            rows.push(this.getRow(i));
        }
        return rows;
    }

    getColumns() {
        var cols = [];
        for (var i = 0; i < this.elements.length; i++) {
            cols.push(this.getColumn(i));
        }
        return cols;
    }

    getDeterminant() {
        return (Math.subtractDec(Math.multDec(this.elements[0][0], this.elements[1][1]), Math.multDec(this.elements[0][1], this.elements[1][0])));
    }

    getInverse() {
        var det = this.getDeterminant();
        return this.invert().multiply(Math.divideDec(1, det));
    }

    setRow(row, pos) {
        this.elements[pos][0] = row.x;
        this.elements[pos][1] = row.y;
        return this;
    }

    setColumn(col, pos) {
        this.elements[0][pos] = col.x;
        this.elements[1][pos] = col.y;
        return this;
    }

    setRows(rows) {
        for (var i = 0; i < rows.length; i++) {
            this.setRow(rows[i], i);
        }
    }

    setColumns(cols) {
        for (var i = 0; i < cols.length; i++) {
            this.setColumn(cols[i], i);
        }
    }

    multiply(scalar) {
        var rows = this.getRows();
        for(var i = 0; i < rows.length; i++) this.setRow(this.getRow(i).Multiply(scalar), i);
        return this;
    }

    static Identity() {
        return new Matrix2D().setDiagonal(1);
    }

    static Add(left, right) {
        var result = new Matrix2D();
        var rows = result.getRows();
        for (var i = 0; i < rows.length; i++) {
            result.setRow(left.getRow(i).AddVector(right.getRow(i)), i);
        }
        return result;
    }

    static Subtract(left, right) {
        var result = new Matrix2D();
        var rows = result.getRows();
        for (var i = 0; i < rows.length; i++) {
            result.setRow(left.getRow(i).SubtractVector(right.getRow(i)), i);
        }
        return result;
    }

    static Multiply(left, right) {
        var result = new Matrix2D();
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
        return Matrix2D.Multiply(left, right.getInverse());
    }

}

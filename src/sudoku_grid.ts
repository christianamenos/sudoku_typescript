import { Sudoku, SudokuCell } from "./sudoku.interface";

export class SudokuGrid implements Sudoku {
    protected grid: Array<Array<SudokuCell>>;
    protected size: number;
    protected squareSize: number;

    constructor(size: number) {
        this.validateSize(size);
        this.size = size;
        this.squareSize = Math.sqrt(size);
        this.grid = new Array(size)
            .fill(null)
            .map(() => new Array(size).fill({ value: null, isFinal: false, options: new Array(size).fill(null).map((_, i) => i + 1) }));
    }

    private validateSize(size: number) {
        if (size < 4) {
            throw new Error('Sudokus must be of size 4 or above');
        }
        if (Math.sqrt(size) % 1 !== 0) {
            throw new Error('Sudokus must be based on a power of 2 value');
        }
    }

    getSize(): number {
        return this.size;
    }

    getSquareSize(): number {
        return this.squareSize;
    }

    getRow(row: number): SudokuCell[] {
        if (this.isIndexOutOfBounds(row)) {
            throw new Error("Invalid row");
        }
        return this.grid[row];
    }

    getColumn(col: number): SudokuCell[] {
        if (this.isIndexOutOfBounds(col)) {
            throw new Error("Invalid column");
        }
        return this.grid.map(row => row[col]);
    }

    getCell(row: number, column: number): SudokuCell {
        return this.grid[row][column];
    }

    getSquare(squareRow: number, squareColumn: number): SudokuCell[] {
        if (this.isSquareOutOfBounds(squareRow, squareColumn)) {
            throw new Error("Invalid square");
        }
        return this.grid
            .slice(squareRow * this.squareSize, squareRow * this.squareSize + this.squareSize)
            .map(row => row.slice(squareColumn * this.squareSize, squareColumn * this.squareSize + this.squareSize))
            .reduce((acc, val) => acc.concat(val), []);
    }

    copy(): SudokuGrid {
        const copy = new SudokuGrid(this.size);
        copy.size = this.size;
        copy.squareSize = this.squareSize;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                copy.grid[i][j] = { ...this.grid[i][j] };
            }
        }
        return copy;
    }

    private isIndexOutOfBounds(index: number): boolean {
        return index < 0 || index >= this.size;
    }

    private isSquareOutOfBounds(squareRow: number, squareColumn: number): boolean {
        return squareRow < 0 || squareRow >= this.squareSize || squareColumn < 0 || squareColumn >= this.squareSize;
    }
}
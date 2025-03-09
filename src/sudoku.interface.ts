export interface SudokuCell {
    value: any;
    options: any[];
    isFinal: boolean;
}

export interface Sudoku {
    getSize(): number;
    getSquareSize(): number;
    getCell(row: number, column: number): SudokuCell;
    getRow(row: number): SudokuCell[];
    getColumn(column: number): SudokuCell[];
    getSquare(squareRow: number, squareColumn: number): SudokuCell[];
    copy(): Sudoku;
}
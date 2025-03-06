export interface SudokuCell {
    value: any;
    isFinal: boolean;
}

export interface Sudoku {
    getSize(): number;
    getCell(row: number, column: number): SudokuCell;
    getRow(row: number): SudokuCell[];
    getColumn(column: number): SudokuCell[];
    getSquare(squareRow: number, squareColumn: number): SudokuCell[];
}
export interface Sudoku {
    getSize(): number;
    getItem(row: number, column: number): any;
    getRow(row: number): any[];
    getColumn(column: number): any[];
    getSquare(squareRow: number, squareColumn: number): any[];
}
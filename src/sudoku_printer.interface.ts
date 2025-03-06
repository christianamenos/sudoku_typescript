import { Sudoku } from "./sudoku.interface";

export interface SudokuPrinter {
    print(sudoku: Sudoku): void;
}
import { SudokuGrid } from "./sudoku_grid";
import { SudokuPrinterConsole } from "./sudoku_printer_console";
import { SudokuSolver } from "./sudoku_solver";

const differentNumbers = 4;
const sudoku = new SudokuGrid(differentNumbers);

const sudokuSolver = new SudokuSolver();
const solvedSudoku = sudokuSolver.solveSudoku(sudoku);

const sudokuPrinter = new SudokuPrinterConsole();
sudokuPrinter.print(solvedSudoku);
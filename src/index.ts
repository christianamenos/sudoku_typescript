import { Sudoku } from "./sudoku.interface";
import { SudokuGrid } from "./sudoku_grid";
import { SudokuPrinterConsole } from "./sudoku_printer_console";
import { SudokuSolver } from "./sudoku_solver";

const differentNumbers = 4;
const sudoku = new SudokuGrid(differentNumbers);
const sudokuPrinter = new SudokuPrinterConsole();
sudokuPrinter.print(sudoku);

const sudokuSolver = new SudokuSolver();
sudokuSolver.solve(sudoku);
import { SudokuGrid } from "./sudoku_grid";
import { SudokuPrinterConsole } from "./sudoku_printer_console";

const differentNumbers = 4;
const sudoku = new SudokuGrid(differentNumbers);
const sudokuPrinter = new SudokuPrinterConsole();
sudokuPrinter.print(sudoku);
import { SudokuGrid } from "./sudoku_grid";
import { SudokuPrinterConsole } from "./sudoku_printer_console";

const sudoku = new SudokuGrid(4);
const sudokuPrinter = new SudokuPrinterConsole();
sudokuPrinter.print(sudoku);
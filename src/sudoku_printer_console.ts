import { Sudoku } from "./sudoku.interface";
import { SudokuPrinter } from "./sudoku_printer.interface";

export class SudokuPrinterConsole implements SudokuPrinter {
    print(sudoku: Sudoku) {
        const size = sudoku.getSize();
        for (let i = 0; i < size; i++) {
            console.log(sudoku.getRow(i)
                .map(col => col.value ?? '*')
                .join(' ')
            );
        }
        console.log('');
    }
}
import { Sudoku, SudokuCell } from "./sudoku.interface";

export class SudokuSolver {

    solveSudoku(sudoku: Sudoku): Sudoku {
        if (this.isInvalidSudoku(sudoku)) return null;
        if (this.isFilledSudoku(sudoku)) return sudoku;

        const newSudoku = sudoku.copy();
        const { row, col } = this.searchPositionsWithLowerNumberOfOptions(newSudoku);
        let options = newSudoku.getCell(row, col).options;
        while (options.length > 0) {
            const option = options[Math.floor(options.length * Math.random())];
            options = options.filter(value => value !== option);
            newSudoku.getCell(row, col).value = option;
            this.removeOption(newSudoku, option, row, col);
            const result = this.solveSudoku(newSudoku);
            if (result != null) return result;
        }
        return null;
    }

    private removeOption(sudoku: Sudoku, option: any, row: number, col: number): void {
        for (let i = 0; i < sudoku.getSize(); i++) {
            // Remove the option from the row
            const rowCell = sudoku.getCell(row, i);
            rowCell.options = rowCell.options.filter(value => value !== option);
            // Remove the option from the column
            const colCell = sudoku.getCell(i, col);
            colCell.options = colCell.options.filter(value => value !== option);
        }
        // Remove the option from the square
        const { minRow, maxRow, minCol, maxCol } = this.getSquarePositionFromCellPosition(sudoku.getSize(), row, col);
        for (let i = minRow; i < maxRow; i++) {
            for (let j = minCol; j < maxCol; j++) {
                const cell = sudoku.getCell(i, j);
                cell.options = cell.options.filter(value => value !== option);
            }
        }
    }

    private getSquarePositionFromCellPosition(size: number, row: number, col: number) {
        const squareSize = Math.sqrt(size);
        const gridRow = Math.floor(row / squareSize);
        const gridCol = Math.floor(col / squareSize);
        return {
            minRow: gridRow * squareSize,
            minCol: gridCol * squareSize,
            maxRow: gridCol * squareSize + squareSize,
            maxCol: gridCol * squareSize + squareSize,
        };
    }

    searchPositionsWithLowerNumberOfOptions(sudoku: Sudoku) {
        const size = sudoku.getSize();
        let lowestNumberOfOptions = size;
        let previousRow = 0;
        let previousCol = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = sudoku.getCell(i, j);
                if (!cell.isFinal && cell.value == null && cell.options.length <= lowestNumberOfOptions) {
                    lowestNumberOfOptions = cell.options.length;
                    previousCol = j;
                    previousRow = i;
                }
            }
        }
        return {
            row: previousRow,
            col: previousCol
        };
    }

    private isInvalidSudoku(sudoku: Sudoku) {
        const size = sudoku.getSize();
        for (let i = 0; i < size; i++) {
            const row = sudoku.getRow(i);
            if (!this.isValidGroup(row)) return true;

            const column = sudoku.getColumn(i);
            if (!this.isValidGroup(column)) return true;
        }


        for (let i = 0; i < Math.sqrt(size); i++) {
            for (let j = 0; j < Math.sqrt(size); j++) {
                const square = sudoku.getSquare(i, j);
                if (!this.isValidGroup(square)) return true;
            }
        }
        return false;
    }

    private isFilledSudoku(sudoku: Sudoku): boolean {
        const size = sudoku.getSize();
        for (let i = 0; i < size; i++) {
            const row = sudoku.getRow(i);
            if (!this.isFilledGroup(row)) return false;

            const column = sudoku.getColumn(i);
            if (!this.isFilledGroup(column)) return false;
        }

        const squareSize = sudoku.getSquareSize();
        for (let i = 0; i < squareSize; i++) {
            for (let j = 0; j < squareSize; j++) {
                const square = sudoku.getSquare(i, j);
                if (!this.isFilledGroup(square)) return false;
            }
        }
        return true;
    }

    private isFilledGroup(group: Array<SudokuCell>): boolean {
        for (const cell of group) {
            if (cell.value === null) {
                return false;
            }
        };
        return true;
    }

    private isValidGroup(group: Array<SudokuCell>): boolean {
        const groupValues = new Set();
        for (const cell of group) {
            if (cell.value && groupValues.has(cell.value)) {
                return false;
            }
        };
        return true;
    }
}
import { Sudoku, SudokuCell } from "./sudoku.interface";

export class SudokuSolver {

    solve(sudoku: Sudoku) {
        const result = this.searchPositionsWithLowerNumberOfOptions(sudoku);
        console.log(result);
        console.log('Is a invalid sudoku?', this.isInvalidSudoku(sudoku));
        console.log('Is a filled sudoku?', this.isFilledSudoku(sudoku));
    }

    searchPositionsWithLowerNumberOfOptions(sudoku: Sudoku) {
        const size = sudoku.getSize();
        let lowestNumberOfOptions = size;
        let previousRow = 0;
        let previousCol = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = sudoku.getCell(i, j);
                if (!cell.isFinal) {
                    const options = cell.options.length;
                    if (options <= lowestNumberOfOptions) {
                        lowestNumberOfOptions = options;
                        previousRow = i;
                        previousCol = j;
                    }
                }
            }
        }
        return {
            lowestNumberOfOptions,
            previousRow,
            previousCol
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

    private isFilledSudoku(sudoku: Sudoku) {
        const size = sudoku.getSize();
        for (let i = 0; i < size; i++) {
            const row = sudoku.getRow(i);
            if (!this.isFilledGroup(row)) return false;

            const column = sudoku.getColumn(i);
            if (!this.isFilledGroup(column)) return false;
        }


        for (let i = 0; i < Math.sqrt(size); i++) {
            for (let j = 0; j < Math.sqrt(size); j++) {
                const square = sudoku.getSquare(i, j);
                if (!this.isFilledGroup(square)) return false;
            }
        }
        return true;
    }

    private isFilledGroup(group: Array<SudokuCell>): boolean {
        group.forEach(cell => {
            if (!cell.value) {
                return false;
            }
        });
        return true;
    }

    private isValidGroup(group: Array<SudokuCell>): boolean {
        const groupValues = new Set();
        group.forEach(cell => {
            if (cell.value && groupValues.has(cell.value)) {
                return false;
            }
        });
        return true;
    }
}
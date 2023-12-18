import { NDArray, matrix } from 'vectorious';

export class MathPyramidFactory {

    createRandomSolution(size: number, maxValue: number): number[] {
        const maxValueInLowestRow: number = Math.max(2, Math.floor(maxValue / Math.pow(2, size - 1)));
        // start values in bottom row of pyramid
        const randomSolution: number[] = new Array(size)
            .fill(0)
            .map(() => Math.floor(Math.random() * (maxValueInLowestRow - 1) + 1));

        // solve pyramid from bottom to top
        let offset = 0;
        for (let i = 1; i < size; i++) {
            for (let j = 0; j < size - i; j++) {
                randomSolution.push(randomSolution[offset + j] + randomSolution[offset + j + 1]);
            }
            offset += size - (i - 1);
        }
        return randomSolution;
    }

    getUniquelySolvableRandomStartValues(solution: number[]): number[] {
        const size: number = this.getSizeFromNumberOfBlocks(solution.length);
        let startValues: Map<number, number> = this.getRandomStartValues(solution);
        let tries: number = 1;
        const maxIterations: number = 250;
        while (this.isNotSolvable(startValues, size) && tries <= maxIterations) {
            startValues = this.getRandomStartValues(solution);
            tries++;
        }
        if (tries >= maxIterations) {
            throw new Error(`Could not find a uniquely solvable solution in ${maxIterations} iterations.`);
        }
        console.log(`Needed ${tries} iterations to find suitable start values.`);
        const startValuesAsArray: number[] = new Array(solution.length).fill(null);
        startValues.forEach((value: number, key: number) => {
            startValuesAsArray[key] = value;
        });
        return startValuesAsArray;
    }

    private getRandomStartValues(solution: number[]): Map<number, number> {
        const size: number = this.getSizeFromNumberOfBlocks(solution.length);
        const numberOfBlocks: number = this.getNumberOfBlocks(size);
        const randomStartValues: Map<number, number> = new Map<number, number>();
        const randomIndices: number[] = this.getRandomIndices(numberOfBlocks, size);
        randomIndices.forEach((randomIndex: number) => {
            randomStartValues.set(randomIndex, solution[randomIndex]);
        });
        return randomStartValues;
    }

    private getDifficulty(startPositions: Set<number>, size: number): number | null {
        if (!this.isUniquelySolvable(startPositions, size)) {
            return null;
        }

        const calculatablePositions: Set<number> = new Set<number>(startPositions);
        for (let i = 0; i < size; i++) {
            this.addCurrentCalculatablePositions(calculatablePositions, size);
        }
        return calculatablePositions.size < this.getNumberOfBlocks(size) ? 1 : 0;
    }

    private addCurrentCalculatablePositions(calculatablePositions: Set<number>, size: number) {
        for (let row = 0; row < size - 1; row++) {
            for (let column = 0; column < size - row; column++) {
                if (column + 1 < size - row) {
                    // plus
                    const first: number = this.getIndex(row, column, size);
                    const second: number = this.getIndex(row, column + 1, size);
                    if (calculatablePositions.has(first) && calculatablePositions.has(second)) {
                        calculatablePositions.add(this.getIndex(row + 1, column, size));
                    }
                    // minus to the right
                    const firstMinus: number = this.getIndex(row, column, size);
                    const secondMinus: number = this.getIndex(row + 1, column, size);
                    if (calculatablePositions.has(firstMinus) && calculatablePositions.has(secondMinus)) {
                        calculatablePositions.add(this.getIndex(row, column + 1, size));
                    }
                }
                // minus to the left
                if (column > 0) {
                    const firstMinus: number = this.getIndex(row, column, size);
                    const secondMinus: number = this.getIndex(row + 1, column - 1, size);
                    if (calculatablePositions.has(firstMinus) && calculatablePositions.has(secondMinus)) {
                        calculatablePositions.add(this.getIndex(row, column - 1, size));
                    }
                }
            }
        }
    }

    private getIndex(rowId: number, colId: number, size: number) {
        // starting in bottom row left, e.g. for pyramid of size 3:
        // 0 0 -> 0
        // 0 1 -> 1
        // 0 2 -> 2

        // 1 0 -> 3
        // 1 1 -> 4

        // 2 0 -> 5
        this.checkDimensions(rowId, colId, size);
        let index = 0;
        // increase index by (size - i) for each row
        for (let i = 0; i < rowId; i = i + 1) {
            index = index + size - i;
        }
        return index + colId;
    }

    private checkDimensions(rowId: number, colId: number, size: number) {
        let message = '';
        if (rowId < 0 || rowId >= size) {
            message += `rowId ${rowId} must be non-negative and smaller than the size of the pyramid ${size}`;
        }
        if (colId < 0 || colId >= size - rowId) {
            message += `colId ${colId} must be non-negative and smaller than the size of the pyramid minus rowId ${rowId}, size ${size}`;
        }
        if (message.length > 0) {
            throw new Error(message);
        }
    }

    private isUniquelySolvable(startValues: Set<number>, size: number): boolean {
        const columns: number = this.getNumberOfBlocks(size);
        const rows: number = columns - size;
        const A: NDArray = matrix(rows, rows);
        const F: NDArray = this.createMatrix(size);
        let column = 0;
        for (let i = 0; i < columns; i++) {
            if (!startValues.has(i)) {
                for (let j = 0; j < rows; j++) {
                    A.set(j, column, F.get(j, i));
                }
                column++;
            }
        }
        const b: NDArray = matrix(rows, 1);
        try {
            A.solve(b);
            return true;
        } catch (e) {
            return false;
        }
    }

    private createMatrix(size: number): NDArray {
        const numberOfColumns: number = this.getNumberOfBlocks(size);
        const numberOfRows: number = numberOfColumns - size;
        const A: NDArray = matrix(numberOfRows, numberOfColumns);
        for (let i = 0; i < numberOfRows; i++) {
            A.set(i, i + size, -1);
        }
        let row = 0;
        for (let i = 0; i < size - 1; i++) {
            for (let j = 0; j < size - 1 - i; j++) {
                A.set(row + j, row + j + i, 1);
                A.set(row + j, row + j + i + 1, 1);
            }
            row += size - i - 1;
        }
        return A;
    }

    private getRandomIndices(maxValue: number, numberOfIndices: number): number[] {
        const givenList: number[] = Array.from({ length: maxValue }, (_, i) => i);
        givenList.sort(() => Math.random() - 0.5);
        return givenList.slice(0, numberOfIndices);
    }

    private getNumberOfBlocks(size: number): number {
        return (size * size + size) / 2;
    }

    private getSizeFromNumberOfBlocks(numberOfBlocks: number): number {
        return (Math.sqrt(1 + 8 * numberOfBlocks) - 1) / 2;
    }

    private isNotSolvable(startValues: Map<number, number>, size: number) {
        const difficulty = this.getDifficulty(new Set(startValues.keys()), size);
        return difficulty === 1 || difficulty === null;
    }
}
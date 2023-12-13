import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { NDArray, matrix } from 'vectorious';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const queryParameters: Map<string, number> = getQueryParameters(event);
        const solutionValues: number[] = createRandomSolution(
            queryParameters.get('size')!,
            queryParameters.get('maxValue')!,
        );
        const startValues: number[] = getUniquelySolvableRandomStartValues(solutionValues);
        return {
            statusCode: 200,
            body: JSON.stringify({
                size: 3,
                startValues: startValues,
                solutionValues: solutionValues,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err,
            }),
        };
    }

    function createRandomSolution(size: number, maxValue: number): number[] {
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

    function getUniquelySolvableRandomStartValues(solution: number[]): number[] {
        const size: number = getSizeFromNumberOfBlocks(solution.length);
        let startValues: Map<number, number> = getRandomStartValues(solution);
        let tries = 1;
        while (isNotSolvable(startValues, size) && tries <= 100) {
            startValues = getRandomStartValues(solution);
            tries++;
        }
        if (tries >= 1000) {
            throw new Error('Could not find a uniquely solvable solution in 100 iterations.');
        }
        console.log(`Needed ${tries} iterations to find suitable start values.`);
        const startValuesAsArray: number[] = new Array(solution.length).fill(null);
        startValues.forEach((value: number, key: number) => {
            startValuesAsArray[key] = value;
        });
        return startValuesAsArray;
    }

    function getRandomStartValues(solution: number[]): Map<number, number> {
        const size: number = getSizeFromNumberOfBlocks(solution.length);
        const numberOfBlocks: number = getNumberOfBlocks(size);
        const randomStartValues: Map<number, number> = new Map<number, number>();
        const randomIndices: number[] = getRandomIndices(numberOfBlocks, size);
        randomIndices.forEach((randomIndex: number) => {
            randomStartValues.set(randomIndex, solution[randomIndex]);
        });
        return randomStartValues;
    }

    function getDifficulty(startPositions: Set<number>, size: number): number | null {
        if (!isUniquelySolvable(startPositions, size)) {
            return null;
        }

        const calculatablePositions: Set<number> = new Set<number>(startPositions);
        for (let i = 0; i < size; i++) {
            addCurrentCalculatablePositions(calculatablePositions, size);
        }
        return calculatablePositions.size < getNumberOfBlocks(size) ? 1 : 0;
    }

    function addCurrentCalculatablePositions(calculatablePositions: Set<number>, size: number) {
        for (let row = 0; row < size - 1; row++) {
            for (let column = 0; column < size - row; column++) {
                if (column + 1 < size - row) {
                    // plus
                    const first: number = getIndex(row, column, size);
                    const second: number = getIndex(row, column + 1, size);
                    if (calculatablePositions.has(first) && calculatablePositions.has(second)) {
                        calculatablePositions.add(getIndex(row + 1, column, size));
                    }
                    // minus to the right
                    const firstMinus: number = getIndex(row, column, size);
                    const secondMinus: number = getIndex(row + 1, column, size);
                    if (calculatablePositions.has(firstMinus) && calculatablePositions.has(secondMinus)) {
                        calculatablePositions.add(getIndex(row, column + 1, size));
                    }
                }
                // minus to the left
                if (column > 0) {
                    const firstMinus: number = getIndex(row, column, size);
                    const secondMinus: number = getIndex(row + 1, column - 1, size);
                    if (calculatablePositions.has(firstMinus) && calculatablePositions.has(secondMinus)) {
                        calculatablePositions.add(getIndex(row, column - 1, size));
                    }
                }
            }
        }
    }

    function getIndex(rowId: number, colId: number, size: number) {
        // starting in bottom row left, e.g. for pyramid of size 3:
        // 0 0 -> 0
        // 0 1 -> 1
        // 0 2 -> 2

        // 1 0 -> 3
        // 1 1 -> 4

        // 2 0 -> 5
        checkDimensions(rowId, colId, size);
        let index = 0;
        // increase index by (size - i) for each row
        for (let i = 0; i < rowId; i = i + 1) {
            index = index + size - i;
        }
        return index + colId;
    }

    function checkDimensions(rowId: number, colId: number, size: number) {
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

    function isUniquelySolvable(startValues: Set<number>, size: number): boolean {
        const columns: number = getNumberOfBlocks(size);
        const rows: number = columns - size;
        const A: NDArray = matrix(rows, rows);
        const F: NDArray = createMatrix(size);
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

    function createMatrix(size: number): NDArray {
        const numberOfColumns: number = getNumberOfBlocks(size);
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

    function getRandomIndices(maxValue: number, numberOfIndices: number): number[] {
        const givenList: number[] = Array.from({ length: maxValue }, (_, i) => i);
        givenList.sort(() => Math.random() - 0.5);
        return givenList.slice(0, numberOfIndices);
    }

    function getNumberOfBlocks(size: number): number {
        return (size * size + size) / 2;
    }

    function getSizeFromNumberOfBlocks(numberOfBlocks: number): number {
        return (Math.sqrt(1 + 8 * numberOfBlocks) - 1) / 2;
    }
    function isNotSolvable(startValues: Map<number, number>, size: number) {
        const difficulty = getDifficulty(new Set(startValues.keys()), size);
        return difficulty === 1 || difficulty === null;
    }
    function getQueryParameters(event: APIGatewayProxyEvent) {
        const queryParameters = new Map<string, number>([
            ['size', 3],
            ['maxValue', 100],
        ]);
        if (
            event.queryStringParameters !== null &&
            event.queryStringParameters !== undefined &&
            event.queryStringParameters?.size !== null &&
            event.queryStringParameters?.maxValue !== null
        ) {
            console.log(`queryStringParameters: ${JSON.stringify(event.queryStringParameters)}`);
            const size = Number(event.queryStringParameters!.size);
            const maxValue = Number(event.queryStringParameters!.maxValue);
            validateQueryParameters(size, maxValue);
            queryParameters.set('size', size);
            queryParameters.set('maxValue', maxValue);
            console.log(`Using the following values from query parameters: ${[...queryParameters.entries()]}`);
        } else {
            console.log('Using default values: size=3, maxValue=100');
        }
        return queryParameters;
    }

    function validateQueryParameters(size: number, maxValue: number) {
        if (
            size == null ||
            !Number.isSafeInteger(size) ||
            maxValue == null ||
            !Number.isSafeInteger(maxValue) ||
            size < 3 ||
            size > 10 ||
            maxValue < 100 ||
            maxValue > 1000000
        ) {
            throw new Error(
                `Invalid values: size must be between 3 and 10 and maxValue betwee 100 and 1000000. Current values: size ${size}, maxValue ${maxValue}`,
            );
        }
    }
};

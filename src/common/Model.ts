import { MathPyramidCalculator } from "../service/MathPyramidCalculator";

class Model {
  solution: number[];
  startValues: number[];
  userInput: number[];
  size: number;
  constructor(
    size: number,
    maxValue: number,
    calculator: MathPyramidCalculator
  ) {
    this.size = size;
    this.solution = calculator.createRandomSolution(size, maxValue);
    this.startValues = calculator.getRandomStartValues(this.solution, size);
    this.userInput = Object.assign([], this.startValues);
  }

  getIndex(rowId: number, colId: number): number {
    let index = 0;
    // increase index by (size - i) for each row
    for (let i = 0; i < rowId; i = i + 1) {
      index = index + this.size - i;
    }
    return index + colId;
  }

  isSolved() {
    return JSON.stringify(this.solution) === JSON.stringify(this.userInput)
  }
}

export { Model };

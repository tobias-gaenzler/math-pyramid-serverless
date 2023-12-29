interface MathPyramidModelData {
  size: number;
  solutionValues: number[];
  startValues: number[];
}

class Model {
  size: number;
  solutionValues: number[];
  startValues: number[];
  userInput: number[];
  constructor(
    data: MathPyramidModelData
  ) {
    this.size = data.size;
    this.solutionValues = data.solutionValues;
    this.startValues = data.startValues;
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
    return JSON.stringify(this.solutionValues) === JSON.stringify(this.userInput)
  }
}

export { Model };
export type { MathPyramidModelData };

import _ from "underscore";

class MathPyramidCalculator {
  createRandomSolution(size: number, maxValue: number): number[] {
    const maxValueInLowestRow = Math.max(
      2,
      Math.floor(maxValue / Math.pow(2, size - 1))
    );
    // start values in bottom row of pyramid
    const randomSolution: number[] = [];
    while (randomSolution.length < size) {
      const r = Math.floor(Math.random() * maxValueInLowestRow) + 1;
      if (randomSolution.indexOf(r) === -1) randomSolution.push(r);
    }
    // solve pyramid from bottom to top
    let offset = 0;
    for (let i = 1; i < size; i++) {
      for (let j = 0; j < size - i; j++) {
        randomSolution.push(
          randomSolution[offset + j] + randomSolution[offset + j + 1]
        );
      }
      offset += size - (i - 1);
    }
    return randomSolution;
  }

  getRandomStartValues(
    solution: number[],
    size: number
  ): number[] {
    const numberOfFields = this.getNumberOfFields(size);
    let randomStartIndices = _.sortBy(_.sample([0, 1, 2, 3, 4, 5], size));
    while (
      // exclude not uniquely solvable start values
      this.isEqual(randomStartIndices, [0, 1, 3]) ||
      this.isEqual(randomStartIndices, [1, 2, 4]) ||
      this.isEqual(randomStartIndices, [3, 4, 5]) ||
      this.isEqual(randomStartIndices, [0, 2, 5])
    ) {
      randomStartIndices = _.sortBy(_.sample(_.range(numberOfFields), size));
    }

    const startValues = new Array(numberOfFields);
    randomStartIndices.forEach(
      (index: number) => (startValues[index] = solution[index])
    );
    return startValues;
  }

  private getNumberOfFields(size: number) {
    return (size * size + size) / 2;
  }

  private isEqual(a: number[], b: number[]) {
    return JSON.stringify(a) === JSON.stringify(b)
  }
}

export { MathPyramidCalculator };

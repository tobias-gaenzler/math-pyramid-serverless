import { MathPyramidModelData, Model } from "./Model";

describe("testing Model constructor", () => {
  test("should throw error on null values in solution", () => {
    const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[null,18,7,25,25,null]}";
    const t = () => {
      new Model(JSON.parse(message) as MathPyramidModelData);
    };
    expect(t).toThrow(Error);
  });
  test("should set correct values", () => {
    const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}";
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData);
    expect(model.size).toBe(3);
    expect(model.startValues).toEqual([null, 18, null, 25, 25, null]);
    expect(model.userInput).toEqual([null, 18, null, 25, 25, null]);
    expect(model.solutionValues).toEqual([7, 18, 7, 25, 25, 50]);
  });
});
describe("testing Model.isSolved", () => {
  test("should return true when solved", () => {
    const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}";
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData);
    model.userInput = model.solutionValues;
    expect(model.isSolved()).toBe(true);
  });
  test("should return false when not solved", () => {
    const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}";
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData);
    expect(model.isSolved()).toBe(false);
  });
});
describe("testing Model.getIndex for size 3", () => {
  test.each`
  input              | index
  ${[0, 0]}          | ${0} 
  ${[0, 1]}          | ${1} 
  ${[0, 2]}          | ${2} 
  ${[1, 0]}          | ${3} 
  ${[1, 1]}          | ${4} 
  ${[2, 0]}          | ${5} 
  `("calculate index from $input, expecting $index", ({ input, index }) => {
    const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}";
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData);
    expect(model.getIndex(input[0], input[1])).toBe(index);
  });
});
describe("testing Model.getIndex for size 5", () => {
  test.each`
  input              | index
  ${[0, 0]}          | ${0} 
  ${[0, 1]}          | ${1} 
  ${[0, 2]}          | ${2} 
  ${[0, 3]}          | ${3} 
  ${[0, 4]}          | ${4} 
  ${[1, 0]}          | ${5} 
  ${[1, 1]}          | ${6} 
  ${[1, 2]}          | ${7} 
  ${[1, 3]}          | ${8} 
  ${[2, 0]}          | ${9} 
  ${[2, 1]}          | ${10} 
  ${[2, 2]}          | ${11} 
  ${[3, 0]}          | ${12} 
  ${[3, 1]}          | ${13} 
  ${[4, 0]}          | ${14} 
  `("calculate index from $input, expecting $index", ({ input, index }) => {
    const message: string = "{\"size\":5,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}";
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData);
    expect(model.getIndex(input[0], input[1])).toBe(index);
  });
});
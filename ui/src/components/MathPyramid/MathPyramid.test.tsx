import { act, render, screen, waitFor } from "@testing-library/react";
import { MathPyramidModelData, Model } from "../../common/Model";
import userEvent from '@testing-library/user-event';
import MathPyramid from "./MathPyramid";

describe("testing MathPyramid", () => {
  test("should render start values and not solution values", () => {
    const inputHandler = jest.fn();
    const message: string = '{"size":3,"startValues":[null,18,null,25,26,null],"solutionValues":[7,18,8,25,26,51]}';
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData);

    render(<MathPyramid model={model} inputHandler={inputHandler} />);

    expect(screen.getByDisplayValue("18")).toBeInTheDocument();
    expect(screen.getByDisplayValue("25")).toBeInTheDocument();
    expect(screen.getByDisplayValue("26")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("7")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("8")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("51")).not.toBeInTheDocument();
  });
});

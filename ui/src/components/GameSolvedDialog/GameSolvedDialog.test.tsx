import { fireEvent, render, screen } from "@testing-library/react";
import { GameSolvedDialog } from "./GameSolvedDialog";

describe("testing GameSolvedDialog", () => {
  test("does not render GameSolvedDialog when not solved", () => {
    render(<GameSolvedDialog onClose={function (): void { }} solvedBy={""} userName={"robert"} />);
    expect(screen.queryByTestId("gameSolvedDialog")).not.toBeInTheDocument();
  });
  test("renders GameSolvedDialog when solved", () => {
    render(<GameSolvedDialog onClose={function (): void { }} solvedBy={"someone else"} userName={"robert"} />);
    expect(screen.getByTestId("gameSolvedDialog")).toBeInTheDocument();
    const title = screen.getByText(new RegExp("someone else solved the pyramid!", "i"));
    expect(title).toBeInTheDocument();
  });
  test("closes dialog on click on close button", () => {
    const closeFunction = jest.fn();
    render(<GameSolvedDialog onClose={closeFunction} solvedBy={"someone else"} userName={"robert"} />);
    expect(screen.getByTestId("gameSolvedDialog")).toBeInTheDocument();
    const restartButton = screen.getByRole("button");
    fireEvent.click(restartButton);
    expect(closeFunction).toHaveBeenCalled();
  });
});

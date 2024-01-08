import { fireEvent, render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";
import { ERROR_MESSAGE } from "./ErrorMessage";

const restartFunction = jest.fn();
describe("testing ErrorMessage", () => {
  test("renders Error Message", () => {
    render(<ErrorMessage restart={restartFunction} />);
    const errorMessage = screen.getByText(new RegExp(ERROR_MESSAGE, "i"));
    expect(errorMessage).toBeInTheDocument();
  });
  test("calls callback on click on restart", () => {
    render(<ErrorMessage restart={restartFunction} />);
    const restartButton = screen.getByRole("button");
    fireEvent.click(restartButton);
    expect(restartFunction).toHaveBeenCalled();
  });
});

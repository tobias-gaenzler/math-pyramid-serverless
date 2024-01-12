import { fireEvent, render, screen } from "@testing-library/react"
import ErrorMessage from "./ErrorMessage"
import { ERROR_MESSAGE } from "./ErrorMessage"

const restartFunction = jest.fn()
describe("testing ErrorMessage", () => {
  test("renders ErrorMessage component with correct message", () => {
    render(<ErrorMessage restart={restartFunction} />)
    const errorMessage = screen.getByText(new RegExp(ERROR_MESSAGE, "i"))
    expect(errorMessage).toBeInTheDocument()
  })
  test("calls the restart function when restart button is clicked", () => {
    render(<ErrorMessage restart={restartFunction} />)
    const restartButton = screen.getByRole("button")
    fireEvent.click(restartButton)
    expect(restartFunction).toHaveBeenCalled()
  })
})

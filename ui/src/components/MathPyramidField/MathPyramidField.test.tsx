import { act, render, screen, waitFor } from "@testing-library/react"
import MathPyramidField from "./MathPyramidField"
import { MathPyramidModelData, Model } from "../../model/Model"
import userEvent from "@testing-library/user-event"

describe("testing MathPyramidField", () => {
  test("should render correctly for fixed field", () => {
    const inputHandler = jest.fn()
    const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}"
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData)

    render(<MathPyramidField index={1} model={model} inputHandler={inputHandler} />)

    expect(screen.getByDisplayValue("18")).toBeInTheDocument()
    expect(screen.getByDisplayValue("18")).toBeDisabled()
  })
  test("should render correctly for empty field", async () => {
    const inputHandler = jest.fn()
    const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}"
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData)

    render(<MathPyramidField index={0} model={model} inputHandler={inputHandler} />)

    const inputField = screen.getByTestId("field0").querySelector("input")
    expect(inputField).not.toBeDisabled()
    expect(inputField).toHaveDisplayValue("")
  })
  test("should mark wrong input", async () => {
    const inputHandler = jest.fn()
    const index: number = 0
    const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}"
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData)
    render(<MathPyramidField index={index} model={model} inputHandler={inputHandler} />)
    const inputField = screen.getByTestId(`field${index}`).querySelector("input")

    act(() => userEvent.type(inputField!, "9"))

    expect(inputField).toHaveDisplayValue("9")
    expect(inputField).not.toBeDisabled()
    await waitFor(() => {
      expect(screen.getByTestId(`field${index}`)).toHaveClass("incorrect")
    })
  })
  test("should disable field on correct input", async () => {
    const inputHandler = jest.fn()
    const index: number = 0
    const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}"
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData)
    render(<MathPyramidField index={index} model={model} inputHandler={inputHandler} />)
    const inputField = screen.getByTestId(`field${index}`).querySelector("input")

    act(() => userEvent.type(inputField!, "7"))

    expect(inputField).toHaveDisplayValue("7")
    expect(inputField).toBeDisabled()
    await waitFor(() => {
      expect(screen.getByTestId(`field${index}`)).toHaveClass("correct")
    })
  })
  test("should call input handler", async () => {
    const inputHandler = jest.fn()
    const index: number = 0
    const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}"
    const model: Model = new Model(JSON.parse(message) as MathPyramidModelData)
    render(<MathPyramidField index={index} model={model} inputHandler={inputHandler} />)
    const inputField = screen.getByTestId(`field${index}`).querySelector("input")

    act(() => userEvent.type(inputField!, "7"))

    expect(inputHandler).toHaveBeenCalled()
  })
})

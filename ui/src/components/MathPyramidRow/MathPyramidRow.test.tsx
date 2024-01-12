import { render, screen } from "@testing-library/react"
import MathPyramidRow from "./MathPyramidRow"
import { MathPyramidModelData, Model } from "../../model/Model"

const message: string = "{\"size\":3,\"startValues\":[null,18,null,25,25,null],\"solutionValues\":[7,18,7,25,25,50]}"
const model: Model = new Model(JSON.parse(message) as MathPyramidModelData)
describe("MathPyramidRow", () => {
    it("renders three fields for row 0", () => {
        render(<MathPyramidRow row={0} model={model} inputHandler={jest.fn()} />)

        expect(screen.getByTestId("field0")).toBeInTheDocument()
        expect(screen.getByTestId("field1")).toBeInTheDocument()
        expect(screen.getByTestId("field2")).toBeInTheDocument()
        expect(screen.queryByTestId("field3")).not.toBeInTheDocument()
        expect(screen.queryByTestId("field4")).not.toBeInTheDocument()
        expect(screen.queryByTestId("field5")).not.toBeInTheDocument()
    })
    it("renders one field for row 2", () => {
        render(<MathPyramidRow row={2} model={model} inputHandler={jest.fn()} />)

        expect(screen.queryByTestId("field0")).not.toBeInTheDocument()
        expect(screen.queryByTestId("field1")).not.toBeInTheDocument()
        expect(screen.queryByTestId("field2")).not.toBeInTheDocument()
        expect(screen.queryByTestId("field3")).not.toBeInTheDocument()
        expect(screen.queryByTestId("field4")).not.toBeInTheDocument()
        expect(screen.getByTestId("field5")).toBeInTheDocument()
    })
})

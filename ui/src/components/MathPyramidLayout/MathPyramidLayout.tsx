import { Model } from "../../model/Model"
import { MathPyramidFieldHandler } from "../MathPyramidField/MathPyramidField"
import MathPyramidRow from "../MathPyramidRow/MathPyramidRow"
import React from "react"

type Props = {
  model: Model | undefined | null;
  inputHandler: MathPyramidFieldHandler;
}

const MathPyramid: React.FC<Props> = ({ model, inputHandler }: Props) => {
  const rows: React.ReactElement[] = []

  if (model) {
    for (let row = model.size - 1; row >= 0; row--) {
      const key = `row-${row}`
      rows.push(
        <MathPyramidRow key={key} row={row} model={model} inputHandler={inputHandler} />
      )
    }
  }

  return <>{rows}</>
}

export default MathPyramid
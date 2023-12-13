import React, { useState } from "react"
import "./MathPyramidPractice.css"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import MathPyramidField, {
  MathPyramidFieldHandler,
} from "../MathPyramidField/MathPyramidField"
import {
  Button,
} from "@mui/material"
import { MathPyramidCalculator } from "../../service/MathPyramidCalculator"
import { Model } from "../../common"
import { SuccessDialog } from ".."

type Props = {
  size: number
  maxValue: number
}

const MathPyramidPractice: React.FC<Props> = ({ size, maxValue }: Props) => {
  const calculator = new MathPyramidCalculator()
  const [model, setModel] = useState<Model>(() => {
    // lazy state init
    return new Model(size, maxValue, calculator)
  })
  const [solved, setSolved] = useState<boolean>(false)

  const inputHandler: MathPyramidFieldHandler = (
    index: number,
    inputValue: string
  ): boolean => {
    const inputCorrect = model.solution[index].toString() === inputValue
    if (inputCorrect) {
      model.userInput[index] = parseInt(inputValue)
      setSolved(model.isSolved())
    }
    return inputCorrect
  }

  const restart = () => {
    setModel(new Model(size, maxValue, calculator))
  }
  const closePopup = () => {
    setSolved(false)
  }

  return (
    <Stack
      spacing={4}
      justifyContent="center"
      alignItems="center"
      className="math-pyramid"
    >
      {getRows()}
      <SuccessDialog open={solved} onClose={closePopup} />
      <Button color="primary" variant="contained" onClick={restart}>
        Restart
      </Button>
    </Stack>
  )

  function getRows() {
    const rows: React.ReactElement[] = []
    for (let row = model.size - 1; row >= 0; row--) {
      const fields: React.ReactElement[] = getFieldsForRow(row)
      rows.push(
        <Box key={row} className="row">
          {fields}
        </Box>
      )
    }
    return rows
  }

  function getFieldsForRow(row: number) {
    const fields: React.ReactElement[] = []
    for (let column = 0; column < model.size - row; column++) {
      const index = model.getIndex(row, column)
      fields.push(
        <MathPyramidField
          key={index}
          index={index}
          model={model}
          inputHandler={inputHandler}
        />
      )
    }
    return fields
  }
}

export default MathPyramidPractice

